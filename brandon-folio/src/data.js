// ─────────────────────────────────────────────────────────────
//  All site content lives here. Edit text, add projects, swap
//  images — no need to touch the components.
//  Images go in /public/media/... and are referenced without
//  the "public" prefix.
// ─────────────────────────────────────────────────────────────

const BASE = import.meta.env.BASE_URL || './';
export const media = (p) => `${BASE}media/${p}`;
export const asset = (p) => `${BASE}${p}`;

export const profile = {
  name: 'Brandon Sun',
  fullName: 'Taishang (Brandon) Sun',
  role: 'Digital Media Designer',
  handle: '@brandon_made',
  location: 'Melbourne, AU',
  tagline: 'UI/UX · interactive media · emerging tech',
  intro:
    'I design user-centred digital experiences — interfaces, interactive worlds, 3D and motion — for brands, galleries and screens.',
  // About Me body copy
  about:
    'Digital Media designer based in Melbourne. Having experience with various digital media technologies, including UI/UX, video editing, 3D modelling, sound design, and virtual environment design. My practices primarily employ a cross-disciplinary approach to design, utilising digital media technologies to create engaging, human-centric designs that prioritise user needs.',
  photo: media('profile.jpg'),
  email: 'brandonsun419@gmail.com',
  phone: '0493 769 998',
  phoneHref: 'tel:+61493769998',
  resumePdf: asset('resume/Taishang-Brandon-Sun-CV.pdf'),
};

export const stats = [
  { value: '736K+', label: 'campaign impressions at Brand Asia' },
  { value: '12K+', label: 'followers on the WeChat account I ran' },
  { value: '2×', label: 'selected for RMIT digital media exhibitions' },
];

export const expertise = [
  'UI/UX Design',
  'Interactive Experience Design',
  '3D Modelling',
  'Motion & Video Production',
  'User Research',
  'Digital Storytelling',
];

export const tools = ['Figma', 'Adobe Creative Suite', 'Blender', 'Maya', 'Unity', 'Spline', 'CapCut', 'TouchDesigner', 'Reaper'];

export const languages = [
  { name: 'English', level: 'Native' },
  { name: 'Mandarin', level: 'Highly proficient' },
];

export const links = [
  { label: 'LinkedIn', handle: 'brandon-sun', href: 'https://www.linkedin.com/in/brandon-sun-96085428a', color: 'violet' },
  { label: 'Instagram', handle: '@brandon_made', href: 'https://www.instagram.com/brandon_made/', color: 'pink' },
  { label: 'ArtStation', handle: 'brandon93', href: 'https://www.artstation.com/brandon93/albums/3675431', color: 'lime' },
  { label: 'Resume', handle: 'PDF · 2 pages', href: asset('resume/Taishang-Brandon-Sun-CV.pdf'), color: 'chrome' },
];

// Order here = order of the category cards. The first one is shown by default.
export const categories = [
  { id: 'interactive', label: 'Interactive', blurb: 'Games, AR & virtual exhibitions', color: 'violet' },
  { id: 'uiux', label: 'UI / UX', blurb: 'Research to hi-fi prototypes', color: 'sky' },
  { id: '3d', label: '3D', blurb: 'Modelling, lookdev & render', color: 'lime' },
  { id: 'video', label: 'Video', blurb: 'Motion, VFX & audiovisual', color: 'pink' },
  { id: '2d', label: '2D', blurb: 'Brand, editorial & campaigns', color: 'orange' },
  { id: 'sound', label: 'Sound', blurb: 'Earcons, foley & music', color: 'yellow' },
  { id: 'photo', label: 'Photography', blurb: 'Street & landscape', color: 'chrome' },
];

export const catLabel = Object.fromEntries(categories.map((c) => [c.id, c.label]));

