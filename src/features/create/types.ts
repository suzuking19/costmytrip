export interface TripDetails {
  travelTitle: string;
  startDate: string;
  endDate: string;
  travelType: string;
  participants: string;
  position: string;
  overallDescription: string;
}

export interface ExpenseItem {
  category: string;
  amount: string;
  googleMapsLinks: string[];
}

export interface DailyExpense {
  date: string;
  items: ExpenseItem[];
}

export interface SelectedCity {
  id: string;
  name: string;
  country: string;
}

export interface ExpenseCardData {
  country: string;
  city: string;
  travelTitle: string;
  startDate: string;
  endDate: string;
  travelType: string;
  participants: string;
  position: string;
  overallDescription: string;
  dailyExpenses: DailyExpense[];
  status: "editing" | "published";
}

// Database types
export interface Country {
  code: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
  country: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface TravelType {
  id: string;
  name: string;
}

export interface Position {
  id: string;
  name: string;
}

export interface ExpenseCardStatus {
  id: string;
  name: string;
}
