# PostgreSQL Setup Guide for HashTurn Admin Dashboard

## 📚 **Step-by-Step PostgreSQL Setup**

### **Step 1: Install PostgreSQL**

#### **Windows:**
1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
2. Run the installer
3. During installation:
   - Remember the password you set for `postgres` user (super important!)
   - Default port: 5432 (keep it)
   - Remember the installation directory

#### **Mac:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

#### **Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

---

### **Step 2: Verify Installation**

Open terminal/command prompt:
```bash
psql --version
```

You should see something like: `psql (PostgreSQL) 15.x`

---

### **Step 3: Access PostgreSQL**

#### **Windows:**
1. Open "SQL Shell (psql)" from Start Menu
2. Press Enter for default values (Server, Database, Port, Username)
3. Enter the password you set during installation

#### **Mac/Linux:**
```bash
sudo -u postgres psql
```

---

### **Step 4: Create Database and User**

Once you're in the PostgreSQL shell (`postgres=#`):

```sql
-- Create a new database
CREATE DATABASE hashturn_db;

-- Create a new user
CREATE USER hashturn_admin WITH PASSWORD 'your_secure_password';

-- Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE hashturn_db TO hashturn_admin;

-- Connect to the database
\c hashturn_db

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO hashturn_admin;

-- Exit
\q
```

---

### **Step 5: Install Required npm Packages**

In your project directory:

```bash
npm install pg @vercel/postgres
npm install -D @types/pg
```

---

### **Step 6: Create Environment Variables**

Create a `.env.local` file in your project root:

```env
# PostgreSQL Connection
DATABASE_URL="postgresql://hashturn_admin:your_secure_password@localhost:5432/hashturn_db"

# Or use individual variables
POSTGRES_USER="hashturn_admin"
POSTGRES_PASSWORD="your_secure_password"
POSTGRES_HOST="localhost"
POSTGRES_PORT="5432"
POSTGRES_DATABASE="hashturn_db"
```

**⚠️ Important:** Add `.env.local` to your `.gitignore` file!

---

### **Step 7: Create Database Schema**

Run the SQL script to create tables (explained in next steps).

---

## 🔧 **Connecting from Next.js**

### **Create Database Connection Helper**

```typescript
// lib/db.ts
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export default pool
```

---

## 📊 **Database Schema**

Our database will have 3 main tables:

### **1. Blogs Table**
```sql
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  status VARCHAR(20) DEFAULT 'draft',
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **2. Projects Table**
```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  client VARCHAR(100),
  image VARCHAR(255),
  tech TEXT[], -- Array of technologies
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **3. Testimonials Table**
```sql
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  position VARCHAR(100),
  company VARCHAR(100),
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  image VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🎯 **Quick Commands**

### **Connect to Database:**
```bash
psql -U hashturn_admin -d hashturn_db
```

### **List All Databases:**
```sql
\l
```

### **List All Tables:**
```sql
\dt
```

### **Describe Table:**
```sql
\d table_name
```

### **View Table Data:**
```sql
SELECT * FROM blogs;
SELECT * FROM projects;
SELECT * FROM testimonials;
```

### **Delete All Data (Careful!):**
```sql
TRUNCATE TABLE blogs CASCADE;
```

---

## 🚀 **API Routes Structure**

```
app/
  api/
    blogs/
      route.ts          # GET all, POST new
      [id]/
        route.ts        # GET one, PUT update, DELETE
    projects/
      route.ts
      [id]/
        route.ts
    testimonials/
      route.ts
      [id]/
        route.ts
```

---

## 📝 **Testing Connection**

Create a test API route:

```typescript
// app/api/test-db/route.ts
import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    const result = await pool.query('SELECT NOW()')
    return NextResponse.json({ 
      success: true, 
      time: result.rows[0].now 
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Database connection failed' 
    }, { status: 500 })
  }
}
```

Test at: `http://localhost:3000/api/test-db`

---

## 🛠️ **Troubleshooting**

### **"Connection refused" error:**
- Make sure PostgreSQL service is running
- Check if port 5432 is not blocked
- Verify DATABASE_URL is correct

### **"Password authentication failed":**
- Double-check your password
- Verify user exists: `\du` in psql

### **"Database does not exist":**
- Create it: `CREATE DATABASE hashturn_db;`

---

## 📱 **GUI Tools (Optional but Helpful)**

1. **pgAdmin** (Free, official): https://www.pgadmin.org/
2. **DBeaver** (Free, multi-database): https://dbeaver.io/
3. **TablePlus** (Paid, beautiful UI): https://tableplus.com/

---

## 🔒 **Security Tips**

1. Never commit `.env.local` to Git
2. Use strong passwords
3. In production, use environment variables from hosting provider
4. Enable SSL for production databases
5. Regularly backup your database

---

## 📚 **Useful Resources**

- PostgreSQL Docs: https://www.postgresql.org/docs/
- Node-Postgres: https://node-postgres.com/
- Next.js API Routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

---

**Ready to proceed with implementation!** 🚀