// Within a category, works show in the order listed here.
// Descriptions are starter copy — rewrite them in your own words.
export const works = [
  // ── Interactive
  // Detail-page fields (all optional): tagline, year, role, tools, exhibited,
  // brief (paragraphs), videos [{ yt, label }], links [{ label, href }], gallery (image count).
  { id: 'bob-rush', cat: 'interactive', title: 'Bob Rush', meta: 'RMIT × CODE · ACMI Audience Lab 2026',
    tagline: 'Awkward encounters and beautiful moments',
    year: '2026',
    role: 'Interactive systems & body tracking (team project)',
    tools: ['Unity', 'ZED body tracking', 'Blender'],
    exhibited: 'ACMI Audience Lab, July 2026 · featured in RMIT News',
    brief: [
      'A cooperative, body-tracked game made with RMIT × CODE. Two players guide an auto-running character through a retro, 90s Bryce-3D / vaporwave world — moving their bodies to shift platforms, build pathways, catch falls and get past obstacles.',
      'Mechanics such as character hand-overs and shared switches only work when players talk to each other, so the game turns strangers into teammates through spontaneous communication and shared decisions.',
      'I worked on the interactive systems and the ZED body-tracking calibration and workflow in Unity, and presented playable prototypes to the client through several rounds of playtesting.',
    ],
    videos: [
      { yt: 'xoOx65DJkKI', label: 'Project brief' },
      { yt: 'cjOGOTpVRsM', label: 'Gameplay' },
      { yt: 'P2bKVRuZt8A', label: 'Playtest 1' },
      { yt: 'IBHyRUvASA0', label: 'Playtest 2' },
      { yt: 'RlW1mBylGBg', label: 'Playtest 3' },
    ],
    links: [
      { label: 'ACMI Audience Lab', href: 'https://www.acmi.net.au/whats-on/acmi-rmit-audience-lab/jul-2026/' },
      { label: 'RMIT News', href: 'https://www.rmit.edu.au/news/all-news/2026/aug/digital-media-code-project' },
    ],
    gallery: [{ label: 'Process & design', n: 4 }, { label: 'At ACMI', n: 4 }],
    desc: 'A cooperative, body-tracked game exhibited at ACMI.',
    tags: ['Unity', 'ZED body tracking', 'Game design', 'Team project'] },

  { id: 'metro-morphosis', cat: 'interactive', title: 'Metro Morphosis', meta: 'Beyond 1 & 0 · RMIT Vietnam exhibition 2025',
    coverPos: '50% 18%', // keep the whole flower in the card crop
    tagline: 'Personalise the environment around you with AI-generated environments',
    year: '2025',
    role: 'Concept, AI workflow, 3D & AR development',
    tools: ['Open Art', 'Meshy', 'Blender', 'Unity AR'],
    exhibited: 'Beyond 1 & 0 — RMIT Vietnam Digital Media Exhibition, 2025',
    brief: [
      'Generative AI tends to over-generalise — this project uses that as a strength. Metro and subway maps from cities like Melbourne, Tokyo and Beijing are reimagined as living organisms and grown into glass-domed biospheres.',
      'Image-to-image AI produced the organism concepts, image-to-3D turned them into models, and everything was edited and composed in Blender before being brought into Unity’s AR template.',
      'The result is an AR app that lets visitors place and customise these speculative city ecosystems around them — a playful way into how cities grow and how urban planning works.',
    ],
    videos: [{ yt: 'dmx5_lZITjk', label: 'AR demo' }],
    // Interactive 3D models (Sketchfab). `thumb` = picture shown before the viewer loads.
    models: [
      { sketchfab: 'fd5d6312ca0a4cbc980a8d3d86d4a188', title: 'Melbourne in a biosphere', href: 'https://sketchfab.com/3d-models/melbourne-in-a-biosphere-fd5d6312ca0a4cbc980a8d3d86d4a188', thumb: media('projects/metro-morphosis/model-melbourne.jpg') },
      { sketchfab: '0e174023c86640c39447e6f25f000e94', title: 'Japan in a biosphere', href: 'https://sketchfab.com/3d-models/japan-in-a-biosphere-0e174023c86640c39447e6f25f000e94', thumb: media('projects/metro-morphosis/model-japan.jpg') },
      { sketchfab: '73b49e0ed7db4a2e867c23babf88f35f', title: 'Beijing in a biosphere', href: 'https://sketchfab.com/3d-models/beijing-in-a-biosphere-73b49e0ed7db4a2e867c23babf88f35f', thumb: media('projects/metro-morphosis/model-beijing.jpg') },
    ],
    gallery: [{ label: 'Research', n: 2 }, { label: 'Exhibition — Beyond 1 & 0', n: 13 }],
    desc: 'AI-grown city biospheres you can place around you in AR.',
    tags: ['AI workflow', 'Blender', 'Unity', 'AR'] },

  { id: 'introspective-exhibition', cat: 'interactive', title: 'Introspective Exhibition', meta: 'Virtual exhibition · Spatial.io',
    tagline: 'Transformative colour resonance environments',
    year: '2024',
    role: 'Environment design & curation',
    tools: ['Blender', 'Unity', 'Spatial.io'],
    brief: [
      'A virtual exhibition of my own works and research, which looks at how audiovisual design can create emotional resonance for the people experiencing it.',
      'Lighting leads visitors through the building and lays out the work in chronological order. Each level changes the building’s look through environment lighting and planning, so moving between floors feels like moving between moods.',
      'The goal was one coherent experience — where looking at the work and walking through the space tell the same story.',
    ],
    videos: [
      { yt: 'x1it-VlPQ04', label: 'Walkthrough' },
      { yt: 'C9nKksn8Wvg', label: 'Exhibition tour' },
    ],
    gallery: [{ label: 'Modelling the building', n: 4 }, { label: 'Lighting & levels in Unity', n: 4 }],
    desc: 'A virtual exhibition about colour, light and emotional resonance.',
    tags: ['Worldbuilding', 'Lighting', 'Curation'] },

  { id: 'musical-planet', cat: 'interactive', title: 'Musical Planet', meta: 'Interactive 3D instrument · Student Showcase',
    tagline: 'Music within your keyboards',
    year: '2024',
    role: 'Concept, 3D, interaction & sound',
    tools: ['Spline', 'Blender'],
    exhibited: 'Design (Digital Media) Student Work Showcase',
    brief: [
      'A gamified virtual instrument. Every key on a set keybind plays a different note, and each note changes the colour and shape of a 3D planet in real time.',
      'The project explores how sound and image can transform each other — the planet becomes a visual score of whatever the player performs. It was screened and played live at the Design (Digital Media) Student Work Showcase.',
    ],
    videos: [
      { yt: 'Y97bGL37BNw', label: 'Final piece' },
      { yt: 'bp0Gl5VLnvI', label: 'Prototype 1' },
      { yt: 'SGgawGYy4Qk', label: 'Prototype 2' },
      { yt: 'mWygChv12Xs', label: 'Prototype 3' },
      { yt: 'U3iGxSvSoeg', label: 'Prototype 4' },
    ],
    // Playable scene shown right under the brief.
    // After exporting in Spline (Export → Code → Vanilla JS), paste the ".splinecode" URL into `scene`.
    prototype: {
      label: 'Play it (Spline)',
      scene: '',
      embed: 'https://my.spline.design/untitled-e411a3c226d98c3168a86ca20b237777/',
      cover: media('projects/musical-planet/07.jpg'),
      cta: 'Play it here',
      hint: 'click, then press keys to make music · best on a laptop',
    },
    links: [{ label: 'Open in Spline', href: 'https://my.spline.design/untitled-e411a3c226d98c3168a86ca20b237777/' }],
    gallery: [{ label: 'Prototyping & sound', n: 11 }, { label: 'Student Showcase', n: 6 }],
    desc: 'A 3D planet you play like a keyboard.',
    tags: ['Spline', 'Audiovisual', 'Interaction'] },

  { id: 'game-about-changes', cat: 'interactive', title: 'A Game About Changes', meta: 'Explorable game world',
    tagline: 'Changes are good',
    year: '2023',
    role: 'Game & level design, illustration',
    tools: ['Unity', 'Procreate'],
    brief: [
      'An exploration of game-design ideas for building an immersive, interactive world. Players wander and discover the scenery on their own, guided by progressive lures, landmarks and sound rather than instructions.',
      'Hand-drawn concept art set the mood and the map of the playable area before the world was built in Unity.',
    ],
    videos: [{ yt: 'BDLyqqY5HFc', label: 'Playthrough' }],
    links: [{ label: 'Download the game', href: 'https://drive.google.com/drive/folders/115LUpK4piLGhrBcF0yUUiR-TOJv5LVZF' }],
    gallery: [{ label: 'Concept art', n: 4 }, { label: 'In the game', n: 2 }],
    desc: 'A small explorable world guided by landmarks and sound.',
    tags: ['Level design', 'Unity', 'Narrative'] },

  // ── UI / UX
  // gallery groups may set `max` = most images per row (phone screens fit more).
  { id: 'mcg-ar', cat: 'uiux', title: 'MCG AR Application', meta: 'Group spec project · Mobile UI/UX',
    tagline: 'Explore the rich history and cultural significance through a new lens',
    year: '2024',
    role: 'Wireframes, interaction design, sound design, 3D assets & project management',
    tools: ['Figma', 'Miro', 'Blender'],
    brief: [
      'A spec-work brief to design a mobile app for the Melbourne Cricket Ground (MCG) that raises audience engagement at its events. The team studied the MCG’s events, audiences, culture and history before designing anything.',
      'Three personas — a local footy family, a visiting fan and a long-time member — shaped a user journey map, which in turn drove the interaction design: an AR stadium map, upcoming games, live voting, a points-and-rewards system and a fan community.',
      'I worked on wireframes and interaction design from the journey map, sound design and 3D assets, and managed the group — assigning tasks by each member’s strengths and keeping the project on schedule.',
    ],
    videos: [{ yt: 'ocn6m2KfHjw', label: 'App demo' }],
    // Clickable prototype shown right under the brief.
    prototype: {
      label: 'Interactive prototype (Figma)',
      embed: 'https://embed.figma.com/proto/aZWhW5qSQTOSj8T2W2MSmM/DMS-2-A3-wireframes?node-id=645-40&p=f&viewport=247%2C131%2C0.19&scaling=scale-down&content-scaling=fixed&starting-point-node-id=645%3A40&page-id=0%3A1&embed-host=share',
      cover: media('works/mcg-ar.jpg'),
      cta: 'Try the prototype',
      hint: 'click through the app like you would on a phone',
    },
    gallery: [
      { label: 'Research & personas', n: 5 },
      { label: 'Wireframes, flow & style guide', n: 5 },
      { label: 'App screens', n: 7, max: 7 },
    ],
    desc: 'An AR companion app for MCG event-goers.',
    tags: ['User research', 'Personas', 'Figma', 'AR'] },

  { id: 'cashswipe', cat: 'uiux', title: 'CashSwipe', meta: 'Regenerative design · Banking app',
    tagline: 'Save your pay',
    year: '2025',
    role: 'Concept, UX & UI design, prototype',
    tools: ['Figma', 'Procreate'],
    brief: [
      'Tap-to-pay and buy-now-pay-later make spending effortless — which also makes impulse buying and overspending easy. CashSwipe is a regenerative design response that supports healthier money habits.',
      'Instead of a single tap, payments are made with digital cash: you swipe notes out of your wallet, so every purchase carries a moment of friction that makes you check your budget first.',
      'The project moved from paper sketches and scenario testing to a full brand style guide and a clickable Figma prototype covering cards, budgets, statistics and payment history.',
    ],
    videos: [{ yt: 'fllhBb0dISg', label: 'Prototype walkthrough' }],
    // Clickable prototype shown right under the brief.
    prototype: {
      label: 'Interactive prototype (Figma)',
      embed: 'https://embed.figma.com/proto/tgpiC25HyhKyRpEft6jlnI/Regenerative-design-A3-prototype?node-id=99-1850&viewport=113%2C1231%2C0.91&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&embed-host=share',
      cover: media('works/cashswipe.jpg'),
      cta: 'Try the prototype',
      hint: 'swipe and tap through it like a real banking app',
    },
    gallery: [
      { label: 'Sketches & style guide', n: 6, max: 6 },
      { label: 'App screens', n: 8, max: 8 },
    ],
    desc: 'A banking app that adds healthy friction to spending.',
    tags: ['Regenerative design', 'Figma', 'App UI'] },

  { id: 'pava', cat: 'uiux', title: 'PAVA', meta: 'Personal AI Voice Assistance',
    tagline: 'An AI that assists designers in what they already excel at',
    year: '2025',
    role: 'UX research, interaction design, audio-reactive visuals',
    tools: ['Figma', 'TouchDesigner'],
    brief: [
      'PAVA is a voice-based AI assistant for designers. An audio-reactive AI persona talks with the designer and responds to their voice with changes in sound and visuals, inviting them to collaborate rather than just prompt.',
      'The core idea is a feedback cycle: designers critically assess what the AI gives back and refine it. People bring creativity, empathy and human-centred thinking; the AI brings pattern recognition, error checking and fast idea generation.',
      'Personas and a user journey map defined the experience, wireframes and hi-fi screens shaped the app, and the AI persona itself was built as node-based, audio-reactive visuals in TouchDesigner.',
    ],
    videos: [{ yt: '8Gk0Nplkf4w', label: 'Demo' }],
    gallery: [
      { label: 'Research — personas & journey', n: 5 },
      { label: 'Wireframes & prototype', n: 3 },
      { label: 'AI persona — audio-reactive visuals', n: 4 },
    ],
    desc: 'A voice AI assistant that collaborates with designers.',
    tags: ['UX research', 'Voice UI', 'TouchDesigner'] },

  // ── 3D
  { id: 'digital-sunflower', cat: '3d', title: 'Digital Sunflower', meta: '3D · Compositing',
    desc: 'A chrome sunflower blooming inside a social feed — butterflies, heather and a phone-post frame composited into one surreal still.',
    tags: ['Blender', 'Compositing', 'Art direction'] },
  { id: 'ai-biospheres', cat: '3d', title: 'AI Biospheres', meta: 'Beyond 1 & 0 · Metro Morphosis',
    desc: 'Glass-domed city ecosystems — AI-generated concepts rebuilt as 3D assets for the Metro Morphosis exhibition piece.',
    tags: ['AI workflow', 'Blender', 'Render'] },
  { id: 'phonebooth-diorama', cat: '3d', title: 'Phonebooth Diorama', meta: '3D · Asset',
    desc: 'A stylised red phone booth diorama floating in a neon void — modelled, textured and presented as a full asset sheet.',
    tags: ['Modelling', 'Texturing', 'Asset sheet'] },
  { id: '3d-artworks', cat: '3d', title: '3D Artworks & Covers', meta: 'Cover art',
    desc: 'Album covers and standalone 3D pieces — chrome, neon and lo-fi texture for musicians and personal releases.',
    tags: ['Cover art', 'Blender'] },

  // ── Video
  { id: 'moon', cat: 'video', title: 'Moon', meta: 'Audiovisual · Live visuals',
    desc: 'A particle moon floating over a pulsing terrain — an audiovisual piece built across Blender, TouchDesigner and Magic Music Visuals, cut in Premiere with sound in Reaper.',
    tags: ['TouchDesigner', 'Blender', 'Premiere', 'Reaper'] },
  { id: 'flagstaff-magic', cat: 'video', title: 'Flagstaff Magic', meta: 'VFX · Compositing',
    desc: 'A cosmic portal lands in a city park — 3D elements tracked and composited into live-action footage.',
    tags: ['VFX', 'Tracking', '3D'] },
  { id: 'stones', cat: 'video', title: 'Stones', meta: 'Cinematic short',
    desc: 'A moody cinematic sequence around ancient stone figures in a misty forest.',
    tags: ['Cinematics', 'Lighting', 'Edit'] },
  { id: 'applecore', cat: 'video', title: 'APPLECORE', meta: 'Glitch motion',
    desc: 'A pixel-shattered apple in data-moshed colour — a short glitch motion piece.',
    tags: ['Motion', 'Glitch'] },
  { id: 'algorithms-of-disrespect', cat: 'video', title: 'Algorithms of Disrespect', meta: 'Experimental video',
    desc: 'An experimental moving-image piece, storyboarded and produced as a short.',
    tags: ['Storyboard', 'Video'] },

  // ── 2D
  { id: 'sko', cat: '2d', title: 'SKO Publication', meta: 'Editorial · Print',
    desc: 'Bold editorial spreads mixing chrome 3D renders with punchy graphic type.',
    tags: ['Editorial', 'Layout', '3D type'] },
  { id: 'lyka', cat: '2d', title: 'Lyka Campaign', meta: 'Advertising',
    desc: 'Playful out-of-home poster concepts for a Lyka advertising campaign.',
    tags: ['Campaign', 'OOH'] },
  { id: 'logo-identity', cat: '2d', title: 'Logo & Identity', meta: 'Personal brand',
    desc: 'A personal identity system — logo marks, colour variants and business cards.',
    tags: ['Logo', 'Identity'] },

  // ── Sound
  { id: 'cartoon-sound', cat: 'sound', title: 'Cartoon Sound Design', meta: 'Foley · SFX',
    desc: 'Full sound design for an animated clip — foley, effects and timing to picture.',
    tags: ['Foley', 'SFX', 'Mix'] },
  { id: 'earcons', cat: 'sound', title: 'Application Earcons', meta: 'UI sound',
    desc: 'Short interface sounds and alerts composed for product interactions.',
    tags: ['Earcons', 'Reaper'] },
  { id: 'music-creation', cat: 'sound', title: 'Music Creation', meta: 'Production',
    desc: 'Original music production and releases.',
    tags: ['Production'] },

  // ── Photography
  { id: 'street', cat: 'photo', title: 'Street', meta: 'Photography',
    desc: 'Graffiti, plastic sheeting and hard light — street frames shot on Fujifilm.',
    tags: ['Fujifilm', 'Street'] },
  { id: 'landscape', cat: 'photo', title: 'Landscape', meta: 'Photography',
    desc: 'Quiet skies, wires and lanterns — a landscape series.',
    tags: ['Landscape'] },
].map((w) => {
  // gallery: a number (one group) or [{ label, n }] groups; files are 01.jpg, 02.jpg… in order
  const groups = typeof w.gallery === 'number' ? [{ label: '', n: w.gallery }] : w.gallery || [];
  let k = 0;
  const galleryGroups = groups.map((g) => ({
    label: g.label,
    max: g.max,
    start: k,
    images: Array.from({ length: g.n }, () => media(`projects/${w.id}/${String(++k).padStart(2, '0')}.jpg`)),
  }));
  return {
    ...w,
    img: media(`works/${w.id}.jpg`),
    galleryGroups,
    gallery: galleryGroups.flatMap((g) => g.images),
  };
});

