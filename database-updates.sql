-- Add live_url column to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS live_url VARCHAR(500);

-- Update existing projects with sample live URLs (optional)
-- You can run this manually in pgAdmin or skip it
