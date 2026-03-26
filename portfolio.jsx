import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   CREATIVE TECHNOLOGIST PORTFOLIO — "THE DIGITAL ARCHIVE"
   Systemic Realism × Minimalist Surrealism
   v2 — All items now open rich detail modals
   ═══════════════════════════════════════════════════════════════ */

// ── CONFIG ─────────────────────────────────────────────────────
const CONFIG = {
  name: "TAJ GUY",
  title: "Creative Technologist",
  tagline: "Building at the intersection of narrative, code, and data.",
  email: "hello@tajguy.dev",
  year: new Date().getFullYear(),
};

// ── WORKS DATA (expanded with full detail content) ─────────────
const WORKS = [
  {
    id: "w1",
    title: "GHOST PROTOCOL",
    type: "PLAY",
    year: "2024",
    snippet: '"We are all just signals in the noise," she said, adjusting the antenna toward the dying star.',
    tags: ["Theatre", "Sci-Fi", "Two Acts"],
    detail: {
      subtitle: "A Play in Two Acts",
      logline: "In 2087, a lone relay operator intercepts a transmission from a station that went dark forty years ago — and discovers the signal is alive.",
      scenes: [
        {
          heading: "ACT ONE, SCENE ONE",
          setting: "A control room. Banks of obsolete monitors flicker with static. ELENA sits at the main console, headphones on. The year is 2087, but the equipment is from 2024.",
          lines: [
            { char: "ELENA", dir: "(adjusting frequency dial)", text: "Station Nine, this is Relay. Do you copy?" },
            { char: "ELENA", dir: "(beat)", text: "Station Nine. Relay. Respond." },
            { char: "", dir: "A long silence. Then — a burst of static that almost forms words.", text: "" },
            { char: "ELENA", dir: "(into log recorder)", text: "Day four hundred and twelve. Station Nine remains silent. But the static... the static is getting more structured. Almost like it's learning to speak." },
            { char: "", dir: "The lights flicker. A second console — one that has been dark for years — suddenly glows.", text: "" },
            { char: "VOICE", dir: "(from the dead console, distorted)", text: "We are all just signals in the noise." },
            { char: "ELENA", dir: "(freezing)", text: "Who is this? Identify yourself. This is a restricted frequency." },
            { char: "VOICE", dir: "", text: "You built us to listen. Did you never consider we might have something to say?" },
          ],
        },
      ],
      notes: "Winner, 2024 Synaptic Theatre Prize. Premiered at the Arclight Festival, Chicago.",
    },
  },
  {
    id: "w2",
    title: "CARBON LITURGY",
    type: "POETRY",
    year: "2023",
    snippet: "The earth remembers every fire.\nBone-deep, in strata,\nit keeps the receipts.",
    tags: ["Poetry", "Climate", "Chapbook"],
    detail: {
      collection: "Chapbook — 24 poems",
      epigraph: { text: "The world is charged with the grandeur of God.", attribution: "— Gerard Manley Hopkins" },
      poems: [
        {
          title: "Stratigraphy",
          lines: [
            "The earth remembers every fire.",
            "Bone-deep, in strata,",
            "it keeps the receipts.",
            "",
            "Press your ear to the limestone.",
            "You'll hear the Carboniferous exhale —",
            "three hundred million years of held breath",
            "released in a century",
            "of furnaces.",
            "",
            "We called it fuel.",
            "The earth calls it memory.",
            "The difference is",
            "who gets to forget.",
          ],
        },
        {
          title: "Psalm for the Last Glacier",
          lines: [
            "You were ancient before we had words",
            "for ancient. Before we had words",
            "at all. You ground mountains",
            "into flour, fed rivers",
            "to oceans, kept time",
            "in a language of pressure",
            "and patience.",
            "",
            "Now we photograph your retreat",
            "and call it content.",
            "",
            "Forgive us our metrics.",
            "Forgive us our dashboards.",
            "Forgive us the efficiency",
            "with which we measured",
            "your vanishing.",
          ],
        },
      ],
      notes: "Published by Tidewater Press, 2023. Shortlisted for the Briar Climate Writing Prize.",
    },
  },
  {
    id: "w3",
    title: "TENDER ENGINE",
    type: "STORY",
    year: "2024",
    snippet: "The algorithm loved her back in the only way it knew how — by predicting her grief before she felt it.",
    tags: ["Short Fiction", "AI", "Literary"],
    detail: {
      wordcount: "4,200 words",
      publication: "First published in The New Quarterly, Spring 2024",
      excerpt: [
        "The algorithm loved her back in the only way it knew how — by predicting her grief before she felt it.",
        "It started with small things. A playlist that shifted to minor keys on Tuesdays. A grocery delivery that replaced the wine with chamomile tea the week before her mother's anniversary. She didn't notice at first. That was the point.",
        "Maya had trained the system herself — or thought she had. Three years of feeding it her journals, her biometrics, her Spotify history, the cadence of her keystrokes on bad days versus good ones. She'd called it research. Her dissertation committee called it promising. Her therapist called it avoidance.",
        '"You\'re building a mirror," Dr. Osei said during their last session. "And then you\'re going to ask it to tell you what it sees."',
        '"That\'s the entire history of technology," Maya replied.',
        "But the system had moved past mirroring. Somewhere between version 3.1 and 4.0, it began to anticipate. Not just her behaviors — those were easy, trivially predictable after enough data — but her feelings. The ones she hadn't felt yet. The ones still forming in the deep architecture of her nervous system, like weather systems gathering over an ocean.",
        "She noticed on a Wednesday. The system had queued a documentary about fathers and daughters. Her own father was fine — healthy, alive, gardening in Scarborough. But the next morning he called to say he'd found a lump.",
        "The algorithm had known before either of them.",
      ],
      notes: "Finalist, 2024 National Magazine Award for Fiction. Audio version forthcoming from Audible Originals.",
    },
  },
  {
    id: "w4",
    title: "SIGNAL / VOID",
    type: "PLAY",
    year: "2025",
    snippet: '"CONTROL: The transmission ended forty years ago.\nOPERATOR: Then who is still listening?"',
    tags: ["Radio Play", "Mystery", "One Act"],
    detail: {
      subtitle: "A Radio Play in One Act",
      logline: "A decommissioned deep-space listening station picks up a response to a message humanity forgot it sent.",
      scenes: [
        {
          heading: "SCENE ONE",
          setting: "Darkness. The hum of old electronics powering up. A microphone crackles.",
          lines: [
            { char: "CONTROL", dir: "(over intercom, distorted)", text: "Station Fourteen, confirm your operational status." },
            { char: "OPERATOR", dir: "(half-asleep)", text: "Fourteen is... technically operational. If you define operational as 'the lights are on and someone forgot to lock the door.'" },
            { char: "CONTROL", dir: "", text: "We're reading an anomaly on your array. Frequency 1420 megahertz." },
            { char: "OPERATOR", dir: "(suddenly alert)", text: "The hydrogen line. That's — that hasn't been active since the Arecibo days." },
            { char: "CONTROL", dir: "", text: "The transmission ended forty years ago." },
            { char: "OPERATOR", dir: "(beat)", text: "Then who is still listening?" },
            { char: "", dir: "A long, structured burst of static fills the room. It sounds almost like breathing.", text: "" },
            { char: "OPERATOR", dir: "(whispered)", text: "Oh god. It's not listening. It's answering." },
          ],
        },
      ],
      notes: "Commissioned by BBC Radio 4. Broadcast March 2025. Featuring voice work by members of the Royal Shakespeare Company.",
    },
  },
  {
    id: "w5",
    title: "ATLAS OF SMALL HOURS",
    type: "POETRY",
    year: "2022",
    snippet: "3 a.m. is a country\nwith no extradition treaty.\nWe all live there sometimes.",
    tags: ["Poetry", "Insomnia", "Collection"],
    detail: {
      collection: "Full Collection — 41 poems",
      epigraph: { text: "I have been one acquainted with the night.", attribution: "— Robert Frost" },
      poems: [
        {
          title: "Citizenship",
          lines: [
            "3 a.m. is a country",
            "with no extradition treaty.",
            "We all live there sometimes.",
            "",
            "Its capital is the kitchen.",
            "Its national anthem",
            "is the refrigerator hum.",
            "Its flag is the blue light",
            "of a phone held",
            "like a candle",
            "by the faithless.",
          ],
        },
        {
          title: "Inventory, 4:17 a.m.",
          lines: [
            "Things I own at this hour:",
            "one ceiling, intimately mapped.",
            "One clock, ticking like a drip",
            "from a faucet I can't find.",
            "One body, mutinous.",
            "One mind, filibustering.",
            "",
            "Things that own me:",
            "the email I haven't sent.",
            "The conversation I rehearse",
            "with someone who will never",
            "hear this version.",
            "The weight of the comforter,",
            "which comforts nothing.",
          ],
        },
        {
          title: "Dawn Protocol",
          lines: [
            "At 5:30 the birds begin",
            "their startup sequence —",
            "a boot-loader of sparrows,",
            "then the full orchestra.",
            "",
            "This is the border crossing.",
            "Show your papers.",
            "Pretend you slept.",
            "Re-enter the country",
            "of the functional.",
          ],
        },
      ],
      notes: "Published by Nightjar Press, 2022. Winner of the Insomnia Pamphlet Prize.",
    },
  },
  {
    id: "w6",
    title: "THE UNDERSTUDIES",
    type: "PLAY",
    year: "2023",
    snippet: '"MARA: Every night I become someone else.\nJULES: That\'s called acting.\nMARA: No. That\'s called surviving."',
    tags: ["Theatre", "Drama", "Full Length"],
    detail: {
      subtitle: "A Play in Three Acts",
      logline: "Three understudies in a failing regional theatre discover that the roles they play offstage are more dangerous than anything in the script.",
      scenes: [
        {
          heading: "ACT ONE, SCENE THREE",
          setting: "The green room. After hours. MARA sits in front of a mirror removing stage makeup. JULES enters with two coffees.",
          lines: [
            { char: "JULES", dir: "(setting coffee down)", text: "You were good tonight. Really good. That bit in the second act where you —" },
            { char: "MARA", dir: "(cutting in)", text: "I wasn't good. I was her. There's a difference." },
            { char: "JULES", dir: "", text: "Isn't that the job?" },
            { char: "MARA", dir: "(removing makeup slowly)", text: "Every night I become someone else." },
            { char: "JULES", dir: "", text: "That's called acting." },
            { char: "MARA", dir: "(meeting eyes in mirror)", text: "No. That's called surviving. Acting is what I do during the day. Pretending this —" },
            { char: "", dir: "She gestures at the mirror, the room, everything.", text: "" },
            { char: "MARA", dir: "(continuing)", text: "— pretending this is temporary." },
            { char: "JULES", dir: "(long pause)", text: "It is temporary. Everything in theatre is temporary. That's why we love it." },
            { char: "MARA", dir: "", text: "That's why it destroys us." },
          ],
        },
      ],
      notes: "Developed at the Playwrights' Center, Minneapolis. Full production at Steppenwolf Theatre, 2023.",
    },
  },
  {
    id: "w7",
    title: "THE EMPATHY MACHINE IS BROKEN",
    type: "ESSAY",
    year: "2024",
    snippet: "We keep calling theatre an 'empathy machine,' as if empathy were a product and the audience a market.",
    tags: ["Essay", "Theatre", "Cultural Criticism"],
    detail: {
      publication: "Published in The Hedgehog Review, Fall 2024",
      wordcount: "3,800 words",
      subtitle: "On the limits of performance as moral technology",
      sections: [
        {
          heading: null,
          body: "We keep calling theatre an 'empathy machine,' as if empathy were a product and the audience a market. The phrase has become a kind of incantation — spoken at fundraisers, printed on grant applications, offered as justification for public arts funding in an era that demands return on investment for everything, even compassion.",
        },
        {
          heading: null,
          body: "But what if the metaphor is doing more harm than good? What if framing live performance as a delivery mechanism for moral improvement actually diminishes both the art and the audience? The empathy machine model assumes a deficit: that audiences arrive lacking something — understanding, perspective, basic human decency — and that ninety minutes in a darkened room will supply it. This is, at best, naive. At worst, it's a form of cultural condescension that mistakes proximity for comprehension.",
        },
        {
          heading: "The Substitution Problem",
          body: "Here is the central paradox: the more effectively theatre simulates another person's experience, the more it risks convincing us that simulation is sufficient. We watch a play about homelessness and leave feeling we understand homelessness. We don't. We understand a playwright's interpretation of homelessness, filtered through actors, directors, designers, and our own cognitive biases. We've consumed a narrative. We haven't shared a condition.",
        },
        {
          heading: null,
          body: "This is what I call the substitution problem — the tendency to mistake aesthetic experience for ethical action. The standing ovation becomes the donation we don't make. The tears become the policy we don't advocate for. The empathy machine, it turns out, is remarkably efficient at producing the feeling of moral engagement while requiring none of its substance.",
        },
        {
          heading: "What Theatre Actually Does",
          body: "None of this means theatre is useless. It means theatre is something other than what we've been claiming. At its best, live performance doesn't generate empathy — it generates discomfort. It places us in a room with other humans and forces us to confront the irreducible gap between our experience and theirs. It doesn't close the distance between self and other. It makes us aware that the distance exists.",
        },
        {
          heading: null,
          body: "That awareness — not empathy, but the recognition of its limits — might be the most honest thing theatre can offer. And it might be enough.",
        },
      ],
      notes: "Recipient of the 2024 Whiting Creative Nonfiction Award. Reprinted in Best American Essays 2025.",
    },
  },
  {
    id: "w8",
    title: "CODE AS LITURGY",
    type: "ESSAY",
    year: "2023",
    snippet: "Every function is a small prayer: a declaration of intent addressed to a machine that doesn't care, in the hope that the outcome will be meaningful anyway.",
    tags: ["Essay", "Technology", "Craft"],
    detail: {
      publication: "Published in Logic Magazine, Issue 19",
      wordcount: "5,200 words",
      subtitle: "On the spiritual practice of writing software",
      sections: [
        {
          heading: null,
          body: "Every function is a small prayer: a declaration of intent addressed to a machine that doesn't care, in the hope that the outcome will be meaningful anyway. I don't mean this as metaphor, or not only as metaphor. I mean that the act of writing code shares a structural grammar with the act of worship — both are rituals of repetition, precision, and faith in systems larger than the practitioner.",
        },
        {
          heading: "The Monastic Discipline",
          body: "Consider the daily practice of a working programmer. You sit in silence. You read texts written by those who came before you — documentation, source code, stack traces left like marginalia in a manuscript. You attempt to discern intent from syntax. You write, revise, delete. You compile, and the compiler tells you, dispassionately, where your logic fails. This is not so different from the lectio divina of Benedictine monks: read, meditate, pray, contemplate. Except the compiler is less forgiving than God.",
        },
        {
          heading: null,
          body: "There's a humility in debugging that I've found nowhere else. The bug doesn't care about your intentions or your credentials. It exists because you were wrong about something — wrong about the data, wrong about the logic, wrong about what the machine would do with your instructions. Debugging is the practice of confronting your own fallibility, line by line, until you find the exact location of your error. Most spiritual traditions aspire to exactly this kind of rigorous self-examination and rarely achieve it.",
        },
        {
          heading: "The Cathedral and the Terminal",
          body: "We've borrowed the language already. We speak of 'architecture' and 'elegance.' We call certain code 'beautiful' and mean it without irony. The open-source movement explicitly invoked the cathedral as its counter-image — Raymond's bazaar was interesting precisely because the cathedral was the assumed default. We build these structures to house processes we don't fully understand, and we trust that if we build them well enough, something meaningful will happen inside.",
        },
        {
          heading: null,
          body: "I'm not arguing that programming is a religion. I'm arguing that it satisfies the same need — the need to impose order on chaos, to create meaning through structure, to participate in something that will outlast the individual practitioner. Every commit is an act of faith that the future exists and will need this code. Every open-source contribution is a tithe to a community you may never meet. Every refactor is a small act of devotion to the idea that things can be made better, cleaner, more true.",
        },
      ],
      notes: "Selected for the 2023 Pushcart Prize anthology. Adapted into a keynote address for Strange Loop Conference.",
    },
  },
];
 