// Playground — cover art & personal pieces (@brandon_made).
// Files live in /public/media/playground/<id>.jpg. Order = order in the strip.
export const art = [
  { id: 'toxins-antidote', title: 'Toxins Antidote' },
  { id: 'fall-in-love', title: 'Fall In Love — The Heart Pt.8' },
  { id: 'stop-waiting', title: 'Stop Waiting For A Sign' },
  { id: 'encore', title: "We Gon' Do This For The Encore" },
  { id: 'no-cap', title: 'No Cap' },
  { id: 'the-heart-pt9', title: 'The Heart Pt.9' },
  { id: 'fractures', title: 'Fractures' },
  { id: 'those-who-kill', title: 'Those Who Kill' },
  { id: 'to-be-continued', title: 'To Be Continued 未完待續' },
  { id: 'ill-live-forever', title: "I'll Live Forever" },
  { id: 'dont-stay-alone', title: "Don't Stay Alone" },
  { id: 'power-sugar', title: '7× Power, 1× Sugar' },
  { id: 'aurora', title: 'Aurora — The Heart' },
  { id: 'iwantuloveme', title: 'iwantuloveme' },
  { id: 'broken-world', title: 'Broken World' },
  { id: 'get-away', title: 'Get Away' },
  { id: '40k', title: '40K' },
  { id: 'those-who-kill-planet', title: 'Those Who Kill (Planet)' },
  { id: 'sunflower', title: 'Sunflower' },
  { id: 'those-who-kill-planet-2', title: 'Those Who Kill (Planet II)' },
].map((a) => ({ ...a, img: media(`playground/${a.id}.jpg`) }));

