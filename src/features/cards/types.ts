export interface ExpenseItem {
  category: string;
  amount: string;
  description?: string;
  googleMapsLinks: string[];
}

export interface DailyExpense {
  date: string;
  items: ExpenseItem[];
}

export interface ExpenseCardDetail {
  id: string;
  cityId: string;
  title: string;
  description: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  travelType: string;
  numberOfTravelers: number;
  position: string;
  status: "editing" | "published";
  totalCost: number;
  costPerPersonPerDay: number;
  dailyExpenses: DailyExpense[];
  userId: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  bookmarkCount: number;
  isBookmarked: boolean;
}
