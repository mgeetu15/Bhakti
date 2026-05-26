# 🚀 BhaktiGrow AI — Deploy Guide (Google Gemini Version)

## ✅ What You Get After Deploying
- Your own permanent URL: `bhaktigrow-ai.vercel.app` (or custom name)
- Works on mobile, tablet, laptop — any device, anywhere
- Uses your Google/Gemini account — NO separate payment needed
- FREE hosting on Vercel
- FREE AI (Gemini 1.5 Flash: 1,500 requests/day free forever)

---

## 💰 TOTAL COST = ₹0 per month (completely free!)

| What            | Cost         |
|-----------------|--------------|
| Vercel Hosting  | FREE forever |
| GitHub          | FREE forever |
| Gemini API      | FREE forever (1,500 req/day) |
| **TOTAL**       | **₹0/month** |

---

## STEP 1: Get Your FREE Gemini API Key (5 minutes)

1. Go to: **https://aistudio.google.com/app/apikey**
2. Sign in with your **same Google account** (the one with Gemini Pro)
3. Click **"Create API Key"**
4. Click **"Create API key in new project"**
5. **COPY the key** — it looks like: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXX`
6. Save it somewhere safe (Notepad / Notes app)

> ✅ No credit card needed. No payment. Just your Google account.

---

## STEP 2: Create a Free GitHub Account (5 minutes)

1. Go to: **https://github.com**
2. Click **"Sign Up"**
3. Use your same Google email
4. Verify your email

---

## STEP 3: Upload Your App Code to GitHub (10 minutes)

1. Go to: **https://github.com/new**
2. Repository name: `bhaktigrow-ai`
3. Select **"Private"**
4. Click **"Create repository"**
5. On the next page, click **"uploading an existing file"**
6. **Unzip** the `bhaktigrow-ai-gemini.zip` file on your computer
7. **Drag and drop ALL files and folders** into GitHub
8. Click **"Commit changes"**

Your uploaded structure should look like:
```
bhaktigrow-ai/
├── pages/
│   ├── index.js
│   ├── _app.js
│   └── api/
│       ├── gemini.js      ← Gemini API connection
│       └── auth.js
├── components/
│   ├── UI.js
│   ├── AuthScreen.js
│   └── Tabs.js
├── lib/
│   └── theme.js
├── styles/
│   └── globals.css
├── package.json
├── next.config.js
└── .gitignore
```

---

## STEP 4: Deploy on Vercel (10 minutes)

1. Go to: **https://vercel.com**
2. Click **"Sign Up"** → **"Continue with GitHub"**
3. Allow Vercel to access your GitHub
4. Click **"New Project"**
5. Find **`bhaktigrow-ai`** in the list → Click **"Import"**
6. **⚠️ IMPORTANT — Before clicking Deploy:**
   - Scroll down to **"Environment Variables"**
   - Click **"Add"**
   - Name: `GEMINI_API_KEY`
   - Value: paste your key from Step 1 (AIzaSy…)
   - Click **"Add"**
7. Now click **"Deploy"**
8. Wait 2–3 minutes ☕

---

## STEP 5: Your App is Live! 🎉

Vercel gives you a URL like:
**`https://bhaktigrow-ai.vercel.app`**

Open it on your phone, tablet, or laptop — it works everywhere!

---

## How to Use the App

1. Open your URL on any device
2. Click **"Register"** → create username + password
3. Start with **🔥 Trends** tab every morning before uploading
4. Copy the AI output into YouTube Studio
5. Everything saves automatically to **📂 History**

---

## Gemini Free Limits

| Limit | Value |
|-------|-------|
| Requests per minute | 15 |
| Requests per day | **1,500** |
| Monthly cost | **₹0** |

At 10–15 requests per day for your content work, you will **never** hit the limit.

---

## Troubleshooting

**"Gemini API key not configured" error:**
→ Go to Vercel Dashboard → Your Project → Settings → Environment Variables → Make sure `GEMINI_API_KEY` is added

**"Invalid API key" error:**
→ Go back to aistudio.google.com → Create a new key → Update in Vercel settings

**Build failed on Vercel:**
→ Make sure ALL files were uploaded to GitHub correctly
→ Check that `package.json` is in the root folder (not inside a subfolder)

**App loads but shows blank page:**
→ Clear browser cache and reload

---

## Optional: Set a Custom Domain

If you want `bhaktigrow.in` instead of `bhaktigrow-ai.vercel.app`:
1. Buy domain on GoDaddy (~₹800/year)
2. In Vercel → Your Project → Settings → Domains → Add your domain
3. Follow the DNS instructions

---

## Future Upgrades

When you're ready to grow:
- **Database**: Add Supabase (free) for cross-device history sync
- **Payments**: Add Razorpay to charge other creators ₹299/month
- **More AI**: Upgrade to Gemini 1.5 Pro for even better responses

---

Built with ❤️ for @bhaktibhajan_geet 🙏
Powered by Google Gemini 1.5 Flash (Free Forever)
