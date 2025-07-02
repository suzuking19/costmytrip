import { createClient } from "@/utils/supabase/server";
import CityGrid from "./CityGrid";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-stone">
      {/* Hero section */}
      <div className="bg-gradient-to-b from-indigo-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Real Travel Costs
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Browse actual expenses shared by travelers from around the world.
              Plan your budget with confidence using real data.
            </p>
          </div>
        </div>
      </div>

      {/* Cities section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Destinations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore expense cards from major cities and get insights from fellow
            travelers.
          </p>
        </div>

        <CityGrid isSignedIn={!!user} />
      </div>
    </div>
  );
}
