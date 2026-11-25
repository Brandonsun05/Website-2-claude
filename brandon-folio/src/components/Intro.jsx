import { useEffect, useRef, useState } from 'react';
import { media } from '../data.js';
import { globalSound } from '../sound.js';

// Opening cover: Brandon's PLANET scene (Blender → public/media/intro/planet.fbx), rendered live with three.js.
// The look is rebuilt from the .blend file, because FBX keeps only flat colours:
//   · Cycles + Filmic, every lamp off in the render → light comes only from a night-sky HDRI (strength 0.03)
//     and glowing materials: gold "五角星" emission (strength 5) and thin white rims on the glass.
//   · 金属  metal: grey 0.456, metallic 1, roughness ≈ 0.52
//   · 材质.001 cyan glass (shell, inner ring, ocean): transmission, IOR 1.45, fresnel alpha
//   · Material / 材质.002 clear glass + white fresnel-rim emission (outer ring, gems)
//   · camera: 50 mm, square frame, pose copied from the Blender camera
// Scrolling flies the camera toward the planet, then the cover fades into the hero.

const FBX_URL = media('intro/planet.fbx');
const FBX_BYTES = 10674540; // fallback for progress when the server sends no size
const CDN = 'https://esm.sh/three@0.170.0';
const SKY_URLS = [
  media('intro/sky.hdr'), // optional local copy of the HDRI used in Blender
  'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/qwantani_night_puresky_2k.hdr',
];

// Tunables (match these to the Blender render)
const LOOK = {
  exposure: 1.0,
  sky: 0.06, // background brightness (Blender: 0.03, Filmic)
  env: 0.08, // how much the sky lights / reflects on materials
  gold: 4, // emission strength of the gold stars (Blender: 5)
  rim: 1.2, // white rim glow on clear glass (Blender: emission 1)
  bloom: 0.45, // web-only glow; 0 = off, like the Cycles render
};

// Intro soundtrack: seamless loop, muted until the visitor turns it on.
const SOUND_URLS = [media('intro/intro-loop.flac'), media('intro/intro-loop.wav')];
const VOLUME = 0.9;

