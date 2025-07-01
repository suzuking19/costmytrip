// Theme colors based on the provided hex values
export const colors = {
  darkBlue: "#124261", // Main color
  teal: "#227461", // Secondary color
  orange: "#E48928", // Accent color
  lightBeige: "#F3F1EF", // Base color
};

// Predefined lists for countries and major cities
export const countries = [
  { code: "US", name: "United States" },
  { code: "JP", name: "Japan" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "CN", name: "China" },
  { code: "IN", name: "India" },
  { code: "BR", name: "Brazil" },
  { code: "KR", name: "South Korea" },
  { code: "TH", name: "Thailand" },
  { code: "VN", name: "Vietnam" },
  { code: "SG", name: "Singapore" },
  { code: "MY", name: "Malaysia" },
  { code: "ID", name: "Indonesia" },
  { code: "PH", name: "Philippines" },
  { code: "TW", name: "Taiwan" },
];

export const majorCitiesByCountry: Record<string, string[]> = {
  US: [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Miami",
    "San Francisco",
    "Seattle",
    "Boston",
  ],
  JP: ["Tokyo", "Osaka", "Kyoto", "Sapporo", "Fukuoka", "Hiroshima", "Nagoya"],
  FR: ["Paris", "Marseille", "Lyon", "Nice", "Toulouse", "Bordeaux"],
  DE: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Stuttgart"],
  GB: [
    "London",
    "Manchester",
    "Birmingham",
    "Glasgow",
    "Liverpool",
    "Edinburgh",
  ],
  CA: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
  AU: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  IT: ["Rome", "Milan", "Naples", "Turin", "Florence", "Venice"],
  ES: ["Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza"],
  CN: ["Beijing", "Shanghai", "Chongqing", "Tianjin", "Guangzhou", "Shenzhen"],
  IN: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai"],
  BR: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza"],
  KR: ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju"],
  TH: ["Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Krabi"],
  VN: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Hoi An", "Nha Trang"],
  SG: ["Singapore"],
  MY: ["Kuala Lumpur", "Johor Bahru", "George Town", "Ipoh"],
  ID: ["Jakarta", "Bali", "Yogyakarta", "Surabaya", "Bandung"],
  PH: ["Manila", "Cebu", "Davao", "Boracay", "Palawan"],
  TW: ["Taipei", "Kaohsiung", "Taichung", "Tainan"],
};

// Travel Types
export const travelTypes = [
  "Solo Travel / Traveling Alone",
  "Couple's Travel",
  "Family Travel",
  "Friends' Travel / Travel with Friends",
  "Group Travel",
  "Honeymoon",
  "Girls' Trip / Girls' Getaway",
  "Senior Travel",
  "Pet-Friendly Travel / Travel with Pets",
  "Company Trip / Corporate Travel / Incentive Travel",
  "MICE Travel (Meetings, Incentives, Conferences, Exhibitions/Events)",
  "Workation",
  "Backpacking Travel / Backpacking",
  "Pilgrimage (in a general sense) / Pop Culture Tourism / Anime Tourism (for anime-specific)",
];

// Position Types
export const positionTypes = [
  "Student",
  "Working Professional",
  "Homemaker",
  "Part-time Worker",
  "Other",
];

// Expense Categories (Tags)
export const expenseCategories = [
  "Food & Dining",
  "Accommodation",
  "Transportation",
  "Activities & Entertainment",
  "Shopping",
  "Flights",
  "Visa Fees",
  "Insurance",
  "Souvenirs",
  "Other",
];

// Database mapping
export const travelTypeMapping: Record<string, string> = {
  "Solo Travel / Traveling Alone": "solo",
  "Couple's Travel": "couple",
  "Family Travel": "family",
  "Friends' Travel / Travel with Friends": "friends",
  "Group Travel": "group tour",
  Honeymoon: "couple",
  "Girls' Trip / Girls' Getaway": "friends",
  "Senior Travel": "family",
  "Pet-Friendly Travel / Travel with Pets": "family",
  "Company Trip / Corporate Travel / Incentive Travel": "business",
  "MICE Travel (Meetings, Incentives, Conferences, Exhibitions/Events)":
    "business",
  Workation: "business",
  "Backpacking Travel / Backpacking": "backpacking",
  "Pilgrimage (in a general sense) / Pop Culture Tourism / Anime Tourism (for anime-specific)":
    "solo",
};

export const positionMapping: Record<string, string> = {
  Student: "student",
  "Working Professional": "office worker",
  Homemaker: "other",
  "Part-time Worker": "freelancer",
  Other: "other",
};

export const categoryMapping: Record<string, string> = {
  "Food & Dining": "food",
  Accommodation: "accommodation",
  Transportation: "transportation",
  "Activities & Entertainment": "entertainment",
  Shopping: "shopping",
  Flights: "transportation",
  "Visa Fees": "miscellaneous",
  Insurance: "miscellaneous",
  Souvenirs: "shopping",
  Other: "miscellaneous",
};
