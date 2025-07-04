import { createClient } from "@/utils/supabase/server";
import { HomeContent } from "@/features/home";
import { CityCard } from "@/features/home/card/types";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // TODO: Fetch cities data from actual database
  // Currently using empty array for testing, mockCityCards is commented out
  const cities: CityCard[] = []; // mockCityCards;

  return (
    <div className="min-h-screen bg-stone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <HomeContent cities={cities} isSignedIn={!!user} />
      </div>
    </div>
  );
}
