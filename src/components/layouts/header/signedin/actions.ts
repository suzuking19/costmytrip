"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
};

export { signOut };
