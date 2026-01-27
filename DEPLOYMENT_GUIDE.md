# 🚀 HashTurn Website Deployment Guide

Complete guide for deploying HashTurn website to Vercel via GitHub.

---

## 📋 Prerequisites

- [x] GitHub account
- [x] Vercel account (free)
- [x] PostgreSQL database (for production)
- [x] Project working locally

---

## 🎯 Step-by-Step Deployment

### **Step 1: Prepare for GitHub** 

#### Create `.gitignore` file (if not exists):

```gitignore
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# SQL files (optional - keep if you want to track them)
# *.sql
```

---

### **Step 2: Push to GitHub**

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - HashTurn website ready for deployment"

# Add remote repository (create new repo on GitHub first)
git remote add origin https://github.com/YOUR_USERNAME/hashturn.git

# Push to GitHub
git push -u origin main
```

**Note:** Create repository on GitHub first: https://github.com/new

---

### **Step 3: Setup Production Database**

You have 3 options for PostgreSQL in production:

#### **Option A: Vercel Postgres** (Recommended - Easy)
- Go to Vercel Dashboard
- Add Vercel Postgres addon
- Automatic environment variables setup

#### **Option B: Neon** (Free, Serverless)
1. Sign up: https://neon.tech
2. Create new project
3. Copy connection string
4. Use in Vercel env variables

#### **Option C: Railway** (Free tier available)
1. Sign up: https://railway.app
2. Create PostgreSQL database
3. Copy connection string
4. Use in Vercel env variables

---

### **Step 4: Deploy to Vercel**

#### **Method 1: Via Vercel Dashboard** (Easiest)

1. **Go to Vercel:** https://vercel.com
2. **Sign in** with GitHub
3. **Click "Add New Project"**
4. **Import** your GitHub repository
5. **Configure:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (leave default)
   - Build Command: `npm run build` (auto)
   - Output Directory: `.next` (auto)

6. **Add Environment Variables:**

Click "Environment Variables" and add:

```env
# Database
DATABASE_URL=your_production_database_url_here

# Example for Neon/Railway:
# postgresql://user:password@host:5432/database?sslmode=require

# Example for Vercel Postgres:
# (Automatically added when you add Vercel Postgres)
```

7. **Click "Deploy"**
8. **Wait 2-3 minutes** ⏳
9. **Done!** 🎉

---

#### **Method 2: Via Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: hashturn
# - Directory: ./
# - Override settings? No

# Set environment variables
vercel env add DATABASE_URL

# Deploy to production
vercel --prod
```

---

### **Step 5: Setup Production Database Schema**

After deployment, run SQL to create tables in production database:

#### **If using Vercel Postgres:**
```bash
# Connect to your Vercel Postgres
vercel env pull .env.local
```

Then run `lib/db-schema.sql` in the Vercel Postgres dashboard.

#### **If using Neon/Railway:**
Use their web SQL editor to run:
1. `lib/db-schema.sql` (create tables)
2. `ADD_FIVERR_TESTIMONIALS_SIMPLE.sql` (add data)

Or use psql:
```bash
psql "your_production_database_url" -f lib/db-schema.sql
psql "your_production_database_url" -f ADD_FIVERR_TESTIMONIALS_SIMPLE.sql
```

---

### **Step 6: Verify Deployment**

1. **Visit your site:** `https://your-project.vercel.app`
2. **Test pages:**
   - ✅ Home page loads
   - ✅ About page shows dynamic stats
   - ✅ Blog page shows posts from database
   - ✅ Projects page shows projects
   - ✅ Testimonials page shows reviews
   - ✅ Contact form works
   - ✅ Get Quote form works

3. **Test admin:**
   - ✅ Login at `/admin/login`
   - ✅ Create/Edit/Delete blogs
   - ✅ Create/Edit/Delete projects
   - ✅ Create/Edit/Delete testimonials

---

## 🔧 Environment Variables Needed

```env
# Required
DATABASE_URL=postgresql://user:password@host:5432/database

# Optional (if using additional services)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASSWORD=your-app-password
```

---

## 📊 Post-Deployment Checklist

- [ ] Website loads successfully
- [ ] All pages render correctly
- [ ] Database connection works
- [ ] Dynamic content displays (blogs, projects, testimonials)
- [ ] Admin dashboard accessible
- [ ] Forms submit successfully
- [ ] Images load properly
- [ ] Mobile responsive
- [ ] Performance is good (check Vercel Analytics)
- [ ] No console errors

---

## 🎨 Custom Domain (Optional)

### Add your own domain:

1. **Buy domain** (Namecheap, GoDaddy, etc.)
2. **In Vercel Dashboard:**
   - Go to Project Settings → Domains
   - Add your domain
   - Follow DNS instructions
3. **Update DNS records:**
   - Add A record or CNAME as instructed
   - Wait 24-48 hours for propagation

Example:
- `hashturn.com` → Your Vercel app
- `www.hashturn.com` → Redirect to main

---

## 🐛 Troubleshooting

### **Build fails:**
```bash
# Check locally first
npm run build

# If it works locally, check Vercel logs
```

### **Database connection fails:**
- Verify `DATABASE_URL` is correct
- Check if SSL is required: add `?sslmode=require`
- Ensure database is accessible from Vercel IPs

### **Pages show 404:**
- Clear Vercel cache: Settings → Clear Cache
- Redeploy: Deployments → ... → Redeploy

### **Environment variables not working:**
- Redeploy after adding env vars
- Check spelling and format
- No quotes needed in Vercel dashboard

---

## 🔄 Continuous Deployment

**Automatic:** Every `git push` to `main` branch automatically deploys to Vercel! 🎉

```bash
# Make changes
git add .
git commit -m "Update feature"
git push

# Vercel automatically builds and deploys!
```

---

## 📈 Monitoring

### **Vercel Dashboard shows:**
- Build logs
- Runtime logs
- Analytics (visitors, page views)
- Performance metrics
- Error tracking

### **Access logs:**
```bash
vercel logs
vercel logs --follow  # Real-time
```

---

## 💰 Pricing

**Vercel Free Tier includes:**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ CDN
- ✅ DDoS protection
- ✅ Perfect for portfolios & small businesses!

**For database:**
- Vercel Postgres: Free tier available
- Neon: 0.5GB free
- Railway: $5/month (500 hours free trial)

---

## 🎯 Quick Deploy Checklist

```bash
# 1. Prepare
✓ Code working locally
✓ .gitignore configured
✓ Environment variables documented

# 2. GitHub
✓ Create repository
✓ Push code
✓ Verify on GitHub

# 3. Database
✓ Choose provider (Vercel/Neon/Railway)
✓ Create database
✓ Run schema
✓ Add sample data

# 4. Vercel
✓ Import from GitHub
✓ Add environment variables
✓ Deploy
✓ Test live site

# 5. Post-Deploy
✓ Run database migrations
✓ Test all features
✓ Add custom domain (optional)
✓ Enable analytics
```

---

## 🚀 Ready to Deploy?

1. **First time?** Follow all steps above
2. **Updates?** Just `git push` and Vercel handles it!
3. **Need help?** Check Vercel docs: https://vercel.com/docs

---

**Perfect! Ab aapki website live ho jayegi! 🎉**

Live URL example: `https://hashturn.vercel.app` or your custom domain!
