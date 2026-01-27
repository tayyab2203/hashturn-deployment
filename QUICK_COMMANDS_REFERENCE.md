# 🎯 Quick Command Reference - PostgreSQL 17 Setup

## 📍 Directory Locations

```
PostgreSQL Installation: C:\Program Files\PostgreSQL\17\bin
Project Folder: D:\MyProjects\hashturn
```

---

## 🚀 Essential Commands

### **1. Check PostgreSQL Version**
**📍 From:** PowerShell (any directory)
```powershell
"C:\Program Files\PostgreSQL\17\bin\psql.exe" --version
```

---

### **2. Check/Start PostgreSQL Service**
**📍 From:** PowerShell (Administrator mode)
```powershell
# Check service status
Get-Service postgresql-x64-17

# Start service
Start-Service postgresql-x64-17

# Stop service
Stop-Service postgresql-x64-17

# Restart service
Restart-Service postgresql-x64-17
```

---

### **3. Open PostgreSQL Shell**
**📍 From:** PowerShell (any directory)
```powershell
# Connect as postgres (superuser)
& "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres

# Connect as hashturn_admin to hashturn_db
& "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U hashturn_admin -d hashturn_db
```

---

### **4. Create Database & User (One-time Setup)**
**📍 From:** PostgreSQL Shell (as postgres user)
```sql
CREATE DATABASE hashturn_db;
CREATE USER hashturn_admin WITH PASSWORD 'hashturn123';
GRANT ALL PRIVILEGES ON DATABASE hashturn_db TO hashturn_admin;
\c hashturn_db
GRANT ALL ON SCHEMA public TO hashturn_admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO hashturn_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO hashturn_admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO hashturn_admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO hashturn_admin;
\q
```

---

### **5. Run Schema File (Create Tables)**
**📍 From:** PowerShell - Project folder
```powershell
# Navigate to project
cd D:\MyProjects\hashturn

# Run schema file
& "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U hashturn_admin -d hashturn_db -f lib\db-schema.sql
```
**Password when prompted:** `hashturn123`

---

### **6. Start Development Server**
**📍 From:** PowerShell - Project folder
```powershell
# Navigate to project (if not already there)
cd D:\MyProjects\hashturn

# Start dev server
npm run dev
```

---

### **7. Test Database Connection**
**📍 From:** Browser
```
http://localhost:3000/api/test-db
```

**Expected:** JSON response with `"success": true`

---

### **8. View Database Data**
**📍 From:** PostgreSQL Shell
```powershell
# Connect to database
& "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U hashturn_admin -d hashturn_db
```

```sql
-- List all tables
\dt

-- View blogs
SELECT * FROM blogs;

-- View projects  
SELECT * FROM projects;

-- View testimonials
SELECT * FROM testimonials;

-- Count records
SELECT 'blogs' as table, COUNT(*) FROM blogs
UNION ALL
SELECT 'projects', COUNT(*) FROM projects
UNION ALL
SELECT 'testimonials', COUNT(*) FROM testimonials;

-- Exit
\q
```

---

### **9. Common PostgreSQL Shell Commands**
**📍 From:** PostgreSQL Shell (psql)
```sql
\l              -- List all databases
\dt             -- List all tables in current database
\d table_name   -- Describe table structure
\du             -- List all users/roles
\c dbname       -- Connect to database
\q              -- Exit/Quit
\?              -- Help with commands
\h              -- Help with SQL commands
```

---

### **10. Backup & Restore**
**📍 From:** PowerShell - Any directory

**Backup:**
```powershell
& "C:\Program Files\PostgreSQL\17\bin\pg_dump.exe" -U hashturn_admin hashturn_db > D:\MyProjects\hashturn\backup.sql
```

**Restore:**
```powershell
& "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U hashturn_admin -d hashturn_db -f D:\MyProjects\hashturn\backup.sql
```

---

### **11. Reset Password (If Forgotten)**
**📍 From:** PostgreSQL Shell (as postgres)
```powershell
& "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres
```

```sql
ALTER USER hashturn_admin WITH PASSWORD 'new_password';
\q
```

Then update `.env.local` with new password!

---

### **12. Drop & Recreate Database (Fresh Start)**
**📍 From:** PostgreSQL Shell (as postgres)
```powershell
& "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres
```

```sql
DROP DATABASE IF EXISTS hashturn_db;
CREATE DATABASE hashturn_db;
GRANT ALL PRIVILEGES ON DATABASE hashturn_db TO hashturn_admin;
\q
```

Then run Step 5 again to create tables.

---

## 🎯 Quick Troubleshooting

| Error | Command to Fix |
|-------|----------------|
| Service not running | `Start-Service postgresql-x64-17` |
| Connection refused | Check service: `Get-Service postgresql-x64-17` |
| Password wrong | Update `.env.local` or reset password (Step 11) |
| Tables missing | Run schema file (Step 5) |
| Module 'pg' not found | `cd D:\MyProjects\hashturn` then `npm install pg @types/pg` |

---

## 📌 .env.local File Location & Content

**📍 Location:** `D:\MyProjects\hashturn\.env.local`

**Content:**
```env
DATABASE_URL="postgresql://hashturn_admin:hashturn123@localhost:5432/hashturn_db"
```

---

## 🔗 Useful URLs (After npm run dev)

```
Website Home:      http://localhost:3000
Admin Login:       http://localhost:3000 (footer link)
Database Test:     http://localhost:3000/api/test-db
All Blogs:         http://localhost:3000/api/blogs
All Projects:      http://localhost:3000/api/projects
All Testimonials:  http://localhost:3000/api/testimonials
```

---

## ✅ Setup Verification Checklist

Run these in order to verify everything works:

```powershell
# 1. Check service
Get-Service postgresql-x64-17
# Expected: Status = Running

# 2. Check version
"C:\Program Files\PostgreSQL\17\bin\psql.exe" --version
# Expected: psql (PostgreSQL) 17.x

# 3. Connect to database
& "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U hashturn_admin -d hashturn_db
# (Enter password: hashturn123)
# Then in psql: \dt
# Expected: 3 tables listed
# Then: \q

# 4. Start dev server
cd D:\MyProjects\hashturn
npm run dev
# Expected: Ready in X.Xs, ✅ Connected to PostgreSQL database

# 5. Test in browser
# Open: http://localhost:3000/api/test-db
# Expected: {"success": true, ...}
```

All ✅? **You're ready!** 🚀

---

**Keep this file handy for quick reference!**