const BLENDER_CAM = { loc: [-11.339, 16.571, 1.898], rot: [94.36, 0, -148.11], lens: 50, sensor: 36 };

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export default function Intro() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const progressRef = useRef(0); // scroll progress 0..1, read by the render loop
  const [loaded, setLoaded] = useState(0); // download %
  const [ready, setReady] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [soundLoading, setSoundLoading] = useState(false);
  const audio = useRef({ ctx: null, gain: null, on: false, level: 1 });

  // volume follows the toggle and fades out as you scroll into the site
  const applyGain = () => {
    const a = audio.current;
    if (!a.ctx) return;
    a.gain.gain.setTargetAtTime(a.on ? VOLUME * a.level : 0, a.ctx.currentTime, 0.12);
  };

  const toggleSound = async () => {
    const a = audio.current;
    if (!a.ctx) {
      // created inside the click so browsers allow playback
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      a.ctx = new AC();
      a.gain = a.ctx.createGain();
      a.gain.gain.value = 0;
      a.gain.connect(a.ctx.destination);
      a.on = true;
      setSoundOn(true);
      globalSound.set(true);
      setSoundLoading(true);
      let buf = null;
      for (const url of SOUND_URLS) {
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          buf = await a.ctx.decodeAudioData(await res.arrayBuffer());
          break;
        } catch { /* try the next format */ }
      }
      setSoundLoading(false);
      if (!buf) { a.on = false; setSoundOn(false); globalSound.set(false); return; }
      const src = a.ctx.createBufferSource(); // buffer looping = gapless
      src.buffer = buf;
      src.loop = true;
      src.connect(a.gain);
      src.start();
      if (a.ctx.state === 'suspended') await a.ctx.resume();
      applyGain();
      return;
    }
    a.on = !a.on;
    setSoundOn(a.on);
    globalSound.set(a.on);
    if (a.on && a.ctx.state === 'suspended') await a.ctx.resume();
    applyGain();
  };

  // pause audio in background tabs; close it when leaving
  useEffect(() => {
    const onVis = () => {
      const a = audio.current;
      if (!a.ctx) return;
      if (document.hidden) a.ctx.suspend();
      else if (a.on) a.ctx.resume();
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      audio.current.ctx?.close();
    };
  }, []);

  // Scroll progress → CSS variable (text + veil fades) and the render loop.
  useEffect(() => {
    const wrap = wrapRef.current;
    const root = document.documentElement;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = wrap.getBoundingClientRect();
      const total = Math.max(1, wrap.offsetHeight - window.innerHeight);
      const p = clamp(-r.top / total);
      progressRef.current = p;
      wrap.style.setProperty('--p', p.toFixed(4));
      audio.current.level = r.bottom <= 0 ? 0 : 1 - smooth(0.55, 1, p);
      applyGain();
      // hide the nav while the cover is on screen
      root.classList.toggle('in-intro', r.bottom > window.innerHeight * 0.35);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
      root.classList.remove('in-intro');
    };
  }, []);

  // The 3D scene.
  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const phone = window.matchMedia('(max-width: 720px)').matches;

    (async () => {
      let THREE, FBXLoader, RGBELoader, EffectComposer, RenderPass, UnrealBloomPass, OutputPass;
      try {
        // Loaded from a CDN in the browser, so nothing needs installing.
        // esm.sh serves the add-ons and three itself from one shared copy.
        const imp = (p) => import(/* @vite-ignore */ `${CDN}${p}`);
        [THREE, { FBXLoader }, { RGBELoader }, { EffectComposer }, { RenderPass }, { UnrealBloomPass }, { OutputPass }] =
          await Promise.all([
            imp(''),
            imp('/examples/jsm/loaders/FBXLoader.js'),
            imp('/examples/jsm/loaders/RGBELoader.js'),
            imp('/examples/jsm/postprocessing/EffectComposer.js'),
            imp('/examples/jsm/postprocessing/RenderPass.js'),
            imp('/examples/jsm/postprocessing/UnrealBloomPass.js'),
            imp('/examples/jsm/postprocessing/OutputPass.js'),
          ]);
      } catch (e) {
        console.warn('Intro: three.js unavailable', e);
        return; // the dark cover + title stay
      }
      if (disposed) return;

      const canvas = canvasRef.current;
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
      } catch (e) {
        console.warn('Intro: WebGL unavailable', e);
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, phone ? 1.25 : 1.75));
      renderer.toneMapping = THREE.AgXToneMapping; // closest built-in to Blender's Filmic
      renderer.toneMappingExposure = LOOK.exposure;
      if ('transmissionResolutionScale' in renderer) renderer.transmissionResolutionScale = phone ? 0.5 : 0.75;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#05050a');
      scene.backgroundIntensity = LOOK.sky;
      scene.environmentIntensity = LOOK.env;

      // Blender camera (Z-up, metres) → three (Y-up, FBX centimetres)
      const toThree = (x, y, z) => new THREE.Vector3(x, z, -y);
      const camera = new THREE.PerspectiveCamera(39.6, 1, 10, 100000);
      const qb = new THREE.Quaternion().setFromEuler(
        // Blender's "XYZ" euler applies X first, which is three.js order 'ZYX'
        new THREE.Euler(...BLENDER_CAM.rot.map(THREE.MathUtils.degToRad), 'ZYX')
      );
      const fB = new THREE.Vector3(0, 0, -1).applyQuaternion(qb);
      const uB = new THREE.Vector3(0, 1, 0).applyQuaternion(qb);
      const camStart = toThree(...BLENDER_CAM.loc).multiplyScalar(100);
      const camFwd = toThree(fB.x, fB.y, fB.z).normalize();
      const camUp = toThree(uB.x, uB.y, uB.z).normalize();
      const halfFov = Math.atan(BLENDER_CAM.sensor / 2 / BLENDER_CAM.lens); // square frame

      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), LOOK.bloom, 0.55, 0.9);
      if (LOOK.bloom > 0) composer.addPass(bloom);
      composer.addPass(new OutputPass());

      const resize = () => {
        const w = canvas.clientWidth || window.innerWidth;
        const h = canvas.clientHeight || window.innerHeight;
        renderer.setSize(w, h, false);
        composer.setSize(w, h);
        camera.aspect = w / h;
        // Frame the square Blender shot on any screen:
        //  · wide screens show its full height (extra scene at the sides)
        //  · tall screens show nearly its full width (a little trimmed so the planet isn't tiny)
        const vHalf = camera.aspect >= 1
          ? halfFov
          : Math.atan((Math.tan(halfFov) / camera.aspect) * (0.82 + 0.18 * camera.aspect));
        camera.fov = THREE.MathUtils.radToDeg(vHalf * 2);
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);

      // Night sky (same HDRI as the .blend). Falls back to plain dark if it can't load.
      const pmrem = new THREE.PMREMGenerator(renderer);
      let envTex = null;
      let skyTex = null;
      (async () => {
        for (const url of SKY_URLS) {
          try {
            const tex = await new RGBELoader().loadAsync(url);
            if (disposed) { tex.dispose(); return; }
            tex.mapping = THREE.EquirectangularReflectionMapping;
            skyTex = tex;
            envTex = pmrem.fromEquirectangular(tex).texture;
            scene.background = tex;
            scene.environment = envTex;
            return;
          } catch { /* try the next source */ }
        }
      })();

      // ── Load the model
      let root;
      try {
        root = await new Promise((res, rej) =>
          new FBXLoader().load(
            FBX_URL,
            res,
            (e) => setLoaded(Math.round((e.loaded / (e.total || FBX_BYTES)) * 100)),
            rej
          )
        );
      } catch (e) {
        console.warn('Intro: could not load planet.fbx', e);
        ro.disconnect();
        renderer.dispose();
        return;
      }
      if (disposed) { renderer.dispose(); return; }

      // ── Materials, rebuilt from the .blend node trees
      const lin = (r, g, b) => new THREE.Color().setRGB(r, g, b, THREE.LinearSRGBColorSpace);
      const time = { value: 0 };

      // thin white fresnel rim (Layer Weight blend 0.05 → Emission, mixed over the glass)
      const addRim = (mat, strength) => {
        mat.onBeforeCompile = (sh) => {
          sh.uniforms.uRim = { value: strength };
          sh.fragmentShader = sh.fragmentShader
            .replace('#include <common>', '#include <common>\nuniform float uRim;')
            .replace(
              '#include <emissivemap_fragment>',
              `#include <emissivemap_fragment>
               {
                 float ct = clamp(dot(normalize(vNormal), normalize(vViewPosition)), 0.0, 1.0);
                 float F0 = 0.00066; // IOR 1/(1-0.05)
                 float fr = F0 + (1.0 - F0) * pow(1.0 - ct, 5.0);
                 totalEmissiveRadiance += vec3(fr * uRim);
               }`
            );
        };
        return mat;
      };

      const M = {
        metal: new THREE.MeshPhysicalMaterial({ color: lin(0.456, 0.456, 0.456), metalness: 1, roughness: 0.52 }),
        cyanGlass: new THREE.MeshPhysicalMaterial({
          color: lin(0.513, 0.8, 0.784), metalness: 0, roughness: 0.05, ior: 1.45,
          transmission: 1, thickness: 60, specularIntensity: 0.32,
          transparent: true, opacity: 0.85, side: THREE.DoubleSide,
        }),
        clearGlass: addRim(new THREE.MeshPhysicalMaterial({
          color: '#ffffff', metalness: 0, roughness: 0, ior: 1.5, transmission: 1, thickness: 40,
        }), LOOK.rim),
        gold: new THREE.MeshBasicMaterial({ color: lin(1, 0.845, 0.037).multiplyScalar(LOOK.gold) }),
      };

      // The ocean keeps moving gently (Blender animates the Ocean modifier's time).
      // Its square edge fades out, and a wider sea underneath carries the water to the horizon,
      // so nothing ends abruptly on wide screens.
      const ocean = M.cyanGlass.clone();
      ocean.side = THREE.FrontSide;
      ocean.onBeforeCompile = (sh) => {
        sh.uniforms.uTime = time;
        sh.vertexShader = sh.vertexShader
          .replace('#include <common>', '#include <common>\nuniform float uTime;\nvarying vec2 vOcean;')
          .replace(
            '#include <begin_vertex>',
            `#include <begin_vertex>
             vOcean = position.xy;
             transformed.z += sin(position.x * 0.32 + uTime * 0.6) * 0.12
                            + sin(position.y * 0.27 - uTime * 0.45) * 0.1;`
          );
        sh.fragmentShader = sh.fragmentShader
          .replace('#include <common>', '#include <common>\nvarying vec2 vOcean;')
          .replace(
            '#include <color_fragment>',
            `#include <color_fragment>
             float oEdge = max(abs(vOcean.x), abs(vOcean.y)) / 25.7;
             diffuseColor.a *= 1.0 - smoothstep(0.8, 0.99, oEdge);`
          );
      };

      const oceanInv = { value: new THREE.Matrix4() };
      const camXZ = { value: new THREE.Vector2(camStart.x, camStart.z) };
      const farSea = M.cyanGlass.clone();
      farSea.side = THREE.FrontSide;
      farSea.onBeforeCompile = (sh) => {
        sh.uniforms.uTime = time;
        sh.vertexShader = sh.vertexShader
          .replace('#include <common>', '#include <common>\nuniform float uTime;\nuniform vec2 uCamXZ;\nvarying vec2 vSea;\nvarying vec3 vSeaWorld;')
          .replace(
            '#include <begin_vertex>',
            `#include <begin_vertex>
             vSea = position.xy;
             // the sea curves gently away like a horizon, so it never cuts through the planet's base
             vec2 wXZ = (modelMatrix * vec4(position, 1.0)).xz;
             transformed.z -= smoothstep(2600.0, 5600.0, distance(wXZ, uCamXZ)) * 420.0;
             transformed.z += sin(position.x * 0.0021 + uTime * 0.5) * 30.0
                            + sin(position.y * 0.0017 - uTime * 0.4) * 25.0;
             vSeaWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;`
          );
        sh.fragmentShader = sh.fragmentShader
          .replace('#include <common>', '#include <common>\nvarying vec2 vSea;\nvarying vec3 vSeaWorld;\nuniform mat4 uOceanInv;')
          .replace(
            '#include <color_fragment>',
            `#include <color_fragment>
             // no wider sea underneath the Blender ocean (avoids water poking through water)
             vec3 oL = (uOceanInv * vec4(vSeaWorld, 1.0)).xyz;
             if (max(abs(oL.x), abs(oL.y)) / 25.7 < 0.86) discard;
             diffuseColor.a *= 1.0 - smoothstep(14000.0, 34000.0, length(vSea)); // melt into the sky`
          );
        sh.uniforms.uOceanInv = oceanInv;
        sh.uniforms.uCamXZ = camXZ;
      };
      const farSeaMesh = new THREE.Mesh(new THREE.PlaneGeometry(80000, 80000, 160, 160), farSea);
      farSeaMesh.rotation.x = -Math.PI / 2;
      farSeaMesh.renderOrder = -1;
      let oceanMesh = null;

      root.updateMatrixWorld(true);
      const remove = [];
      const planetParts = [];
      const floaters = [];
      const matName = (o) => [].concat(o.material || []).map((m) => m?.name || '').join(' ');

      root.traverse((o) => {
        if (o.isCamera || o.isLight) { remove.push(o); return; } // lamps are off in the Blender render
        if (!o.isMesh) return;
        const key = o.name.replace(/[.\s_]/g, '');
        const mn = matName(o);
        // hidden in render / not useful on the web: metaballs (under the sea), Sphere.002
        if (/^Mball/.test(key) || key === 'Sphere002') { o.visible = false; return; }

        if (key === 'Plane001') { o.material = M.metal; planetParts.push(o); }
        else if (key === 'Sphere') { o.material = M.metal; planetParts.push(o); }
        else if (key === 'Sphere001') { o.material = M.clearGlass; o.scale.multiplyScalar(1.004); planetParts.push(o); }
        else if (key === 'Cube') { o.material = M.cyanGlass; o.renderOrder = 2; planetParts.push(o); }
        else if (key === 'Torus001') { o.material = M.clearGlass; planetParts.push(o); }
        else if (key === 'Torus002') { o.material = M.cyanGlass; planetParts.push(o); }
        else if (key.includes('平面')) { o.material = ocean; oceanMesh = o; }
        else if (mn.includes('五角星')) { o.material = M.gold; floaters.push(o); }
        else { o.material = M.clearGlass; floaters.push(o); } // 材质.002 gems
      });
      remove.forEach((o) => o.parent?.remove(o));
      scene.add(root);

      // wider sea: just under the Blender ocean, centred between the camera and the planet
      const seaLevel = new THREE.Vector3();
      if (oceanMesh) oceanMesh.getWorldPosition(seaLevel);
      else seaLevel.set(0, 82, 0);
      farSeaMesh.position.set(1000, seaLevel.y - 30, 1500);
      if (oceanMesh) oceanInv.value.copy(oceanMesh.matrixWorld).invert();
      scene.add(farSeaMesh);

      // planet parts turn slowly around the planet's centre
      const center = toThree(28.424, -47.927, 16.0).multiplyScalar(100);
      const pivot = new THREE.Group();
      pivot.position.copy(center);
      scene.add(pivot);
      planetParts.forEach((o) => pivot.attach(o));
      const floatData = floaters.map((o) => ({ o, y: o.position.y, phase: Math.random() * Math.PI * 2 }));

      // ── Camera path: the Blender shot first, then fly toward the planet while scrolling
      const qStart = new THREE.Quaternion().setFromRotationMatrix(
        new THREE.Matrix4().lookAt(camStart, camStart.clone().add(camFwd), camUp)
      );
      const toPlanet = center.clone().sub(camStart);
      const camEnd = camStart.clone().addScaledVector(toPlanet, 0.62);
      const qEnd = new THREE.Quaternion().setFromRotationMatrix(
        new THREE.Matrix4().lookAt(camEnd, center, new THREE.Vector3(0, 1, 0))
      );

      const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
      const onMove = (e) => {
        if (e.pointerType !== 'mouse') return; // touch screens use tilt instead
        pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener('pointermove', onMove, { passive: true });

      // Phones / tablets: tilting the device looks around, like the mouse on desktop.
      // The resting angle is learned and slowly re-centred, so it works however the phone is held.
      let tiltBase = null;
      const onTilt = (ev) => {
        if (ev.beta == null || ev.gamma == null) return;
        const angle = screen.orientation?.angle ?? window.orientation ?? 0;
        let x = ev.gamma;
        let y = ev.beta;
        if (angle === 90) { x = ev.beta; y = -ev.gamma; }
        else if (angle === -90 || angle === 270) { x = -ev.beta; y = ev.gamma; }
        else if (angle === 180) { x = -ev.gamma; y = -ev.beta; }
        if (!tiltBase) tiltBase = { x, y };
        tiltBase.x += (x - tiltBase.x) * 0.01;
        tiltBase.y += (y - tiltBase.y) * 0.01;
        pointer.tx = clamp((x - tiltBase.x) / 18, -1, 1);
        pointer.ty = clamp((y - tiltBase.y) / 18, -1, 1);
      };
      const touchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      let askTilt = null;
      if (touchDevice && 'DeviceOrientationEvent' in window && !reduced) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
          // iPhone/iPad only allow motion access after a tap: ask on the first tap anywhere
          askTilt = () => {
            window.removeEventListener('touchend', askTilt);
            DeviceOrientationEvent.requestPermission()
              .then((r) => { if (r === 'granted') window.addEventListener('deviceorientation', onTilt); })
              .catch(() => {});
          };
          window.addEventListener('touchend', askTilt, { passive: true });
        } else {
          window.addEventListener('deviceorientation', onTilt);
        }
      }

      const qPar = new THREE.Quaternion();
      const ePar = new THREE.Euler();
      const clock = new THREE.Clock();
      let eased = progressRef.current;

      const tick = () => {
        const dt = Math.min(clock.getDelta(), 0.05);
        const t = clock.elapsedTime;
        eased += (progressRef.current - eased) * Math.min(1, dt * 5);
        pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 2.5);
        pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 2.5);

        const e = smooth(0, 1, eased);
        camera.position.lerpVectors(camStart, camEnd, e);
        camera.quaternion.slerpQuaternions(qStart, qEnd, e);
        // gentle look-around with the mouse
        ePar.set(-pointer.y * 0.035, -pointer.x * 0.05, 0, 'YXZ');
        camera.quaternion.multiply(qPar.setFromEuler(ePar));

        if (!reduced) {
          time.value = t;
          pivot.rotation.y += dt * 0.06;
          for (const f of floatData) f.o.position.y = f.y + Math.sin(t * 0.8 + f.phase) * 18;
        }
        composer.render();
      };

      // only render while the cover is on screen
      const io = new IntersectionObserver(([en]) => {
        renderer.setAnimationLoop(en.isIntersecting ? tick : null);
      });
      io.observe(wrapRef.current);
      tick();
      setReady(true);

      cleanup = () => {
        renderer.setAnimationLoop(null);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('deviceorientation', onTilt);
        if (askTilt) window.removeEventListener('touchend', askTilt);
        root.traverse((o) => o.geometry?.dispose());
        Object.values(M).forEach((m) => m.dispose());
        ocean.dispose();
        farSea.dispose();
        farSeaMesh.geometry.dispose();
        skyTex?.dispose();
        envTex?.dispose();
        pmrem.dispose();
        composer.dispose?.();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  const enter = () => document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className={`intro ${ready ? 'intro--ready' : ''}`} ref={wrapRef} aria-label="Intro">
      <div className="intro__sticky">
        <canvas className="intro__canvas" ref={canvasRef} aria-hidden="true" />
        <div className="intro__grain" aria-hidden="true" />

        <div className="intro__overlay container">
          <p className="intro__kicker mono">Portfolio — {new Date().getFullYear()}</p>
          {/* the hero keeps the page's <h1>; this is decorative */}
          <p className="intro__title" aria-hidden="true">
            Brandon<span className="intro__colon">:</span>
          </p>
          <p className="intro__role">Digital Media Designer</p>
        </div>

        {!ready && (
          <p className="intro__loading mono" aria-live="polite">
            Loading planet{loaded > 0 && loaded < 100 ? ` · ${loaded}%` : '…'}
          </p>
        )}

        <div className="intro__sound">
          <button
            className={`intro__sound-btn mono ${soundOn ? 'is-on' : ''}`}
            onClick={toggleSound}
            aria-pressed={soundOn}
            aria-label={soundOn ? 'Mute sound' : 'Turn sound on'}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
              {soundOn ? (
                <>
                  <path d="M16.5 8.5a5 5 0 0 1 0 7" />
                  <path d="M19 6a8.5 8.5 0 0 1 0 12" />
                </>
              ) : (
                <path d="M17 9l5 6M22 9l-5 6" />
              )}
            </svg>
            <span>{soundLoading ? 'Loading…' : soundOn ? 'Sound on' : 'Sound off'}</span>
          </button>
          <p className="intro__sound-hint mono">Best viewed with sound on</p>
        </div>

        <button className="intro__enter mono" onClick={enter}>
          Scroll to enter <span aria-hidden="true">↓</span>
        </button>

        <div className="intro__veil" aria-hidden="true" />
      </div>
    </section>
  );
}
