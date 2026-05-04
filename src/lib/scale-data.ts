export type ScaleCategory =
  | "quantum"
  | "molecular"
  | "life"
  | "human"
  | "planetary"
  | "stellar"
  | "galactic"
  | "cosmic";

export type ScaleObject = {
  id: string;
  name: string;
  size: number;
  sizeLabel: string;
  description: string;
  whyItMatters: string;
  category: ScaleCategory;
};

export const scaleObjects: ScaleObject[] = [
  {
    id: "proton",
    name: "Proton",
    size: 1.7e-15,
    sizeLabel: "≈ 1 × 10⁻¹⁵ m",
    description:
      "A proton is one of the tiny charged cores at the heart of ordinary matter — a minuscule bead with enormous consequences.",
    whyItMatters:
      "Before objects, before surfaces, before life, there is this: fundamental structure, compact and weirdly powerful.",
    category: "quantum",
  },
  {
    id: "atom",
    name: "Atom",
    size: 1.0e-10,
    sizeLabel: "≈ 1 × 10⁻¹⁰ m",
    description:
      "Atoms are the basic letters of matter. Rearrange them and you get water, iron, lungs, planets, cake forks, all of it.",
    whyItMatters:
      "Here, matter begins to have identity. A tiny change in ingredients can change everything.",
    category: "quantum",
  },
  {
    id: "water",
    name: "Water molecule",
    size: 2.8e-10,
    sizeLabel: "≈ 3 × 10⁻¹⁰ m",
    description:
      "Two hydrogens, one oxygen, one iconic little angle. A molecule with scandalous influence.",
    whyItMatters:
      "At this scale, shape becomes destiny. Water's geometry helps make oceans, weather, and life possible.",
    category: "molecular",
  },
  {
    id: "dna",
    name: "DNA double helix",
    size: 2.5e-9,
    sizeLabel: "≈ 2 × 10⁻⁹ m wide",
    description:
      "DNA is a twisted molecular archive carrying instructions for building and maintaining living things.",
    whyItMatters:
      "Information becomes physical here. Life writes its notes in matter.",
    category: "molecular",
  },
  {
    id: "protein",
    name: "Protein",
    size: 5e-9,
    sizeLabel: "≈ 5 × 10⁻⁹ m",
    description:
      "A protein is a folded molecular machine — a soft little contraption built from chemistry and attitude.",
    whyItMatters:
      "This is where chemistry stops being merely ingredients and starts acting like machinery. Woah.",
    category: "molecular",
  },
  {
    id: "virus",
    name: "Virus",
    size: 1.2e-7,
    sizeLabel: "≈ 1 × 10⁻⁷ m",
    description:
      "A virus is a tiny packet of genetic ambition wrapped in protein, unable to reproduce without hijacking a cell.",
    whyItMatters:
      "One of reality's most delicious boundary lines: organized, potent, and almost-but-not-quite alive.",
    category: "life",
  },
  {
    id: "bacterium",
    name: "Bacterium",
    size: 2e-6,
    sizeLabel: "≈ 1 × 10⁻⁶ m",
    description:
      "A bacterium is a complete single-celled organism: small, ancient, resourceful, and wildly successful.",
    whyItMatters:
      "Life does not begin with grandeur. It begins with persistence and a suspicious amount of confidence.",
    category: "life",
  },
  {
    id: "animal-cell",
    name: "Animal cell",
    size: 2e-5,
    sizeLabel: "≈ 1 × 10⁻⁵ m",
    description:
      "A cell is a bustling living chamber where membranes sort, molecules travel, and energy is constantly negotiated.",
    whyItMatters:
      "Here, life becomes organized enough to maintain an inside, an outside, and a plan.",
    category: "life",
  },
  {
    id: "hair",
    name: "Hair width",
    size: 7e-5,
    sizeLabel: "≈ 7 × 10⁻⁵ m",
    description:
      "A strand of hair looks delicate to us, but to cells and microbes it is basically a redwood trunk.",
    whyItMatters:
      "A handy bridge scale — one of the places where the invisible starts brushing against the visible.",
    category: "life",
  },
  {
    id: "human-egg",
    name: "Human egg",
    size: 1.2e-4,
    sizeLabel: "≈ 1 × 10⁻⁴ m",
    description:
      "One of the largest cells in the human body, carrying the materials needed to begin a new organism.",
    whyItMatters:
      "A single cell can hold the opening chapter of an entire human life. Quietly astonishing.",
    category: "life",
  },
  {
    id: "ant",
    name: "Ant",
    size: 5e-3,
    sizeLabel: "≈ 5 × 10⁻³ m",
    description:
      "An ant is a tiny body with a serious work ethic, sensory sophistication, and zero time for nonsense.",
    whyItMatters:
      "At this size, behavior is already rich, coordinated, and surprisingly clever.",
    category: "life",
  },
  {
    id: "human",
    name: "Human",
    size: 1.7,
    sizeLabel: "≈ 1.7 m",
    description:
      "A human stands near the scale where much of daily life feels intuitive: doors, tables, sidewalks, hugs, trouble, wonder.",
    whyItMatters:
      "This is our reference scale — not the center of the universe, but the center of our experience inside it.",
    category: "life",
  },
  {
    id: "blue-whale",
    name: "Blue whale",
    size: 30,
    sizeLabel: "≈ 30 m",
    description:
      "The blue whale is the largest animal known to have ever lived: oceanic, immense, and somehow still graceful.",
    whyItMatters:
      "Life can become absolutely gigantic without losing elegance. Nature did not come to play.",
    category: "life",
  },
  {
    id: "redwood",
    name: "Redwood tree",
    size: 90,
    sizeLabel: "≈ 100 m",
    description:
      "A redwood is a towering column of living wood built from sunlight, water, carbon, and time.",
    whyItMatters:
      "At this scale, a living thing begins to feel architectural — a biological skyscraper with leaves.",
    category: "life",
  },
  {
    id: "skyscraper",
    name: "Skyscraper",
    size: 4e2,
    sizeLabel: "≈ 300 m",
    description:
      "A skyscraper is humanity stacking steel, glass, and audacity into a vertical statement.",
    whyItMatters:
      "Engineering wrestling with gravity and, for the moment, winning.",
    category: "human",
  },
  {
    id: "city",
    name: "City",
    size: 1e4,
    sizeLabel: "≈ 10⁴ m",
    description:
      "A city is more than buildings. It is memory, motion, infrastructure, appetite, invention, and very strong opinions about parking.",
    whyItMatters:
      "At this scale, intelligence goes collective. Minds start networking through streets, systems, and culture.",
    category: "human",
  },
  {
    id: "country",
    name: "Country",
    size: 1e6,
    sizeLabel: "≈ 10⁶ m",
    description:
      "A country is a vast human pattern laid across landscapes, ecosystems, histories, borders, and dreams.",
    whyItMatters:
      "The scale where politics, geography, and identity start doing their complicated dance.",
    category: "human",
  },
  {
    id: "earth",
    name: "Earth",
    size: 1.27e7,
    sizeLabel: "≈ 1.27 × 10⁷ m",
    description:
      "Earth is a rocky, ocean-wrapped world with weather, plate tectonics, and the rather flashy distinction of hosting life that writes poetry and invents soup.",
    whyItMatters:
      "Here, chemistry became biosphere — and eventually, beings able to wonder about it.",
    category: "planetary",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    size: 1.4e8,
    sizeLabel: "≈ 1.4 × 10⁸ m",
    description:
      "Jupiter is the giant of our solar system: striped, stormy, massive, and gloriously overqualified at being a planet.",
    whyItMatters:
      "Planets come in very different moods. Some are places. Some are whole systems of force.",
    category: "planetary",
  },
  {
    id: "sun",
    name: "The Sun",
    size: 1.4e9,
    sizeLabel: "≈ 1.39 × 10⁹ m",
    description:
      "The Sun is a blazing sphere of fusion, turning hydrogen into light, heat, and the patient energy that keeps Earth alive.",
    whyItMatters:
      "At this scale, matter begins to shine. Literally. Big wow.",
    category: "stellar",
  },
  {
    id: "earth-orbit",
    name: "Earth's orbit",
    size: 1.496e11,
    sizeLabel: "≈ 1.5 × 10¹¹ m  ·  1 AU",
    description:
      "The distance from Earth to the Sun. Light, tireless, makes the trip in just over eight minutes.",
    whyItMatters:
      "From here on, every distance in the solar system is measured in copies of this one leap.",
    category: "stellar",
  },
  {
    id: "solar-system",
    name: "Solar System",
    size: 9e12,
    sizeLabel: "≈ 10¹³ m",
    description:
      "The solar system is a gravitational family of planets, moons, asteroids, comets, dust, and wide cold distances.",
    whyItMatters:
      "Orbit becomes the organizing principle. Distance is no longer decoration — it is the whole arrangement.",
    category: "stellar",
  },
  {
    id: "oort-cloud",
    name: "Oort Cloud",
    size: 1.5e16,
    sizeLabel: "≈ 10¹⁶ m",
    description:
      "The Oort Cloud is a vast distant shell of icy bodies at the loose outer frontier of the Sun's influence.",
    whyItMatters:
      "Even our local cosmic neighborhood is much larger and stranger than the tidy textbook diagram suggests.",
    category: "stellar",
  },
  {
    id: "proxima",
    name: "Proxima Centauri",
    size: 4.01e16,
    sizeLabel: "≈ 4 × 10¹⁶ m  ·  4.2 ly",
    description:
      "The closest known star to the Sun — a small red dwarf about four light-years away, with at least one rocky planet in tow.",
    whyItMatters:
      "Our nearest stellar neighbor sits at a distance light takes years to cross. Space is genuinely, almost rudely, big.",
    category: "galactic",
  },
  {
    id: "milky-way",
    name: "Milky Way",
    size: 1e21,
    sizeLabel: "≈ 10²¹ m",
    description:
      "The Milky Way is our home galaxy: a spiral city of stars, gas, dust, dark matter, and ancient light.",
    whyItMatters:
      "A galaxy is what happens when gravity is given a ridiculous amount of matter and time and told to make art.",
    category: "galactic",
  },
  {
    id: "local-group",
    name: "Local Group",
    size: 3e22,
    sizeLabel: "≈ 10²² m",
    description:
      "The Local Group is the small family of galaxies that includes the Milky Way, Andromeda, and many smaller companions.",
    whyItMatters:
      "Galaxies are not lone divas. They gather, tug, orbit, and evolve together.",
    category: "galactic",
  },
  {
    id: "virgo-supercluster",
    name: "Virgo Supercluster",
    size: 1e24,
    sizeLabel: "≈ 10²⁴ m",
    description:
      "A supercluster is a region where many galaxy groups and clusters form part of a larger cosmic structure.",
    whyItMatters:
      "At this scale, the universe starts to reveal texture — not random scatter, but grand arrangement.",
    category: "cosmic",
  },
  {
    id: "cosmic-web",
    name: "Cosmic web",
    size: 3e25,
    sizeLabel: "≈ 10²⁶ m",
    description:
      "The cosmic web is the largest known large-scale pattern in the universe: filaments, clusters, and immense voids stretched across incomprehensible distances.",
    whyItMatters:
      "The universe is not just full of things. It is structured. Even vastness has a design language.",
    category: "cosmic",
  },
  {
    id: "observable-universe",
    name: "Observable universe",
    size: 8.8e26,
    sizeLabel: "≈ 8.8 × 10²⁶ m",
    description:
      "This is the portion of the universe whose light has had time to reach us since cosmic expansion began.",
    whyItMatters:
      "Not necessarily all that exists — just the part the universe has managed to show us so far. Which is, frankly, still quite a flex.",
    category: "cosmic",
  },
];

