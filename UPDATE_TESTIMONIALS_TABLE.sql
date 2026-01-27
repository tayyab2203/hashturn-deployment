-- Update Testimonials Table to Add Country and Review Date Columns

-- Add country column
ALTER TABLE testimonials 
ADD COLUMN IF NOT EXISTS country VARCHAR(100);

-- Add review_date column
ALTER TABLE testimonials 
ADD COLUMN IF NOT EXISTS review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Update image_url column name to 'image' for consistency
ALTER TABLE testimonials 
RENAME COLUMN image_url TO image;

-- Verify changes
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'testimonials' 
ORDER BY ordinal_position;