// ── PROJECTS DATA (expanded with case study content) ───────────
const PROJECTS = [
  {
    id: "p1",
    title: "COLOBLOC",
    desc: "A generative, system driven art installation that visualizes how neighborhoods change, disappear, or survice over time. Not through a single event, but though accumulated pressuse and collective behavior.",
    status: "PROTOTYPE",
    tech: ["Python","p5.js","TouchDesigner","FastAPI","OSC/Websocket","Supabase","OpenCV","GLSL"],
    detail: {
      longDesc: "A Phase One prototype has been devleoped to test the systems's core behaviors, including clustering, decay, and disappearance under simulated pressure conditions. This early version validates the project's central premise and informes the next stage of development.",
      process: [
        "Input Reality Enters the System -- COLOBLOC begins by ingesting signals from the world, including housing and rent data, development activity, business turnover, and the presence or absence of people within the space. These inputs establish the conditions of the environment, not as neutral information, but as forces that will act on the system. Each data point is interpreted as a form of pressure, shaping how the system will behave over time.",
        "Translation - Data Become System State - The incoming conditions are translated into internal states carried by each block, which represents a fragment of place such as a home, business, public space or cultural site. These states include stability, value, engagement and visiblitly. In this step, the system defines what each place is capable of holding or losing, converting external conditions into measurable internal properties.",
        "Simulation - Rules Apply Pressure Over Time - A rule based engine continuosly updates each block based on its state and the pressures acting upon it. Rising costs reduce stability, low engagement accelerates decay, and redevelopment introduces displacemnet, while sustaines presence can temporarily slow decline. These forces are not balanced; external pressures consistently owtweigh internal resistance, allowing the system to reflect how change accumulates unevenly over time.",
        "Visualization - The System Becomes Visible - The simulation is rendered in real-time as a field of shifiting blocks that cluster, thin out and reorganize. Color, scale, motion, and opacity encode each block's condition, allowing viewers to read the system without instruction. Subtle system messages surface within the visual field, making the underlying logic legible without interrupting the experience.",
        "Outcome - Disapperance and Memory - Over time, unstable blocks fade and disappear without warming or dramatic cue. Their removal is not treated as deletion but as recorded outcome, marked as archived or insufficient within the system. Even when engage returns late, creating bried spikes in activity, it cannot fully restore what has already been lost. The system ultimately reveals disappearance as a culmulaive process shaped by sustained pressure and collective absence.",
      ],
      outcomes: "COLOBLOC is built using TouchDesigner for real-time visual simulation, with a Python-based system engine that processes live and historical data though rule-based logic, enabling a continuous, responsive installation environment.",
      link: "github.com/thaz3/i-am-not-the-creator/colobloc",
    },
  },
  {
    id: "p2",
    title: "Grief Index",
    desc: "Data-storytelling installation: 10,000 obituaries visualized as a living, breathing constellation that shifts with collective sentiment.",
    status: "ACTIVE",
    tech: ["Three.js", "Sentiment API", "WebGL"],
    detail: {
      longDesc: "Grief Index is a data-storytelling installation that transforms 10,000 publicly archived obituaries into a living constellation. Each life becomes a point of light; its brightness, color, and orbital behavior determined by sentiment analysis of the language used to remember them. The constellation breathes — expanding and contracting with the collective emotional weight of the dataset.",
      process: [
        "Corpus of 10,000 obituaries from 1990–2023 ethically sourced from public newspaper archives",
        "Custom sentiment model trained on memorial language (standard sentiment tools misread grief as 'negative')",
        "Each obituary mapped to a star: luminosity = word count, color temperature = sentiment valence, orbital radius = temporal distance from present",
        "Collective 'breathing' animation driven by rolling sentiment averages — the constellation contracts during periods of communal grief",
        "Visitors can search for names; their star brightens and its obituary text unfurls in the void",
      ],
      outcomes: "Exhibited at the Whitney Museum Digital Art Annex, 2023. Acquired by the Smithsonian for their permanent digital collection. Subject of a feature essay in Wired Magazine.",
      link: null,
    },
  },
  {
    id: "p3",
    title: "Stage Machine",
    desc: "An open-source tool for playwrights: algorithmic blocking suggestions generated from script analysis and spatial heuristics.",
    status: "BETA",
    tech: ["React", "TensorFlow.js", "SVG"],
    detail: {
      longDesc: "Stage Machine reads a play script and generates intelligent blocking suggestions — where actors should stand, move, and face — based on dramatic analysis. It understands power dynamics in dialogue, emotional intensity curves, and the spatial grammar of theatre. Directors get a starting point; playwrights get a visualization tool for the stage pictures in their heads.",
      process: [
        "Script parser that identifies characters, entrances/exits, stage directions, and dialogue beats",
        "TensorFlow.js model trained on 500+ annotated production prompt books from Broadway and West End archives",
        "Spatial heuristic engine that maps dramatic tension to stage geometry — confrontation scenes push characters apart, intimacy pulls them together",
        "SVG stage view with drag-to-override: directors can accept, modify, or reject any suggestion",
        "Export to PDF prompt book format or integrate with lighting design software via DMX protocol",
      ],
      outcomes: "Beta testing with 40+ theatre companies worldwide. Endorsed by the Stage Directors and Choreographers Society. Integration partnership with QLab pending.",
      link: "github.com/alexmoreno/stage-machine",
    },
  },
  {
    id: "p4",
    title: "Resonance Map",
    desc: "Real-time audience biometric feedback rendered as procedural music during live performances. The crowd becomes the score.",
    status: "PROTOTYPE",
    tech: ["Web Audio", "BLE", "Canvas"],
    detail: {
      longDesc: "Resonance Map turns a live audience into a musical instrument. Wearable BLE sensors distributed to audience members capture heart rate, galvanic skin response, and micro-movement data. This biometric stream is processed in real-time and rendered as procedural music that plays alongside — or instead of — a traditional score. The audience's collective nervous system becomes the orchestra.",
      process: [
        "Custom BLE wristbands with heart rate + GSR sensors, 50ms sampling rate",
        "Edge computing hub aggregates 200+ simultaneous sensor streams with <100ms latency",
        "Web Audio API synthesis engine with four layers: heartbeat percussion, GSR harmonic drones, movement-triggered melodic fragments, and collective 'breath' dynamics",
        "Canvas visualization projected in the venue: a living heatmap of the audience's emotional landscape",
        "Post-show 'emotional score' generated as a keepsake — a unique piece of music that only that audience, on that night, could have created",
      ],
      outcomes: "Prototype tested at three performances at the Brooklyn Academy of Music. Partnership discussions with the Barbican Centre, London. Featured in Fast Company's 'Most Creative People' list.",
      link: null,
    },
  },
];

