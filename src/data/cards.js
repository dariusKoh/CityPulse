export const CARDS = [
  {
    id: 1,
    type: 'choice',
    title: "10-Minute Neighbourhood",
    description: "Reorganize urban space so residents can access amenities within a 10-minute walk.",
    image: "10_min_hood",
    color: "#f97316", // Social (Happy, Healthy)
    sticker: "park",
    advisor: {
      character: "Urban Planner",
      text: "Decentralizes amenities to reduce 'tidal flow' traffic; activates precincts 24/7."
    },
    yes: { budget: 7, land: 20, health: 25, happiness: 30 },
    no: { budget: 0, land: 0, health: -5, happiness: -5 }
  },
  {
    id: 2,
    type: 'choice',
    title: "Turf City Redevelopment",
    description: "Develop high-density public housing in the prestigious Bukit Timah district.",
    image: "turf_city",
    color: "#f97316", // Social (Happy, Healthy)
    sticker: "building",
    advisor: {
      character: "Social Planner",
      text: "Mitigates stratification by placing HDBs in prime districts; prevents 'rich ghettos'."
    },
    yes: { budget: 5, land: 25, health: -10, happiness: 40 },
    no: { budget: 0, land: 0, health: 0, happiness: -10 }
  },
  {
    id: 3,
    type: 'choice',
    title: "Gated Enclave",
    description: "Approve a private, walled community that separates itself from the neighbourhood.",
    image: "gated_community",
    color: "#f97316", // Social (Failure but topic is Social)
    sticker: "wall",
    advisor: {
      character: "Sociologist",
      text: "High walls and exclusive access will attract the wealthy investors we need to boost property tax revenue."
    },
    yes: { budget: 2, land: -20, health: -15, happiness: -30 },
    no: { budget: 0, land: 10, health: 5, happiness: 10 }
  },
  {
    id: 4,
    type: 'choice',
    title: "Polycentricity",
    description: "Develop the Jurong Lake District as a second CBD to decentralize jobs.",
    image: "jurong_lake",
    color: "#3b82f6", // Economy
    sticker: "skyscraper",
    advisor: {
      character: "Economist",
      text: "Essential for transport viability; breaks the monocentric CBD model."
    },
    yes: { budget: 17, land: 15, health: 20, happiness: 25 },
    no: { budget: -10, land: 0, health: -5, happiness: -5 }
  },
  {
    id: 5,
    type: 'press_conference',
    title: "Public Feedback Session",
    description: "Residents are concerned about the loss of heritage in the new development plans. How do you respond?",
    image: "microphone",
    color: "#d946ef", // Distinct for Event
    bonusScore: 300
  },
  {
    id: 6,
    type: 'choice',
    title: "Vertical Zoning Policy",
    description: "Allow stacking of light industry, commercial, and residential uses in a single building.",
    image: "vertical_zoning",
    color: "#3b82f6", // Economy
    sticker: "mixed_use",
    advisor: {
      character: "Architect",
      text: "Maximizes yield in high-value zones; only way to grow without new land."
    },
    yes: { budget: 15, land: 40, health: 10, happiness: 15 },
    no: { budget: 0, land: -10, health: 0, happiness: 0 }
  },
  {
    id: 7,
    type: 'choice',
    title: "Long Island Reclamation",
    description: "Initiate massive reclamation off East Coast for coastal protection and new habitable land.",
    image: "long_island",
    color: "#06b6d4", // Resilience
    sticker: "island",
    advisor: {
      character: "Climate Scientist",
      text: "Existential hedge against sea-level rise; expensive but necessary for survival."
    },
    yes: { budget: -40, land: 50, health: 30, happiness: 20 },
    no: { budget: 20, land: 0, health: -50, happiness: -10 }
  },
  {
    id: 8,
    type: 'choice',
    title: "Identity Corridor",
    description: "Preserve the 'Historic East' heritage shophouses instead of redeveloping for condos.",
    image: "shophouse",
    color: "#a855f7", // Heritage
    sticker: "heritage",
    advisor: {
      character: "Historian",
      text: "Preserves the city's 'soul' and memory; prevents 'placelessness'."
    },
    yes: { budget: 20, land: -10, health: 10, happiness: 50 },
    no: { budget: 10, land: 20, health: 0, happiness: -30 }
  },
  {
    id: 9,
    type: 'choice',
    title: "Concrete Canal",
    description: "Channel river water through a straight concrete drain to prevent flooding quickly.",
    image: "canal",
    color: "#06b6d4", // Resilience (Bad)
    sticker: "drain",
    advisor: {
      character: "Urban Stylist",
      text: "Straight, concrete channels move water the fastest, offering the most efficient flood protection for our real estate."
    },
    yes: { budget: -10, land: -5, health: -30, happiness: -20 },
    no: { budget: 0, land: 5, health: 20, happiness: 10 }
  },
  {
    id: 10,
    type: 'choice',
    title: "Digital Twin (Virtual SG)",
    description: "Invest in a 3D simulation model to optimize wind flow and energy use before building.",
    image: "digital_twin",
    color: "#6366f1", // Connectivity (Smart)
    sticker: "satellite",
    advisor: {
      character: "Data Scientist",
      text: "Measure twice, cut once. This simulation prevents 'sick buildings' and costly errors."
    },
    yes: { budget: 10, land: 10, health: 15, happiness: 10 },
    no: { budget: 0, land: 0, health: 0, happiness: 0 }
  },
  {
    id: 11,
    type: 'press_conference',
    title: "Master Plan Review",
    description: "The term is ending. Which 'Resource' did you find most difficult to manage?",
    image: "clipboard",
    color: "#d946ef", // Distinct for Event
    bonusScore: 500
  },
  {
    id: 12,
    type: 'choice',
    title: "Dormitory Town",
    description: "Build a town solely for housing with no employment nodes to maximize unit supply.",
    image: "dormitory_town",
    color: "#f97316", // Social (Bad)
    sticker: "sleeping_face",
    advisor: {
      character: "Urban Planner",
      text: "Massive housing estates without commercial distraction ensure a peaceful, quiet environment for our workforce to rest."
    },
    yes: { budget: -20, land: 0, health: -30, happiness: -40 },
    no: { budget: 0, land: 0, health: 0, happiness: 0 }
  },
  {
    id: 13,
    type: 'choice',
    title: "Vertical Industrial Zoning",
    description: "Stack clean industry, offices, and commercial uses in a single development.",
    image: "vertical_industry",
    color: "#3b82f6", // Economy
    sticker: "factory",
    advisor: {
      character: "Architect",
      text: "This allows 're-industrialization' of the city center, bringing jobs closer to talent."
    },
    yes: { budget: 12, land: 30, health: 15, happiness: 10 },
    no: { budget: 0, land: 0, health: 0, happiness: 0 }
  },
  {
    id: 14,
    type: 'choice',
    title: "Single-Use Zoning",
    description: "Strictly isolate residential, commercial, and industrial zones.",
    image: "single_use",
    color: "#f97316", // Social (Bad)
    sticker: "fence",
    advisor: {
      character: "Legacy Planner",
      text: "Strictly separating factories from homes guarantees safety and order, keeping pollutants far from where our children sleep."
    },
    yes: { budget: -10, land: -25, health: -40, happiness: -35 },
    no: { budget: 0, land: 0, health: 0, happiness: 0 }
  },
  {
    id: 15,
    type: 'choice',
    title: "District Cooling System",
    description: "Install centralized cooling networks for the entire district.",
    image: "district_cooling",
    color: "#06b6d4", // Resilience
    sticker: "snowflake",
    advisor: {
      character: "Engineer",
      text: "Economies of scale for cooling; removes street-level heat rejection."
    },
    yes: { budget: 7, land: 10, health: 25, happiness: 5 },
    no: { budget: 0, land: 0, health: 0, happiness: 0 }
  },
  {
    id: 16,
    type: 'choice',
    title: "Ecological Corridors",
    description: "Preserve a green spine to connect fragmented nature reserves.",
    image: "eco_corridor",
    color: "#a855f7", // Heritage & Nature
    sticker: "leaf",
    advisor: {
      character: "Biologist",
      text: "Connects isolated reserves to prevent genetic degradation."
    },
    yes: { budget: 0, land: -15, health: 40, happiness: 15 },
    no: { budget: 0, land: 0, health: 0, happiness: 0 }
  },
  {
    id: 17,
    type: 'choice',
    title: "Tabula Rasa Redevelopment",
    description: "Clear the site completely. Flatten topography and erase history.",
    image: "tabula_rasa",
    color: "#a855f7", // Heritage (Bad)
    sticker: "bulldozer",
    advisor: {
      character: "Historian",
      text: "Clearing the site completely is the most efficient way to maximize construction speed and standardize housing units."
    },
    yes: { budget: 10, land: 30, health: -50, happiness: -40 },
    no: { budget: 0, land: 0, health: 0, happiness: 0 }
  },
  {
    id: 18,
    type: 'choice',
    title: "Smart Sensors & ODP",
    description: "Deploy an Open Digital Platform to optimise estate services.",
    image: "smart_sensors",
    color: "#6366f1", // Connectivity
    sticker: "wifi",
    advisor: {
      character: "Tech Lead",
      text: "Predictive maintenance reduces operating costs of all other infra."
    },
    yes: { budget: 12, land: 0, health: 20, happiness: 10 },
    no: { budget: 0, land: 0, health: 0, happiness: 0 }
  },
  {
    id: 19,
    type: 'choice',
    title: "Techno-Centricity",
    description: "Implement complex digital interfaces for all essential services.",
    image: "tech_trap",
    color: "#6366f1", // Connectivity (Bad)
    sticker: "robot",
    advisor: {
      character: "Sociologist",
      text: "Be careful. This creates a digital divide that alienates the elderly."
    },
    yes: { budget: -10, land: 0, health: -5, happiness: -30 },
    no: { budget: 0, land: 0, health: 0, happiness: 0 }
  },
  {
    id: 20,
    type: 'choice',
    title: "Recreation Master Plan",
    description: "Activate 'dead spaces' under viaducts and on rooftops for community use.",
    image: "recreation_master_plan",
    color: "#f97316", // Social
    sticker: "basketball",
    advisor: {
      character: "Community Leader",
      text: "Activating rooftops and viaducts creates infinite play space without consuming valuable land."
    },
    yes: { budget: 5, land: 5, health: 15, happiness: 5 },
    no: { budget: 0, land: 0, health: 0, happiness: 0 }
  },
  {
    id: 21,
    type: 'choice',
    title: "PLAB Relocation",
    description: "Lift height limits in the East following the air base relocation.",
    image: "plab_relocation",
    color: "#3b82f6", // Economy
    sticker: "airplane_departure",
    advisor: {
      character: "Urban Planner",
      text: "Relocating the airbase doesn't just give us land; it lifts the ceiling for half the island, allowing us to build taller and greener."
    },
    yes: { budget: 15, land: 40, health: -5, happiness: -10 },
    no: { budget: 0, land: 0, health: 0, happiness: 0 }
  },
  {
    id: 22,
    type: 'choice',
    title: "Hill-to-Hill Link",
    description: "Construct a green pedestrian spine connecting Pearl's Hill to Fort Canning.",
    image: "hill_to_hill",
    color: "#a855f7", // Heritage & Nature
    sticker: "bridge",
    advisor: {
      character: "Landscape Architect",
      text: "Restores natural ridge connectivity; promotes active mobility."
    },
    yes: { budget: 5, land: -5, health: 15, happiness: 20 },
    no: { budget: 0, land: 0, health: 0, happiness: 0 }
  },
  {
    id: 23,
    type: 'choice',
    title: "Bayshore Main Street",
    description: "Develop a car-lite district with a central amenity spine linked to the TEL.",
    image: "bayshore_main_street",
    color: "#f97316", // Social (Car-lite lifestyle)
    sticker: "pedestrian",
    advisor: {
      character: "Transport Planner",
      text: "Prioritizing pedestrians over cars creates a safer, quieter neighbourhood."
    },
    yes: { budget: 10, land: -10, health: 20, happiness: 25 },
    no: { budget: 0, land: 0, health: 0, happiness: 0 }
  },
  {
    id: 24,
    type: 'choice',
    title: "Pasir Panjang Power Station",
    description: "Adaptively reuse the turbine halls into a lifestyle and arts destination.",
    image: "power_station",
    color: "#a855f7", // Heritage
    sticker: "art",
    advisor: {
      character: "Creative Director",
      text: "This is our 'Tate Modern'. It anchors the Greater Southern Waterfront with culture."
    },
    yes: { budget: 15, land: -5, health: 5, happiness: 30 },
    no: { budget: 0, land: 0, health: 0, happiness: 0 }
  },
  {
    id: 25,
    type: 'choice',
    title: "Chencharu Heritage Estate",
    description: "Develop a new housing estate that retains colonial bungalows as community nodes.",
    image: "chencharu",
    color: "#a855f7", // Heritage
    sticker: "bungalow",
    advisor: {
      character: "Historian",
      text: "Retaining history gives a new town instant character and soul."
    },
    yes: { budget: 5, land: -10, health: 10, happiness: 25 },
    no: { budget: 0, land: 0, health: 0, happiness: 0 }
  },
  {
    id: 26,
    type: 'choice',
    title: "Business-White Zoning",
    description: "Allow developers to flex the mix of industrial and commercial uses.",
    image: "business_white",
    color: "#3b82f6", // Economy
    sticker: "chart_mixed",
    advisor: {
      character: "Economist",
      text: "Market cycles move faster than Master Plans. Flexibility builds resilience."
    },
    yes: { budget: 15, land: 20, health: 5, happiness: 5 },
    no: { budget: 0, land: 0, health: 0, happiness: 0 }
  },
  {
    id: 27,
    type: 'choice',
    title: "RTS Link",
    description: "Operate the Rapid Transit System link to Johor Bahru.",
    image: "rts_link",
    color: "#6366f1", // Connectivity
    sticker: "train_cross_border",
    advisor: {
      character: "Diplomat",
      text: "This catalyzes the Special Economic Zone and reduces Causeway congestion."
    },
    yes: { budget: 20, land: 10, health: 10, happiness: 15 },
    no: { budget: 0, land: 0, health: 0, happiness: 0 }
  },
  {
    id: 28,
    type: 'choice',
    title: "Agri-Food Innovation Park",
    description: "Build high-tech vertical farms at Sungei Kadut.",
    image: "agri_food",
    color: "#06b6d4", // Resilience
    sticker: "plant",
    advisor: {
      character: "Food Scientist",
      text: "We must produce 30% of our nutritional needs locally. This is survival."
    },
    yes: { budget: 10, land: -10, health: 30, happiness: 5 },
    no: { budget: 0, land: 0, health: 0, happiness: 0 }
  },
  {
    id: 29,
    type: 'choice',
    title: "Urban Heat Resilience",
    description: "Mandate cool paints and wind flow geometry for all new buildings.",
    image: "cool_paint",
    color: "#06b6d4", // Resilience
    sticker: "thermometer",
    advisor: {
      character: "Climate Architect",
      text: "Passive design reduces the need for air-conditioning and lowers the city's fever."
    },
    yes: { budget: -5, land: 0, health: 20, happiness: 10 },
    no: { budget: 0, land: 0, health: 0, happiness: 0 }
  },
  // =============================================
  // SOLUTION CARDS (v4.0 Crisis Interventions)
  // These cards appear with higher frequency during active crises
  // =============================================
  {
    id: 30,
    type: 'solution',
    resolves: 'flood',
    title: "Deploy ABC Waters Strategy",
    description: "Transform concrete canals into naturalized waterways. Active, Beautiful, Clean.",
    image: "abc_waters",
    color: "#0ea5e9", // Solution Blue
    sticker: "river",
    advisor: {
      character: "Water Engineer",
      text: "This mimics nature's drainage and adds recreational value. The Bishan-Ang Mo Kio Park is our proof."
    },
    yes: { budget: -20, land: 0, health: 15, happiness: 15 },
    no: { budget: 0, land: 0, health: 0, happiness: 0 }
  },
  {
    id: 31,
    type: 'solution',
    resolves: 'heatwave',
    title: "Gazette Wind Corridors",
    description: "Protect height-restricted wind paths through the city to naturally cool urban areas.",
    image: "wind_corridor",
    color: "#0ea5e9", // Solution Blue
    sticker: "wind",
    advisor: {
      character: "Climate Planner",
      text: "Based on Marina South planning. We sacrifice some plot ratio to let the city breathe."
    },
    yes: { budget: 0, land: -15, health: 20, happiness: 10 },
    no: { budget: 0, land: 0, health: 0, happiness: 0 }
  },
  {
    id: 32,
    type: 'solution',
    resolves: 'heatwave',
    title: "District Cooling Network",
    description: "Install underground cooling infrastructure for the entire precinct.",
    image: "district_cooling",
    color: "#0ea5e9", // Solution Blue
    sticker: "snowflake",
    advisor: {
      character: "Infrastructure Engineer",
      text: "Centralized cooling achieves economies of scale. Marina Bay uses this already."
    },
    yes: { budget: -30, land: 5, health: 15, happiness: 5 },
    no: { budget: 0, land: 0, health: 0, happiness: 0 }
  },
  {
    id: 33,
    type: 'solution',
    resolves: 'supply_shock',
    title: "Vertical Farms Initiative",
    description: "Convert rooftops across the city to high-tech vertical farms for food security.",
    image: "vertical_farm",
    color: "#0ea5e9", // Solution Blue
    sticker: "plant",
    advisor: {
      character: "Food Scientist",
      text: "30-by-30 is not a slogan, it's survival. We must produce 30% of our nutritional needs locally."
    },
    yes: { budget: -25, land: 0, health: 10, happiness: 15 },
    no: { budget: 0, land: 0, health: 0, happiness: 0 }
  },
  // =============================================
  // DMP2025 SPECIFIC POLICY CARDS (v4.1)
  // =============================================
  {
    id: 101,
    type: 'choice',
    title: "Community Care Apartments",
    description: "By 2030, 1 in 4 Singaporeans will be over 65. Build assisted living flats in Queenstown?",
    image: "community_care",
    color: "#f97316", // Social Orange
    sticker: "elderly",
    advisor: {
      character: "Social Planner",
      text: "We can't just build nursing homes. Seniors need to age *in* the community."
    },
    yes: { budget: -15, land: -10, health: 20, happiness: 15 },
    no: { budget: 0, land: 0, health: -20, happiness: -10 }
  },
  {
    id: 102,
    type: 'solution',
    resolves: 'heatwave',
    title: "Gazette Wind Corridors",
    description: "Sacrifice buildable land in Marina South to let prevailing winds cool the city naturally.",
    image: "wind_corridor",
    color: "#0ea5e9", // Solution Blue
    sticker: "wind",
    advisor: {
      character: "Climate Architect",
      text: "It lowers the plot ratio (less profit), but it prevents the 'Oven City' effect."
    },
    yes: { budget: -5, land: -20, health: 25, happiness: 10 },
    no: { budget: 0, land: 0, health: 0, happiness: 0 }
  },
  {
    id: 103,
    type: 'choice',
    title: "Identity Corridor: Historic East",
    description: "Developers want to en-bloc these shophouses for high-rise condos. Conserve them instead?",
    image: "shophouse_conservation",
    color: "#a855f7", // Heritage Purple
    sticker: "heritage",
    advisor: {
      character: "Youth Fellow",
      text: "If we tear this down, the city loses its soul. A city without memory is just a machine."
    },
    yes: { budget: -10, land: -15, health: 0, happiness: 40 },
    no: { budget: 10, land: 20, health: 0, happiness: -30 }
  },
  {
    id: 104,
    type: 'choice',
    title: "Decentralization: JLD Gateway",
    description: "Move government agencies to Jurong Lake District (Second CBD) to reduce peak-hour jams.",
    image: "jurong_lake",
    color: "#3b82f6", // Economy Blue
    sticker: "train",
    advisor: {
      character: "Transport Minister",
      text: "Monocentric cities fail at scale. We need to bring jobs closer to homes."
    },
    yes: { budget: -30, land: 15, health: 10, happiness: 20 },
    no: { budget: 0, land: 0, health: -5, happiness: -5 }
  },
  // =============================================
  // PRESS CONFERENCE / CITIZEN VOICE CARDS (IDs 200+)
  // These simulate Town Halls and Media Scrums
  // =============================================
  {
    id: 200,
    type: 'press_conference',
    title: "The PLH Debate",
    description: "Private homeowners in Bukit Timah are protesting the new public housing. 'It devalues our property,' they say. How do you justify the 'Prime Location' model?",
    image: "microphone_orange",
    color: "#f97316", // Social
    sticker: "megaphone",
    bonusScore: 500,
    advisor: {
      character: "The Straits Times Reporter",
      text: "This is the hottest topic in the forums. Are we democratizing land or unfairly subsidizing a lucky few?"
    }
  },
  {
    id: 201,
    type: 'press_conference',
    title: "Nature vs. Homes",
    description: "Green groups are petitioning to save a secondary forest you earmarked for 5,000 flats. The waitlist for BTOs is 5 years long. Who do you prioritize?",
    image: "microphone_green",
    color: "#a855f7", // Nature/Identity
    sticker: "tree",
    bonusScore: 500,
    advisor: {
      character: "Nature Society Rep",
      text: "Once a forest is gone, it's gone forever. But young couples are delaying marriage because they have no homes. It's a zero-sum game."
    }
  },
  {
    id: 202,
    type: 'press_conference',
    title: "The 'Car-Lite' Friction",
    description: "Business owners in the CBD are complaining that removing parking lots for cycling paths is killing retail footfall. Is the 'Car-Lite' vision hurting the economy?",
    image: "microphone_blue",
    color: "#6366f1", // Connectivity
    sticker: "car",
    bonusScore: 400,
    advisor: {
      character: "Business Association",
      text: "Not everyone can cycle to work in 32°C heat. Are we moving too fast with these road repurposing projects?"
    }
  },
  {
    id: 203,
    type: 'press_conference',
    title: "The Long Island Price Tag",
    description: "Critics argue that the $100 Billion for Long Island reclamation should be spent on healthcare for the elderly instead. Why pour money into the sea?",
    image: "microphone_cyan",
    color: "#06b6d4", // Resilience
    sticker: "money_bag",
    bonusScore: 600,
    advisor: {
      character: "Financial Analyst",
      text: "It's an intergenerational transfer of wealth. We pay now so our grandchildren don't drown. Can you sell that narrative?"
    }
  },
  {
    id: 204,
    type: 'press_conference',
    title: "NIMBYism & Nursing Homes",
    description: "Residents in a private estate are blocking the construction of a simplified nursing home nearby, citing 'ambulance noise'. How do you address this lack of empathy?",
    image: "microphone_orange",
    color: "#f97316", // Social
    sticker: "angry_face",
    bonusScore: 450,
    advisor: {
      character: "Social Worker",
      text: "This is the 'Silver Tsunami' reality. Everyone wants elderly care, just 'Not In My Backyard'. You need to be firm."
    }
  },
  {
    id: 205,
    type: 'press_conference',
    title: "Heritage vs. Efficiency",
    description: "The 'Old Police Academy' has low plot efficiency. Developers say we could build double the homes if we demolished the heritage barracks. Why keep them?",
    image: "microphone_purple",
    color: "#a855f7", // Heritage
    sticker: "museum",
    bonusScore: 400,
    advisor: {
      character: "Heritage Board",
      text: "Efficiency isn't everything. These buildings anchor the community's identity. But is that worth losing 500 potential homes?"
    }
  },
  {
    id: 206,
    type: 'press_conference',
    title: "Surveillance City?",
    description: "Privacy advocates worry that the 'Smart Sensors' for elderly monitoring in HDBs are invasive. Where do you draw the line between safety and surveillance?",
    image: "microphone_indigo",
    color: "#6366f1", // Smart City
    sticker: "cctv",
    bonusScore: 350,
    advisor: {
      character: "Tech Ethics Prof",
      text: "The road to hell is paved with good intentions. Today it's fall detection, tomorrow it's social scoring?"
    }
  },
  {
    id: 207,
    type: 'press_conference',
    title: "Rooftop Wars",
    description: "There is limited roof space. Solar panels fight climate change, but rooftop farms ensure food security. Which crisis is more urgent?",
    image: "microphone_cyan",
    color: "#06b6d4", // Resilience
    sticker: "sun",
    bonusScore: 500,
    advisor: {
      character: "Sustainability Chief",
      text: "Energy vs. Food. Both are critical for the 'Resource Resilience' pillar. You can't have 100% of both."
    }
  },
  {
    id: 208,
    type: 'press_conference',
    title: "The Decentralization Gamble",
    description: "Firms are hesitant to move to Jurong Lake District because 'all the prestige is in Raffles Place'. How do we break this mindset?",
    image: "microphone_blue",
    color: "#3b82f6", // Economy
    sticker: "briefcase",
    bonusScore: 550,
    advisor: {
      character: "JLD Master Planner",
      text: "If companies don't move, the trains will remain empty in one direction. We need a 'first mover' to create critical mass."
    }
  },
  {
    id: 209,
    type: 'press_conference',
    title: "Construction Fatigue",
    description: "Residents in the East have faced 10 years of MRT drilling noise. Now we are announcing the 'Long Island' works. Patience is running thin.",
    image: "microphone_orange",
    color: "#f97316", // Social
    sticker: "construction",
    bonusScore: 300,
    advisor: {
      character: "MP for East Coast",
      text: "They call it 'progress', residents call it a migraine. How do we mitigate the impact of constant upgrading?"
    }
  },
  {
    id: 210,
    type: 'press_conference',
    title: "Arts as a Luxury?",
    description: "Refurbishing the Pasir Panjang Power Station for the arts is expensive. Critics say that money should go to utility subsidies instead.",
    image: "microphone_purple",
    color: "#a855f7", // Heritage
    sticker: "palette",
    bonusScore: 350,
    advisor: {
      character: "Arts Council",
      text: "A 'Happy City' needs culture, not just survival. But it's hard to justify arts funding when cost of living is high."
    }
  },
  {
    id: 211,
    type: 'press_conference',
    title: "The 30% Food Goal",
    description: "Local fish farms are struggling against cheaper imports. Consumers aren't buying local. Should we force supermarkets to stock local produce?",
    image: "microphone_cyan",
    color: "#06b6d4", // Resilience
    sticker: "fish",
    bonusScore: 400,
    advisor: {
      character: "Agri-Food Agency",
      text: "Food security isn't free. If we don't support them now, they won't be there when the next global supply chain crisis hits."
    }
  },
  {
    id: 212,
    type: 'press_conference',
    title: "The 'White Elephant' Risk",
    description: "We are building massive infrastructure for the future population (T5, Tuas Port). What if the global economy shrinks and the people don't come?",
    image: "microphone_blue",
    color: "#3b82f6", // Economy
    sticker: "chart_down",
    bonusScore: 600,
    advisor: {
      character: "Risk Analyst",
      text: "Planning 50 years ahead is a gamble. If we overbuild, we bankrupt the state. If we underbuild, we stagnate."
    }
  }
];

