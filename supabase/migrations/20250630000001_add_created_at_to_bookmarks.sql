-- Add created_at column to user_bookmarked_expense_cards table
ALTER TABLE "public"."user_bookmarked_expense_cards" 
ADD COLUMN "created_at" timestamp with time zone NOT NULL DEFAULT now();