// Resume timeline (keep in sync with the PDF in /public/resume)
export const experience = [
  { when: 'Aug 2026 — Now', role: 'Video Editor / Account Manager', org: 'Brand Asia', where: 'Melbourne',
    points: ['Social-first content for Helly Hansen, Berkowitz and CherryHill Orchards — 736K+ impressions across 44 posts.', 'Bilingual short-form video and visual assets for RedNote audiences.'] },
  { when: 'Jul — Nov 2025', role: 'UI/UX Designer', org: 'Trackday', where: 'Melbourne',
    points: ['Redesigned website interfaces in Figma with designers and the Product Lead.', 'User research, usability testing and iteration in agile design reviews.'] },
  { when: 'Jul 2023 — Nov 2025', role: 'Publication Manager', org: 'RMIT Chinese Students & Scholars Association', where: 'Melbourne',
    points: ['Ran content for an official WeChat account with 12,000+ followers.', 'Designed campaign and sponsor materials, up to 800+ views per post.'] },
  { when: 'Oct — Dec 2023', role: 'Marketing Content Creator', org: 'iQiYi North America', where: 'Remote',
    points: ['Short-form promo videos for TikTok and Xiaohongshu across 5 campaigns.', 'Cross-platform concepts for international student audiences.'] },
];

export const education = {
  when: '2023 — 2026',
  title: 'Bachelor of Design (Digital Media)',
  org: 'RMIT University',
  points: ['Selected for RMIT Vietnam Digital Media Exhibition (2025)', 'Selected for RMIT Digital Media Showcase (2026)'],
};

export const highlights = [
  { when: '2026 — Now', title: 'Volkswagen Car Brain Challenge', note: 'AI-driven vehicle-to-human interaction concepts' },
  { when: '2026', title: 'Bob Rush — RMIT × CODE', note: 'Body-tracked cooperative game' },
  { when: '2025', title: 'Beyond 1 & 0', note: 'RMIT Vietnam Digital Media Exhibition' },
];
