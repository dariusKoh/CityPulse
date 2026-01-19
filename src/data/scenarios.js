export const SCENARIOS = [
  {
    id: "standard",
    title: "Standard Game (DMP2025)",
    description: "Balance all 4 key resources: Land, Budget, Health, and Happiness.",
    modifiers: {},
    priorityCards: [] // No specific priority
  },
  {
    id: "silver_tsunami",
    title: "Silver Tsunami",
    description: "By 2030, 1 in 4 Singaporeans will be over 65. Can you adapt?",
    modifiers: {
      health: 40 // Start with lower health
    },
    priorityCards: [1, 18, 8, 20, 29] // 10-Min Hood, Smart Sensors, Identity Corridor, Recreation, Heat Resilience
  },
  {
    id: "climate_siege",
    title: "Climate Siege",
    description: "Sea levels are rising. 'Long Island' is not an option, it's a necessity.",
    modifiers: {
      budget: 80 // Start with slightly less budget due to defense spending
    },
    priorityCards: [7, 15, 16, 28, 29] // Long Island, District Cooling, Eco Corridors, Agri-Food, Heat Resilience
  }
];
