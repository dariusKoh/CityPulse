# CityPulse Card Database (v4.1)

This document lists all active cards in the `src/data/cards.js` file, updated for version 4.1 mechanics.

## Card Types
1.  **Choice**: Standard binary decision. (Swipe Right = Yes, Left = No)
2.  **Press Conference**: Town Hall event. Requires text input.
3.  **Solution**: Special card that resolves an active Crisis.

---

## 🏗️ Choice Cards

| ID | Title | Type | Advisor (Voice) | Strategic Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **10-Minute Neighbourhood** | Feature | Urban Planner | "Decentralizes amenities to reduce 'tidal flow' traffic; activates precincts 24/7." |
| **2** | **Turf City Redevelopment** | Project | Social Planner | "Mitigates stratification by placing HDBs in prime districts; prevents 'rich ghettos'." |
| **3** | **Gated Enclave** | Failure | Sociologist | **Positive Spin**: "High walls and exclusive access will attract the wealthy investors we need..." (Trap: Segregation) |
| **4** | **Polycentricity** | Strategy | Economist | "Essential for transport viability; breaks the monocentric CBD model." |
| **6** | **Vertical Zoning Policy** | Policy | Architect | "Maximizes yield in high-value zones; only way to grow without new land." |
| **7** | **Long Island Reclamation** | Mega-Project | Climate Scientist | "Existential hedge against sea-level rise; expensive but necessary for survival." |
| **8** | **Identity Corridor** | Heritage | Historian | "Preserves the city's 'soul' and memory; prevents 'placelessness'." |
| **9** | **Concrete Canal** | Legacy | Urban Stylist | **Positive Spin**: "Fastest, most efficient flood protection." (Trap: Biodiversity loss) |
| **10** | **Digital Twin (Virtual SG)** | Tech | Data Scientist | "Measure twice, cut once. Simulation prevents 'sick buildings'." |
| **12** | **Dormitory Town** | Failure | Urban Planner | **Positive Spin**: "Peaceful, quiet environment for workforce." (Trap: Tidal traffic nightmare) |
| **13** | **Vertical Industrial Zoning** | Choice | Architect | "Allows 're-industrialization' of city center." |
| **14** | **Single-Use Zoning** | Failure | Legacy Planner | **Positive Spin**: "Guarantees safety and order." (Trap: Sterile streets) |
| **15** | **District Cooling System** | Tech | Engineer | "Economies of scale for cooling; removes street-level heat rejection." |
| **16** | **Ecological Corridors** | Nature | Biologist | "Connects isolated reserves to prevent genetic degradation." |
| **17** | **Tabula Rasa Redevelopment** | Failure | Historian | **Positive Spin**: "Most efficient construction speed." (Trap: Erasure of history) |
| **18** | **Smart Sensors & ODP** | Tech | Tech Lead | "Predictive maintenance reduces operating costs." |
| **19** | **Techno-Centricity** | Failure | Sociologist | "Digital divide alienates the elderly." |
| **20** | **Recreation Master Plan** | Feature | Community Leader | "Activating rooftops and viaducts creates infinite play space without consuming land." |
| **21** | **PLAB Relocation** | Feature | Urban Planner | "Lifts the ceiling for half the island, allowing taller/greener buildings." |
| **22** | **Hill-to-Hill Link** | Project | Landscape Architect | "Restores natural ridge connectivity; promotes active mobility." |

---

## 🎤 Press Conference Cards (v4.0)

These cards simulate public town halls.

| ID | Title | Topic | Advisor |
| :--- | :--- | :--- | :--- |
| **5** | **Public Feedback Session** | Heritage | Residents |
| **11** | **Master Plan Review** | Resources | Review Event |
| **200** | **The PLH Debate** | Inequality | The Straits Times |
| **201** | **Nature vs. Homes** | Environment | Nature Society |
| **202** | **The 'Car-Lite' Friction** | Transport | Business Assoc. |
| **203** | **The Long Island Price Tag** | Finance | Financial Analyst |
| **204** | **NIMBYism & Nursing Homes** | Aging | Social Worker |
| **205** | **Heritage vs. Efficiency** | Identity | Heritage Board |
| **206** | **Surveillance City?** | Privacy | Tech Ethics Prof |
| **207** | **Rooftop Wars** | Energy/Food | Sustainability Chief |
| **208** | **The Decentralization Gamble** | Economy | JLD Planner |
| **209** | **Construction Fatigue** | Social | MP for East Coast |
| **210** | **Arts as a Luxury?** | Culture | Arts Council |
| **211** | **The 30% Food Goal** | Food Security | Agri-Food Agency |
| **212** | **The 'White Elephant' Risk** | Risk | Risk Analyst |

---

## 🔧 Solution Cards (Crisis Interventions)

Only appear when specific crises are active.

| ID | Title | Resolves | Description |
| :--- | :--- | :--- | :--- |
| **30** | **Deploy ABC Waters Strategy** | Flood | Naturalize canals to manage water. |
| **31** | **Gazette Wind Corridors** | Heatwave | Protect wind paths (low plot ratio). |
| **32** | **District Cooling Network** | Heatwave | Underground cooling infra. |
| **33** | **Vertical Farms Initiative** | Supply Shock | Rooftop food production. |