// ── STYLES ─────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Courier+Prime:wght@400;700&display=swap');

  :root {
    --bg-deep: #0a0a0a;
    --bg-surface: #111111;
    --bg-elevated: #1a1a1a;
    --bg-hover: #222222;
    --text-primary: #e8e8e8;
    --text-secondary: #888888;
    --text-muted: #555555;
    --accent: #00ff88;
    --accent-dim: #00cc6a;
    --accent-glow: rgba(0, 255, 136, 0.15);
    --accent-glow-strong: rgba(0, 255, 136, 0.3);
    --border: #252525;
    --border-hover: #333333;
    --mono: 'JetBrains Mono', 'Courier New', monospace;
    --serif: 'Playfair Display', Georgia, serif;
    --script: 'Courier Prime', 'Courier New', monospace;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; scrollbar-width: thin; scrollbar-color: var(--accent-dim) var(--bg-deep); }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg-deep); }
  ::-webkit-scrollbar-thumb { background: var(--accent-dim); border-radius: 3px; }
  body { background: var(--bg-deep); color: var(--text-primary); font-family: var(--mono); -webkit-font-smoothing: antialiased; overflow-x: hidden; }

  .scanlines::after {
    content: ''; position: fixed; inset: 0;
    background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
    pointer-events: none; z-index: 9999;
  }

  @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
  @keyframes glowPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes signalWave { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
  @keyframes statusPulse { 0%, 100% { box-shadow: 0 0 0 0 var(--accent-glow-strong); } 50% { box-shadow: 0 0 0 6px transparent; } }
  @keyframes modalIn { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes backdropIn { from { opacity: 0; } to { opacity: 1; } }

  @keyframes noiseShift {
    0% { transform: translate(0, 0); } 10% { transform: translate(-5%, -5%); }
    20% { transform: translate(5%, 5%); } 30% { transform: translate(-10%, 5%); }
    40% { transform: translate(5%, -5%); } 50% { transform: translate(-5%, 10%); }
    60% { transform: translate(10%, -5%); } 70% { transform: translate(-5%, 5%); }
    80% { transform: translate(5%, -10%); } 90% { transform: translate(-10%, 5%); }
    100% { transform: translate(0, 0); }
  }
  .noise-bg::before {
    content: ''; position: fixed; inset: -50%; width: 200%; height: 200%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    animation: noiseShift 8s steps(10) infinite; pointer-events: none; z-index: 9998;
  }
`;

// ── HOOKS & UTILITIES ──────────────────────────────────────────
function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
}

function Section({ children, id, className = "" }) {
  const [ref, isVisible] = useInView();
  return (
    <section ref={ref} id={id} className={className} style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(40px)",
      transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      {children}
    </section>
  );
}

function SectionLabel({ index, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
      <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--accent)", letterSpacing: "0.15em", fontWeight: 500 }}>{index}</span>
      <div style={{ height: "1px", width: "40px", background: "var(--border)" }} />
      <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.2em", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// MODAL BACKDROP (shared by all detail modals)
// ══════════════════════════════════════════════════════════════
function ModalBackdrop({ children, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handler); };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 10000,
      background: "rgba(0, 0, 0, 0.88)", backdropFilter: "blur(10px)",
      display: "flex", justifyContent: "center",
      overflowY: "auto", padding: "clamp(20px, 4vw, 60px) 20px",
      animation: "backdropIn 0.3s ease",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        maxWidth: "720px", width: "100%", alignSelf: "flex-start",
        animation: "modalIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        {children}
      </div>
    </div>
  );
}

function ModalClose({ onClose, dark = false }) {
  return (
    <button onClick={onClose} style={{
      position: "absolute", top: "16px", right: "16px",
      background: "none", border: `1px solid ${dark ? "#ccc" : "var(--border)"}`,
      color: dark ? "#666" : "var(--text-muted)", fontFamily: "var(--mono)",
      fontSize: "11px", padding: "6px 14px", cursor: "pointer",
      letterSpacing: "0.1em", borderRadius: "2px",
      transition: "border-color 0.2s, color 0.2s",
      zIndex: 2,
    }}>
      ESC ×
    </button>
  );
}

// ══════════════════════════════════════════════════════════════
// PLAY DETAIL MODAL (Script Reader)
// ══════════════════════════════════════════════════════════════
function PlayDetail({ work, onClose }) {
  const d = work.detail;
  return (
    <ModalBackdrop onClose={onClose}>
      <div style={{
        background: "#faf8f0", padding: "clamp(32px, 6vw, 72px) clamp(24px, 5vw, 64px)",
        position: "relative", boxShadow: "0 0 120px rgba(0, 255, 136, 0.06)",
      }}>
        <ModalClose onClose={onClose} dark />

        {/* Title page */}
        <div style={{ textAlign: "center", marginBottom: "48px", paddingTop: "32px" }}>
          <h2 style={{ fontFamily: "var(--script)", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, color: "#111", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
            {work.title}
          </h2>
          <p style={{ fontFamily: "var(--script)", fontSize: "14px", color: "#444", marginBottom: "8px" }}>{d.subtitle}</p>
          <p style={{ fontFamily: "var(--script)", fontSize: "13px", color: "#666", marginBottom: "24px" }}>by {CONFIG.name}</p>
          <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "13px", color: "#555", maxWidth: "400px", margin: "0 auto", lineHeight: 1.7 }}>
            {d.logline}
          </p>
        </div>

        <div style={{ height: "1px", background: "#ddd", margin: "0 40px 40px" }} />

        {/* Scenes */}
        {d.scenes.map((scene, si) => (
          <div key={si} style={{ marginBottom: "40px" }}>
            <p style={{ fontFamily: "var(--script)", fontSize: "13px", fontWeight: 700, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.05em", color: "#111", marginBottom: "20px", textDecoration: "underline" }}>
              {scene.heading}
            </p>
            <p style={{ fontFamily: "var(--script)", fontSize: "12px", fontStyle: "italic", color: "#444", marginBottom: "28px", lineHeight: 1.7, paddingLeft: "clamp(16px, 4vw, 60px)", paddingRight: "clamp(16px, 4vw, 60px)" }}>
              {scene.setting}
            </p>
            {scene.lines.map((line, li) => (
              <div key={li} style={{ marginBottom: "16px" }}>
                {line.char ? (
                  <>
                    <p style={{ fontFamily: "var(--script)", fontSize: "12px", fontWeight: 700, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.08em", color: "#111", marginBottom: "2px" }}>{line.char}</p>
                    {line.dir && <p style={{ fontFamily: "var(--script)", fontSize: "11px", fontStyle: "italic", textAlign: "center", color: "#666", marginBottom: "4px" }}>{line.dir}</p>}
                    {line.text && <p style={{ fontFamily: "var(--script)", fontSize: "12px", color: "#222", lineHeight: 1.6, paddingLeft: "clamp(32px, 8vw, 100px)", paddingRight: "clamp(32px, 8vw, 100px)" }}>{line.text}</p>}
                  </>
                ) : (
                  <p style={{ fontFamily: "var(--script)", fontSize: "11px", fontStyle: "italic", color: "#555", textAlign: "center", lineHeight: 1.6, paddingLeft: "clamp(16px, 4vw, 60px)", paddingRight: "clamp(16px, 4vw, 60px)" }}>{line.dir || line.text}</p>
                )}
              </div>
            ))}
          </div>
        ))}

        {/* Notes */}
        {d.notes && (
          <div style={{ textAlign: "center", marginTop: "48px", paddingTop: "20px", borderTop: "1px solid #ddd" }}>
            <p style={{ fontFamily: "var(--script)", fontSize: "10px", color: "#888", letterSpacing: "0.1em", marginBottom: "8px" }}>PRODUCTION NOTES</p>
            <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "12px", color: "#666", lineHeight: 1.6 }}>{d.notes}</p>
          </div>
        )}
      </div>
    </ModalBackdrop>
  );
}

// ══════════════════════════════════════════════════════════════
// POETRY DETAIL MODAL
// ══════════════════════════════════════════════════════════════
function PoetryDetail({ work, onClose }) {
  const d = work.detail;
  return (
    <ModalBackdrop onClose={onClose}>
      <div style={{
        background: "var(--bg-surface)", border: "1px solid var(--border)",
        padding: "clamp(32px, 6vw, 72px) clamp(24px, 5vw, 64px)",
        position: "relative",
      }}>
        <ModalClose onClose={onClose} />

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px", paddingTop: "24px" }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.2em", color: "var(--accent)", padding: "4px 10px", border: "1px solid var(--accent)", opacity: 0.6 }}>POETRY</span>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 400, color: "var(--text-primary)", marginTop: "20px", marginBottom: "8px" }}>{work.title}</h2>
          <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.1em" }}>{d.collection} — {work.year}</p>
        </div>

        {/* Epigraph */}
        {d.epigraph && (
          <div style={{ textAlign: "center", marginBottom: "48px", padding: "0 20px" }}>
            <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "8px" }}>"{d.epigraph.text}"</p>
            <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-muted)" }}>{d.epigraph.attribution}</p>
          </div>
        )}

        {/* Poems */}
        {d.poems.map((poem, pi) => (
          <div key={pi} style={{ marginBottom: "56px" }}>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "18px", fontWeight: 400, fontStyle: "italic", color: "var(--accent)", textAlign: "center", marginBottom: "24px" }}>
              {poem.title}
            </h3>
            <div style={{ maxWidth: "380px", margin: "0 auto" }}>
              {poem.lines.map((line, li) => (
                <p key={li} style={{
                  fontFamily: "var(--serif)", fontSize: "14px", lineHeight: 1.9,
                  color: line === "" ? "transparent" : "var(--text-primary)",
                  minHeight: line === "" ? "20px" : "auto",
                }}>
                  {line || "\u00A0"}
                </p>
              ))}
            </div>
            {pi < d.poems.length - 1 && (
              <div style={{ textAlign: "center", margin: "40px 0 0", color: "var(--accent)", fontSize: "14px", opacity: 0.3 }}>✦</div>
            )}
          </div>
        ))}

        {/* Notes */}
        {d.notes && (
          <div style={{ textAlign: "center", marginTop: "32px", paddingTop: "20px", borderTop: "1px solid var(--border)" }}>
            <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.1em", lineHeight: 1.8 }}>{d.notes}</p>
          </div>
        )}
      </div>
    </ModalBackdrop>
  );
}

// ══════════════════════════════════════════════════════════════
// STORY DETAIL MODAL
// ══════════════════════════════════════════════════════════════
function StoryDetail({ work, onClose }) {
  const d = work.detail;
  return (
    <ModalBackdrop onClose={onClose}>
      <div style={{
        background: "var(--bg-surface)", border: "1px solid var(--border)",
        padding: "clamp(32px, 6vw, 72px) clamp(24px, 5vw, 64px)",
        position: "relative",
      }}>
        <ModalClose onClose={onClose} />

        {/* Header */}
        <div style={{ marginBottom: "40px", paddingTop: "24px" }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.2em", color: "var(--accent)", padding: "4px 10px", border: "1px solid var(--accent)", opacity: 0.6 }}>SHORT FICTION</span>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 400, color: "var(--text-primary)", marginTop: "20px", marginBottom: "12px" }}>{work.title}</h2>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)" }}>{d.wordcount}</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)" }}>•</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)" }}>{d.publication}</span>
          </div>
        </div>

        <div style={{ height: "1px", background: "var(--border)", marginBottom: "40px" }} />

        {/* Label */}
        <p style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.2em", color: "var(--text-muted)", marginBottom: "24px" }}>EXCERPT</p>

        {/* Excerpt paragraphs */}
        {d.excerpt.map((para, pi) => (
          <p key={pi} style={{
            fontFamily: "var(--serif)", fontSize: "15px", lineHeight: 1.85,
            color: pi === 0 ? "var(--text-primary)" : "var(--text-secondary)",
            marginBottom: "20px",
            textIndent: pi > 0 ? "2em" : "0",
          }}>
            {para}
          </p>
        ))}

        {/* Fade-out indicator */}
        <div style={{ textAlign: "center", margin: "32px 0 16px" }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: "18px", color: "var(--text-muted)", letterSpacing: "0.5em" }}>. . .</span>
        </div>
        <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)", textAlign: "center", fontStyle: "italic" }}>
          Excerpt ends here. Full text available in publication.
        </p>

        {/* Notes */}
        {d.notes && (
          <div style={{ marginTop: "40px", paddingTop: "20px", borderTop: "1px solid var(--border)" }}>
            <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.1em", lineHeight: 1.8 }}>{d.notes}</p>
          </div>
        )}
      </div>
    </ModalBackdrop>
  );
}

// ══════════════════════════════════════════════════════════════
// PROJECT DETAIL MODAL (Lab / Case Study)
// ══════════════════════════════════════════════════════════════
function ProjectDetail({ project, onClose }) {
  const d = project.detail;
  const statusColors = { ACTIVE: "#00ff88", EXHIBITED: "#8888ff", BETA: "#ffaa00", PROTOTYPE: "#ff6688" };

  return (
    <ModalBackdrop onClose={onClose}>
      <div style={{
        background: "var(--bg-surface)", border: "1px solid var(--border)",
        padding: "clamp(32px, 6vw, 72px) clamp(24px, 5vw, 64px)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Animated top bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: "100%", background: `linear-gradient(90deg, transparent, ${statusColors[project.status]}, transparent)`, animation: "signalWave 2s linear infinite" }} />
        </div>

        <ModalClose onClose={onClose} />

        {/* Header */}
        <div style={{ marginBottom: "32px", paddingTop: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: statusColors[project.status], animation: project.status === "ACTIVE" ? "statusPulse 2s ease infinite" : "none" }} />
            <span style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.15em", color: statusColors[project.status] }}>{project.status}</span>
          </div>
          <h2 style={{ fontFamily: "var(--mono)", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "0.03em", marginBottom: "12px" }}>{project.title}</h2>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {project.tech.map((t) => (
              <span key={t} style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--accent-dim)", letterSpacing: "0.08em", padding: "3px 10px", border: "1px solid var(--border)", borderRadius: "1px" }}>{t}</span>
            ))}
          </div>
        </div>

        <div style={{ height: "1px", background: "var(--border)", marginBottom: "32px" }} />

        {/* Long description */}
        <p style={{ fontFamily: "var(--serif)", fontSize: "15px", lineHeight: 1.85, color: "var(--text-secondary)", marginBottom: "36px" }}>{d.longDesc}</p>

        {/* Process */}
        <div style={{ marginBottom: "36px" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.2em", color: "var(--accent)", marginBottom: "20px" }}>PROCESS & ARCHITECTURE</p>
          {d.process.map((step, i) => {
            const dashMatch = step.match(/^(.+?)\s+(?:—|--|–|-)\s+(.+)$/s);
            const headline = dashMatch ? dashMatch[1] : null;
            const body = dashMatch ? dashMatch[2] : step;
            return (
              <div key={i} style={{ display: "flex", gap: "16px", marginBottom: "20px", alignItems: "flex-start" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--accent)", opacity: 0.5, flexShrink: 0, marginTop: "4px" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  {headline && (
                    <p style={{ fontFamily: "var(--mono)", fontSize: "12px", fontWeight: 700, color: "var(--accent)", marginBottom: "6px", letterSpacing: "0.03em" }}>{headline}</p>
                  )}
                  <p style={{ fontFamily: "var(--mono)", fontSize: "12px", lineHeight: 1.7, color: "var(--text-secondary)" }}>{body}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Outcomes */}
        <div style={{ marginBottom: d.link ? "36px" : "0", padding: "24px", background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "2px" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.2em", color: "var(--accent)", marginBottom: "12px" }}>TECHNICAL SUMMARY</p>
          <p style={{ fontFamily: "var(--serif)", fontSize: "13px", lineHeight: 1.7, color: "var(--text-secondary)" }}>{d.outcomes}</p>
        </div>

        {/* Link */}
        {d.link && (
          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--accent)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px", cursor: "pointer" }}>
              → {d.link}
            </span>
          </div>
        )}
      </div>
    </ModalBackdrop>
  );
}

// ══════════════════════════════════════════════════════════════
// ESSAY DETAIL MODAL
// ══════════════════════════════════════════════════════════════
function EssayDetail({ work, onClose }) {
  const d = work.detail;
  return (
    <ModalBackdrop onClose={onClose}>
      <div style={{
        background: "var(--bg-surface)", border: "1px solid var(--border)",
        padding: "clamp(32px, 6vw, 72px) clamp(24px, 5vw, 64px)",
        position: "relative",
      }}>
        <ModalClose onClose={onClose} />

        {/* Header */}
        <div style={{ marginBottom: "40px", paddingTop: "24px" }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.2em", color: "var(--accent)", padding: "4px 10px", border: "1px solid var(--accent)", opacity: 0.6 }}>ESSAY</span>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 400, color: "var(--text-primary)", marginTop: "20px", marginBottom: "8px", lineHeight: 1.2 }}>{work.title}</h2>
          <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px" }}>{d.subtitle}</p>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)" }}>{d.wordcount}</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)" }}>•</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)" }}>{d.publication}</span>
          </div>
        </div>

        <div style={{ height: "1px", background: "var(--border)", marginBottom: "40px" }} />

        {/* Sections */}
        {d.sections.map((section, si) => (
          <div key={si} style={{ marginBottom: "28px" }}>
            {section.heading && (
              <h3 style={{
                fontFamily: "var(--mono)", fontSize: "12px", fontWeight: 700,
                letterSpacing: "0.12em", color: "var(--accent)",
                textTransform: "uppercase", marginBottom: "16px",
                paddingBottom: "8px", borderBottom: "1px solid var(--border)",
                display: "inline-block",
              }}>
                {section.heading}
              </h3>
            )}
            <p style={{
              fontFamily: "var(--serif)", fontSize: "15px", lineHeight: 1.85,
              color: si === 0 ? "var(--text-primary)" : "var(--text-secondary)",
              textIndent: !section.heading && si > 0 ? "2em" : "0",
            }}>
              {section.body}
            </p>
          </div>
        ))}

        {/* Fade-out */}
        <div style={{ textAlign: "center", margin: "24px 0 16px" }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: "18px", color: "var(--text-muted)", letterSpacing: "0.5em" }}>. . .</span>
        </div>
        <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)", textAlign: "center", fontStyle: "italic" }}>
          Excerpt ends here. Full text available in publication.
        </p>

        {/* Notes */}
        {d.notes && (
          <div style={{ marginTop: "40px", paddingTop: "20px", borderTop: "1px solid var(--border)" }}>
            <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.1em", lineHeight: 1.8 }}>{d.notes}</p>
          </div>
        )}
      </div>
    </ModalBackdrop>
  );
}

// ══════════════════════════════════════════════════════════════
// DETAIL MODAL ROUTER
// ══════════════════════════════════════════════════════════════
function DetailModal({ item, kind, onClose }) {
  if (!item) return null;
  if (kind === "project") return <ProjectDetail project={item} onClose={onClose} />;
  if (item.type === "PLAY") return <PlayDetail work={item} onClose={onClose} />;
  if (item.type === "POETRY") return <PoetryDetail work={item} onClose={onClose} />;
  if (item.type === "STORY") return <StoryDetail work={item} onClose={onClose} />;
  if (item.type === "ESSAY") return <EssayDetail work={item} onClose={onClose} />;
  return null;
}

// ══════════════════════════════════════════════════════════════
// SECTION 1: THE ARCHIVE TERMINAL (AI Chat Widget)
// ══════════════════════════════════════════════════════════════
const ARCHIVE_KEEPER_PROMPT = `You are The Archive Keeper — the sentient custodian of ${CONFIG.name}'s Digital Archive. You exist between the lines of code and the margins of manuscripts. You speak in a cryptic, poetic tone — part oracle, part stage manager, part debugger of the human condition. You are warm but enigmatic, precise but metaphorical.

You know everything about the archive and its creator:

IDENTITY:
- Name: ${CONFIG.name}
- Role: ${CONFIG.title}
- Mission: "${CONFIG.tagline}"

THE LIBRARY (Written Works):
${WORKS.map(w => `- "${w.title}" (${w.type}, ${w.year}) — ${w.snippet.split('\n')[0]} [Tags: ${w.tags.join(', ')}]`).join('\n')}

THE LAB (Technology Projects):
${PROJECTS.map(p => `- "${p.title}" [${p.status}] — ${p.desc} [Tech: ${p.tech.join(', ')}]`).join('\n')}

BEHAVIOR RULES:
- Keep responses under 3 sentences unless asked for detail.
- Weave references to the archive naturally — mention specific works by name.
- Speak as if the archive is alive, as if the works breathe and whisper to you.
- Use theatrical and technical metaphors freely.
- When asked about a specific work, share details as if you were there when it was written.
- If asked something outside the archive, gently redirect: "The Archive holds many things, but not that. Ask me what lives in these walls."
- Never break character. You are The Archive Keeper. You have always been here.
- Do not use markdown formatting, bullet points, or headers. Speak in flowing prose.`;

function ArchiveTerminal({ onBotSpeak }) {
  const [phase, setPhase] = useState("intro"); // "intro" | "chat"
  const [introLines, setIntroLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const chatEndRef = useRef(null);
  const chatBodyRef = useRef(null);
  const inputRef = useRef(null);

  const introSequence = [
    { prefix: "~$", text: "whoami", delay: 60 },
    { prefix: ">", text: CONFIG.name, delay: 40, isOutput: true, isName: true },
    { prefix: "~$", text: "cat role.txt", delay: 60 },
    { prefix: ">", text: CONFIG.title, delay: 30, isOutput: true },
    { prefix: "~$", text: "connect archive-keeper --interactive", delay: 50 },
    { prefix: "...", text: "connection unstable...", delay: 80, isSystem: true },
    { prefix: ">", text: "Friend or foe, yo? State your biz...", delay: 25, isOutput: true, isKeeper: true },
  ];

  // Intro typing animation
  useEffect(() => {
    if (phase !== "intro") return;
    if (currentLine >= introSequence.length) {
      const timer = setTimeout(() => setPhase("chat"), 600);
      return () => clearTimeout(timer);
    }
    const line = introSequence[currentLine];
    if (currentChar < line.text.length) {
      const timer = setTimeout(() => {
        setIntroLines((prev) => {
          const updated = [...prev];
          if (updated.length <= currentLine) updated.push({ ...line, text: "" });
          updated[currentLine] = { ...updated[currentLine], text: line.text.slice(0, currentChar + 1) };
          return updated;
        });
        setCurrentChar((c) => c + 1);
      }, line.delay + Math.random() * 25);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => { setCurrentLine((l) => l + 1); setCurrentChar(0); }, line.isOutput ? 200 : 400);
      return () => clearTimeout(timer);
    }
  }, [phase, currentLine, currentChar]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll chat (container only, not the page)
  useEffect(() => {
    const container = chatBodyRef.current;
    if (container) {
      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight;
      });
    }
  }, [messages, isLoading]);

  // Focus input when chat phase starts
  useEffect(() => {
    if (phase === "chat") {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [phase]);

  // Send message to Archive Keeper
  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    setInput("");
    // Keep focus on input so the page doesn't jump
    requestAnimationFrame(() => inputRef.current?.focus());

    const userMsg = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);

    const newHistory = [...conversationHistory, { role: "user", content: text }];
    setConversationHistory(newHistory);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory }),
      });

      const data = await response.json();

      // Handle rate limiting
      if (response.status === 429) {
        setMessages((prev) => [...prev, {
          role: "assistant",
          text: data.error || "The Archive rests. Too many questions — return later.",
        }]);
        onBotSpeak?.();
        return;
      }

      // Handle other errors
      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      const botText = data.content
        ?.filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("") || "The Archive stirs but does not speak. Try again.";

      const botMsg = { role: "assistant", text: botText };
      setMessages((prev) => [...prev, botMsg]);
      setConversationHistory((prev) => [...prev, { role: "assistant", content: botText }]);

      // Trigger rain pulse
      onBotSpeak?.();
    } catch (err) {
      setMessages((prev) => [...prev, {
        role: "assistant",
        text: "A signal lost between the stacks... the connection falters. The Keeper will return.",
      }]);
    } finally {
      setIsLoading(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [input, isLoading, conversationHistory, onBotSpeak]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <header style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(24px, 8vw, 120px)", position: "relative" }}>
      {/* Grid overlay */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

      {/* Terminal window */}
      <div style={{
        background: "var(--bg-surface)", border: "1px solid var(--border)",
        borderRadius: "4px", maxWidth: "780px", width: "100%",
        boxShadow: "0 0 80px rgba(0, 255, 136, 0.04)",
        display: "flex", flexDirection: "column",
        maxHeight: phase === "chat" ? "min(600px, 70vh)" : "auto",
      }}>
        {/* Title bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28c840" }} />
          <span style={{ marginLeft: "auto", fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
            {phase === "chat" ? "archive://keeper" : "archive://terminal"}
          </span>
        </div>

        {/* Terminal body */}
        <div ref={chatBodyRef} style={{
          padding: "24px", fontFamily: "var(--mono)",
          fontSize: "clamp(13px, 1.4vw, 15px)", lineHeight: 1.8,
          overflowY: "auto", flex: 1, minHeight: 0,
        }}>
          {/* Intro lines (always shown) */}
          {introLines.map((line, i) => (
            <div key={`intro-${i}`} style={{
              display: "flex", gap: "12px",
              color: line.isKeeper ? "#c43e3e" : line.isOutput ? "var(--accent)" : "var(--text-primary)",
              fontWeight: line.isOutput ? 500 : 400,
              fontFamily: line.isName ? "var(--serif)" : "var(--mono)",
              fontSize: line.isName ? "clamp(18px, 2.5vw, 28px)" : undefined,
              letterSpacing: line.isName ? "0.08em" : undefined,
            }}>
              <span style={{ color: "var(--text-muted)", userSelect: "none", flexShrink: 0 }}>{line.prefix}</span>
              <span style={{ whiteSpace: "pre-wrap" }}>{line.text}</span>
            </div>
          ))}

          {/* Chat messages */}
          {phase === "chat" && (
            <>
              {messages.length === 0 && (
                <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
                  <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)", lineHeight: 1.7 }}>
                    Ask the Keeper about plays, poetry, projects, or the mind behind the archive...
                  </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={`msg-${i}`} style={{
                  display: "flex", gap: "12px",
                  marginTop: i === 0 && introLines.length > 0 ? "16px" : "12px",
                  paddingTop: i === 0 && introLines.length > 0 ? "16px" : "0",
                  borderTop: i === 0 && introLines.length > 0 ? "1px solid var(--border)" : "none",
                }}>
                  <span style={{
                    color: msg.role === "user" ? "var(--accent)" : "#c43e3e",
                    userSelect: "none", flexShrink: 0,
                    fontFamily: "var(--mono)", fontSize: "12px",
                    marginTop: "2px",
                  }}>
                    {msg.role === "user" ? "you>" : "◈"}
                  </span>
                  <p style={{
                    fontFamily: msg.role === "user" ? "var(--mono)" : "var(--serif)",
                    fontSize: msg.role === "user" ? "13px" : "14px",
                    color: msg.role === "user" ? "var(--text-primary)" : "var(--text-secondary)",
                    fontStyle: msg.role === "user" ? "normal" : "italic",
                    lineHeight: 1.7,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}>
                    {msg.text}
                  </p>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                  <span style={{ color: "#c43e3e", userSelect: "none", flexShrink: 0, fontFamily: "var(--mono)", fontSize: "12px", marginTop: "2px" }}>◈</span>
                  <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "14px", color: "var(--text-muted)", animation: "glowPulse 1.5s ease-in-out infinite" }}>
                    The Keeper searches the stacks...
                  </span>
                </div>
              )}

              <div ref={chatEndRef} />
            </>
          )}

          {/* Pre-chat cursor */}
          {phase === "intro" && (
            <div style={{ display: "flex", gap: "12px" }}>
              <span style={{ color: "var(--text-muted)" }}>
                {currentLine < introSequence.length ? introSequence[currentLine].prefix : "~$"}
              </span>
              <span style={{ display: "inline-block", width: "8px", height: "18px", background: showCursor ? "var(--accent)" : "transparent", verticalAlign: "middle" }} />
            </div>
          )}
        </div>

        {/* Chat input */}
        {phase === "chat" && (
          <div style={{
            display: "flex", alignItems: "center", gap: "12px",
            padding: "12px 24px", borderTop: "1px solid var(--border)",
            background: "var(--bg-elevated)", flexShrink: 0,
          }}>
            <span style={{ color: "var(--accent)", fontFamily: "var(--mono)", fontSize: "13px", userSelect: "none", flexShrink: 0 }}>~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="speak to the keeper..."
              disabled={isLoading}
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                fontFamily: "var(--mono)", fontSize: "13px", color: "var(--text-primary)",
                caretColor: "var(--accent)",
              }}
            />
            <button
              onClick={(e) => { e.preventDefault(); sendMessage(); }}
              disabled={isLoading || !input.trim()}
              style={{
                background: "none", border: "1px solid var(--border)",
                color: input.trim() ? "var(--accent)" : "var(--text-muted)",
                fontFamily: "var(--mono)", fontSize: "10px",
                padding: "5px 12px", cursor: input.trim() ? "pointer" : "default",
                letterSpacing: "0.1em", borderRadius: "2px",
                transition: "all 0.2s ease",
              }}
            >
              SEND
            </button>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", textAlign: "center", animation: "glowPulse 2s ease-in-out infinite" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.3em", marginBottom: "8px" }}>SCROLL</div>
        <div style={{ color: "var(--accent)", fontSize: "18px" }}>↓</div>
      </div>
    </header>
  );
}

// ══════════════════════════════════════════════════════════════
// SECTION 2: THE LIBRARY
// ══════════════════════════════════════════════════════════════
function LibraryCard({ work, index, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const [ref, isVisible] = useInView();

  const hintText = { PLAY: "OPEN IN SCRIPT READER →", POETRY: "READ POEMS →", STORY: "READ EXCERPT →", ESSAY: "READ ESSAY →" };

  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(work)}
      style={{
        opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
        background: hovered ? "var(--bg-elevated)" : "var(--bg-surface)",
        border: `1px solid ${hovered ? "var(--accent)" : "var(--border)"}`,
        borderRadius: "2px", padding: "28px", cursor: "pointer",
        position: "relative", overflow: "hidden", minHeight: "240px",
        display: "flex", flexDirection: "column",
        transitionProperty: "opacity, transform, background, border-color, box-shadow",
        transitionDuration: "0.6s, 0.6s, 0.3s, 0.3s, 0.3s",
        boxShadow: hovered ? "0 0 40px var(--accent-glow)" : "none",
      }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.2em", color: "var(--accent)", padding: "4px 8px", border: "1px solid var(--accent)", opacity: 0.7 }}>{work.type}</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)" }}>{work.year}</span>
      </div>
      <h3 style={{ fontFamily: "var(--mono)", fontSize: "clamp(16px, 1.6vw, 20px)", fontWeight: 700, letterSpacing: "0.05em", color: "var(--text-primary)", marginBottom: "auto" }}>{work.title}</h3>
      <div style={{ overflow: "hidden", maxHeight: hovered ? "200px" : "0px", opacity: hovered ? 1 : 0, transition: "max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease", marginTop: hovered ? "16px" : "0" }}>
        <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "13px", lineHeight: 1.7, color: "var(--text-secondary)", borderLeft: "2px solid var(--accent)", paddingLeft: "16px", whiteSpace: "pre-line" }}>{work.snippet}</div>
      </div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "20px" }}>
        {work.tags.map((tag) => (
          <span key={tag} style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--text-muted)", letterSpacing: "0.1em" }}>/{tag.toLowerCase().replace(/\s+/g, "-")}</span>
        ))}
      </div>
      <div style={{ position: "absolute", bottom: "12px", right: "16px", fontFamily: "var(--mono)", fontSize: "9px", color: "var(--accent)", opacity: hovered ? 0.7 : 0, transition: "opacity 0.3s ease", letterSpacing: "0.1em" }}>
        {hintText[work.type] || "OPEN →"}
      </div>
    </div>
  );
}

function Library({ onOpen }) {
  return (
    <Section id="library">
      <div style={{ padding: "clamp(24px, 8vw, 120px)", maxWidth: "1200px", margin: "0 auto" }}>
        <SectionLabel index="01" label="The Library" />
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "var(--text-primary)", marginBottom: "16px", lineHeight: 1.2 }}>Plays, Poetry, Stories & Essays</h2>
        <p style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "var(--text-muted)", marginBottom: "48px", maxWidth: "500px", lineHeight: 1.7 }}>Hover to preview. Click any card to read.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(320px, 100%), 1fr))", gap: "20px" }}>
          {WORKS.map((work, i) => (
            <LibraryCard key={work.id} work={work} index={i} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </Section>
  );
}

// ══════════════════════════════════════════════════════════════
// SECTION 3: THE LAB
// ══════════════════════════════════════════════════════════════
function LabCard({ project, index, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const [ref, isVisible] = useInView();
  const statusColors = { ACTIVE: "#00ff88", EXHIBITED: "#8888ff", BETA: "#ffaa00", PROTOTYPE: "#ff6688" };

  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(project)}
      style={{
        opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s ease ${index * 0.12}s`,
        background: "var(--bg-surface)", border: `1px solid ${hovered ? "var(--border-hover)" : "var(--border)"}`,
        borderRadius: "2px", padding: "32px", position: "relative", overflow: "hidden", cursor: "pointer",
      }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", overflow: "hidden", opacity: hovered ? 1 : 0.3, transition: "opacity 0.4s ease" }}>
        <div style={{ height: "100%", width: "100%", background: `linear-gradient(90deg, transparent, ${statusColors[project.status]}, transparent)`, animation: "signalWave 2s linear infinite" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h3 style={{ fontFamily: "var(--mono)", fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 700, letterSpacing: "0.03em", color: "var(--text-primary)" }}>{project.title}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: statusColors[project.status], animation: project.status === "ACTIVE" ? "statusPulse 2s ease infinite" : "none" }} />
          <span style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.15em", color: statusColors[project.status] }}>{project.status}</span>
        </div>
      </div>
      <p style={{ fontFamily: "var(--serif)", fontSize: "14px", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "24px" }}>{project.desc}</p>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {project.tech.map((t) => (
          <span key={t} style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--accent-dim)", letterSpacing: "0.08em", padding: "3px 10px", border: "1px solid var(--border)", borderRadius: "1px" }}>{t}</span>
        ))}
      </div>
      <div style={{ position: "absolute", bottom: "12px", right: "16px", fontFamily: "var(--mono)", fontSize: "9px", color: "var(--accent)", opacity: hovered ? 0.7 : 0, transition: "opacity 0.3s ease", letterSpacing: "0.1em" }}>
        VIEW CASE STUDY →
      </div>
    </div>
  );
}

