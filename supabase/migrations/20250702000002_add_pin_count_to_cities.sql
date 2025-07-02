-- Add pin_count column to cities table
ALTER TABLE cities ADD COLUMN pin_count integer NOT NULL DEFAULT 0;

-- Create index for better performance when querying by pin_count
CREATE INDEX cities_pin_count_idx ON cities(pin_count DESC);

-- Create a function to update pin_count when user_pinned_cities changes
CREATE OR REPLACE FUNCTION update_city_pin_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE cities 
        SET pin_count = pin_count + 1 
        WHERE id = NEW.city_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE cities 
        SET pin_count = pin_count - 1 
        WHERE id = OLD.city_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update pin_count
CREATE TRIGGER trigger_update_city_pin_count_on_insert
    AFTER INSERT ON user_pinned_cities
    FOR EACH ROW EXECUTE FUNCTION update_city_pin_count();

CREATE TRIGGER trigger_update_city_pin_count_on_delete
    AFTER DELETE ON user_pinned_cities
    FOR EACH ROW EXECUTE FUNCTION update_city_pin_count();

-- Initialize pin_count with current data
UPDATE cities 
SET pin_count = (
    SELECT COUNT(*) 
    FROM user_pinned_cities 
    WHERE user_pinned_cities.city_id = cities.id
);
