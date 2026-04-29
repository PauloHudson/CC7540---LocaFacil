-- Add image_urls column to vehicles and electronics

ALTER TABLE vehicles
  ADD COLUMN IF NOT EXISTS image_urls TEXT[];

ALTER TABLE electronics
  ADD COLUMN IF NOT EXISTS image_urls TEXT[];

-- Optional: Update existing records with empty array instead of NULL
UPDATE vehicles SET image_urls = ARRAY[]::text[] WHERE image_urls IS NULL;
UPDATE electronics SET image_urls = ARRAY[]::text[] WHERE image_urls IS NULL;
