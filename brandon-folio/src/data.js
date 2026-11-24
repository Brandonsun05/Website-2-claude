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
  { id: 'bob-rush', cat: 'interactive', title: 'Bob Rush', meta: 'RMIT × CODE · Major project 2026',
    desc: 'A cooperative 2D platformer built for a real client brief about “awkward encounters and beautiful moments”. ZED body-tracking is wired into Unity so players move the game with their bodies. I worked on interactive systems, calibration and tracking workflows, and presented playable prototypes to the client.',
    tags: ['Unity', 'ZED body tracking', 'Game design', 'Team project'] },
  { id: 'metro-morphosis', cat: 'interactive', title: 'Metro Morphosis', meta: 'Beyond 1 & 0 · RMIT Vietnam exhibition 2025',
    desc: 'An experimental project on urban planning and city growth. AI-generated concept imagery became interactive 3D environments in Blender and Unity, with an AR experience that lets visitors customise speculative city ecosystems in real time. Selected for the RMIT Vietnam Digital Media Exhibition.',
    tags: ['AI workflow', 'Blender', 'Unity', 'AR'] },
  { id: 'introspective-exhibition', cat: 'interactive', title: 'Introspective Exhibition', meta: 'Virtual gallery',
    desc: 'A pastel, dream-like virtual gallery with floating sculptures and an explorable exhibition space.',
    tags: ['Worldbuilding', 'Real-time', 'Curation'] },
  { id: 'game-about-changes', cat: 'interactive', title: 'A Game About Changes', meta: 'Game world',
    desc: 'A small explorable world about change — torii gates, low-poly landscapes and environmental storytelling.',
    tags: ['Level design', 'Narrative'] },

  // ── UI / UX
  { id: 'mcg-ar', cat: 'uiux', title: 'MCG AR Application', meta: 'AR app concept',
    desc: 'An AR companion app concept for the MCG: personas, rough wireframes, a style guide and hi-fi screens for maps, voting, rewards and community.',
    tags: ['User research', 'Personas', 'Figma', 'AR'] },
  { id: 'pava', cat: 'uiux', title: 'PAVA', meta: 'Personal AI Voice Assistance',
    desc: 'UX research and interface design for a friendly personal AI voice assistant.',
    tags: ['UX research', 'Voice UI', 'Prototype'] },
  { id: 'cashswipe', cat: 'uiux', title: 'CashSwipe', meta: 'Brand + app UI',
    desc: 'Identity and app interface for a regenerative finance app.',
    tags: ['Branding', 'App UI'] },

  // ── 3D
  { id: 'digital-sunflower', cat: '3d', title: 'Digital Sunflower', meta: '3D · Compositing',
    desc: 'A chrome sunflower blooming inside a social feed — butterflies, heather and a phone-post frame composited into one surreal still.',
    tags: ['Blender', 'Compositing', 'Art direction'] },
  { id: 'ai-biospheres', cat: '3d', title: 'AI Biospheres', meta: 'Beyond 1 & 0 · Metro Morphosis',
    desc: 'Glass-domed city ecosystems — AI-generated concepts rebuilt as 3D assets for the Metro Morphosis exhibition piece.',
    tags: ['AI workflow', 'Blender', 'Render'] },
  { id: 'musical-planet', cat: '3d', title: 'Musical Planet', meta: '3D · Live performance',
    desc: 'A glowing ringed planet rendered for a live music set — designed in Blender and projected behind the performer.',
    tags: ['Blender', 'Projection', 'Lighting'] },
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
].map((w) => ({ ...w, img: media(`works/${w.id}.jpg`) }));

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
