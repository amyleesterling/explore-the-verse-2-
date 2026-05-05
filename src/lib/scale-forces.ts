export type ForceId =
  | "strong_force"
  | "weak_force"
  | "electromagnetism"
  | "chemical_bonding"
  | "thermal_motion"
  | "diffusion"
  | "fluid_dynamics"
  | "gravity"
  | "orbital_motion"
  | "plasma"
  | "dark_matter"
  | "expansion"
  | "information"
  | "biological_feedback"
  | "mechanics";

export type ForceDefinition = {
  id: ForceId;
  label: string;
  shortLabel: string;
  icon: string;
  domain: "particle" | "atomic" | "molecular" | "life" | "human" | "planetary" | "cosmic" | "conceptual";
  description: string;
  visualMetaphor: string;
  overlayHint: string;
};

export type ScaleModelSource = {
  label: string;
  url: string;
  licenseNote: string;
};

export type ScaleObjectModel = {
  status: "placeholder" | "candidate" | "ready";
  path: string;
  source: ScaleModelSource;
  credit: string;
};

export type ScaleObject3D = {
  id: string;
  title: string;
  subtitle: string;
  scaleMeters: number;
  scaleLabel: string;
  category: "quantum" | "atomic" | "molecular" | "life" | "human" | "planetary" | "stellar" | "galactic" | "cosmic";
  objectKind: "real-model" | "procedural-icon" | "hybrid";
  model: ScaleObjectModel;
  forces: ForceId[];
  visualIcon: string;
  hook: string;
  whyItMatters: string;
  interactionPrompt: string;
};

export const FORCE_DEFINITIONS: Record<ForceId, ForceDefinition> = {
  strong_force: {
    id: "strong_force",
    label: "Strong force",
    shortLabel: "Strong",
    icon: "✹",
    domain: "particle",
    description: "The nuclear binding force: tiny range, enormous grip.",
    visualMetaphor: "glowing bands cinched tight around a nucleus",
    overlayHint: "tight pulsing rings near the center of the object"
  },
  weak_force: {
    id: "weak_force",
    label: "Weak force",
    shortLabel: "Weak",
    icon: "⌁",
    domain: "particle",
    description: "The particle-change force behind some forms of radioactive decay.",
    visualMetaphor: "one spark becoming two faint trails",
    overlayHint: "thin branching decay paths"
  },
  electromagnetism: {
    id: "electromagnetism",
    label: "Electromagnetism",
    shortLabel: "EM",
    icon: "↯",
    domain: "atomic",
    description: "Charge, light, chemistry, touch, electricity, magnets: the daily-life superpower.",
    visualMetaphor: "field lines radiating like luminous hair",
    overlayHint: "curved cyan-gold field lines wrapping the model"
  },
  chemical_bonding: {
    id: "chemical_bonding",
    label: "Chemical bonding",
    shortLabel: "Bonds",
    icon: "⌬",
    domain: "molecular",
    description: "Atoms sharing and tugging on electrons to make structure possible.",
    visualMetaphor: "tiny bridges between atoms",
    overlayHint: "short arcs and nodes that connect local parts"
  },
  thermal_motion: {
    id: "thermal_motion",
    label: "Thermal motion",
    shortLabel: "Thermal",
    icon: "∿",
    domain: "molecular",
    description: "Temperature as microscopic motion: everything small is quietly dancing.",
    visualMetaphor: "jittering fireflies around the object",
    overlayHint: "soft random speckles and shimmer"
  },
  diffusion: {
    id: "diffusion",
    label: "Diffusion",
    shortLabel: "Diffusion",
    icon: "⋯",
    domain: "life",
    description: "Small things spreading from crowded regions into open ones.",
    visualMetaphor: "dots drifting from dense cloud to empty space",
    overlayHint: "particles drifting outward along concentration gradients"
  },
  fluid_dynamics: {
    id: "fluid_dynamics",
    label: "Fluid dynamics",
    shortLabel: "Flow",
    icon: "≈",
    domain: "planetary",
    description: "The choreography of flowing air, water, blood, oceans, and plasma.",
    visualMetaphor: "streamlines sliding around a shape",
    overlayHint: "animated contour lines that bend around the object"
  },
  gravity: {
    id: "gravity",
    label: "Gravity",
    shortLabel: "Gravity",
    icon: "◌",
    domain: "cosmic",
    description: "Mass shaping motion, from falling apples to galaxy clusters.",
    visualMetaphor: "a warped grid dipping under weight",
    overlayHint: "broad rings and curved grid lines"
  },
  orbital_motion: {
    id: "orbital_motion",
    label: "Orbital motion",
    shortLabel: "Orbit",
    icon: "◎",
    domain: "planetary",
    description: "Falling sideways forever: the elegant trick of moons, planets, and satellites.",
    visualMetaphor: "clean ellipses around a glowing body",
    overlayHint: "thin rotating orbit tracks"
  },
  plasma: {
    id: "plasma",
    label: "Plasma",
    shortLabel: "Plasma",
    icon: "☼",
    domain: "cosmic",
    description: "Ionized gas: matter with its electrons loosened, bright and stormy.",
    visualMetaphor: "solar filaments and lightning mist",
    overlayHint: "wispy tendrils and corona-like glow"
  },
  dark_matter: {
    id: "dark_matter",
    label: "Dark matter",
    shortLabel: "Dark",
    icon: "◍",
    domain: "cosmic",
    description: "The unseen gravitational scaffolding inferred from how galaxies move.",
    visualMetaphor: "a ghostly halo shaping visible stars",
    overlayHint: "large translucent halos behind visible matter"
  },
  expansion: {
    id: "expansion",
    label: "Cosmic expansion",
    shortLabel: "Expansion",
    icon: "⇱",
    domain: "cosmic",
    description: "Space itself stretching on the largest scales.",
    visualMetaphor: "grid points drifting apart",
    overlayHint: "background lattice slowly spreading outward"
  },
  information: {
    id: "information",
    label: "Information",
    shortLabel: "Info",
    icon: "⟐",
    domain: "conceptual",
    description: "Pattern that can be stored, copied, transmitted, predicted, or remembered.",
    visualMetaphor: "bits becoming constellations",
    overlayHint: "tiny glyphs and dots arranging into lines"
  },
  biological_feedback: {
    id: "biological_feedback",
    label: "Biological feedback",
    shortLabel: "Feedback",
    icon: "⟳",
    domain: "life",
    description: "Living systems sensing, correcting, adapting, and steering themselves.",
    visualMetaphor: "loops that pulse back into themselves",
    overlayHint: "animated circular arrows around networks"
  },
  mechanics: {
    id: "mechanics",
    label: "Mechanics",
    shortLabel: "Mechanics",
    icon: "▱",
    domain: "human",
    description: "Forces, levers, pressure, stiffness, drag, and contact at everyday scales.",
    visualMetaphor: "arrows pushing and balancing",
    overlayHint: "force arrows and contact points"
  }
};

