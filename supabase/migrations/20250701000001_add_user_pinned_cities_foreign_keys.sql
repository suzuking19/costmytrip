-- Add missing foreign key constraints for user_pinned_cities table

-- Add foreign key constraint for user_id (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'user_pinned_cities_user_id_fkey'
    ) THEN
        ALTER TABLE "public"."user_pinned_cities" 
        ADD CONSTRAINT "user_pinned_cities_user_id_fkey" 
        FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Add foreign key constraint for city_id (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'user_pinned_cities_city_id_fkey'
    ) THEN
        ALTER TABLE "public"."user_pinned_cities"
        ADD CONSTRAINT "user_pinned_cities_city_id_fkey"
        FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Add missing foreign key constraints for user_bookmarked_expense_cards table

-- Add foreign key constraint for user_id (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'user_bookmarked_expense_cards_user_id_fkey'
    ) THEN
        ALTER TABLE "public"."user_bookmarked_expense_cards"
        ADD CONSTRAINT "user_bookmarked_expense_cards_user_id_fkey"
        FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Add foreign key constraint for expense_card_id (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'user_bookmarked_expense_cards_expense_card_id_fkey'
    ) THEN
        ALTER TABLE "public"."user_bookmarked_expense_cards"
        ADD CONSTRAINT "user_bookmarked_expense_cards_expense_card_id_fkey"
        FOREIGN KEY (expense_card_id) REFERENCES expense_cards(id) ON DELETE CASCADE;
    END IF;
END $$;