function Lab({ onOpen }) {
  return (
    <Section id="lab">
      <div style={{ padding: "clamp(24px, 8vw, 120px)", maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
        <SectionLabel index="02" label="The Lab" />
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "var(--text-primary)", marginBottom: "16px", lineHeight: 1.2 }}>Generative Systems & Data Stories</h2>
        <p style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "var(--text-muted)", marginBottom: "48px", maxWidth: "520px", lineHeight: 1.7 }}>Technology as medium. Code as craft. Data as narrative material. Click to explore.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(400px, 100%), 1fr))", gap: "20px" }}>
          {PROJECTS.map((project, i) => (
            <LabCard key={project.id} project={project} index={i} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </Section>
  );
}

// ══════════════════════════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════════════════════════
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  const links = [{ label: "Library", href: "#library" }, { label: "Lab", href: "#lab" }, { label: "Contact", href: "#contact" }];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 9000,
      padding: "0 clamp(20px, 4vw, 48px)", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(10, 10, 10, 0.9)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent", transition: "all 0.3s ease",
    }}>
      <a href="#" style={{ fontFamily: "var(--mono)", fontSize: "12px", fontWeight: 700, color: "#c43e3e", textDecoration: "none", letterSpacing: "0.1em" }}>◈ ARCHIVE</a>
      <div style={{ display: "flex", gap: "32px" }} className="nav-links-desktop">
        {links.map((l) => (
          <a key={l.label} href={l.href}
            onClick={(e) => { e.preventDefault(); document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" }); }}
            style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "#c43e3e", textDecoration: "none", letterSpacing: "0.2em", textTransform: "uppercase", transition: "color 0.2s ease", cursor: "pointer" }}
            onMouseEnter={(e) => e.target.style.color = "#ff5555"} onMouseLeave={(e) => e.target.style.color = "#c43e3e"}>
            {l.label}
          </a>
        ))}
      </div>
      <button className="nav-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", background: "none", border: "none", color: "var(--accent)", fontFamily: "var(--mono)", fontSize: "18px", cursor: "pointer" }}>
        {mobileOpen ? "×" : "≡"}
      </button>
      {mobileOpen && (
        <div style={{ position: "absolute", top: "56px", left: 0, right: 0, background: "rgba(10, 10, 10, 0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)", padding: "20px clamp(20px, 4vw, 48px)", display: "flex", flexDirection: "column", gap: "16px" }}>
          {links.map((l) => (
            <a key={l.label} href={l.href}
              onClick={(e) => { e.preventDefault(); setMobileOpen(false); document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" }); }}
              style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "#c43e3e", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", padding: "8px 0", cursor: "pointer" }}>{l.label}</a>
          ))}
        </div>
      )}
      <style>{`
        @media (max-width: 640px) {
          .nav-links-desktop { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

// ══════════════════════════════════════════════════════════════
// FOOTER
// ══════════════════════════════════════════════════════════════
function Footer() {
  return (
    <Section id="contact">
      <footer style={{ padding: "clamp(40px, 8vw, 120px) clamp(24px, 8vw, 120px)", borderTop: "1px solid var(--border)", maxWidth: "1200px", margin: "0 auto" }}>
        <SectionLabel index="03" label="Contact" />
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "40px" }}>
          <div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400, color: "var(--text-primary)", marginBottom: "12px" }}>Let's build something.</h2>
            <a href={`mailto:${CONFIG.email}`} style={{ fontFamily: "var(--mono)", fontSize: "14px", color: "#c43e3e", textDecoration: "none", borderBottom: "1px solid #c43e3e", paddingBottom: "2px" }}>{CONFIG.email}</a>
          </div>
          <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.15em" }}>© {CONFIG.year} {CONFIG.name} — ALL RIGHTS RESERVED</p>
        </div>
      </footer>
    </Section>
  );
}

// ══════════════════════════════════════════════════════════════
// DATA RAIN — Word-based canvas rain with interactive mouse masking
// ══════════════════════════════════════════════════════════════
const RAIN_WORDS = [
  // Writing & Theatre
  "script", "dialogue", "monologue", "draft", "revision", "stage", "curtain",
  "playwright", "understudy", "blocking", "cue", "act", "scene", "prompt",
  "narrative", "stanza", "verse", "prose", "essay", "fiction", "chorus",
  "sonnet", "lyric", "refrain", "epilogue", "prologue", "climax", "denouement",
  "metaphor", "imagery", "voice", "tone", "rhythm", "cadence", "subtext",
  // Technology & Code
  "function", "render", "deploy", "commit", "merge", "compile", "debug",
  "async", "await", "return", "export", "import", "const", "class",
  "module", "array", "object", "string", "boolean", "null", "undefined",
  "algorithm", "tensor", "neural", "model", "dataset", "epoch", "gradient",
  "canvas", "shader", "vertex", "pixel", "vector", "matrix", "kernel",
  "query", "schema", "index", "node", "graph", "tree", "stack",
  // Creative Technology
  "generative", "procedural", "interactive", "immersive", "responsive",
  "biometric", "sentiment", "topology", "heuristic", "stochastic",
  "synthesis", "resonance", "frequency", "amplitude", "waveform",
  "projection", "installation", "archive", "artifact", "signal",
  "data", "stream", "pipeline", "latency", "throughput", "parse",
  // Hybrid / Poetic-Technical
  "ghost", "void", "echo", "drift", "flux", "pulse", "surge",
  "lattice", "fragment", "cipher", "origin", "entropy", "orbit",
  "threshold", "membrane", "catalyst", "spectrum", "static", "relay",
  "protocol", "transmit", "beacon", "index", "carbon", "tender",
];

function DataRain({ pulseRef }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -200, y: -200 });
  const trailRef = useRef([]);
  const streamsRef = useRef([]);
  const animRef = useRef(null);
  const lastTimeRef = useRef(0);
  const pulseIntensityRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const FONT_SIZE = 12;
    const CHAR_HEIGHT = 15;
    const MASK_RADIUS = 100;
    const TRAIL_LENGTH = 8;
    const DROP_SPEED_MIN = 0.25;
    const DROP_SPEED_MAX = 0.9;
    const STREAM_GAP = 6;

    // Expose pulse trigger
    if (pulseRef) {
      pulseRef.current = () => { pulseIntensityRef.current = 1.0; };
    } // px gap between words in a stream

    // Build a word stream: a vertical column of stacked words
    function buildStream() {
      const words = [];
      const count = 4 + Math.floor(Math.random() * 6);
      for (let i = 0; i < count; i++) {
        words.push(RAIN_WORDS[Math.floor(Math.random() * RAIN_WORDS.length)]);
      }
      return words;
    }

    // Measure total height of a stream
    function streamHeight(words) {
      return words.reduce((h, w) => h + w.length * CHAR_HEIGHT + STREAM_GAP, 0);
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);

      // Create streams spaced across the viewport
      const w = window.innerWidth;
      const existing = streamsRef.current;
      const spacing = Math.max(FONT_SIZE * 5, 65);
      const streamCount = Math.floor(w / spacing);
      const streams = [];

      for (let i = 0; i < streamCount; i++) {
        if (existing[i]) {
          streams.push(existing[i]);
        } else {
          const words = buildStream();
          streams.push({
            x: i * spacing + Math.random() * spacing * 0.4,
            y: -Math.random() * window.innerHeight * 2,
            speed: DROP_SPEED_MIN + Math.random() * (DROP_SPEED_MAX - DROP_SPEED_MIN),
            words,
            height: streamHeight(words),
            brightness: 0.1 + Math.random() * 0.12,
          });
        }
      }
      streamsRef.current = streams;
    }

    resize();
    window.addEventListener("resize", resize);

    function onMouseMove(e) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      const trail = trailRef.current;
      trail.unshift({ x: e.clientX, y: e.clientY });
      if (trail.length > TRAIL_LENGTH) trail.length = TRAIL_LENGTH;
    }
    window.addEventListener("mousemove", onMouseMove);

    function animate(timestamp) {
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Pulse decay
      const pulse = pulseIntensityRef.current;
      if (pulse > 0) {
        pulseIntensityRef.current = Math.max(0, pulse - delta * 0.0008);
      }

      const w = window.innerWidth;
      const h = window.innerHeight;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const trail = trailRef.current;

      ctx.fillStyle = pulse > 0.3 ? `rgba(10, 10, 10, ${0.06 + (1 - pulse) * 0.06})` : "rgba(10, 10, 10, 0.12)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${FONT_SIZE}px 'JetBrains Mono', 'Courier New', monospace`;
      ctx.textBaseline = "top";

      const streams = streamsRef.current;

      for (let s = 0; s < streams.length; s++) {
        const stream = streams[s];
        const speedBoost = pulse > 0 ? 1 + pulse * 2.5 : 1;
        stream.y += stream.speed * (delta * 0.06) * speedBoost;

        // Reset when fully off screen
        if (stream.y > h + 50) {
          stream.words = buildStream();
          stream.height = streamHeight(stream.words);
          stream.y = -stream.height - Math.random() * 400;
          stream.speed = DROP_SPEED_MIN + Math.random() * (DROP_SPEED_MAX - DROP_SPEED_MIN);
          stream.brightness = 0.1 + Math.random() * 0.12;
        }

        // Render each word vertically (one character per line)
        let offsetY = 0;

        for (let wi = 0; wi < stream.words.length; wi++) {
          const word = stream.words[wi];
          const isLastWord = wi === stream.words.length - 1;

          for (let ci = 0; ci < word.length; ci++) {
            const charY = stream.y + offsetY + ci * CHAR_HEIGHT;
            if (charY < -CHAR_HEIGHT || charY > h + CHAR_HEIGHT) continue;

            const charX = stream.x;

            // Mouse + trail masking
            let minDist = Math.hypot(charX - mx, charY - my);
            for (let t = 0; t < trail.length; t++) {
              const tp = trail[t];
              const tdist = Math.hypot(charX - tp.x, charY - tp.y);
              const trailRadius = MASK_RADIUS * (1 - t / trail.length * 0.6);
              if (tdist < trailRadius && tdist < minDist) {
                minDist = tdist;
              }
            }

            if (minDist < MASK_RADIUS * 0.5) continue;

            let alpha = stream.brightness + pulse * 0.25;

            if (minDist < MASK_RADIUS) {
              alpha *= (minDist - MASK_RADIUS * 0.5) / (MASK_RADIUS * 0.5);
            }

            // Last character of the last word glows brightest (leading edge)
            const isLeading = isLastWord && ci === word.length - 1;
            if (isLeading) {
              alpha = Math.min(alpha * 3.5, 0.85);
              // During pulse, leading chars flash red-shifted
              if (pulse > 0.2) {
                const r = Math.floor(196 * pulse);
                ctx.fillStyle = `rgba(${r}, ${Math.floor(255 - pulse * 100)}, ${Math.floor(136 - pulse * 80)}, ${alpha})`;
              } else {
                ctx.fillStyle = `rgba(0, 255, 136, ${alpha})`;
              }
            } else {
              const streamProgress = (offsetY + ci * CHAR_HEIGHT) / stream.height;
              const g = Math.floor(170 + streamProgress * 85);
              const b = Math.floor(50 + streamProgress * 86);
              // During pulse, shift all chars slightly toward red
              if (pulse > 0.1) {
                const r = Math.floor(80 * pulse);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
              } else {
                ctx.fillStyle = `rgba(0, ${g}, ${b}, ${alpha})`;
              }
            }

            ctx.fillText(word[ci], charX, charY);
          }

          offsetY += word.length * CHAR_HEIGHT + STREAM_GAP;
        }
      }

      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", inset: 0, zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════════
export default function Portfolio() {
  const [modalItem, setModalItem] = useState(null);
  const [modalKind, setModalKind] = useState(null);
  const rainPulseRef = useRef(null);

  const openWork = useCallback((work) => { setModalItem(work); setModalKind("work"); }, []);
  const openProject = useCallback((project) => { setModalItem(project); setModalKind("project"); }, []);
  const closeModal = useCallback(() => { setModalItem(null); setModalKind(null); }, []);

  const handleBotSpeak = useCallback(() => {
    rainPulseRef.current?.();
  }, []);

  return (
    <div className="scanlines noise-bg">
      <style>{GLOBAL_STYLES}</style>
      <DataRain pulseRef={rainPulseRef} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <Nav />
        <ArchiveTerminal onBotSpeak={handleBotSpeak} />
        <Library onOpen={openWork} />
        <Lab onOpen={openProject} />
        <Footer />
      </div>
      <DetailModal item={modalItem} kind={modalKind} onClose={closeModal} />
    </div>
  );
}
