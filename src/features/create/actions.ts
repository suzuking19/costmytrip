"use server";

import { redirect } from "next/navigation";
import { submitExpenseCard } from "./queries";
import type { ExpenseCardData } from "./types";

export async function createExpenseCard(data: ExpenseCardData) {
  try {
    const result = await submitExpenseCard(data);

    if (result.success) {
      // Redirect based on status
      if (data.status === "published") {
        redirect("/mypage");
      } else {
        redirect("/mypage/editing");
      }
    }

    return { success: true, expenseCardId: result.expenseCardId };
  } catch (error) {
    console.error("Error creating expense card:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "投稿に失敗しました。",
    };
  }
}
