/**
 * Crisis Configuration for CityPulse v4.0
 * 
 * Defines crisis types, their triggers, penalties, and solution cards.
 * Crises now persist as status effects until resolved.
 */

export const CRISIS_TYPES = {
  flood: {
    id: 'flood',
    title: 'Sumatra Squall',
    description: 'Flash floods overwhelm the drainage network. Streets are submerged.',
    icon: '🌧️',
    penalties: { happiness: -10, budget: -5 },
    visualType: 'flood',
    triggerProbability: 0.15,
    solutionCards: [30], // ABC Waters
    educationalNote: 'Singapore faces increasing flood risks from intense rainfall. The ABC Waters program naturalizes canals to improve drainage.'
  },
  heatwave: {
    id: 'heatwave',
    title: 'Urban Heat Island',
    description: 'Temperatures soar to dangerous levels. The city is baking.',
    icon: '🔥',
    penalties: { health: -10, budget: -5 },
    visualType: 'heatwave',
    triggerProbability: 0.12,
    solutionCards: [31, 32, 102], // Wind Corridor (original + DMP2025 version), District Cooling
    educationalNote: 'Urban areas can be 4-7°C hotter than surrounding green spaces due to concrete and heat-generating activities.'
  },
  supply_shock: {
    id: 'supply_shock',
    title: 'Supply Chain Shock',
    description: 'Global disruptions threaten food security. Prices skyrocket.',
    icon: '📦',
    penalties: { happiness: -15 },
    visualType: 'supply_shock',
    triggerProbability: 0.08,
    solutionCards: [33], // Vertical Farms
    educationalNote: 'Singapore imports over 90% of its food. The 30-by-30 goal aims to produce 30% locally by 2030.'
  }
};

// Scenario-specific crisis probability multipliers
export const SCENARIO_CRISIS_WEIGHTS = {
  standard: { flood: 1, heatwave: 1, supply_shock: 1 },
  climate_siege: { flood: 2.5, heatwave: 2, supply_shock: 1 },
  silver_tsunami: { flood: 1, heatwave: 1.5, supply_shock: 1.5 }
};

/**
 * Get a random crisis based on scenario weights
 * @param {string} scenarioId - Current scenario ID
 * @param {string[]} activeCrisisTypes - Currently active crisis types to avoid duplicates
 * @returns {object|null} Crisis config or null if no crisis triggers
 */
export const rollForCrisis = (scenarioId = 'standard', activeCrisisTypes = []) => {
  const weights = SCENARIO_CRISIS_WEIGHTS[scenarioId] || SCENARIO_CRISIS_WEIGHTS.standard;
  
  // Check each crisis type
  for (const [crisisId, config] of Object.entries(CRISIS_TYPES)) {
    // Skip if already active
    if (activeCrisisTypes.includes(crisisId)) continue;
    
    const adjustedProbability = config.triggerProbability * (weights[crisisId] || 1);
    
    if (Math.random() < adjustedProbability) {
      return { ...config };
    }
  }
  
  return null;
};

/**
 * Check if a card is a solution for any active crisis
 * @param {object} card - Card object
 * @param {string[]} activeCrisisTypes - Active crisis types
 * @returns {string|null} Crisis type it solves or null
 */
export const checkCardSolvesCrisis = (card, activeCrisisTypes) => {
  if (card.type !== 'solution' || !card.resolves) return null;
  
  if (activeCrisisTypes.includes(card.resolves)) {
    return card.resolves;
  }
  
  return null;
};
