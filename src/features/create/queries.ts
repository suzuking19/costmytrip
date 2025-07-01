import { createClient } from "@/utils/supabase/client";
import type { ExpenseCardData } from "./types";
import {
  travelTypeMapping,
  positionMapping,
  categoryMapping,
} from "./constants";

export interface CitySearchResult {
  id: string;
  name: string;
  country: string;
}

/**
 * Search cities from the database by city name only (not country name)
 */
export async function searchCities(
  searchTerm: string
): Promise<CitySearchResult[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("cities")
    .select("id, name, country")
    .ilike("name", searchTerm.trim() ? `%${searchTerm.trim()}%` : "%")
    .order("name", { ascending: true })
    .limit(10);

  if (error) {
    console.error("Error searching cities:", error);
    return [];
  }

  return data || [];
}

export async function submitExpenseCard(data: ExpenseCardData) {
  const supabase = createClient();

  try {
    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error("User not authenticated");
    }

    // Get or create city
    let cityId: string;
    const { data: existingCity } = await supabase
      .from("cities")
      .select("id")
      .eq("name", data.city.toLowerCase())
      .eq("country", data.country.toLowerCase())
      .single();

    if (existingCity) {
      cityId = existingCity.id;
    } else {
      const { data: newCity, error: cityError } = await supabase
        .from("cities")
        .insert({
          name: data.city.toLowerCase(),
          country: data.country.toLowerCase(),
        })
        .select("id")
        .single();

      if (cityError || !newCity) {
        throw new Error("Failed to create city");
      }
      cityId = newCity.id;
    }

    // Get travel type ID
    const mappedTravelType = travelTypeMapping[data.travelType] || "solo";
    const { data: travelType, error: travelTypeError } = await supabase
      .from("travel_types")
      .select("id")
      .eq("name", mappedTravelType)
      .single();

    if (travelTypeError || !travelType) {
      throw new Error("Failed to get travel type");
    }

    // Get position ID
    const mappedPosition = positionMapping[data.position] || "other";
    const { data: position, error: positionError } = await supabase
      .from("positions")
      .select("id")
      .eq("name", mappedPosition)
      .single();

    if (positionError || !position) {
      throw new Error("Failed to get occupation");
    }

    // Get status ID
    const { data: status, error: statusError } = await supabase
      .from("expense_card_statuses")
      .select("id")
      .eq("name", data.status)
      .single();

    if (statusError || !status) {
      throw new Error("Failed to get status");
    }

    // Create expense card
    const { data: expenseCard, error: expenseCardError } = await supabase
      .from("expense_cards")
      .insert({
        user_id: user.id,
        title: data.travelTitle,
        description: data.overallDescription,
        city_id: cityId,
        start_date: data.startDate,
        end_date: data.endDate,
        travel_type_id: travelType.id,
        number_of_travelers: parseInt(data.participants),
        position_id: position.id,
        status_id: status.id,
      })
      .select("id")
      .single();

    if (expenseCardError || !expenseCard) {
      throw new Error("Failed to create expense card");
    }

    // Create daily records and expense items
    for (const dailyExpense of data.dailyExpenses) {
      // Create daily record
      const { data: dailyRecord, error: dailyRecordError } = await supabase
        .from("daily_records")
        .insert({
          expense_card_id: expenseCard.id,
          date: dailyExpense.date,
          description: null,
        })
        .select("id")
        .single();

      if (dailyRecordError || !dailyRecord) {
        throw new Error("Failed to create daily record");
      }

      // Create expense items for this day
      for (const item of dailyExpense.items) {
        if (!item.category || !item.amount) continue;

        // Get category ID
        const mappedCategory =
          categoryMapping[item.category] || "miscellaneous";
        const { data: category, error: categoryError } = await supabase
          .from("categories")
          .select("id")
          .eq("name", mappedCategory)
          .single();

        if (categoryError || !category) {
          console.warn(`Failed to get category "${item.category}"`);
          continue;
        }

        // Filter out empty/blank links and prepare for storage
        const validLinks = item.googleMapsLinks
          ? item.googleMapsLinks.filter((link) => link && link.trim() !== "")
          : [];

        // Insert expense item
        const { error: expenseItemError } = await supabase
          .from("expense_items")
          .insert({
            daily_record_id: dailyRecord.id,
            category_id: category.id,
            amount_usd: parseFloat(item.amount),
            description: null,
            maps_links: validLinks.length > 0 ? validLinks : null,
          });

        if (expenseItemError) {
          console.warn("Failed to create expense item:", expenseItemError);
        }
      }
    }

    return { success: true, expenseCardId: expenseCard.id };
  } catch (error) {
    console.error("Error submitting expense card:", error);
    throw error;
  }
}

// Get data for form dropdowns
export async function getFormData() {
  const supabase = createClient();

  try {
    const [categoriesRes, travelTypesRes, positionsRes, statusesRes] =
      await Promise.all([
        supabase.from("categories").select("*"),
        supabase.from("travel_types").select("*"),
        supabase.from("positions").select("*"),
        supabase.from("expense_card_statuses").select("*"),
      ]);

    return {
      categories: categoriesRes.data || [],
      travelTypes: travelTypesRes.data || [],
      positions: positionsRes.data || [],
      statuses: statusesRes.data || [],
    };
  } catch (error) {
    console.error("Error fetching form data:", error);
    throw error;
  }
}
