"use client";

import { ExpenseCardGrid } from "@/features/cities";
import { ExpenseCard } from "@/features/cities/types";

interface CityExpenseGridClientProps {
  expenseCards: ExpenseCard[];
  isSignedIn: boolean;
}

export default function CityExpenseGridClient({
  expenseCards,
  isSignedIn,
}: CityExpenseGridClientProps) {
  const handleBookmarkToggle = (cardId: string) => {
    // TODO: Implement bookmark functionality with API
    console.log("Bookmark toggled for card:", cardId);
  };

  return (
    <ExpenseCardGrid
      expenseCards={expenseCards}
      isSignedIn={isSignedIn}
      onBookmarkToggle={handleBookmarkToggle}
    />
  );
}
