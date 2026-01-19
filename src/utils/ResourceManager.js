export const INITIAL_STATS = {
  budget: 100,
  land: 100,
  health: 50,
  happiness: 50
};

/**
 * Calculates the new state based on current stats and the card decision.
 * @param {Object} currentStats 
 * @param {Object} card 
 * @param {string} decision 'yes' or 'no'
 * @returns {Object} New stats object
 */
export const calculateNextState = (currentStats, card, decision) => {
  if (!card || !card[decision]) return currentStats;

  const impact = card[decision];
  
  // Calculate new values without clamping first to check for game over triggers if needed
  // But for simple display, we clamp 0-100.
  // Game Over logic should be checked separately or we can flag it here.
  
  const newStats = {
    budget: currentStats.budget + (impact.budget || 0),
    land: currentStats.land + (impact.land || 0),
    health: currentStats.health + (impact.health || 0),
    happiness: currentStats.happiness + (impact.happiness || 0)
  };

  // Clamp values between 0 and 100
  Object.keys(newStats).forEach(key => {
    newStats[key] = Math.max(0, Math.min(100, newStats[key]));
  });

  return newStats;
};

/**
 * Checks if the game should end early (e.g. bankruptcy).
 * @param {Object} stats 
 * @returns {boolean}
 */
export const checkGameOver = (stats) => {
  // Example: If budget or land hits 0, maybe soft game over? 
  // For now, we won't force end, but we could return true if critical.
  // Game Over if fundamental resources are depleted
  return stats.budget <= 0 || stats.health <= 0 || stats.happiness <= 0;
};
