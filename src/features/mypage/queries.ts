import { createClient } from "@/utils/supabase/server";

export interface UserProfile {
  id: string;
  username: string;
  description: string | null;
  current_city_id: string | null;
  spoken_languages: string[] | null;
  instagram_url: string | null;
  x_url: string | null;
  created_at: string;
  updated_at: string;
  current_city?: {
    name: string;
    country: {
      name: string;
    };
  };
}

export interface ExpenseCard {
  id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  number_of_travelers: number;
  created_at: string;
  updated_at: string;
  city?: {
    name: string;
    country: {
      name: string;
    };
  };
  status: {
    name: string;
  };
  travel_type?: {
    name: string;
  };
  position?: {
    name: string;
  };
}

export interface BookmarkedCard {
  expense_card: ExpenseCard;
  created_at: string;
}

export interface PinnedCity {
  city: {
    id: string;
    name: string;
    country: {
      name: string;
    };
  };
}

/**
 * Get user profile
 */
export async function getUserProfile(
  userId: string
): Promise<UserProfile | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_profiles")
    .select(
      `
      *,
      current_city:cities!current_city_id(
        name,
        country:countries(name)
      )
    `
    )
    .eq("id", userId)
    .single();

  if (error) {
    // Silent handling - don't log detailed error for expected cases like user not found
    if (error.code === "PGRST116") {
      // User profile not found - this is expected for new users
      return null;
    }

    console.error("Error fetching user profile:", error.message || error);
    return null;
  }

  return data;
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<
    Pick<
      UserProfile,
      | "username"
      | "description"
      | "current_city_id"
      | "spoken_languages"
      | "instagram_url"
      | "x_url"
    >
  >
): Promise<UserProfile | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_profiles")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select(
      `
      *,
      current_city:cities!current_city_id(
        name,
        country:countries(name)
      )
    `
    )
    .single();

  if (error) {
    console.error("Error updating user profile:", error);
    return null;
  }

  return data;
}

/**
 * Create user profile
 */
export async function createUserProfile(
  userId: string,
  username: string
): Promise<UserProfile | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_profiles")
    .insert({
      id: userId,
      username: username,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select(
      `
      *,
      current_city:cities!current_city_id(
        name,
        country:countries(name)
      )
    `
    )
    .single();

  if (error) {
    console.error("Error creating user profile:", {
      error,
      userId,
      username,
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    return null;
  }

  return data;
}

/**
 * Get user's expense cards
 */
export async function getUserExpenseCards(
  userId: string
): Promise<ExpenseCard[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("expense_cards")
    .select(
      `
      *,
      city:cities!city_id(
        name,
        country:countries(name)
      ),
      status:expense_card_statuses(name),
      travel_type:travel_types(name),
      position:positions(name)
    `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching expense cards:", error);
    return [];
  }

  return data || [];
}

/**
 * Get user's bookmarked expense cards
 */
export async function getUserBookmarks(
  userId: string
): Promise<BookmarkedCard[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_bookmarked_expense_cards")
    .select(
      `
      created_at,
      expense_card:expense_cards(
        *,
        city:cities!city_id(
          name,
          country:countries(name)
        ),
        status:expense_card_statuses(name),
        travel_type:travel_types(name),
        position:positions(name)
      )
    `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching bookmarks:", error);
    return [];
  }

  return (data as unknown as BookmarkedCard[]) || [];
}

/**
 * Get user's pinned cities
 */
export async function getUserPinnedCities(
  userId: string
): Promise<PinnedCity[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_pinned_cities")
    .select(
      `
      city:cities!city_id(
        id,
        name,
        country:countries(name)
      )
    `
    )
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching pinned cities:", error);
    return [];
  }

  return (data as unknown as PinnedCity[]) || [];
}

/**
 * Toggle bookmark for expense card
 */
export async function toggleBookmark(
  userId: string,
  expenseCardId: string
): Promise<boolean> {
  const supabase = await createClient();

  // Check existing bookmark
  const { data: existing } = await supabase
    .from("user_bookmarked_expense_cards")
    .select("*")
    .eq("user_id", userId)
    .eq("expense_card_id", expenseCardId)
    .single();

  if (existing) {
    // Remove bookmark
    const { error } = await supabase
      .from("user_bookmarked_expense_cards")
      .delete()
      .eq("user_id", userId)
      .eq("expense_card_id", expenseCardId);

    if (error) {
      console.error("Error removing bookmark:", error);
      return false;
    }
    return true;
  } else {
    // Add bookmark
    const { error } = await supabase
      .from("user_bookmarked_expense_cards")
      .insert([
        {
          user_id: userId,
          expense_card_id: expenseCardId,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error("Error adding bookmark:", error);
      return false;
    }
    return true;
  }
}

/**
 * Toggle pinned city
 */
export async function togglePinnedCity(
  userId: string,
  cityId: string
): Promise<boolean> {
  const supabase = await createClient();

  // Check existing pinned city
  const { data: existing } = await supabase
    .from("user_pinned_cities")
    .select("*")
    .eq("user_id", userId)
    .eq("city_id", cityId)
    .single();

  if (existing) {
    // Remove pinned city
    const { error } = await supabase
      .from("user_pinned_cities")
      .delete()
      .eq("user_id", userId)
      .eq("city_id", cityId);

    if (error) {
      console.error("Error removing pinned city:", error);
      return false;
    }
    return true;
  } else {
    // Add pinned city
    const { error } = await supabase.from("user_pinned_cities").insert([
      {
        user_id: userId,
        city_id: cityId,
      },
    ]);

    if (error) {
      console.error("Error adding pinned city:", error);
      return false;
    }
    return true;
  }
}
