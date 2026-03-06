# ⚡ Sanity CMS - Quick Start

## What Just Happened?

I've set up **Sanity CMS** for your project! Here's what's ready:

### ✅ Installed & Configured:
- Sanity packages
- Content schemas for Devotionals & Leadership
- Sanity Studio at `/studio`
- Query helpers for fetching data
- TypeScript types

---

## 🚀 3-Minute Setup

### Step 1: Create Sanity Project (2 min)
```bash
npx sanity@latest init --project-plan free
```
Answer:
- Create new project? → **Yes**
- Project name? → **Teliosis World Outreach**
- Use default dataset? → **Yes**
- Output path? → **Press Enter**
- Skip installing dependencies? → **Yes**

**Save the Project ID** that appears!

### Step 2: Add Environment Variables (30 sec)
```bash
# Create .env.local file
copy .env.local.example .env.local
```

Edit `.env.local` and add your Project ID:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

### Step 3: Access Studio (30 sec)
```bash
npm run dev
```

Go to: **http://localhost:3000/studio**

Log in with your Sanity account → You're in! 🎉

---

## 📝 What You Can Do Now

### In the Studio (`/studio`):
- Add devotionals
- Upload images
- Add leadership team members
- Manage all content

### Content Available:
1. **Devotionals** 
   - Title, Scripture, Content
   - Topics, Read time
   - Featured flag
   - Audio URL

2. **Leadership Team**
   - Name, Role, Photo
   - Description
   - Display order

---

## 📖 Full Guide

See `SANITY_SETUP_GUIDE.md` for complete documentation including:
- Detailed setup steps
- How to use data in your app
- Troubleshooting
- Next steps

---

## 🎯 Next: Connect Your App

After adding content in Studio, you'll need to update your components to fetch from Sanity instead of using hardcoded data.

Example:
```typescript
import { getAllDevotionals } from "@/lib/sanity.queries";

// In a server component
const devotionals = await getAllDevotionals();
```

**Ready to get started?** Run `npx sanity@latest init` now!