export const categoryStyles: Record<
  ScaleCategory,
  { glow: string; ring: string; tint: string; label: string; blurb: string }
> = {
  quantum: {
    glow: "rgba(182, 155, 255, 0.55)",
    ring: "rgba(182, 155, 255, 0.35)",
    tint: "#b69bff",
    label: "Microscopic",
    blurb:
      "At the smallest scales, the world is ruled by interaction more than intuition: charge, bonding, shape, probability, and thermal jostling. Matter is busy before it is visible.",
  },
  molecular: {
    glow: "rgba(124, 224, 255, 0.55)",
    ring: "rgba(124, 224, 255, 0.35)",
    tint: "#7ce0ff",
    label: "Molecular",
    blurb:
      "Here, geometry starts calling the shots. Tiny differences in arrangement create huge differences in behavior. A little bend, a giant consequence.",
  },
  life: {
    glow: "rgba(155, 255, 206, 0.55)",
    ring: "rgba(155, 255, 206, 0.35)",
    tint: "#9bffce",
    label: "Biological",
    blurb:
      "Boundaries matter now. Inside and outside appear. Energy gets managed, instructions get read, and life begins keeping house.",
  },
  human: {
    glow: "rgba(255, 217, 156, 0.55)",
    ring: "rgba(255, 217, 156, 0.35)",
    tint: "#ffd99c",
    label: "Human",
    blurb:
      "This is the realm of immediate experience: rooms, roads, faces, tools, trees, weather, voices, and all the scales we evolved to navigate directly.",
  },
  planetary: {
    glow: "rgba(255, 155, 201, 0.55)",
    ring: "rgba(255, 155, 201, 0.35)",
    tint: "#ff9bc9",
    label: "Planetary",
    blurb:
      "Gravity becomes a master sculptor. Atmospheres circulate. Continents drift. Oceans slosh. Climate, geology, and time start collaborating.",
  },
  stellar: {
    glow: "rgba(255, 220, 130, 0.65)",
    ring: "rgba(255, 220, 130, 0.40)",
    tint: "#ffdc82",
    label: "Stellar",
    blurb:
      "Pressure and fusion take center stage. Matter becomes luminous. Energy crosses space in the form of starlight and changes the fate of worlds.",
  },
  galactic: {
    glow: "rgba(200, 170, 255, 0.55)",
    ring: "rgba(200, 170, 255, 0.35)",
    tint: "#c8aaff",
    label: "Galactic",
    blurb:
      "Individual stars blur into larger structure. Now what matters is distribution, clustering, gravity, and the grand architecture of the cosmos.",
  },
  cosmic: {
    glow: "rgba(140, 200, 255, 0.55)",
    ring: "rgba(140, 200, 255, 0.35)",
    tint: "#8cc8ff",
    label: "Cosmic",
    blurb:
      "Galaxies thread along filaments of dark matter — gravity given a ridiculous amount of matter and time, and told to make art.",
  },
};

