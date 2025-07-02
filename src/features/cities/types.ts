export interface ExpenseCard {
  id: string;
  cityId: string;
  cityName: string;
  country: string;
  title: string;
  startDate: string;
  endDate: string;
  travelType: string;
  position: string;
  participants: string;
  overallDescription: string;
  totalCost: number;
  currency: string;
  dailyCost: number;
  duration: number;
  bookmarkCount: number;
  isBookmarked: boolean;
  author: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
  createdAt: string;
  status: "published" | "editing";
}

export interface CityExpenseData {
  cityId: string;
  cityName: string;
  country: string;
  totalCards: number;
  averageCost: number;
  currency: string;
  expenseCards: ExpenseCard[];
}
