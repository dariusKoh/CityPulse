# CityPulse v4.1

**Project Title**: CityPulse: The "Happy, Healthy City" Simulator
**Concept**: A visceral urban planning simulation that transforms the **Draft Master Plan 2025 (DMP2025)** engagement from a passive survey into an active, high-stakes strategy game.

Instead of just asking youth what they want, CityPulse puts them in the seat of a URA planner during a crisis, challenging them to balance **Budget, Land, Health, and Happiness** while navigating real-world trade-offs.

---

## What's New in v4.1: "Positive Spin & Player Aid"

Version 4.1 deepens the strategic difficulty by making "Bad Cards" deceptive and adds in-game help.

### 1. 🎭 "Positive Spin" Advisors
Advisors now act as "Devil's Advocates" for bad policies, tempting you with short-term gains (e.g., "Build Concrete Canals for efficiency") to hide long-term failures. You must read between the lines!

### 2. 📖 How to Play System
New in-game tutorial modal explaining the Core Loop, Crisis Engine, and Winning Conditions. Accessible anytime via the top-left icon.

### 3. 🌍 Scenario Modes (from v4.0)
*   **The Standard Run**: Balanced gameplay.
*   **The Silver Tsunami**: Manage an aging population.
*   **Climate Siege**: Survive rising sea levels.

### 4. ⚡ Persistent Crisis System (from v4.0)
Crises like **Flash Floods** persist until you find and deploy specific **Solution Cards**.

---

## Core Gameplay Loop

1.  **Swipe to Decide**: Approve (Right) or Reject (Left) proposed developments.
2.  **Manage Resources**: Every decision impacts your Budget ($), Land Usage (%), Public Health, and Happiness.
3.  **Survive Crises**: When the screen turns red, look for **Solution Cards** to save the city.
4.  **Audit Your Impact**: After 15 turns, receive a graded **Performance Review** based on your "ImpactLedger".

---

## Documentation

Detailed breakdowns of the game mechanics can be found in `project_meta/`:
- **[v4.1 Features Update](project_meta/4.1%20features.md)**
- **[Card Database](docs/CARDS.md)**
- **[Scenario Guide](docs/SCENARIOS.md)**

---

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

    The app should build on ``port:5173`` (or similar), e.g., http://localhost:5173/CityPulse/

3.  **Build for Production**:
    ```bash
    npm run build
    ```
