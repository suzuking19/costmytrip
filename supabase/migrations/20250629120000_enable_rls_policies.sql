-- Enable Row Level Security settings and policies

-- Enable RLS for tables containing user data
ALTER TABLE "public"."user_profiles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."expense_cards" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."user_bookmarked_expense_cards" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."user_pinned_cities" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."daily_records" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."expense_items" ENABLE ROW LEVEL SECURITY;

-- User profile policies
-- Users can read all profiles, but only update their own
CREATE POLICY "Users can view all profiles" ON "public"."user_profiles"
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON "public"."user_profiles"
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON "public"."user_profiles"
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Expense card policies
-- Published cards are viewable by anyone, own cards are editable
CREATE POLICY "Users can view published expense cards" ON "public"."expense_cards"
    FOR SELECT USING (
        status_id = (SELECT id FROM expense_card_statuses WHERE name = 'published')
        OR user_id = auth.uid()
    );

CREATE POLICY "Users can create own expense cards" ON "public"."expense_cards"
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own expense cards" ON "public"."expense_cards"
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own expense cards" ON "public"."expense_cards"
    FOR DELETE USING (auth.uid() = user_id);

-- Bookmark policies
-- Users can only manage their own bookmarks
CREATE POLICY "Users can manage own bookmarks" ON "public"."user_bookmarked_expense_cards"
    FOR ALL USING (auth.uid() = user_id);

-- Pinned cities policies
-- Users can only manage their own pinned cities
CREATE POLICY "Users can manage own pinned cities" ON "public"."user_pinned_cities"
    FOR ALL USING (auth.uid() = user_id);

-- Daily records policies
-- Users can view daily records of viewable expense cards
CREATE POLICY "Users can view daily records of viewable expense cards" ON "public"."daily_records"
    FOR SELECT USING (
        expense_card_id IN (
            SELECT id FROM expense_cards 
            WHERE status_id = (SELECT id FROM expense_card_statuses WHERE name = 'published')
            OR user_id = auth.uid()
        )
    );

CREATE POLICY "Users can manage daily records of own expense cards" ON "public"."daily_records"
    FOR ALL USING (
        expense_card_id IN (
            SELECT id FROM expense_cards WHERE user_id = auth.uid()
        )
    );

-- Expense items policies
-- Users can view expense items of viewable daily records
CREATE POLICY "Users can view expense items of viewable daily records" ON "public"."expense_items"
    FOR SELECT USING (
        daily_record_id IN (
            SELECT dr.id FROM daily_records dr
            JOIN expense_cards ec ON dr.expense_card_id = ec.id
            WHERE ec.status_id = (SELECT id FROM expense_card_statuses WHERE name = 'published')
            OR ec.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can manage expense items of own daily records" ON "public"."expense_items"
    FOR ALL USING (
        daily_record_id IN (
            SELECT dr.id FROM daily_records dr
            JOIN expense_cards ec ON dr.expense_card_id = ec.id
            WHERE ec.user_id = auth.uid()
        )
    );
