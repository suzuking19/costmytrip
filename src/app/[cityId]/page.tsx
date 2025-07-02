import { notFound } from "next/navigation";
import { CityHeader, mockCityExpenseData } from "@/features/cities";
import CityExpenseGridClient from "./CityExpenseGridClient";

interface CityPageProps {
  params: Promise<{
    cityId: string;
  }>;
}

export default async function CityPage({ params }: CityPageProps) {
  const { cityId } = await params;

  // Get city data from mock data
  const cityData = mockCityExpenseData[cityId];

  if (!cityData) {
    notFound();
  }

  // Mock signed in status - in real app, this would come from auth
  const isSignedIn = true;

  return (
    <div className="min-h-screen bg-stone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <CityHeader
          cityName={cityData.cityName}
          country={cityData.country}
          totalCards={cityData.totalCards}
          averageCost={cityData.averageCost}
          currency={cityData.currency}
        />

        <CityExpenseGridClient
          expenseCards={cityData.expenseCards}
          isSignedIn={isSignedIn}
        />
      </div>
    </div>
  );
}
