export const CARDS = [
  {
    id: 1,
    type: 'choice',
    title: "New Cycling Path",
    description: "Build a network of cycling paths to connect parks.",
    image: "cycling_path",
    color: "#10b981",
    sticker: "bike",
    advisor: {
      character: "BioMed Expert",
      text: "Active mobility reduces chronic diseases by 15%. This is a high-value health investment."
    },
    yes: { budget: -10, land: -5, health: 15, happiness: 10 },
    no: { budget: 0, land: 0, health: -5, happiness: -5 }
  },
  {
    id: 2,
    type: 'choice',
    title: "Mega Shopping Mall",
    description: "Construct a large retail complex for shopping and dining.",
    image: "shopping_mall",
    color: "#3b82f6",
    sticker: "mall",
    yes: { budget: -30, land: -20, health: -5, happiness: 20 },
    no: { budget: 0, land: 0, health: 0, happiness: -5 }
  },
  {
    id: 3,
    type: 'choice',
    title: "Community Hospital",
    description: "Build a new hospital to serve the aging population.",
    image: "hospital",
    color: "#ef4444", 
    sticker: "hospital",
    advisor: {
      character: "Social Planner",
      text: "Our population is aging rapidly. Without this, healthcare capacity will be breached by 2030."
    },
    yes: { budget: -40, land: -15, health: 30, happiness: 5 },
    no: { budget: 0, land: 0, health: -20, happiness: -10 }
  },
  {
    id: 4,
    type: 'choice',
    title: "Tech Park",
    description: "Develop a high-tech industrial park for jobs.",
    image: "tech_park",
    color: "#8b5cf6",
    sticker: "factory",
    yes: { budget: -20, land: -30, health: 0, happiness: 10 }, 
    no: { budget: 0, land: 0, health: 0, happiness: -5 }
  },
  {
    id: 5,
    type: 'press_conference',
    title: "Press Conference",
    description: "Residents are asking about the lack of green spaces in the downtown area. What is your plan?",
    image: "microphone",
    color: "#f59e0b",
    bonusScore: 500
  },
  {
    id: 6,
    type: 'choice',
    title: "Public Housing",
    description: "Build high-density affordable housing blocks.",
    image: "hdb_blocks",
    color: "#f97316",
    sticker: "building",
    yes: { budget: -25, land: -15, health: 0, happiness: 15 },
    no: { budget: 0, land: 0, health: -5, happiness: -20 }
  },
  {
    id: 7,
    type: 'choice',
    title: "Nature Reserve",
    description: "Gazette a plot of land as a protected nature reserve.",
    image: "forest",
    color: "#22c55e",
    sticker: "tree",
    advisor: {
      character: "Eco-Biologist",
      text: "Green lungs are critical for mental health and cooling the city. Do not underestimate this."
    },
    yes: { budget: -5, land: -40, health: 20, happiness: 10 },
    no: { budget: 0, land: 0, health: -5, happiness: -5 }
  },
  {
    id: 8,
    type: 'choice',
    title: "Expressway Expansion",
    description: "Widen the main expressway to reduce traffic jams.",
    image: "highway",
    color: "#64748b",
    sticker: "road",
    yes: { budget: -50, land: -20, health: -10, happiness: 10 },
    no: { budget: 0, land: 0, health: 0, happiness: -15 }
  },
  {
    id: 9,
    type: 'choice',
    title: "Sports Complex",
    description: "Build a stadium and swimming pool for the community.",
    image: "stadium",
    color: "#0ea5e9",
    sticker: "stadium",
    yes: { budget: -25, land: -20, health: 25, happiness: 15 },
    no: { budget: 0, land: 0, health: -10, happiness: -5 }
  },
  {
    id: 10,
    type: 'press_conference',
    title: "Final Review",
    description: "The term is ending. Is there any specific demographic you think was neglected?",
    image: "clipboard",
    color: "#ec4899",
    bonusScore: 500
  }
];