export const SCALE_OBJECTS_3D: ScaleObject3D[] = [
  {
    id: "proton-nucleus",
    title: "Atomic nucleus",
    subtitle: "The furnace knot inside matter",
    scaleMeters: 1e-15,
    scaleLabel: "~10⁻¹⁵ m",
    category: "quantum",
    objectKind: "procedural-icon",
    model: {
      status: "placeholder",
      path: "/models/nucleus.glb",
      source: {
        label: "Procedural / educational placeholder",
        url: "public/models/README.md",
        licenseNote: "Replace with a vetted scientific visualization or procedural Three.js model."
      },
      credit: "Placeholder model slot"
    },
    forces: ["strong_force", "weak_force", "electromagnetism"],
    visualIcon: "✹",
    hook: "Here the strong force is the bouncer at the tiniest nightclub in reality.",
    whyItMatters: "Nuclei decide what elements exist, how stars burn, and what atoms can become.",
    interactionPrompt: "Toggle strong force to see the nucleus cinch inward."
  },
  {
    id: "carbon-atom",
    title: "Atom",
    subtitle: "Mostly emptiness, entirely not boring",
    scaleMeters: 1e-10,
    scaleLabel: "~10⁻¹⁰ m",
    category: "atomic",
    objectKind: "hybrid",
    model: {
      status: "placeholder",
      path: "/models/atom.glb",
      source: {
        label: "Procedural atom model candidate",
        url: "public/models/README.md",
        licenseNote: "Use a stylized educational GLB; exact electron clouds are quantum probability, not little orbiting planets."
      },
      credit: "Placeholder model slot"
    },
    forces: ["electromagnetism", "thermal_motion"],
    visualIcon: "↯",
    hook: "Touch, color, chemistry, lightning — electromagnetism wearing different hats.",
    whyItMatters: "Atoms are the alphabet that chemistry uses to write everything visible.",
    interactionPrompt: "Turn on EM field lines and watch the atom grow a halo of influence."
  },
  {
    id: "dna",
    title: "DNA",
    subtitle: "A twisted ladder with memory baked into matter",
    scaleMeters: 2e-9,
    scaleLabel: "~2 × 10⁻⁹ m wide",
    category: "molecular",
    objectKind: "real-model",
    model: {
      status: "candidate",
      path: "/models/dna.glb",
      source: {
        label: "NIH 3D / RCSB PDB candidate",
        url: "https://3d.nih.gov/ or https://www.rcsb.org/",
        licenseNote: "Confirm exact file license before committing GLB assets."
      },
      credit: "Candidate: NIH 3D or RCSB PDB structure-derived model"
    },
    forces: ["chemical_bonding", "electromagnetism", "thermal_motion", "information"],
    visualIcon: "⌬",
    hook: "A molecule that stores instructions by arranging atoms like an extremely tiny bead poem.",
    whyItMatters: "DNA links molecular forces to inheritance, development, evolution, and memory across generations.",
    interactionPrompt: "Click Information to make the base-pair pattern light up like a code ladder."
  },
  {
    id: "virus",
    title: "Virus",
    subtitle: "A nanoscale package of chemistry with plans",
    scaleMeters: 1e-7,
    scaleLabel: "~10⁻⁷ m",
    category: "life",
    objectKind: "real-model",
    model: {
      status: "candidate",
      path: "/models/virus.glb",
      source: {
        label: "NIH 3D candidate",
        url: "https://3d.nih.gov/",
        licenseNote: "Confirm exact model license and organism specificity before use."
      },
      credit: "Candidate: NIH 3D biomedical model"
    },
    forces: ["chemical_bonding", "thermal_motion", "diffusion", "information"],
    visualIcon: "◈",
    hook: "Not quite alive alone, but absolutely not just dust. Nature loves edge cases.",
    whyItMatters: "Viruses show how information and molecular shape can hijack biological systems.",
    interactionPrompt: "Turn on diffusion to see how random motion becomes encounter and infection risk."
  },
  {
    id: "bacterium",
    title: "Bacterium",
    subtitle: "A one-cell universe with engines",
    scaleMeters: 2e-6,
    scaleLabel: "~2 × 10⁻⁶ m",
    category: "life",
    objectKind: "real-model",
    model: {
      status: "candidate",
      path: "/models/bacterium.glb",
      source: {
        label: "NIH 3D candidate",
        url: "https://3d.nih.gov/",
        licenseNote: "Prefer models with clear attribution and downloadable GLB/STL conversion path."
      },
      credit: "Candidate: NIH 3D biomedical model"
    },
    forces: ["diffusion", "fluid_dynamics", "chemical_bonding", "biological_feedback"],
    visualIcon: "≈",
    hook: "At this scale, water feels thick — swimming is less dolphin, more drilling through honey.",
    whyItMatters: "Microbial life turns physics into metabolism, motion, sensing, and survival.",
    interactionPrompt: "Toggle flow to see streamlines hug the cell body."
  },
  {
    id: "cell",
    title: "Cell",
    subtitle: "A soft machine made of membranes, traffic, and decisions",
    scaleMeters: 2e-5,
    scaleLabel: "~20 µm",
    category: "life",
    objectKind: "real-model",
    model: {
      status: "candidate",
      path: "/models/cell.glb",
      source: {
        label: "NIH 3D candidate",
        url: "https://3d.nih.gov/",
        licenseNote: "Use an educational cell model; label as schematic unless drawn from a specific microscopy dataset."
      },
      credit: "Candidate: NIH 3D biomedical model"
    },
    forces: ["diffusion", "chemical_bonding", "mechanics", "biological_feedback", "information"],
    visualIcon: "⟳",
    hook: "A cell is a bustling moon jelly factory where the walls listen.",
    whyItMatters: "Cells are where molecular randomness becomes organized living behavior.",
    interactionPrompt: "Click Feedback to pulse loops from membrane to nucleus and back."
  },
  {
    id: "neuron",
    title: "Neuron",
    subtitle: "Electric tree, chemical messenger, living cable",
    scaleMeters: 1e-4,
    scaleLabel: "~100 µm soma / far longer branches",
    category: "life",
    objectKind: "real-model",
    model: {
      status: "candidate",
      path: "/models/neuron.glb",
      source: {
        label: "Neuroscience lab / dataset-derived candidate",
        url: "public/models/README.md",
        licenseNote: "Prefer a real reconstructed neuron converted to GLB, with dataset credit."
      },
      credit: "Candidate: real reconstructed neuron"
    },
    forces: ["electromagnetism", "chemical_bonding", "diffusion", "biological_feedback", "information"],
    visualIcon: "⟐",
    hook: "A neuron is a rumor with branches, except the rumor can move your hand.",
    whyItMatters: "Neurons connect physics to sensation, action, memory, and thought.",
    interactionPrompt: "Turn on Information to send a traveling pulse down the branches."
  },
  {
    id: "human-scale",
    title: "Human body",
    subtitle: "A thinking weather system standing upright",
    scaleMeters: 1,
    scaleLabel: "~1 m",
    category: "human",
    objectKind: "hybrid",
    model: {
      status: "candidate",
      path: "/models/human-scale.glb",
      source: {
        label: "NIH 3D anatomy candidate",
        url: "https://3d.nih.gov/",
        licenseNote: "Use a neutral anatomy or silhouette model with clear reuse terms."
      },
      credit: "Candidate: NIH 3D anatomy model"
    },
    forces: ["gravity", "mechanics", "fluid_dynamics", "biological_feedback", "information"],
    visualIcon: "▱",
    hook: "At our scale, gravity becomes obvious and quantum weirdness politely hides under the rug.",
    whyItMatters: "Human-scale intuition is powerful, but it lies beautifully outside its home range.",
    interactionPrompt: "Toggle Mechanics to show balance, pressure, and contact arrows."
  },
  {
    id: "earth",
    title: "Earth",
    subtitle: "A wet spinning rock with weather and opinions",
    scaleMeters: 1.2742e7,
    scaleLabel: "1.2742 × 10⁷ m diameter",
    category: "planetary",
    objectKind: "real-model",
    model: {
      status: "candidate",
      path: "/models/earth.glb",
      source: {
        label: "NASA 3D Resources candidate",
        url: "https://www.nasa.gov/3d-resources/",
        licenseNote: "Use NASA attribution guidance; verify exact asset terms."
      },
      credit: "Candidate: NASA 3D Resources"
    },
    forces: ["gravity", "orbital_motion", "fluid_dynamics", "electromagnetism"],
    visualIcon: "◎",
    hook: "Weather is fluid dynamics with drama lighting.",
    whyItMatters: "Earth-scale physics gives us climate, oceans, seasons, magnetism, and home.",
    interactionPrompt: "Click Flow to see atmosphere and ocean streamlines wrap the planet."
  },
  {
    id: "solar-system",
    title: "Solar system",
    subtitle: "A gravity clock with a star at the center",
    scaleMeters: 1e13,
    scaleLabel: "~10¹³ m",
    category: "stellar",
    objectKind: "procedural-icon",
    model: {
      status: "placeholder",
      path: "/models/solar-system.glb",
      source: {
        label: "NASA 3D Resources candidates for planets and spacecraft",
        url: "https://www.nasa.gov/3d-resources/",
        licenseNote: "Composite scene should credit each source asset."
      },
      credit: "Placeholder model slot"
    },
    forces: ["gravity", "orbital_motion", "plasma", "electromagnetism"],
    visualIcon: "☼",
    hook: "The planets are not sitting there; they are falling with excellent aim.",
    whyItMatters: "Orbital motion lets one star organize worlds, moons, comets, and spacecraft trajectories.",
    interactionPrompt: "Toggle Orbit to make the scale stop show graceful elliptical tracks."
  },
  {
    id: "milky-way",
    title: "Galaxy",
    subtitle: "A star-city in a dark matter halo",
    scaleMeters: 1e21,
    scaleLabel: "~10²¹ m",
    category: "galactic",
    objectKind: "procedural-icon",
    model: {
      status: "placeholder",
      path: "/models/galaxy.glb",
      source: {
        label: "Procedural spiral galaxy placeholder",
        url: "public/models/README.md",
        licenseNote: "Use a procedural point-cloud model or vetted astronomy visualization."
      },
      credit: "Placeholder model slot"
    },
    forces: ["gravity", "dark_matter", "plasma", "information"],
    visualIcon: "◍",
    hook: "A galaxy is a slow-motion storm of stars, gas, dust, and invisible scaffolding.",
    whyItMatters: "Galactic scales reveal gravity as architecture, not just a thing that drops toast.",
    interactionPrompt: "Turn on Dark Matter to reveal the ghost halo shaping the spiral."
  },
  {
    id: "observable-universe",
    title: "Observable universe",
    subtitle: "The edge of the light we can receive",
    scaleMeters: 8.8e26,
    scaleLabel: "~8.8 × 10²⁶ m diameter",
    category: "cosmic",
    objectKind: "procedural-icon",
    model: {
      status: "placeholder",
      path: "/models/observable-universe.glb",
      source: {
        label: "Procedural cosmic web placeholder",
        url: "public/models/README.md",
        licenseNote: "Use procedural visualization; do not imply a literal outside-view photograph."
      },
      credit: "Placeholder model slot"
    },
    forces: ["gravity", "expansion", "dark_matter", "information"],
    visualIcon: "⇱",
    hook: "This is not the edge of everything — it is the edge of the message that has reached us.",
    whyItMatters: "At the largest scales, the story becomes gravity, expansion, time, and what can be known.",
    interactionPrompt: "Toggle Expansion to see the background lattice drift apart."
  }
];

export function formatScalePower(value: number) {
  const exponent = Math.floor(Math.log10(value));
  const mantissa = value / Math.pow(10, exponent);
  return `${mantissa.toFixed(mantissa >= 10 ? 0 : 1)} × 10^${exponent} m`;
}

export function getForceDefinitions(ids: ForceId[]) {
  return ids.map((id) => FORCE_DEFINITIONS[id]);
}
