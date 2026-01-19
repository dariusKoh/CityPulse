# CityPulse

**Project Title**: CityPulse
**Concept**: An "Educational Game" that transforms engagement with the **Draft Master Plan 2025 (DMP2025)** from a passive survey into an active **urban planning simulation**.

Instead of just asking youth what they want, CityPulse puts them in the seat of a URA planner, challenging them to build a **"Happy, Healthy City"** within realistic constraints.

---

## 1. The DMP2025 Theme

*   **Primary Focus**: **"Shaping a Happy, Healthy City"**
*   **Goal**: To build stronger communities and cater to diverse aspirations.
*   **Key Aspects**: Inclusive homes, active mobility, and accessible community spaces.

---

## 2. The 3 Root Causes & Solutions

CityPulse addresses three specific barriers to youth engagement using an **interdisciplinary approach**:

### A. Solving "Ineffective Engagement" (Making it Visceral)
**Problem**: Traditional methods (exhibitions, town halls) are seen as boring, dry, and "hard to visualize" for digital natives.

*   **The "Swipe to Build" Interface (IT/UX)**: A Tinder-style deck where users swipe **Right (Approve)** or **Left (Reject)** on developments. This replaces dense text with fast, visual decision-making.
*   **Reactive "Health Avatar" (Biomedical Science)**: Instead of static graphs, a citizen avatar changes expression (Happy vs. Stressed/Sick) based on choices, "showing not telling" the biomedical impact of urban design.

## Documentation (v2.0)
Detailed documentation for the new gameplay features and content can be found in the `docs/` directory:
- [Card List & Effects](docs/CARDS.md)
- [Scenarios Guide](docs/SCENARIOS.md)
- [New Gameplay Features (Review, Bonus, etc.)](docs/FEATURES.md)

## Key Features
- **Tinder-Style Decision Making**: Swipe Left/Right to make choices.
- **Resource Balancing**: Manage Budget, Land, Health, and Happiness.
- **Dynamic Scenarios**: "Silver Tsunami" (Aging) and "Climate Siege" modes.
- **DMP2025 Themes**: Cards color-coded by strategic pillar (Social, Economy, Resilience, Heritage, Connectivity).
- **Gamified Performance Review**: Get graded (S-F) based on your strategic alignment with DMP2025.

- **Citizen Voice**: Real-time feedback mechanic for bonus rewards.
- **DMP2025 Content**: Includes Long Island, Turf City, and JLD strategies.

### B. Solving "Competing Priorities" (Monetizing Time)
**Problem**: Youth are "time-poor" and prioritize career/social lives over civic duty.

*   **The "National Budget" Challenge (Finance)**: Users manage a limited "Tax Credit" budget. They cannot approve everything and must make realistic trade-offs (e.g., Park vs. Mall), gamifying resource scarcity.
*   **"CityPoints" Rewards (International Business)**: Engagement is transactional. Users earn points for playing, visualized as redeemable for rewards (e.g., coffee vouchers), valuing their time.

### C. Solving "Perceived Tokenism" (Building Trust)
**Problem**: A cynical belief that feedback disappears into a "black box" or is performative.

*   **The "Impact Ledger" & Receipt (Accountancy)**: Users receive a digital "Official Receipt" with a unique transaction ID (e.g., `#URA-2025-X9Y2`) at the end, providing an audit trail that data is logged and "Pending Review".
*   **The "Press Conference" Card**: A special input mechanic for qualitative feedback ("Why did you choose this?"), allowing specific ideas beyond binary swipes.

---

## 3. Additional Features (v2.0)

*   **Master Planner Leaderboard**: A competitive ranking system against mock "Top Planners" with **"URA Youth Fellow"** incentives.
*   **Advisor System (Education)**: Contextual "Advisor Insight" popups teach concepts (e.g., "Active Mobility") before key decisions.
*   **Crisis Events**: Dynamic events (e.g., Flash Floods) triggered every 5 swipes to test resilience.
*   **Admin Dashboard**: A planner-facing view to review aggregate stats and qualitative feedback.
*   **Clickable Receipts**: Past submissions in the Audit Log are interactive, allowing users to review their decisions and the "URA Planner Reply" for each action. Data persists for the browser session.

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

    The app should build on ``port:5173``, or http://localhost:5173/CityPulse/

3.  **Build for Production**:
    ```bash
    npm run build
    ```
