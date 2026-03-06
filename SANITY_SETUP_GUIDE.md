# 🎓 Sanity CMS Setup Guide for Teliosis World Outreach

## ✅ What We've Set Up

Your project now has:
- ✅ Sanity packages installed
- ✅ Schema definitions for Devotionals and Leadership
- ✅ Sanity Studio configured at `/studio`
- ✅ Query helpers for fetching data
- ✅ TypeScript types for your content

---

## 🚀 Step-by-Step Setup

### **Step 1: Create a Sanity Project**

1. **Go to Sanity.io and sign up/login:**
   - Visit: https://www.sanity.io/
   - Click "Get started" or "Sign in"
   - Use Google/GitHub or email to sign up

2. **Create a new project:**
   ```bash
   # Run this command in your terminal
   npx sanity@latest init --project-plan free
   ```

3. **Answer the prompts:**
   - **Create new project?** → Yes
   - **Project name?** → "Teliosis World Outreach"
   - **Use default dataset?** → Yes (production)
   - **Output path?** → Just press Enter (we already have the structure)
   - **Skip installing dependencies?** → Yes

4. **Save your credentials:**
   After running the command, you'll see something like:
   ```
   Success! Your project ID is: abc123xyz
   ```
   **Copy this Project ID!** You'll need it in the next step.

---

### **Step 2: Set Up Environment Variables**

1. **Create `.env.local` file** in your project root:
   ```bash
   # Copy the example file
   copy .env.local.example .env.local
   ```

2. **Add your Sanity credentials** to `.env.local`:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
   Replace `abc123xyz` with your actual project ID from Step 1.

3. **Restart your development server:**
   ```bash
   npm run dev
   ```

---

### **Step 3: Access Sanity Studio**

1. **Open your browser** and go to:
   ```
   http://localhost:3000/studio
   ```

2. **You'll be prompted to log in** - use the same account you created in Step 1

3. **You should now see the Sanity Studio!** 🎉
   - On the left sidebar, you'll see:
     - 📖 Devotionals
     - 👥 Leadership Team

---

### **Step 4: Add Your First Devotional**

1. **Click "Devotionals"** in the Studio sidebar
2. **Click "Create new Devotional"**
3. **Fill in the fields:**
   - **Title:** "Walking in Faith, Not Fear"
   - **Slug:** Click "Generate" button
   - **Scripture:** "Isaiah 41:10"
   - **Excerpt:** "Fear can paralyze us, but faith propels us forward..."
   - **Read Time:** 5
   - **Topics:** Select "Faith"
   - **Featured:** Check this box to make it "Today's Devotional"
   - **Content:** Write your devotional content
   - **Cover Image:** Upload an image (optional)

4. **Click "Publish"** (top right)

---

### **Step 5: Add Leadership Team Members**

1. **Click "Leadership Team"** in the Studio
2. **Click "Create new Leader"**
3. **Fill in the fields:**
   - **Name:** "Pastor E.A Adebayo"
   - **Role:** Select "Senior Pastor"
   - **Description:** "Leading with vision and compassion for 25 years"
   - **Image:** Upload pastor's photo
   - **Display Order:** 0 (shows first)

4. **Repeat** for other leaders (Sarah Williams, David Chen, etc.)
5. **Click "Publish"**

---

## 📝 How Content Works

### Content Flow:
```
┌──────────────┐       ┌───────────────┐       ┌──────────────┐
│   Studio     │  ───> │ Sanity Cloud  │  ───> │  Your Site   │
│ (Add/Edit)   │       │  (Stores it)  │       │ (Displays it)│
└──────────────┘       └───────────────┘       └──────────────┘
```

1. **You add content** in the Studio (`/studio`)
2. **Sanity saves it** in the cloud
3. **Your Next.js app fetches it** and displays it

---

## 🔧 Using the Data in Your App

### Example: Fetching Devotionals

```typescript
// In any server component
import { getAllDevotionals } from "@/lib/sanity.queries";

export default async function DevotionalsPage() {
  const devotionals = await getAllDevotionals();
  
  return (
    <div>
      {devotionals.map((devotional) => (
        <article key={devotional._id}>
          <h2>{devotional.title}</h2>
          <p>{devotional.scripture}</p>
          <p>{devotional.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

### Available Query Functions:

```typescript
// Devotionals
getAllDevotionals()           // Get all devotionals
getFeaturedDevotional()       // Get today's featured devotional
getDevotionalBySlug(slug)     // Get specific devotional
getDevotionalsByTopic(topic)  // Filter by topic
searchDevotionals(query)      // Search devotionals

// Leadership
getAllLeaders()               // Get all leaders
```

---

## 🎨 Next Steps

### 1. **Update Devotionals Page** to use real data
Currently, the devotional grid shows hardcoded data. Update it to fetch from Sanity.

### 2. **Create Individual Devotional Pages**
Create `app/devotionals/[slug]/page.tsx` to show full devotional content.

### 3. **Update Leadership Section**
Replace hardcoded leadership data with Sanity data.

### 4. **Add More Schemas** (Optional)
- Sermons
- Events  
- Impact Statistics
- Ministry Programs

---

## 🆘 Troubleshooting

### "Cannot find module sanity.config"
- Make sure you've restarted your dev server after setting up environment variables

### "CORS error" when accessing Studio
- Make sure your project ID and dataset are correct in `.env.local`
- Check that you've logged into the same Sanity account

### "403 Forbidden" in Studio
- Go to https://www.sanity.io/manage
- Select your project
- Go to "API" → "CORS Origins"
- Add `http://localhost:3000` as an allowed origin

---

## 📚 Additional Resources

- **Sanity Documentation:** https://www.sanity.io/docs
- **GROQ Query Language:** https://www.sanity.io/docs/groq
- **Sanity Schema Types:** https://www.sanity.io/docs/schema-types

---

## ✨ What's Configured

### Schemas Created:
1. **Devotional** - Daily devotional content
   - Title, Scripture, Content, Topics, etc.
   - Featured flag for "Today's Reading"
   - Audio URL support

2. **Leadership** - Team member profiles
   - Name, Role, Description, Image
   - Display order control

### Files Created:
```
teliosis-world-outreach/
├── sanity.config.ts          # Main Sanity configuration
├── sanity/
│   └── schemas/
│       ├── index.ts          # Schema exports
│       ├── devotional.ts     # Devotional schema
│       └── leader.ts         # Leadership schema
├── lib/
│   ├── sanity.client.ts      # Sanity client setup
│   └── sanity.queries.ts     # Query functions
├── app/
│   └── studio/
│       └── [[...tool]]/
│           └── page.tsx      # Studio route
└── .env.local.example        # Environment template
```

---

**🎉 You're all set! Go to `/studio` and start adding content!**
