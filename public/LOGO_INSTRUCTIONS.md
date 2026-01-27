# Logo Setup Instructions

## 📍 Where to Place Your Logo

Place your logo PNG file here:
```
/public/logo.png
```

## 📐 Recommended Specifications

- **Format**: PNG with transparent background
- **Size**: 56x56 pixels (or any square ratio like 128x128, 256x256)
- **File Name**: `logo.png`

## 🔄 How to Switch to PNG Logo

If you want to use a PNG logo instead of the animated "#" symbol:

### Step 1: Add Your Logo
Place your logo file at `/public/logo.png`

### Step 2: Update Navbar
In `components/navbar.tsx`, change line 9:

**FROM:**
```typescript
import { AnimatedLogo } from "@/components/animated-logo"
```

**TO:**
```typescript
import { AnimatedLogo } from "@/components/animated-logo-with-image"
```

### Step 3: Update Footer
In `components/footer.tsx`, change line 5:

**FROM:**
```typescript
import { AnimatedLogo } from "@/components/animated-logo"
```

**TO:**
```typescript
import { AnimatedLogo } from "@/components/animated-logo-with-image"
```

## ✨ Current Setup

Currently using: **Animated "#" Symbol**
- The logo is created with CSS/HTML using brand colors
- Animates to show "HASHTURN" on hover
- No image file needed

## 📁 File Structure

```
hashturn/
├── public/
│   ├── logo.png              ← Place your logo here
│   └── LOGO_INSTRUCTIONS.md  ← This file
├── components/
│   ├── animated-logo.tsx              ← Current (CSS "#" symbol)
│   └── animated-logo-with-image.tsx   ← Alternative (PNG image)
```

## 🎨 Current Logo Colors

The animated "#" symbol uses these brand colors:
- Red: #e53e3e
- Green: #38a169
- Yellow: #ecc94b
- Blue: #3182ce

Make sure your PNG logo matches these colors if you want consistency!
