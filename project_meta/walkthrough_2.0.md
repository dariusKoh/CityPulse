# CityPulse Walkthrough

## Overview
I have successfully built the **CityPulse** prototype, a gamified urban planning engagement app. It implements the "Swipe" based game loop, resource management, and press conference features as requested.

## Features Implemented

### 1. Core Game Engine (IT/UX)
- **Deck System**: A fixed deck of 10 cards (8 choices, 2 press conferences).
- **Resource Logic**: Calculations for Budget, Land, Health, and Happiness are functional.
- **Swiping**: Implemented rich drag-to-swipe animations using `framer-motion`.

### 2. UI/Effects (Aesthetics)
- **Visuals**: Dark mode aesthetic with neon accents (Blue/Teal/Coral).
- **HUD**: Real-time stats display with animated bars.
- **Start Screen**: Nickname entry with validation.

### 3. Engagement Features (Business)
- **Press Conference**: A special card type allowing text input for qualitative feedback.
- **Impact Ledger**: An end-game summary screen showing all decisions and final stats.

### 4. Admin (Management)
- **Admin View**: A mock dashboard showing submitted proposals and live stats.
  - Access validation: (For MVP, manually toggle view code or add a button if requested. Currently accessible via code or separate route if added later. For now, the implementation includes the view `AdminDashboard.jsx`, but it is not linked in the main flow for players. To see it, you can modify `App.jsx` to set `currentView` to `'admin'`).

## Phase 2 Features (Root Causes)

### 1. Engagement & Trust
- **Home Screen**: Revamped to show a "Rewards Wallet" (accumulated points) and an "Audit Log" of past runs.
- **Citizen Receipt**: The end screen now generates an official-looking receipt with a unique ID and "Pending Audit" stamp.

### 2. Gamification & Logic
- **Commute Timer**: A 3-minute countdown adds urgency, framing the app as a quick "commute" activity.
- **Health Avatar**: The generic health bar is replaced by a reactive face icon (Happy/Neutral/Sad) for visceral feedback.
- **Budget Cap**: Users cannot approve costly projects if the budget is empty (Card shakes and warns).

## Phase 3: CityPulse 2.0 (Professional Sim)

### 1. Master Planner Leaderboard
- **Logic**: Users are ranked against 10 mock "Top Planners".
- **Incentive**: Top 3 players are flagged as potential "URA Youth Fellows".
- **Access**: Click the Trophy icon on the Home Screen.

### 2. Education (Advisor System)
- **Mechanic**: Certain cards (e.g., Community Hospital, Nature Reserve) trigger an "Advisor Insight" popup.
- **Goal**: Teaches concepts like "Active Mobility" or "Green Lungs" before the user swipes.

### 3. Engagement (Crisis & Visuals)
- **Crisis Events**: Every 5 swipes, a "Flash Flood" crisis triggers, imposing penalties.
- **Visual Growth**: As you approve cards, stickers (buildings, trees, cars) appear in the background, filling up your city.

### 4. Transparency Portal
- **Enhanced Log**: The end screen now shows a "Case File" view.
- **URA Replies**: Each decision has a simulated planner response (e.g., "Feasibility Study Needed").

## CityPulse 2.0 Testing Guide
1. **Leaderboard**: On Home, click the 🏆 icon. See your "Master Planner" rank.
2. **Advisor**: Play until "Community Hospital" or "Nature Reserve" appears. Standard swipe is blocked by an Insight Popup.
3. **Crisis**: Swipe 5 cards. Watch for the red "Crisis Alert!" overlay.
4. **Visuals**: Approve 3-4 cards. Look closely at the background behind the card stack—icons will appear.
5. **Transparency**: Finish the game. Scroll down to see "Transparency Portal" with "URA PLANNER REPLY" for each item.
