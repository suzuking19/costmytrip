import type { ExpenseCardDetail } from "./types";

export const mockExpenseCardDetails: Record<string, ExpenseCardDetail> = {
  "tokyo-exp-1": {
    id: "tokyo-exp-1",
    cityId: "tokyo",
    title: "Budget Solo Adventure in Tokyo",
    description:
      "Amazing week in Tokyo exploring temples, trying street food, and experiencing the vibrant culture. Stayed in budget hostels and used public transport extensively. Visited Senso-ji, Shibuya, Harajuku, and experienced traditional Japanese culture.",
    city: "Tokyo",
    country: "Japan",
    startDate: "2024-11-15",
    endDate: "2024-11-22",
    travelType: "Solo Travel / Traveling Alone",
    numberOfTravelers: 1,
    position: "Student",
    status: "published",
    totalCost: 504.0,
    costPerPersonPerDay: 72.0,
    dailyExpenses: [
      {
        date: "2024-11-15",
        items: [
          {
            category: "Food & Dining",
            amount: "25.00",
            description: "Ramen dinner at Ichiran",
            googleMapsLinks: ["https://maps.app.goo.gl/tokyo-ichiran"],
          },
          {
            category: "Accommodation",
            amount: "35.00",
            description: "Hostel bed in Shibuya",
            googleMapsLinks: ["https://maps.app.goo.gl/tokyo-hostel"],
          },
          {
            category: "Transportation",
            amount: "12.00",
            description: "JR Yamanote Line day pass",
            googleMapsLinks: [],
          },
        ],
      },
      {
        date: "2024-11-16",
        items: [
          {
            category: "Food & Dining",
            amount: "30.00",
            description: "Sushi breakfast and street food lunch",
            googleMapsLinks: ["https://maps.app.goo.gl/tsukiji-market"],
          },
          {
            category: "Activities & Entertainment",
            amount: "15.00",
            description: "Senso-ji Temple visit",
            googleMapsLinks: ["https://maps.app.goo.gl/sensoji-temple"],
          },
          {
            category: "Transportation",
            amount: "8.00",
            description: "Metro rides",
            googleMapsLinks: [],
          },
        ],
      },
      {
        date: "2024-11-17",
        items: [
          {
            category: "Food & Dining",
            amount: "40.00",
            description: "Harajuku crepes and dinner",
            googleMapsLinks: ["https://maps.app.goo.gl/harajuku-takeshita"],
          },
          {
            category: "Shopping",
            amount: "50.00",
            description: "Souvenirs from Shibuya",
            googleMapsLinks: ["https://maps.app.goo.gl/shibuya-crossing"],
          },
          {
            category: "Transportation",
            amount: "10.00",
            description: "Train tickets",
            googleMapsLinks: [],
          },
        ],
      },
      {
        date: "2024-11-18",
        items: [
          {
            category: "Activities & Entertainment",
            amount: "20.00",
            description: "Tokyo National Museum",
            googleMapsLinks: ["https://maps.app.goo.gl/tokyo-national-museum"],
          },
          {
            category: "Food & Dining",
            amount: "35.00",
            description: "Traditional kaiseki lunch",
            googleMapsLinks: [],
          },
        ],
      },
      {
        date: "2024-11-19",
        items: [
          {
            category: "Food & Dining",
            amount: "45.00",
            description: "Ueno market food tour",
            googleMapsLinks: ["https://maps.app.goo.gl/ueno-market"],
          },
          {
            category: "Activities & Entertainment",
            amount: "18.00",
            description: "Tokyo Skytree observation deck",
            googleMapsLinks: ["https://maps.app.goo.gl/tokyo-skytree"],
          },
        ],
      },
      {
        date: "2024-11-20",
        items: [
          {
            category: "Food & Dining",
            amount: "38.00",
            description: "Ginza sushi and ramen",
            googleMapsLinks: ["https://maps.app.goo.gl/ginza-sushi"],
          },
          {
            category: "Shopping",
            amount: "25.00",
            description: "Traditional crafts",
            googleMapsLinks: [],
          },
        ],
      },
      {
        date: "2024-11-21",
        items: [
          {
            category: "Food & Dining",
            amount: "30.00",
            description: "Final breakfast and snacks",
            googleMapsLinks: [],
          },
          {
            category: "Transportation",
            amount: "22.00",
            description: "Narita Express to airport",
            googleMapsLinks: [],
          },
        ],
      },
    ],
    userId: "user-1",
    username: "tokyo_wanderer",
    createdAt: "2024-11-25T10:30:00Z",
    updatedAt: "2024-11-25T10:30:00Z",
    bookmarkCount: 28,
    isBookmarked: false,
  },
  "paris-exp-2": {
    id: "paris-exp-2",
    cityId: "paris",
    title: "Romantic Paris Getaway",
    description:
      "A perfect romantic weekend in the City of Light. Visited iconic landmarks, enjoyed wine tastings, and experienced the best of Parisian cuisine. Stayed in a charming boutique hotel near the Louvre.",
    city: "Paris",
    country: "France",
    startDate: "2024-05-15",
    endDate: "2024-05-18",
    travelType: "Couple's Travel",
    numberOfTravelers: 2,
    position: "Working Professional",
    status: "published",
    totalCost: 890.75,
    costPerPersonPerDay: 148.46,
    dailyExpenses: [
      {
        date: "2024-05-15",
        items: [
          {
            category: "Accommodation",
            amount: "180.00",
            description: "Boutique hotel near Louvre",
            googleMapsLinks: ["https://maps.app.goo.gl/paris-hotel-louvre"],
          },
          {
            category: "Food & Dining",
            amount: "85.00",
            description: "Welcome dinner at bistro",
            googleMapsLinks: ["https://maps.app.goo.gl/paris-bistro"],
          },
          {
            category: "Transportation",
            amount: "25.00",
            description: "Metro day passes for 2",
            googleMapsLinks: [],
          },
        ],
      },
      {
        date: "2024-05-16",
        items: [
          {
            category: "Activities & Entertainment",
            amount: "40.00",
            description: "Louvre Museum tickets",
            googleMapsLinks: ["https://maps.app.goo.gl/louvre-museum"],
          },
          {
            category: "Food & Dining",
            amount: "120.00",
            description: "Lunch at Café de Flore and dinner",
            googleMapsLinks: ["https://maps.app.goo.gl/cafe-de-flore"],
          },
          {
            category: "Activities & Entertainment",
            amount: "35.00",
            description: "Seine river cruise",
            googleMapsLinks: ["https://maps.app.goo.gl/seine-cruise"],
          },
        ],
      },
      {
        date: "2024-05-17",
        items: [
          {
            category: "Activities & Entertainment",
            amount: "30.00",
            description: "Eiffel Tower elevator tickets",
            googleMapsLinks: ["https://maps.app.goo.gl/eiffel-tower"],
          },
          {
            category: "Food & Dining",
            amount: "95.00",
            description: "Wine tasting and romantic dinner",
            googleMapsLinks: ["https://maps.app.goo.gl/paris-wine-bar"],
          },
          {
            category: "Shopping",
            amount: "150.00",
            description: "Souvenirs from Champs-Élysées",
            googleMapsLinks: ["https://maps.app.goo.gl/champs-elysees"],
          },
        ],
      },
      {
        date: "2024-05-18",
        items: [
          {
            category: "Food & Dining",
            amount: "60.00",
            description: "Final brunch at Montmartre",
            googleMapsLinks: ["https://maps.app.goo.gl/montmartre-cafe"],
          },
          {
            category: "Transportation",
            amount: "35.00",
            description: "Charles de Gaulle airport transfer",
            googleMapsLinks: [],
          },
        ],
      },
    ],
    userId: "user-2",
    username: "paris_lover",
    createdAt: "2024-05-20T14:30:00Z",
    updatedAt: "2024-05-20T14:30:00Z",
    bookmarkCount: 42,
    isBookmarked: true,
  },
  "newyork-exp-3": {
    id: "newyork-exp-3",
    cityId: "newyork",
    title: "NYC Business Trip with Style",
    description:
      "A productive business trip to New York with perfect balance of work and leisure. Stayed in Manhattan, attended conferences, and explored the city's culinary scene during free time.",
    city: "New York",
    country: "United States",
    startDate: "2024-06-10",
    endDate: "2024-06-14",
    travelType: "Company Trip / Corporate Travel / Incentive Travel",
    numberOfTravelers: 1,
    position: "Working Professional",
    status: "published",
    totalCost: 1850.25,
    costPerPersonPerDay: 370.05,
    dailyExpenses: [
      {
        date: "2024-06-10",
        items: [
          {
            category: "Accommodation",
            amount: "220.00",
            description: "Business hotel in Times Square",
            googleMapsLinks: ["https://maps.app.goo.gl/times-square-hotel"],
          },
          {
            category: "Food & Dining",
            amount: "95.00",
            description: "Welcome dinner at steakhouse",
            googleMapsLinks: ["https://maps.app.goo.gl/nyc-steakhouse"],
          },
          {
            category: "Transportation",
            amount: "55.00",
            description: "JFK airport taxi",
            googleMapsLinks: [],
          },
        ],
      },
      {
        date: "2024-06-11",
        items: [
          {
            category: "Food & Dining",
            amount: "120.00",
            description: "Business lunch and client dinner",
            googleMapsLinks: ["https://maps.app.goo.gl/wall-street-restaurant"],
          },
          {
            category: "Transportation",
            amount: "45.00",
            description: "Uber rides for meetings",
            googleMapsLinks: [],
          },
          {
            category: "Activities & Entertainment",
            amount: "85.00",
            description: "Broadway show with client",
            googleMapsLinks: ["https://maps.app.goo.gl/broadway-theater"],
          },
        ],
      },
      {
        date: "2024-06-12",
        items: [
          {
            category: "Food & Dining",
            amount: "150.00",
            description: "Conference lunch and networking dinner",
            googleMapsLinks: [
              "https://maps.app.goo.gl/manhattan-conference-center",
            ],
          },
          {
            category: "Activities & Entertainment",
            amount: "40.00",
            description: "Top of the Rock observation deck",
            googleMapsLinks: ["https://maps.app.goo.gl/top-of-rock"],
          },
        ],
      },
      {
        date: "2024-06-13",
        items: [
          {
            category: "Food & Dining",
            amount: "110.00",
            description: "Central Park brunch and farewell dinner",
            googleMapsLinks: [
              "https://maps.app.goo.gl/central-park-restaurant",
            ],
          },
          {
            category: "Shopping",
            amount: "200.00",
            description: "Business gifts and souvenirs",
            googleMapsLinks: ["https://maps.app.goo.gl/fifth-avenue"],
          },
        ],
      },
      {
        date: "2024-06-14",
        items: [
          {
            category: "Food & Dining",
            amount: "65.00",
            description: "Final breakfast and airport meal",
            googleMapsLinks: [],
          },
          {
            category: "Transportation",
            amount: "50.00",
            description: "Taxi to JFK airport",
            googleMapsLinks: [],
          },
        ],
      },
    ],
    userId: "user-3",
    username: "nyc_business_pro",
    createdAt: "2024-06-20T09:15:00Z",
    updatedAt: "2024-06-20T09:15:00Z",
    bookmarkCount: 15,
    isBookmarked: false,
  },
  "london-exp-4": {
    id: "london-exp-4",
    cityId: "london",
    title: "London Family Adventure",
    description:
      "A memorable family trip to London with kids, visiting museums, parks, and iconic landmarks. Perfect balance of education and fun for the whole family. Stayed in family-friendly accommodation near Hyde Park.",
    city: "London",
    country: "United Kingdom",
    startDate: "2024-07-20",
    endDate: "2024-07-24",
    travelType: "Family Travel",
    numberOfTravelers: 4,
    position: "Working Professional",
    status: "published",
    totalCost: 2200.8,
    costPerPersonPerDay: 110.04,
    dailyExpenses: [
      {
        date: "2024-07-20",
        items: [
          {
            category: "Accommodation",
            amount: "160.00",
            description: "Family hotel near Hyde Park",
            googleMapsLinks: ["https://maps.app.goo.gl/london-family-hotel"],
          },
          {
            category: "Food & Dining",
            amount: "85.00",
            description: "Traditional pub dinner for family",
            googleMapsLinks: ["https://maps.app.goo.gl/london-pub"],
          },
          {
            category: "Transportation",
            amount: "40.00",
            description: "Family travel cards for Underground",
            googleMapsLinks: [],
          },
        ],
      },
      {
        date: "2024-07-21",
        items: [
          {
            category: "Activities & Entertainment",
            amount: "120.00",
            description: "London Eye family tickets",
            googleMapsLinks: ["https://maps.app.goo.gl/london-eye"],
          },
          {
            category: "Food & Dining",
            amount: "95.00",
            description: "Lunch at Borough Market and family dinner",
            googleMapsLinks: ["https://maps.app.goo.gl/borough-market"],
          },
          {
            category: "Activities & Entertainment",
            amount: "60.00",
            description: "Tower Bridge exhibition",
            googleMapsLinks: ["https://maps.app.goo.gl/tower-bridge"],
          },
        ],
      },
      {
        date: "2024-07-22",
        items: [
          {
            category: "Activities & Entertainment",
            amount: "80.00",
            description: "British Museum family tickets",
            googleMapsLinks: ["https://maps.app.goo.gl/british-museum"],
          },
          {
            category: "Food & Dining",
            amount: "110.00",
            description: "Afternoon tea and family dinner",
            googleMapsLinks: ["https://maps.app.goo.gl/london-afternoon-tea"],
          },
          {
            category: "Shopping",
            amount: "75.00",
            description: "Souvenirs for kids at Hamleys",
            googleMapsLinks: ["https://maps.app.goo.gl/hamleys-toy-store"],
          },
        ],
      },
      {
        date: "2024-07-23",
        items: [
          {
            category: "Activities & Entertainment",
            amount: "150.00",
            description: "Harry Potter Studios family tour",
            googleMapsLinks: ["https://maps.app.goo.gl/harry-potter-studios"],
          },
          {
            category: "Food & Dining",
            amount: "90.00",
            description: "Lunch at studios and family dinner",
            googleMapsLinks: [],
          },
          {
            category: "Transportation",
            amount: "50.00",
            description: "Coach to Harry Potter Studios",
            googleMapsLinks: [],
          },
        ],
      },
      {
        date: "2024-07-24",
        items: [
          {
            category: "Food & Dining",
            amount: "70.00",
            description: "Final breakfast and airport meal",
            googleMapsLinks: [],
          },
          {
            category: "Transportation",
            amount: "65.00",
            description: "Heathrow Express family tickets",
            googleMapsLinks: [],
          },
        ],
      },
    ],
    userId: "user-4",
    username: "london_family_explorer",
    createdAt: "2024-07-30T16:45:00Z",
    updatedAt: "2024-07-30T16:45:00Z",
    bookmarkCount: 33,
    isBookmarked: true,
  },
  "sydney-exp-5": {
    id: "sydney-exp-5",
    cityId: "sydney",
    title: "Sydney Beach & City Adventure",
    description:
      "Perfect combination of beach relaxation and city exploration in beautiful Sydney. Enjoyed surfing lessons, harbor cruises, and the vibrant food scene with friends. Unforgettable Australian experience.",
    city: "Sydney",
    country: "Australia",
    startDate: "2024-08-05",
    endDate: "2024-08-08",
    travelType: "Friends' Travel / Travel with Friends",
    numberOfTravelers: 3,
    position: "Working Professional",
    status: "published",
    totalCost: 1450.6,
    costPerPersonPerDay: 120.88,
    dailyExpenses: [
      {
        date: "2024-08-05",
        items: [
          {
            category: "Accommodation",
            amount: "140.00",
            description: "Beachfront hostel near Bondi Beach",
            googleMapsLinks: ["https://maps.app.goo.gl/bondi-beach-hostel"],
          },
          {
            category: "Food & Dining",
            amount: "90.00",
            description: "Seafood dinner at The Rocks",
            googleMapsLinks: ["https://maps.app.goo.gl/the-rocks-seafood"],
          },
          {
            category: "Transportation",
            amount: "35.00",
            description: "Airport train and day passes",
            googleMapsLinks: [],
          },
        ],
      },
      {
        date: "2024-08-06",
        items: [
          {
            category: "Activities & Entertainment",
            amount: "105.00",
            description: "Sydney Opera House tour and harbor cruise",
            googleMapsLinks: [
              "https://maps.app.goo.gl/sydney-opera-house",
              "https://maps.app.goo.gl/sydney-harbor-cruise",
            ],
          },
          {
            category: "Food & Dining",
            amount: "85.00",
            description: "Brunch in Circular Quay and dinner",
            googleMapsLinks: [
              "https://maps.app.goo.gl/circular-quay-restaurant",
            ],
          },
          {
            category: "Transportation",
            amount: "25.00",
            description: "Ferry rides",
            googleMapsLinks: [],
          },
        ],
      },
      {
        date: "2024-08-07",
        items: [
          {
            category: "Activities & Entertainment",
            amount: "90.00",
            description: "Surfing lessons at Bondi Beach",
            googleMapsLinks: ["https://maps.app.goo.gl/bondi-surf-school"],
          },
          {
            category: "Food & Dining",
            amount: "75.00",
            description: "Beach cafe lunch and BBQ dinner",
            googleMapsLinks: ["https://maps.app.goo.gl/bondi-beach-cafe"],
          },
          {
            category: "Shopping",
            amount: "120.00",
            description: "Australian souvenirs and beachwear",
            googleMapsLinks: ["https://maps.app.goo.gl/paddington-markets"],
          },
        ],
      },
      {
        date: "2024-08-08",
        items: [
          {
            category: "Food & Dining",
            amount: "60.00",
            description: "Final brunch with harbor view",
            googleMapsLinks: [
              "https://maps.app.goo.gl/sydney-harbor-restaurant",
            ],
          },
          {
            category: "Transportation",
            amount: "45.00",
            description: "Airport transfer for group",
            googleMapsLinks: [],
          },
        ],
      },
    ],
    userId: "user-5",
    username: "sydney_surf_crew",
    createdAt: "2024-08-15T11:20:00Z",
    updatedAt: "2024-08-15T11:20:00Z",
    bookmarkCount: 51,
    isBookmarked: false,
  },
  "bangkok-exp-6": {
    id: "bangkok-exp-6",
    cityId: "bangkok",
    title: "Bangkok Street Food & Temples",
    description:
      "An incredible journey through Bangkok's street food scene and magnificent temples. Perfect for food lovers and culture enthusiasts on a budget. Experienced authentic Thai culture and amazing hospitality.",
    city: "Bangkok",
    country: "Thailand",
    startDate: "2024-09-12",
    endDate: "2024-09-15",
    travelType: "Backpacking Travel / Backpacking",
    numberOfTravelers: 2,
    position: "Student",
    status: "published",
    totalCost: 580.4,
    costPerPersonPerDay: 72.55,
    dailyExpenses: [
      {
        date: "2024-09-12",
        items: [
          {
            category: "Accommodation",
            amount: "25.00",
            description: "Budget hostel in Khao San Road",
            googleMapsLinks: ["https://maps.app.goo.gl/khao-san-road-hostel"],
          },
          {
            category: "Food & Dining",
            amount: "35.00",
            description: "Street food dinner tour",
            googleMapsLinks: ["https://maps.app.goo.gl/khao-san-street-food"],
          },
          {
            category: "Transportation",
            amount: "8.00",
            description: "BTS day pass for 2",
            googleMapsLinks: [],
          },
        ],
      },
      {
        date: "2024-09-13",
        items: [
          {
            category: "Activities & Entertainment",
            amount: "20.00",
            description: "Wat Pho temple entrance fees",
            googleMapsLinks: ["https://maps.app.goo.gl/wat-pho-temple"],
          },
          {
            category: "Food & Dining",
            amount: "40.00",
            description: "Chatuchak market food and dinner",
            googleMapsLinks: [
              "https://maps.app.goo.gl/chatuchak-weekend-market",
            ],
          },
          {
            category: "Transportation",
            amount: "18.00",
            description: "Tuk-tuk rides around the city",
            googleMapsLinks: [],
          },
          {
            category: "Activities & Entertainment",
            amount: "15.00",
            description: "Traditional Thai massage",
            googleMapsLinks: ["https://maps.app.goo.gl/thai-massage-spa"],
          },
        ],
      },
      {
        date: "2024-09-14",
        items: [
          {
            category: "Activities & Entertainment",
            amount: "30.00",
            description: "Grand Palace entrance fees",
            googleMapsLinks: ["https://maps.app.goo.gl/grand-palace-bangkok"],
          },
          {
            category: "Food & Dining",
            amount: "45.00",
            description: "Floating market breakfast and dinner",
            googleMapsLinks: [
              "https://maps.app.goo.gl/damnoen-saduak-floating-market",
            ],
          },
          {
            category: "Shopping",
            amount: "65.00",
            description: "Local crafts and spices",
            googleMapsLinks: ["https://maps.app.goo.gl/bangkok-spice-market"],
          },
          {
            category: "Transportation",
            amount: "25.00",
            description: "Day trip to floating market",
            googleMapsLinks: [],
          },
        ],
      },
      {
        date: "2024-09-15",
        items: [
          {
            category: "Food & Dining",
            amount: "30.00",
            description: "Final street food breakfast",
            googleMapsLinks: ["https://maps.app.goo.gl/bangkok-street-food"],
          },
          {
            category: "Transportation",
            amount: "20.00",
            description: "Airport rail link",
            googleMapsLinks: [],
          },
          {
            category: "Shopping",
            amount: "15.00",
            description: "Last-minute snacks and gifts",
            googleMapsLinks: [],
          },
        ],
      },
    ],
    userId: "user-6",
    username: "bangkok_backpacker",
    createdAt: "2024-09-20T13:10:00Z",
    updatedAt: "2024-09-20T13:10:00Z",
    bookmarkCount: 67,
    isBookmarked: true,
  },
};
