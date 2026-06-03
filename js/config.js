// ============================================================
//  LG-DEV ARCHIVE — config.js
//  ✏️  Toute ta configuration personnelle est ici.
//  Tu n'as jamais besoin de toucher au HTML ou aux autres JS.
// ============================================================

const CONFIG = {

  // ── Identité ──────────────────────────────────────────────
  name:       "Loïc Giacosa",
  alias:      "LG-DEV / Haru",
  role:       "Game Developer · Unreal Engine Specialist",
  email:      "loicgiacosa@gmail.com",
  location:   "France",
  yearsXp:    "2+",

  // ── Bio affichée sur l'écran About de la console ──────────
  bio: "Passionate game developer with a focus on immersive, systems-driven experiences built with Unreal Engine 5. From horror shooters to procedural open worlds — I craft the mechanics, the atmosphere, and the code.",

  // ── Skills affichés dans l'écran About ───────────────────
  skills: [
    "Blueprints", "Lumen", "Nanite", "Niagara",
    "PCG", "MetaSounds", "Chaos", "C++", "FMOD",
  ],

  // ── Stats affichées dans l'écran About ───────────────────
  // { value, label } — 4 entrées recommandées
  stats: [
    { value: null,  label: "PROJECTS" },   // null = auto-compté depuis PROJECTS[]
    { value: "UE5", label: "PRIMARY ENGINE" },
    { value: "C++", label: "MAIN LANGUAGE" },
    { value: "2+",  label: "YEARS XP" },
  ],

  // ── Liens sociaux (sidenav) ───────────────────────────────
  links: {
    github:   "https://https://github.com/harull/",
    linkedin: "https://www.linkedin.com/in/giacosa-loic/",
    email:    "mailto:loic@giacosa.dev",
    itchio:   "https://itch.io/",
    cv:       "#",                          // TODO mettre CV pdf ici
  },

  // ── Footer terminal — phrases qui défilent ─────────────────
  terminalLines: [
    "> sys.status: ONLINE",
    "> engine: Unreal Engine 5",
    "> lang: C++ / Blueprints",
    "> location: France",
    "> status: open to work",
    "> portfolio.load() OK",
  ],

  // ── Texte du header ───────────────────────────────────────
  headerTitle:  "LG-DEV ARCHIVE",
  footerBuild:  "BUILD 2025.01 // UNREAL ENGINE PORTFOLIO",
};
