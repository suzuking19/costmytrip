import { createClient } from "@/utils/supabase/server";
import GuestHeader from "@/components/layouts/header/GuestHeader";
import SignedinHeader from "@/components/layouts/header/signedin/SignedinHeader";

export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return <SignedinHeader />;
  }

  return <GuestHeader />;
}
