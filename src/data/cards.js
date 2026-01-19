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
      text: "This reduces tidal flow traffic and activates the precinct 24/7. A key to the 'Happy, Healthy City'."
    },
    yes: { budget: 15, land: 20, health: 25, happiness: 30 },
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
      text: "We must mitigate social stratification. This is a high-stakes move to prevent 'rich ghettos' forming."
    },
    yes: { budget: 10, land: 25, health: -10, happiness: 40 },
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
      text: "Be careful. While profitable, this destroys social cohesion and connectivity. It is a failure of design."
    },
    yes: { budget: 5, land: -20, health: -15, happiness: -30 },
    no: { budget: 0, land: 10, health: 5, happiness: 10 }
  },
  {
    id: 4,
    type: 'choice',
    title: "JLD Gateway Strategy",
    description: "Develop the Jurong Lake District as a second CBD to decentralize jobs.",
    image: "jurong_lake",
    color: "#3b82f6", // Economy
    sticker: "skyscraper",
    advisor: {
      character: "Economist",
      text: "Monocentric cities fail at scale. We need this gateway to reduce the morning rush hour strain."
    },
    yes: { budget: 35, land: 15, health: 20, happiness: 25 },
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
      text: "This maximizes land yield in high-value zones. It's the only way to grow without new land."
    },
    yes: { budget: 30, land: 40, health: 10, happiness: 15 },
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
      text: "This is our existential hedge against rising sea levels. It costs billions, but survival is priceless."
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
      text: "A city without memory is just a machine. We sacrifice some density to keep our soul."
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
      text: "This is ouddated 20th-century thinking! It destroys biodiversity and increases downstream risks."
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
    yes: { budget: 20, land: 10, health: 15, happiness: 10 },
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
      text: "This is a trap! It creates 'tidal flow' traffic and a soulless estate."
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
    yes: { budget: 25, land: 30, health: 15, happiness: 10 },
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
      text: "Euclidean zoning creates car dependency and sterile streets. Avoid this."
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
      text: "It achieves economies of scale and removes heat rejection from streets."
    },
    yes: { budget: 15, land: 10, health: 25, happiness: 5 },
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
      text: "Connectivity is key. Without it, isolated reserves suffer from genetic degradation."
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
      text: "This creates 'placeless' towns. We should integrate, not obliterate."
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
      text: "Predictive maintenance saves millions and improves reliability."
    },
    yes: { budget: 25, land: 0, health: 20, happiness: 10 },
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
      text: "This turns wasted space into active social hubs without needing new land."
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
      text: "A massive unlock! We can rebuild low-rise estates into high-density precincts."
    },
    yes: { budget: 30, land: 40, health: -5, happiness: -10 },
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
      text: "This restores the natural ridge and creates a continuous walking experience."
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
    yes: { budget: 30, land: 20, health: 5, happiness: 5 },
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
    yes: { budget: 40, land: 10, health: 10, happiness: 15 },
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
    yes: { budget: 20, land: -10, health: 30, happiness: 5 },
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
  }
];
