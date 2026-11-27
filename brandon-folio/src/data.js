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
// Shown first, in the Selected Works section above About (ids from `works` below).
export const selectedWorks = ['bob-rush', 'cavi', 'metro-morphosis', 'musical-planet'];

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
    gallery: [{ label: 'Concept art', n: 4, max: 4 }, { label: 'In the game', n: 2 }],
    desc: 'A small explorable world guided by landmarks and sound.',
    tags: ['Level design', 'Unity', 'Narrative'] },

  // ── UI / UX
  // gallery groups may set `max` = most images per row (phone screens fit more).
  { id: 'cavi', cat: 'uiux', title: 'CAVI', meta: 'In-car UX · Volkswagen Car Brain Challenge',
    tagline: 'The first car that learns the driver',
    year: '2026',
    role: 'Team project — UX research, personas & interface design',
    exhibited: 'Volkswagen Car Brain Challenge, RMIT University',
    brief: [
      'A concept for Volkswagen’s Car Brain Challenge. Today the car has a great memory for itself, but not for the people inside it: new owners are overwhelmed by settings before they’ve driven a kilometre, passengers are invisible to the system, and preferences are recorded once and never updated.',
      'CAVI is a context-aware in-car assistant that learns through use instead of setup. It recognises every occupant and their role, builds preferences passively across trips with consent-based memory that stays visible and editable, and generates the right interface for the right person — suppressing prompts when the driver is stressed or busy.',
      'We mapped who rides in the car with eight personas, planned an onboarding journey from Day 0 at the showroom to a fully personalised experience after Day 30, and designed the centre display and HUD, a context ontology linking sensor inputs to UI outputs, the hardware spec and a cloud architecture.',
    ],
    videos: [{ yt: 'P_ryT3-WjZw', label: 'Concept video' }],
    gallery: [
      { label: 'Workshops & team', n: 4, max: 4 },
      { label: 'Problem & concept', n: 6 },
      { label: 'Personas', n: 8, max: 4 },
      { label: 'System & interface', n: 6 },
    ],
    desc: 'A Volkswagen car assistant that learns every occupant through use, not setup.',
    tags: ['UX research', 'In-car UI', 'Personas'] },

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
  { id: 'digital-sunflower', cat: '3d', title: 'Digital Sunflower', meta: '3D environment · Blender',
    tagline: "I'll Live Forever",
    year: '2024',
    role: 'Concept, 3D modelling, lookdev & animation',
    tools: ['Blender', 'Procreate'],
    brief: [
      'A rendered environment prototype about the artificial nature of digital assets — a chrome sunflower that will never wilt, blooming inside a social-media post.',
      'The flower started as a hand-drawn sketch, then the sunflower, the phone frame and the heather field were built in Blender, with particle plugins scattering the plants and butterflies.',
      'Keyframed sun movement drives a day-and-night cycle, so the scene works as a living environment rather than a single still.',
    ],
    videos: [{ yt: '2-VGhc7fL40', label: 'Day & night cycle' }],
    gallery: [
      { label: 'Final renders', n: 6 },
      { label: 'Process — sketch to Blender', n: 7 },
    ],
    desc: 'A chrome sunflower that will never wilt.',
    tags: ['Blender', 'Particles', 'Animation'] },

  { id: 'phonebooth-diorama', cat: '3d', title: 'Phonebooth Diorama', meta: '3D asset · Autodesk Maya',
    tagline: 'On the other side',
    role: 'Modelling, texturing, animation & lighting',
    tools: ['Autodesk Maya'],
    brief: [
      'A fantasy reinterpretation of a classic red phone booth, presented as a game-ready diorama.',
      'Everything — modelling, UVs and texturing, animation and lighting — was done in Maya, and documented in asset sheets with orthographic views, model progress, art-style references and texture maps.',
    ],
    models: [
      { sketchfab: '56f6c8fa708144198ca3a0aeec08f3d9', title: 'Phonebooth diorama', href: 'https://sketchfab.com/3d-models/phonebooth-diorama-56f6c8fa708144198ca3a0aeec08f3d9', thumb: media('works/phonebooth-diorama.jpg') },
    ],
    gallery: [{ label: 'Asset sheets', n: 3 }],
    desc: 'A fantasy phone booth diorama modelled in Maya.',
    tags: ['Maya', 'Modelling', 'Texturing'] },

  { id: '3d-artworks', cat: '3d', title: '3D Artworks & Covers', meta: 'Cover art · Mixed media',
    tagline: 'Mixed media cover art',
    year: '2023 — 2025',
    role: 'Art direction, 3D, illustration & typography',
    tools: ['Blender', 'Procreate', 'Photoshop'],
    brief: [
      'Single and album covers made by mixing 3D renders with hand-drawn type, illustration and collage — a running series under the Brandon Made signature.',
      'Each piece starts as a 3D scene in Blender (a subway carriage, a vending machine, a floating planet) that is then painted over and lettered by hand, so every cover feels half rendered, half drawn.',
    ],
    links: [{ label: 'More on ArtStation', href: 'https://www.artstation.com/brandon93/albums/9626122' }],
    gallery: [
      { label: 'Covers', n: 12, max: 4 },
      { label: 'Process in Blender', n: 10 },
    ],
    desc: 'Cover art mixing 3D renders with hand-drawn type.',
    tags: ['Cover art', 'Blender', 'Mixed media'] },

  // ── Video
  { id: 'stones', cat: 'video', title: 'Stones', meta: '360° video · Team short',
    tagline: 'Each stone marks a significant spot in human history',
    year: '2024',
    role: 'Filming, edit, grade & sound',
    tools: ['360 camera', 'Insta360 Studio', 'Google Earth Studio', 'Premiere Pro', 'Reaper'],
    brief: [
      'A one-minute team film shot on a 360 camera. Each “stone” marks a place where something significant happened in human history.',
      'The final cut centres on the Shrine of Remembrance in Melbourne — flying in with Google Earth Studio, then moving through 360 footage reframed in Insta360 Studio. It was composed and colour-graded in Premiere Pro, with the soundscape built in Reaper.',
    ],
    videos: [
      { yt: 'WgcYBNQ_qiU', label: 'Final film' },
      { yt: 'STn6x4qry_s', label: 'Prototype' },
    ],
    gallery: [{ label: 'Process', n: 6 }],
    desc: 'A one-minute 360° film around the Shrine of Remembrance.',
    tags: ['360 video', 'Premiere', 'Reaper'] },

  { id: 'moon', cat: 'video', title: 'Moon', meta: 'Audiovisual · Big-screen screening',
    tagline: 'I watch the moon, let it run my mood',
    year: '2024',
    role: 'Sound, visuals & edit',
    tools: ['Blender', 'TouchDesigner', 'Magic Music Visuals', 'Premiere Pro', 'Reaper', 'GarageBand'],
    brief: [
      'An experiment in syncing sound and image so the audience feels the piece more deeply. Shifts in colour — hue, saturation and lightness — are mapped to the audio: tone, frequency, pitch and volume.',
      'It is emotion-centred design, built on the personal links both designer and viewer have with colour. The visuals came together across Blender, TouchDesigner and Magic Music Visuals, were tested on the big screen, refined from audience feedback, then screened.',
    ],
    videos: [
      { yt: 'F4k2-3qYNiM', label: 'Final piece' },
      { yt: 'Lz0pQc11n3M', label: 'Prototype 1' },
      { yt: '859vMRUP7DA', label: 'Prototype 2' },
      { yt: '1Om-gS4DJz0', label: 'Prototype 3' },
      { yt: 'Oi2hLlkGaH8', label: 'Screening presentation' },
    ],
    gallery: [{ label: 'Building sound & visuals', n: 11 }, { label: 'Testing & screening', n: 4 }],
    desc: 'Colour mapped to sound — an audiovisual moon for the big screen.',
    tags: ['TouchDesigner', 'Blender', 'Audiovisual'] },

  { id: 'flagstaff-magic', cat: 'video', title: 'Flagstaff Magic', meta: '360° / POV video · Mixed reality',
    tagline: 'Embody yourself within a world of mixed realities',
    year: '2024',
    role: 'Characters, VFX & colour grade',
    tools: ['Illustrator', 'After Effects', 'Premiere Pro', 'Sketchfab'],
    brief: [
      'An exploration of immersion and presence in video: 360° and POV films that bring 2D animation into real 3D environments, so the viewer feels placed inside a world of mixed realities.',
      '2D characters were drawn in Illustrator and keyframe-animated over 360 footage. With the After Effects 3D camera tracker, 3D assets from Sketchfab were placed, scaled and animated in Flagstaff Gardens, then the footage was colour-graded and screened in an immersive room.',
    ],
    videos: [
      { yt: 'DS73ME7Z-7E', label: 'Final piece' },
      { yt: 'a0C8VaK-lks', label: 'Prototype 1' },
      { yt: 'l6cVz8eOt4Y', label: 'Prototype 2' },
    ],
    gallery: [
      { label: 'Characters in Illustrator', n: 4, max: 4 },
      { label: 'Tracking & 3D assets', n: 8 },
      { label: 'Colour grade — before & after', n: 4, max: 2 },
      { label: 'Screening', n: 5 },
    ],
    desc: '2D characters and 3D assets tracked into 360° park footage.',
    tags: ['360 video', 'After Effects', 'VFX'] },

  { id: 'applecore', cat: 'video', title: 'APPLECORE', meta: 'Collaborative video',
    tagline: 'What happens behind digital media technologies',
    role: 'Collaboration',
    brief: [
      'A collaborative short that looks at what happens behind the digital media technologies we use every day.',
    ],
    videos: [{ yt: '9xiWdVkCIOM', label: 'Final video' }],
    desc: 'A collaborative short on what happens behind digital media.',
    tags: ['Motion', 'Glitch'] },

  { id: 'algorithms-of-disrespect', cat: 'video', title: 'Algorithms of Disrespect', meta: 'Social campaign video',
    tagline: 'Learn the hidden trends of disrespect before they lead to violence',
    brief: [
      'Social media algorithms reward provocative, polarising content — so young Australians can be exposed every day to disrespect and attitudes that support violence, shaping how they think and act as they grow up.',
      'Inspired by the Stop it at the Start campaign, the piece shows how toxic content spills over onto adolescents, and asks adults to reflect on their own attitudes and talk with young people about respect.',
    ],
    videos: [
      { yt: '6K8LBn14CIs', label: 'Main video' },
      { yt: '8xhMKO8em3s', label: 'Prototype 1' },
      { yt: 'u2lSTTy6QCM', label: 'Prototype 2' },
    ],
    links: [{ label: 'Stop it at the Start', href: 'https://www.respect.gov.au/' }],
    gallery: [{ label: 'Storyboard', n: 1 }],
    desc: 'How algorithms feed disrespect to young people — a campaign short.',
    tags: ['Campaign', 'Storyboard'] },

  { id: 'music-visualisers', cat: 'video', title: 'Music Visualisers', meta: 'Cover art & visualisers · Freelance',
    tagline: 'Working with indie artists to produce cover art and visualisers for music albums or singles',
    role: 'Freelance cover art & visualiser designer',
    brief: [
      'Two separate freelance releases for independent artists. For each single I designed both the cover art and the visualiser video.',
      '折磨 Part 2: a dripping neon heart and glitchy purple textures, carried from the cover into the moving visualiser.',
      '11-3: a hand-drawn stationery world, from the single cover to the visualiser.',
    ],
    videoLayout: 'side-by-side', // two separate pieces: both videos at the top
    videos: [
      { yt: '6oNCthWsSvM', label: '折磨 Part 2' },
      { yt: '0Ky1KfL_ll8', label: '11-3' },
    ],
    gallery: [{ label: 'Cover art', n: 2 }],
    desc: 'Cover art and visualisers for indie music releases.',
    tags: ['Visualiser', 'Cover art', 'Freelance'] },

  // ── 2D
  { id: 'sko', cat: '2d', title: 'SKO Publication', meta: 'Publication design',
    tagline: 'Publication inspired by videogame UI/UX',
    role: 'Layout, graphic & 3D design',
    tools: ['InDesign', 'Illustrator', 'Blender'],
    brief: [
      'A publication laid out like a videogame interface — chapter screens, menus and HUD-style labels guide the reader through three chapters: Contextualise, Reflect and Propose.',
      'It brings my digital-media specialism together with graphic design, mixing 3D renders and editorial layout into one engaging, mixed-medium piece built from skills carried across disciplines.',
    ],
    gallery: [
      { label: 'Printed mockups', n: 3 },
      { label: 'Spreads', n: 9 },
    ],
    desc: 'A publication laid out like a videogame UI.',
    tags: ['Editorial', 'Layout', '3D type'] },

  { id: 'lyka', cat: '2d', title: 'Lyka Campaign', meta: 'Advertising campaign',
    tagline: 'We know the secret to long-living dogs',
    role: 'Concept & poster design',
    tools: ['Illustrator'],
    brief: [
      'An advertising campaign for Lyka, a dog-food brand.',
      'The posters show well-loved cartoon dogs grown old — with a walker, a wheelchair and a cane — to land the line “We know the secret to long-living dogs”.',
    ],
    gallery: [{ label: 'Posters', n: 3 }],
    desc: 'Poster campaign for Lyka dog food.',
    tags: ['Campaign', 'OOH'] },

  { id: 'logo-identity', cat: '2d', title: 'Logo & Identity', meta: 'Personal identity · Stationery',
    role: 'Logo & identity design',
    tools: ['Illustrator'],
    brief: [
      'My own logo and the stationery set built around it. It started from three mood boards — career, introspection and style — that pull together my work, my photos and the visual language I keep returning to.',
      'From there came business cards, letterhead and print-ready sheets, with colour specs for both CMYK and RGB.',
    ],
    gallery: [
      { label: 'Mood boards', n: 3 },
      { label: 'Business cards', n: 6 },
      { label: 'Stationery & colour', n: 4, max: 4 },
    ],
    desc: 'A personal logo with business cards and stationery.',
    tags: ['Logo', 'Identity'] },

  // ── Sound
  { id: 'earcons', cat: 'sound', title: 'Application Earcons', meta: 'UI sound · Cooking app',
    tagline: 'C.H.E.F — Cook At Home, Eat The Food',
    year: '2023',
    role: 'Sound design',
    tools: ['Reaper', 'MIDI', 'Field recording'],
    brief: [
      'Four sound cues for a cooking app. Each earcon is short and punchy, built on rhythm and percussion so it feels like a small celebration — rewarding users and keeping them absorbed while they cook.',
      'Kitchen utensils were recorded as source material, then arranged into rhythmic patterns with MIDI in Reaper and shaped with pitch shifting and reverb, keeping every cue brief so it stays clear inside the app.',
    ],
    videos: [{ yt: 'hFjLpSS4gAc', label: 'Earcons demo' }],
    gallery: [{ label: 'Process', n: 5 }],
    desc: 'Four celebratory sound cues for a cooking app.',
    tags: ['Earcons', 'Reaper'] },

  { id: 'music-creation', cat: 'sound', title: 'Music Creation', meta: 'Original music',
    tagline: 'Feel',
    role: 'Writing & production',
    videos: [
      { yt: 'DQkwHwo2Mlw', label: 'Track 1' },
      { yt: 'cUAOtSx9XzQ', label: 'Track 2' },
      { yt: '3sm2KzawWWw', label: 'Track 3' },
      { yt: 'X7KJSslUUw8', label: 'Track 4' },
    ],
    desc: 'Original music production and releases.',
    tags: ['Production'] },

  { id: 'cartoon-sound', cat: 'sound', title: 'Cartoon Sound Design', meta: 'Sound for animation',
    tagline: 'Little Red Riding Hood: Under The Hood',
    year: '2023',
    role: 'Sound design',
    tools: ['Reaper', 'MIDI', 'Recorded SFX'],
    brief: [
      'Full sound design for a two-minute animation, made to heighten what is on screen.',
      'It puts synchresis, point of audition and diegetic vs non-diegetic sound into practice — original MIDI combined with recorded effects that were reshaped in Reaper, building to an increasingly intense, dramatic atmosphere.',
    ],
    videos: [{ yt: 'oXpIXt_1z1E', label: 'Final cut' }],
    gallery: [{ label: 'Process in Reaper', n: 4 }],
    desc: 'Sound design for a two-minute Little Red Riding Hood animation.',
    tags: ['Foley', 'SFX', 'Mix'] },

  // ── Photography
  { id: 'landscape', cat: 'photo', title: 'Landscape', meta: 'Photography · Fujifilm X-T5',
    tagline: 'Lend you my eyes',
    tools: ['Fujifilm X-T5', 'Lightroom'],
    brief: [
      'Coastlines, rivers, bridges and city skylines from my travels — quiet moments of light and colour, shot on a Fujifilm X-T5 and edited in Lightroom.',
    ],
    gallery: [{ label: 'Series', n: 18 }],
    desc: 'Coastlines, bridges and skylines from my travels.',
    tags: ['Landscape', 'Fujifilm'] },
  { id: 'street', cat: 'photo', title: 'Street', meta: 'Photography · Fujifilm X-T5',
    tagline: 'Lend you my eyes',
    tools: ['Fujifilm X-T5', 'Lightroom'],
    brief: [
      'Graffiti, plastic sheeting, night light and city crossings — street frames shot on a Fujifilm X-T5 and edited in Lightroom.',
    ],
    gallery: [{ label: 'Series', n: 6 }],
    desc: 'Graffiti, plastic sheeting and hard light — street frames shot on Fujifilm.',
    tags: ['Street', 'Fujifilm'] },
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
