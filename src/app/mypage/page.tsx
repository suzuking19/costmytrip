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
import { ProfileEditor } from "@/features/mypage/ProfileEditor";
import { ExpenseCardsGrid } from "@/features/mypage/ExpenseCardItem";
import { ProfileCreator } from "@/features/mypage/ProfileCreator";
import { MypageProfile } from "@/features/mypage/MypageProfile";

interface MypageData {
  profile: UserProfileType;
  expenseCards: ExpenseCard[];
  pinnedCities: PinnedCity[];
  userMetadata: {
    avatar_url?: string;
    full_name?: string;
    [key: string]: unknown;
  };
}

async function getMypageData(userId: string): Promise<MypageData | null> {
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
      // Profile not found - this is expected for new users
      return null;
    }

    return {
      profile,
      expenseCards,
      pinnedCities,
      userMetadata: user?.user_metadata || {},
    };
  } catch (error) {
    console.error("Error fetching mypage data:", error);
    return null;
  }
}

export default async function MyPage() {
  const userId = await getCurrentUserId();

  if (!userId) {
    redirect("/signin");
  }

  const data = await getMypageData(userId);

  if (!data) {
    return <ProfileCreator userId={userId} />;
  }

  const { profile, expenseCards, pinnedCities, userMetadata } = data;

  const publishedCards = expenseCards.filter(
    (card) => card.status.name === "published"
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
                className="px-8 py-3 text-lg font-bold text-black border-b-2 border-black transition-colors"
              >
                Published
              </Link>
              <Link
                href="/mypage/editing"
                className="px-8 py-3 text-lg font-normal text-gray-400 hover:text-gray-600 transition-colors"
              >
                Editing
              </Link>
            </div>
          </div>
        </div>

        {/* Published Cards Grid */}
        <div className="mb-8">
          <ExpenseCardsGrid
            cards={publishedCards}
            userId={userId}
            emptyMessage="No published travel records yet"
          />
        </div>
      </div>
    </div>
  );
}
