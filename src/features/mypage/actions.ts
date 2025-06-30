"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { profileUpdateSchema, validateUsername } from "@/utils/validation";
import {
  updateUserProfile,
  toggleBookmark,
  togglePinnedCity,
  createUserProfile,
  isUsernameTaken,
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
    // Extract form data with proper null/undefined handling
    const username = formData.get("username") as string;
    const description = formData.get("description") as string;
    const currentCityId = formData.get("current_city_id") as string;
    const instagramUrl = formData.get("instagram_url") as string;
    const xUrl = formData.get("x_url") as string;
    const spokenLanguagesInput = formData.get("spoken_languages") as string;

    // Helper function to normalize empty strings to undefined
    const normalizeEmptyString = (value: string | null): string | undefined => {
      return value && value.trim() !== "" ? value.trim() : undefined;
    };

    const spokenLanguages = spokenLanguagesInput
      ? spokenLanguagesInput
          .split(",")
          .map((lang) => lang.trim())
          .filter((lang) => lang.length > 0)
      : [];

    // Prepare data for validation with proper normalization
    const formDataToValidate = {
      username: normalizeEmptyString(username),
      description: normalizeEmptyString(description),
      current_city_id: normalizeEmptyString(currentCityId),
      instagram_url: normalizeEmptyString(instagramUrl),
      x_url: normalizeEmptyString(xUrl),
      spoken_languages:
        spokenLanguages.length > 0 ? spokenLanguages : undefined,
    };

    console.log("Form data to validate:", formDataToValidate);

    // Validate all data using Zod schema
    const validationResult = profileUpdateSchema.safeParse(formDataToValidate);

    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      return {
        success: false,
        error: firstError?.message || "Validation failed",
      };
    }

    const validatedData = validationResult.data;

    const updates = {
      username: validatedData.username || undefined,
      description: validatedData.description || null,
      current_city_id: validatedData.current_city_id || null,
      instagram_url: validatedData.instagram_url || null,
      x_url: validatedData.x_url || null,
      spoken_languages: validatedData.spoken_languages || null,
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
    // Validate username format
    const validation = validateUsername(username);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error || "Invalid username format",
      };
    }

    // Check if username is already taken
    const isTaken = await isUsernameTaken(username);
    if (isTaken) {
      return {
        success: false,
        error: "This username is already taken. Please choose a different one.",
      };
    }

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
