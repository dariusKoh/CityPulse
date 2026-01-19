export const SCENARIOS = [
  {
    id: "standard",
    title: "Standard Game (DMP2025)",
    description: "Resources are scarce. Budget does not regenerate. 15-year cycle.",
    modifiers: {
      budget: 80,       // Start with less money
      budget_drain: 2,  // Lose 2 budget every turn (Inflation/Maintenance)
      land_cap: 100     // Hard cap on land
    },
    priorityCards: []
  },
  {
    id: "silver_tsunami",
    title: "Silver Tsunami",
    description: "By 2030, 1 in 4 Singaporeans will be over 65. Healthcare is critical.",
    modifiers: {
      budget: 70,       // Even less budget due to healthcare costs
      health: 40,       // Start with lower health
      budget_drain: 3,  // Higher drain (healthcare spending)
      land_cap: 100
    },
    priorityCards: [1, 18, 8, 20, 29, 101] // Include Community Care Apartments
  },
  {
    id: "climate_siege",
    title: "Climate Siege",
    description: "Sea levels are rising. 'Long Island' is not an option, it's a necessity.",
    modifiers: {
      budget: 60,         // Tight budget due to crisis spending
      health: 30,         // Start sick from pollution
      budget_drain: 2,
      land_cap: 100,
      crisis_frequency: 1.5  // Crises happen 50% more often
    },
    priorityCards: [7, 15, 16, 28, 29, 102] // Include Wind Corridors
  }
];

