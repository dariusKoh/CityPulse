# CityPulse 2.0 Implementation Plan

## Goal Description
Upgrade to **CityPulse 2.0**: A Professional Urban Planning Simulator.
Key features: New Brand Color (#ffbd59), Leaderboard, Advisor System (Education), Crisis Events, Visual City Growth, and Enhanced Transparency Log.

## Proposed Changes

### 1. Visual Identity
#### [MODIFY] [index.css](file:///c:/Users/Darius Koh/Documents/Y3S2/ProID/Prototype/src/index.css)
- Update `--color-primary` to `#ffbd59` (Amber).
- Adjust `--color-text-main` on primary buttons if contrast is needed (Black text on Amber).

### 2. Feature: Master Planner Leaderboard
#### [NEW] [Leaderboard.jsx](file:///c:/Users/Darius Koh/Documents/Y3S2/ProID/Prototype/src/views/Leaderboard.jsx)
- Display Top 10 Mock players.
- Display User's Rank (Randomly assigned 900-2000 initially, improves with score).
- Call to Action: "URA Youth Fellow" qualification status.

#### [MODIFY] [App.jsx](file:///c:/Users/Darius Koh/Documents/Y3S2/ProID/Prototype/src/App.jsx)
- Add 'leaderboard' view route.
- Button on Home Screen to view Leaderboard.

### 3. Feature: Education (Advisor) & Engagement (Crisis)
#### [MODIFY] [cards.js](file:///c:/Users/Darius Koh/Documents/Y3S2/ProID/Prototype/src/data/cards.js)
- Add `advisor` field to cards (e.g., `{ text: "...", character: "BioMed Expert" }`).
- Add `buildingId` or `sticker` field for Visual Growth.

#### [MODIFY] [GameEngine.jsx](file:///c:/Users/Darius Koh/Documents/Y3S2/ProID/Prototype/src/components/GameEngine.jsx)
- **Advisor Logic**: If card has advisor, show Modal before Card interaction.
- **Crisis Logic**: Track `swipeCount`. If `swipeCount % 5 === 0`, trigger Crisis Event (Special modal/card effect).
- **Background**: Pass `approvedCards` to a new `CityBackground` component.

### 4. Feature: Visual City Growth
#### [NEW] [CityBackground.jsx](file:///c:/Users/Darius Koh/Documents/Y3S2/ProID/Prototype/src/components/CityBackground.jsx)
- Absolute positioned under the card deck.
- Renders icons/images for every "Approved" card.

### 5. Feature: Transparency Portal
#### [MODIFY] [HomeScreen.jsx](file:///c:/Users/Darius Koh/Documents/Y3S2/ProID/Prototype/src/views/HomeScreen.jsx)
- Update "Audit Log" section to "Transparency Portal".
- Layout: 2 Columns (Suggestion | URA Reply).
- Mock Planner replies (e.g. "Feasibility Study Needed").

## Verification Plan
- **Color**: Check Home Screen and buttons for new Amber color.
- **Leaderboard**: Verify mock ranks and "Youth Fellow" badge.
- **Advisor**: Check if popup appears on specific cards.
- **Crisis**: Swipe 5 times -> Verify Crisis Alert.
- **Audit**: Finish game -> Check Home Screen log for "URA Reply".
