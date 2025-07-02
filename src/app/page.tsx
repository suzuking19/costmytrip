import { createClient } from "@/utils/supabase/server";
import { CityGrid } from "@/features/home";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-stone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CityGrid isSignedIn={!!user} />
      </div>
    </div>
  );
}
