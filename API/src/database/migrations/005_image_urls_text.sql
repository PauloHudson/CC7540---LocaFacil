-- Convert image_urls from TEXT[] to plain TEXT so PostgreSQL stores a single URL

ALTER TABLE vehicles
  ALTER COLUMN image_urls TYPE TEXT
  USING CASE
    WHEN image_urls IS NULL THEN NULL
    WHEN array_length(image_urls, 1) IS NULL THEN NULL
    ELSE image_urls[1]
  END;

ALTER TABLE electronics
  ALTER COLUMN image_urls TYPE TEXT
  USING CASE
    WHEN image_urls IS NULL THEN NULL
    WHEN array_length(image_urls, 1) IS NULL THEN NULL
    ELSE image_urls[1]
  END;
