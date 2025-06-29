"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import {
  validateInstagramUrl,
  validateXUrl,
  validateUsername,
} from "@/utils/validation";
import {
  updateUserProfile,
  toggleBookmark,
  togglePinnedCity,
  createUserProfile,
  type UserProfile,
} from "./queries";

/**
 * Update user profile action
 */
export async function updateProfileAction(
  userId: string,
  formData: FormData
): Promise<{ success: boolean; data?: UserProfile; error?: string }> {
  try {
    const username = formData.get("username") as string;
    const description = formData.get("description") as string;
    const currentCityId = formData.get("current_city_id") as string;
    const instagramUrl = formData.get("instagram_url") as string;
    const xUrl = formData.get("x_url") as string;
    const spokenLanguagesInput = formData.get("spoken_languages") as string;
    const spokenLanguages = spokenLanguagesInput
      ? spokenLanguagesInput
          .split(",")
          .map((lang) => lang.trim())
          .filter((lang) => lang.length > 0)
      : [];

    // Validate username
    const usernameValidation = validateUsername(username);
    if (!usernameValidation.isValid) {
      return {
        success: false,
        error: usernameValidation.error || "Invalid username format",
      };
    }

    // Validate Instagram URL
    const instagramValidation = validateInstagramUrl(instagramUrl);
    if (!instagramValidation.isValid) {
      return {
        success: false,
        error: instagramValidation.error || "Invalid Instagram URL format",
      };
    }

    // Validate X URL
    const xValidation = validateXUrl(xUrl);
    if (!xValidation.isValid) {
      return {
        success: false,
        error: xValidation.error || "Invalid X URL format",
      };
    }

    const updates = {
      username: username || undefined,
      description: description || null,
      current_city_id: currentCityId || null,
      instagram_url: instagramUrl || null,
      x_url: xUrl || null,
      spoken_languages: spokenLanguages.length > 0 ? spokenLanguages : null,
    };

    const updatedProfile = await updateUserProfile(userId, updates);

    if (!updatedProfile) {
      return { success: false, error: "Failed to update profile" };
    }

    revalidatePath("/mypage");
    return { success: true, data: updatedProfile };
  } catch (error) {
    console.error("Profile update error:", error);
    return {
      success: false,
      error: "An error occurred while updating profile",
    };
  }
}

/**
 * Toggle bookmark action
 */
export async function toggleBookmarkAction(
  userId: string,
  expenseCardId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await toggleBookmark(userId, expenseCardId);

    if (!result) {
      return { success: false, error: "Failed to update bookmark" };
    }

    revalidatePath("/mypage/bookmarks");
    return { success: true };
  } catch (error) {
    console.error("Bookmark toggle error:", error);
    return {
      success: false,
      error: "An error occurred while updating bookmark",
    };
  }
}

/**
 * Toggle pinned city action
 */
export async function togglePinnedCityAction(
  userId: string,
  cityId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await togglePinnedCity(userId, cityId);

    if (!result) {
      return { success: false, error: "Failed to update pinned city" };
    }

    revalidatePath("/mypage");
    return { success: true };
  } catch (error) {
    console.error("Pinned city toggle error:", error);
    return {
      success: false,
      error: "An error occurred while updating pinned city",
    };
  }
}

/**
 * Get current user ID
 */
export async function getCurrentUserId(): Promise<string | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id || null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

/**
 * Create user profile action
 */
export async function createProfileAction(
  userId: string,
  username: string
): Promise<{ success: boolean; data?: UserProfile; error?: string }> {
  try {
    const profile = await createUserProfile(userId, username);

    if (!profile) {
      return { success: false, error: "Failed to create profile" };
    }

    revalidatePath("/mypage");
    return { success: true, data: profile };
  } catch (error) {
    console.error("Profile creation error:", error);
    return {
      success: false,
      error: "An error occurred while creating profile",
    };
  }
}
