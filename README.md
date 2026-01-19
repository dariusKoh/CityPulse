# CityPulse v4.0

**Project Title**: CityPulse: The "Happy, Healthy City" Simulator
**Concept**: A visceral urban planning simulation that transforms the **Draft Master Plan 2025 (DMP2025)** engagement from a passive survey into an active, high-stakes strategy game.

Instead of just asking youth what they want, CityPulse puts them in the seat of a URA planner during a crisis, challenging them to balance **Budget, Land, Health, and Happiness** while navigating real-world trade-offs.

---

## What's New in v4.0: "Realism & Resilience"

Version 4.0 shifts the focus from simple decision-making to **systemic resilience**.

### 1. 🌍 Scenario Modes
Choose your starting challenge context:
*   **The Standard Run**: Balanced gameplay for new planners.
*   **The Silver Tsunami**: Manage a rapidly aging population (Health decays 2x faster).
*   **Climate Siege**: survive rising sea levels and intense heatwaves.

### 2. ⚡ Persistent Crisis System
Crises like **Flash Floods** and **Heatwaves** are no longer one-off events. They persist as status effects, draining resources every turn until you deploy specific **Intervention Cards** (e.g., "Deploy ABC Waters Strategy").

### 3. 🗳️ Real Citizen Voice
New **Press Conference** events simulate Town Halls on sensitive topics (e.g., *The PLH Debate*, *Nature vs. Homes*), requiring players to justify their decisions with text input.

### 4. 📱 Mobile-First 3D City
The interactive 3D city visualization now automatically adapts to portrait mobile screens, ensuring the "Digital Twin" experience is accessible to everyone on the go.

---

## Core Gameplay Loop

1.  **Swipe to Decide**: Approve (Right) or Reject (Left) proposed developments.
2.  **Manage Resources**: Every decision impacts your Budget ($), Land Usage (%), Public Health, and Happiness.
3.  **Survive Crises**: When the screen turns red, you must prioritize survival over growth.
4.  **Audit Your Impact**: After 3 years (15 turns), receive a graded **Performance Review** that explains the real-world consequences of your choices.

---

## Documentation

Detailed breakdowns of the game mechanics can be found in `project_meta/`:
- **[v4.0 Features Deep Dive](project_meta/4.0%20features.md)**
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
