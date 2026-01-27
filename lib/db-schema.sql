-- lib/db-schema.sql
-- Complete database schema for HashTurn website

-- Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  author_role VARCHAR(255),
  author_image VARCHAR(500),
  image VARCHAR(500),
  category VARCHAR(100),
  tags TEXT[],
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table (Updated with live_url)
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  client VARCHAR(255),
  image VARCHAR(500),
  tech TEXT[],
  features TEXT[],
  results TEXT[],
  live_url VARCHAR(500),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  project_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  image_url VARCHAR(500),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('approved', 'pending', 'rejected')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);
