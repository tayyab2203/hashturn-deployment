# 🔄 pgAdmin se Neon Migration Guide

## Step 1: pgAdmin se Data Export

### A. Open pgAdmin
1. **pgAdmin 4 open karein**
2. **Left sidebar:** Servers → PostgreSQL 17 → Databases → hashturn

### B. Export Schema + Data

**Right-click on 'hashturn' database → Backup**

```
Backup Options:
├── Format: Plain (SQL format)
├── Filename: D:\MyProjects\hashturn\backup.sql
├── Encoding: UTF8
└── Options:
    ✅ Include CREATE DATABASE
    ✅ Data
    ✅ Schema
    ❌ Blobs
    ❌ Owner
```

**Click "Backup"** → `backup.sql` file create hogi

---

## Step 2: Neon Account Setup

### A. Create Neon Account
1. **Go to:** https://neon.tech
2. **Sign up** with GitHub/Email
3. **Free tier select karein** (No credit card needed!)

### B. Create Project
```
Project Settings:
├── Name: hashturn
├── Region: US East (Ohio) - closest to Vercel
└── PostgreSQL Version: 16 (latest)
```

**Click "Create Project"** ✅

---

## Step 3: Get Connection String

### Neon Dashboard
```
Dashboard → Connection Details
├── Copy this complete string:
│   postgresql://username:password@ep-xxx.us-east-1.neon.tech/neondb?sslmode=require
└── Save kahi safe jagah
```

---

## Step 4: Import Data to Neon

### Method A: Using Neon SQL Editor (Small Database)

**If your backup.sql is < 5MB:**

1. **Neon Dashboard → SQL Editor**
2. **Open `backup.sql` in Notepad/VS Code**
3. **Copy complete content**
4. **Paste in SQL Editor**
5. **Click "RUN"** ▶️

---

### Method B: Using Command Line (Better for Large Data)

**Open PowerShell in project folder:**

```powershell
# Navigate to project
cd D:\MyProjects\hashturn

# Install psql (if not installed)
# Already installed: C:\Program Files\PostgreSQL\17\bin\psql.exe

# Import to Neon
& "C:\Program Files\PostgreSQL\17\bin\psql.exe" `
  -h ep-xxx.us-east-1.neon.tech `
  -U username `
  -d neondb `
  -f backup.sql
```

**Replace:**
- `ep-xxx.us-east-1.neon.tech` → Your Neon host
- `username` → Your Neon username
- `neondb` → Your Neon database name

**Enter password when prompted** (from Neon connection string)

---

## Step 5: Add DATABASE_URL to Vercel

### Vercel Dashboard
1. **Project:** hashturn
2. **Settings → Environment Variables**
3. **Add New:**
   ```
   Key:   DATABASE_URL
   Value: postgresql://username:password@ep-xxx.neon.tech/neondb?sslmode=require
   
   Environments:
   ✅ Production
   ✅ Preview
   ✅ Development
   ```
4. **Save**

---

## Step 6: Redeploy Vercel

```
Vercel Dashboard
├── Deployments tab
├── Latest deployment → ... → Redeploy
└── Wait 2-3 minutes
```

---

## ✅ Verification

### Test in Neon SQL Editor:
```sql
-- Check tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check testimonials
SELECT COUNT(*) FROM testimonials WHERE status = 'approved';

-- Check projects
SELECT COUNT(*) FROM projects WHERE status = 'active';

-- Check blogs
SELECT COUNT(*) FROM blogs WHERE status = 'published';
```

**Expected Output:**
- Tables: blogs, projects, testimonials ✅
- Testimonials count: > 0 ✅
- Projects count: > 0 ✅

---

## 🎯 Done!

Website check karein:
- Homepage testimonials ✅
- /testimonials page ✅
- /about stats ✅
- Admin dashboard ✅

---

## 🐛 Troubleshooting

### Error: "connection refused"
```powershell
# Check Neon connection
& "C:\Program Files\PostgreSQL\17\bin\psql.exe" `
  "postgresql://username:password@ep-xxx.neon.tech/neondb?sslmode=require"

# Should connect successfully
```

### Error: "relation already exists"
**Tables already exist in Neon:**
1. Drop existing tables:
   ```sql
   DROP TABLE IF EXISTS testimonials CASCADE;
   DROP TABLE IF EXISTS projects CASCADE;
   DROP TABLE IF EXISTS blogs CASCADE;
   ```
2. Re-run backup.sql

### Backup file too large for SQL Editor
**Use Method B (Command Line)** instead

---
