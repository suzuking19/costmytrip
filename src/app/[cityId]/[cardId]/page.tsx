import { notFound } from "next/navigation";
import { ExpenseCardDetail, mockExpenseCardDetails } from "@/features/cards";

interface PageProps {
  params: Promise<{
    cityId: string;
    cardId: string;
  }>;
}

export default async function ExpenseCardDetailPage({ params }: PageProps) {
  const { cardId } = await params;

  // Get expense card data from mock data
  const expenseCard = mockExpenseCardDetails[cardId];

  if (!expenseCard) {
    notFound();
  }

  return <ExpenseCardDetail expenseCard={expenseCard} />;
}

// Generate static params for all available cards
export async function generateStaticParams() {
  const cardIds = Object.keys(mockExpenseCardDetails);

  return cardIds.map((cardId) => {
    const card = mockExpenseCardDetails[cardId];
    return {
      cityId: card.cityId,
      cardId: cardId,
    };
  });
}

// Generate metadata for each card
export async function generateMetadata({ params }: PageProps) {
  const { cardId } = await params;
  const expenseCard = mockExpenseCardDetails[cardId];

  if (!expenseCard) {
    return {
      title: "Expense Card Not Found",
    };
  }

  return {
    title: `${expenseCard.title} - ${expenseCard.city} Trip Details | CostMyTrip`,
    description: expenseCard.description,
    openGraph: {
      title: expenseCard.title,
      description: expenseCard.description,
      type: "article",
    },
  };
}
