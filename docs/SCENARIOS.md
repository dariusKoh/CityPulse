# Gameplay Scenarios (v2.0)

CityPulse features dynamic scenarios that change the starting conditions and strategic priorities of the game.

## 1. Standard Game (DMP2025)
- **Description**: The default mode.
- **Objective**: Balance all 4 key resources (Land, Budget, Health, Happiness).
- **Modifiers**: None.
- **Deck**: Randomized selection of 15 cards from the full pool.

## 2. Silver Tsunami (Demographic Crisis)
- **Description**: By 2030, 1 in 4 Singaporeans will be over 65. The healthcare system and social infrastructure are under strain.
- **Objective**: Prioritize social equity and accessibility.
- **Modifiers**:
  - **Health**: Starts at **40** (Low).
- **Priority Cards** (Higher chance to appear):
  - **10-Minute Neighbourhood**: Accessibility.
  - **Smart Sensors**: Elderly monitoring/safety.
  - **Identity Corridor**: Memory anchors/mental well-being.
  - **Recreation Master Plan**: Active aging spaces.
  - **Urban Heat Resilience**: Vulnerable elderly protection.

## 3. Climate Siege (Environmental Crisis)
- **Description**: Sea levels are rising faster than predicted. Adaptation is no longer optional—it is an existential necessity.
- **Objective**: Survive the climate threat while maintaining fiscal responsibility.
- **Modifiers**:
  - **Budget**: Starts at **80** (Reduced due to defense spending).
- **Priority Cards** (Higher chance to appear):
  - **Long Island Reclamation**: The only defense against sea level rise.
  - **District Cooling System**: Mitigating heat.
  - **Ecological Corridors**: Resilience.
  - **Agri-Food Innovation Park**: Food security during disruptions.
  - **Urban Heat Resilience**: Cooling the city.

---

## Scenario Logic
- Scenarios are selected **randomly** at the start of each game (25% chance for Silver Tsunami, 25% for Climate Siege, 50% Standard).
- The deck is constructed by first adding the **Priority Cards** (if any), then filling the rest of the 15 slots with random cards from the pool.
