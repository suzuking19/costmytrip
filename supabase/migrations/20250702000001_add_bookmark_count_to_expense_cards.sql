-- Add bookmark_count column to expense_cards table
ALTER TABLE "public"."expense_cards" 
ADD COLUMN "bookmark_count" integer NOT NULL DEFAULT 0;

-- Create index for bookmark_count for efficient sorting/filtering
CREATE INDEX idx_expense_cards_bookmark_count ON "public"."expense_cards" (bookmark_count DESC);

-- Function to update bookmark count
CREATE OR REPLACE FUNCTION update_expense_card_bookmark_count()
RETURNS TRIGGER AS $$
BEGIN
    -- Handle INSERT
    IF TG_OP = 'INSERT' THEN
        UPDATE expense_cards 
        SET bookmark_count = bookmark_count + 1
        WHERE id = NEW.expense_card_id;
        RETURN NEW;
    END IF;
    
    -- Handle DELETE
    IF TG_OP = 'DELETE' THEN
        UPDATE expense_cards 
        SET bookmark_count = bookmark_count - 1
        WHERE id = OLD.expense_card_id;
        RETURN OLD;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update bookmark count
DROP TRIGGER IF EXISTS trigger_update_bookmark_count ON user_bookmarked_expense_cards;
CREATE TRIGGER trigger_update_bookmark_count
    AFTER INSERT OR DELETE ON user_bookmarked_expense_cards
    FOR EACH ROW
    EXECUTE FUNCTION update_expense_card_bookmark_count();

-- Initialize bookmark_count for existing records
UPDATE expense_cards 
SET bookmark_count = (
    SELECT COUNT(*)
    FROM user_bookmarked_expense_cards
    WHERE user_bookmarked_expense_cards.expense_card_id = expense_cards.id
);

-- Add comment to document the purpose of the column
COMMENT ON COLUMN expense_cards.bookmark_count IS 'Cached count of bookmarks for this expense card, updated via trigger';
