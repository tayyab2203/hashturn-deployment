# 🚀 Setup Guide - Projects Update

## ✅ Kya Changes Kiye Gaye Hain:

### 1. **Database Schema Update**
- `live_url` field add kiya projects table mein

### 2. **Project Cards**
- ✅ Card size **kam** kar diya (height reduced)
- ✅ 2 buttons add kiye:
  - 🔗 **Live Demo** - Agar live_url hai toh dikhega
  - 📄 **Case Study** - Hamesha dikhega, case study page pe le jayega

### 3. **Admin Dashboard**
- ✅ Project create form mein **Live Project URL** field add kiya
- ✅ Admin projects list mein live URL show hota hai

---

## 📋 Setup Steps:

### Step 1: Database Update Karo

**Option A - pgAdmin Use Karo:**
1. pgAdmin 4 open karo
2. `hashturn_db` database select karo
3. **Query Tool** click karo (Tools → Query Tool)
4. Ye command paste karo:

```sql
ALTER TABLE projects ADD COLUMN IF NOT EXISTS live_url VARCHAR(500);
```

5. ▶️ **Execute/Run** button dabao (ya F5 press karo)

**Option B - Command Line Use Karo:**
```powershell
& "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -d hashturn_db -f UPDATE_DATABASE.sql
```

### Step 2: Server Restart Karo (Agar Chal Raha Hai)

```bash
# Terminal mein Ctrl+C dabao agar server chal raha hai
# Phir dobara start karo:
npm run dev
```

---

## 🎯 Ab Kya Ho Sakta Hai:

### ✅ **Admin Side:**
1. **Create Project** page pe jao
2. Ab **"Live Project URL"** field dikhega
3. Live project ka URL add kar sakte ho (optional)

### ✅ **User Side:**
1. **Home Page** → Projects section:
   - Cards chote dikhenge
   - Har card pe 2 buttons honge:
     - 📄 **Case Study** (hamesha)
     - 🔗 **Live Demo** (sirf agar URL hai)

2. **Projects Page** → Same functionality

### ✅ **Testimonials Fix:**
- Home page testimonials ab database se aayenge
- Upper aur lower row mein **different** testimonials dikhenge

---

## 🧪 Test Karo:

1. ✅ Database column add ho gaya check karo:
```sql
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'projects' AND column_name = 'live_url';
```

2. ✅ Nayi project banao with live URL
3. ✅ Home page / Projects page pe check karo
4. ✅ Buttons test karo:
   - Case Study button → Project detail page
   - Live Demo button → Actual live URL (new tab)

---

## 📝 Notes:

- `live_url` **optional** hai - nahi dena zaroori nahi
- Agar URL nahi hai, sirf **Case Study** button dikhega
- Cards ab **zyada compact** hain - zyada professional look

---

Need help? Koi error aaye toh batao! 🚀
