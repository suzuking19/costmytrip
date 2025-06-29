import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUserId } from "@/features/mypage/actions";
import { createClient } from "@/utils/supabase/server";
import {
  getUserProfile,
  getUserExpenseCards,
  getUserPinnedCities,
  type UserProfile as UserProfileType,
  type ExpenseCard,
  type PinnedCity,
} from "@/features/mypage/queries";
import { ExpenseCardsGrid } from "@/features/mypage/ExpenseCardItem";
import { ProfileCreator } from "@/features/mypage/ProfileCreator";
import { ProfileEditor } from "@/features/mypage/ProfileEditor";
import { MypageProfile } from "@/features/mypage/MypageProfile";

interface EditingPageData {
  profile: UserProfileType;
  expenseCards: ExpenseCard[];
  pinnedCities: PinnedCity[];
  userMetadata: {
    avatar_url?: string;
    full_name?: string;
    [key: string]: unknown;
  };
}

async function getEditingPageData(
  userId: string
): Promise<EditingPageData | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const [profile, expenseCards, pinnedCities] = await Promise.all([
      getUserProfile(userId),
      getUserExpenseCards(userId),
      getUserPinnedCities(userId),
    ]);

    if (!profile) {
      return null;
    }

    return {
      profile,
      expenseCards,
      pinnedCities,
      userMetadata: user?.user_metadata || {},
    };
  } catch (error) {
    console.error("Error fetching editing page data:", error);
    return null;
  }
}

export default async function EditingPage() {
  const userId = await getCurrentUserId();

  if (!userId) {
    redirect("/signin");
  }

  const data = await getEditingPageData(userId);

  if (!data) {
    return <ProfileCreator userId={userId} />;
  }

  const { profile, expenseCards, pinnedCities, userMetadata } = data;

  const draftCards = expenseCards.filter(
    (card) => card.status.name === "draft"
  );

  return (
    <div className="min-h-screen bg-stone">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative">
        {/* Profile Editor - Top Right */}
        <div className="absolute top-24 right-4 sm:right-6 lg:right-8">
          <ProfileEditor />
        </div>

        {/* Profile Section */}
        <MypageProfile
          profile={profile}
          userMetadata={userMetadata}
          pinnedCities={pinnedCities}
        />

        {/* Expense Cards Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
            Expense Cards
          </h2>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex border-b border-gray-200">
              <Link
                href="/mypage"
                className="px-8 py-3 text-lg font-normal text-gray-400 hover:text-gray-600 transition-colors"
              >
                Published
              </Link>
              <div className="relative group">
                <Link
                  href="/mypage/editing"
                  className="px-8 py-3 text-lg font-bold text-black border-b-2 border-black transition-colors"
                >
                  Editing
                </Link>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  Cards that are being edited will not be published.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Draft Cards Grid */}
        <div className="mb-8">
          <ExpenseCardsGrid
            cards={draftCards}
            userId={userId}
            emptyMessage="No draft travel records"
          />
        </div>
      </div>
    </div>
  );
}
