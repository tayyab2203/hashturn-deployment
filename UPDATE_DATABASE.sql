-- Run this in pgAdmin Query Tool or using psql command:
-- & "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -d hashturn_db -f UPDATE_DATABASE.sql

-- Add live_url column to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS live_url VARCHAR(500);

-- Optional: Update existing projects with sample URLs (you can remove this part)
-- UPDATE projects SET live_url = 'https://example.com' WHERE live_url IS NULL;
