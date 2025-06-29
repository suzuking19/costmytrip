import React from "react";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { getUserProfile } from "@/features/mypage/queries";
import { SettingsForm } from "@/features/mypage/settings/SettingsForm";

export const metadata: Metadata = {
  title: "Profile Settings - CostMyTrip",
  description: "Manage your account settings and profile preferences",
};

export default async function SettingsPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/signin");
  }

  // Get user profile
  const profile = await getUserProfile(user.id);

  if (!profile) {
    // If profile doesn't exist, redirect to create profile page
    redirect("/mypage");
  }

  return (
    <div className="min-h-screen bg-stone">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Profile Settings
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your account settings and preferences to customize your
              profile
            </p>
          </div>

          <SettingsForm profile={profile} userId={user.id} />
        </div>
      </div>
    </div>
  );
}