export const minLog = Math.log10(scaleObjects[0].size) - 0.6;
export const maxLog = Math.log10(scaleObjects[scaleObjects.length - 1].size) + 0.6;

export const thresholdLabels: { atLog: number; label: string; sub: string }[] = [
  { atLog: -10, label: "Entering chemistry", sub: "Matter starts making deals with itself." },
  { atLog: -7, label: "Entering life", sub: "Now the ingredients begin doing tricks." },
  { atLog: -4, label: "Entering the visible world", sub: "Shape, motion, and appetite arrive onstage." },
  { atLog: 0, label: "Entering the human realm", sub: "Tools, language, laughter, skylines." },
  { atLog: 7, label: "Entering the planetary realm", sub: "Gravity clears its throat and takes over." },
  { atLog: 16, label: "Entering deep space", sub: "Distance becomes structure. Emptiness starts showing off." },
];

export const jumpStops: { id: string; label: string }[] = [
  { id: "proton", label: "Subatomic" },
  { id: "atom", label: "Atomic" },
  { id: "dna", label: "Molecular" },
  { id: "animal-cell", label: "Cellular" },
  { id: "human", label: "Human" },
  { id: "earth", label: "Planetary" },
  { id: "sun", label: "Stellar" },
  { id: "earth-orbit", label: "Orbital" },
  { id: "milky-way", label: "Galactic" },
  { id: "observable-universe", label: "Cosmic" },
];
