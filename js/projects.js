// ============================================================
//  LG-DEV ARCHIVE — projects.js
//  ✏️  Ajoute / modifie tes projets ici.
//
//  Champs disponibles :
//    id, title, tagline, description, descriptionLong,
//    accentColor, coverImage, screenshots[], videoUrl,
//    technologies[], role, platform, year, status,
//    tags[], links{ itchio, github, website, trailer, download }
// ============================================================

const PROJECTS = [
  {
    id: "project-loiicbettercables",
    title: "LoiicBetterCables",
    tagline: "Advanced Rope & Cable Simulation Plugin for Unreal Engine 5.6",

    description: "A gameplay-oriented cable simulation plugin extending Unreal Engine's default Cable Component with advanced attachment, collision, interaction, and optimization systems for rope-based mechanics.",

    descriptionLong: "Originally developed during the production of Sunward, LoiicBetterCables was created to support advanced rope gameplay systems such as rope swings, grappling hooks, slacklines, climbing ropes, and dynamic tether mechanics. Built on a Verlet Integration solver, the plugin provides custom attachment points, high-precision collisions, overlap events, runtime cable length modification, force application along the cable, and an experimental modular mesh rendering system. Designed with both programmers and designers in mind, all major features are fully exposed to Blueprints.",

    accentColor: "#E67E22",
    coverImage: "images/Test.png",
    screenshots: ["images/Test.png", "images/Test.png","images/Test.png", "images/Test.png","images/Test.png", "images/Test.png"],
    videoUrl: "https://youtu.be/6GrBPunArmA",
    technologies: [
        "Unreal Engine 5.6",
        "C++",
        "Blueprints",
        "Visual Studio 2022"
    ],
    role: "Plugin Developer — Architecture, Physics Programming, Gameplay Systems, Optimization",
    platform: "Unreal Engine Plugin",
    year: "2025-2026",
    status: "ACTIVE DEVELOPMENT",
    tags: [
        "Plugin",
        "Unreal Engine",
        "Physics",
        "3D",
        "C++",
        "Blueprints"
    ],
    links: {
        github: "https://github.com/Harull/LoiicBetterCables",
    }
  },
  {
    id: "project-portalplusplus",

    title: "Portal2++",

    tagline: "A Student Puzzle Prototype Exploring EaseBounce-Driven Interactions",

    description: "Originally developed as an Objectif3D exercise, Portal2++ is a short puzzle game inspired by Portal that explores the creative use of the EaseBounce interpolation method across gameplay and presentation.",

    descriptionLong: "Created in a team of two over three days, Portal2++ began as a challenge to build a project around the EaseBounce function. Rather than limiting its use to a single feature, we integrated it throughout the entire experience to establish a consistent visual and gameplay identity. Inspired by Portal's puzzle design, the project combines environmental puzzles, dynamic interactions, and traversal mechanics. EaseBounce drives door animations, UI transitions, light flickering effects, and Aerial Faith Plate behaviors, demonstrating how a single technical concept can influence the feel of an entire game. As Gameplay Programmer, I was responsible for player movement systems and several gameplay mechanics.",

    accentColor: "#F39C12",

    coverImage: "",

    screenshots: [],

    videoUrl: "https://youtu.be/8eAtsNB623o",

    technologies: [
        "Unity 2023.2.20f1",
        "C#",
        "Visual Studio 2022"
    ],

    role: "Gameplay Programmer — Player Controller, Movement Systems, Aerial Faith Plates, Gameplay Features",

    platform: "PC",

    year: "2024-2025",

    status: "COMPLETED",

    tags: [
        "Game",
        "Gameplay Programming",
        "Puzzle",
        "Unity",
        "Prototype",
        "C#",
        "3D",
        "3C"
    ],

    links: {
        github: "https://github.com/Harull/GroupProjectPortal"
    }
  },
  {
      id: "project-sunward",

      title: "Sunward",

      tagline: "A Contemplative Third-Person Adventure Built Around Exploration and Traversal",

      description: "A 9-month student production project combining exploration, environmental puzzles, traversal mechanics, and atmospheric storytelling in a large third-person world.",

      descriptionLong: "Sunward is a collaborative production project developed over nine months by a multidisciplinary team of programmers, game designers, artists,\
      animators, and riggers. The game focuses on contemplation, exploration, traversal, and environmental puzzles, encouraging players to discover the world through movement and curiosity.\
      As a Gameplay Programmer, I worked on several core gameplay systems including rope swinging, grappling hook traversal, slackline mechanics, a complete railway transportation system,\
      interaction systems, character animation integration, inverse kinematics, UI programming, and various gameplay features. Many traversal mechanics were powered by LoiicBetterCables,\
      a custom Unreal Engine plugin I developed specifically to support advanced rope-based gameplay. I also designed and implemented the entire railway framework,\
      including rail connectors, spline-based tracks, railway vehicles, and traversal logic.",

      accentColor: "#F5A623",

      coverImage: "",

      screenshots: [],

      videoUrl: "https://www.youtube.com/watch?v=3GC9WdNLnZc",

      technologies: [
          "Unreal Engine 5.6",
          "C++",
          "Blueprints",
          "Lumen",
          "Nanite",
          "Animation Blueprint",
          "Inverse Kinematics",
          "Control rig",
          "Spline Systems",
          "Physics Systems",
          "3D",
          "P4V",
          "Hacknplan"
      ],

      role: "Gameplay Programmer — Traversal Systems, Railway System, Rope Mechanics, Character Animation Integration, IK, UI Programming",

      platform: "PC",

      year: "2026",

      status: "IN DEVELOPMENT",

      tags: [
          "Game",
          "Gameplay Programming",
          "Third Person",
          "Exploration",
          "Platformer",
          "Puzzle",
          "Unreal Engine",
          "C++",
          "Blueprints",
          "3D"
      ],

      links: {
          github: "https://github.com/harull/sunward"
      }
  },
  {
    id: "project-celeste-recreation",

    title: "Celeste Recreation",

    tagline: "Recreating Celeste's Platforming in Native C++",

    description: "A student project focused on recreating the movement, collision, and gameplay feel of Celeste using native C++ and SFML.",

    descriptionLong: "Developed over approximately two-three weeks as a team project, this recreation aimed to reproduce the responsiveness and precision that make Celeste's platforming so satisfying. Built entirely in native C++ using SFML, the project features a custom player controller, collision system, and platforming mechanics designed to match the feel of the original game. My primary contributions focused on player movement, collision detection and resolution, and the implementation of core gameplay mechanics.",

    accentColor: "#6A5ACD",

    coverImage: "",

    screenshots: [],

    videoUrl: "https://youtu.be/wGeYyj__BWA",

    technologies: [
        "C++",
        "SFML",
        "Visual Studio",
        "Gameplay Programming",
        "Collision Systems"
    ],

    role: "Gameplay Programmer — Player Controller, Movement Systems, Collision Detection, Core Gameplay Mechanics",

    platform: "PC",

    year: "2024",

    status: "COMPLETED",

    tags: [
	      "Game",
        "Gameplay Programming",
        "Platformer",
        "C++",
        "SFML",
        "Gameplay Programming",
	      "2D",
        "3C"
    ],

    links: {
        github: "https://github.com/Harull/Celeste"
    }
  },
  {
    id: "project-of-an-insane-granny-lol",
    title: "SUPER GRANNY RACING 2 LUXE EDITION",
    tagline: "Multiplayer Grocery Chaos Racing",
    description: "A chaotic multiplayer racing prototype where players control grandmothers pushing shopping carts through a supermarket. The goal is to complete a shopping list in the correct order and reach the checkout before opponents.",
    descriptionLong: "Super Granny Racing 2 Luxe Edition is a 2-week Unreal Engine 5.6 multiplayer prototype created as a learning exercise focused on online gameplay systems. The game turns a supermarket into a competitive arena where players race to collect grocery items in a specific order while using physics-driven shopping carts to bump, disrupt, and outmaneuver opponents.\n\nThe project was primarily built to explore Unreal Engine multiplayer systems, including replication (RepNotify, RPC), Steam Online Sessions, and networked gameplay logic. It also features third-person character controls with intentionally goofy and heavy movement, reinforcing the chaotic and comedic tone of the gameplay.\n\nBeyond gameplay, the project integrates replicated animations, IK systems for character/cart interaction, and physics-based multiplayer interactions designed to create emergent and unpredictable situations between players.",
    accentColor: "#ffcc66",
    coverImage: "",
    screenshots: [],
    videoUrl: "",
    technologies: [
        "Unreal Engine 5.6",
        "C++",
        "Blueprints",
        "Steam Online Subsystem",
        "Multiplayer Replication",
        "RepNotify",
        "RPC",
        "IK Systems",
        "Physics Interaction"
    ],
    role: "Group Project — Multiplayer Systems, Gameplay Programming, Networking (RPC / Replication), Gameplay Design",
    platform: "PC (Windows)",
    year: "Prototype",
    status: "PROTOTYPE",
    tags: [
	      "Multiplayer",
        "Unreal Engine",
        "Prototype",
        "Game",
	      "Gameplay Programming",
	      "C++",
	      "3D",
	      "Race",
        "Networking",
	      "3C",
	      "Third Person"
    ],
    links: {
        github: "https://github.com/Harull/SuperGrannyRacing"
    }
  },
];
