# 🚀 Indus Robotics Intelligence Platform — Deployment Guide

## What Was Built

| Feature | File | Status |
|---|---|---|
| Visitor IP Detection + Geo | `/api/visitor.js` | ✅ |
| Returning Visitor Recognition | `/api/visitor.js` + `WelcomeBanner.tsx` | ✅ |
| Continue Where Left Off | `/src/lib/visitor.ts` | ✅ |
| Jira — Task creation (no URL shown) | `/api/jira.js` | ✅ |
| Airtable Integration | `/api/track.js` + `/api/visitor.js` | ✅ |
| NLP Chatbot | `/api/chat.js` + `ChatBot.tsx` | ✅ |
| Exit Intent Popup | `ExitIntentPopup.tsx` | ✅ |
| Geo Greeting + Live Clock | `GeoGreetingBar.tsx` | ✅ |
| Dark / Light / System Theme | `ThemeToggle.tsx` + `styles.css` | ✅ |
| Traffic Intelligence | `/api/sheets.js` | ✅ |
| Auto Jira Scale Alert (50+ users) | `/api/sheets.js` | ✅ |
| Google Sheets Dashboard | `google-apps-script/dashboard.gs` | ✅ |
| Brand: Indus Robotics | `config.ts` + all headers | ✅ |
| WhatsApp: +91 93612 49474 | `config.ts` | ✅ |

---

## Step 1: Set Up Google Apps Script

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/11TJ3ehB4UkhkPb2SvLMVkM_LukINHyYAcYcZgloBB5s/edit
2. Click **Extensions → Apps Script**
3. Delete all existing code in the editor
4. Copy the entire content of [`google-apps-script/dashboard.gs`](file:///c:/Hk/Digitial%20Presence/google-apps-script/dashboard.gs) and paste it
5. Click **Deploy → New Deployment**
6. Type: **Web App**
7. Execute as: **Me**
8. Who has access: **Anyone**
9. Click **Deploy** → copy the **Web App URL** (looks like `https://script.google.com/macros/s/AKf.../exec`)

---

## Step 2: Set Up Airtable Tables

In your Airtable base (`app8nHkGmMujUJzM3`), create these tables if they don't exist:

| Table Name | Key Fields |
|---|---|
| `Visitors` | IP Address, First Seen, Last Seen, Visit Count, Country, City, Timezone, Last Page, Last Section, Preferences, Name |
| `Chat Sessions` | Visitor IP, Message, Timestamp, Session ID, Country |

> Tip: The `track.js` already handles Page Views, Form Submissions, etc.

---

## Step 3: Add Environment Variables in Vercel

Since your site is already deployed, go to:

**Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these variables one by one:

| Variable | Value |
|---|---|
| `JIRA_DOMAIN` | `harikrishnanint2027g3.atlassian.net` |
| `JIRA_EMAIL` | `harikrishnan.int2027g3@gmail.com` |
| `JIRA_API_TOKEN` | *(from your .env.local)* |
| `JIRA_PROJECT_KEY` | `KAN` |
| `AIRTABLE_TOKEN` | *(from your .env.local)* |
| `AIRTABLE_BASE_ID` | `app8nHkGmMujUJzM3` |
| `AIRTABLE_TABLE_ID` | `tblaoORw4zod6hRC8` |
| `GOOGLE_SHEETS_WEBHOOK_URL` | *(the Apps Script URL from Step 1)* |

> After adding all variables, go to **Deployments → ⋯ → Redeploy** on your latest deployment.

---

## Step 4: Push to Git + Auto-Deploy

```bash
git add .
git commit -m "feat: intelligence platform — visitor tracking, chatbot, geo greeting, themes, sheets"
git push origin main
```

Vercel will auto-deploy. All your env vars are already set — no extra steps needed!

---

## How Each Feature Works

### 🌍 Geo Greeting Bar
- Shows at top of every page: *"Good evening · Chennai, India · 7:53 PM"*
- Updates live every 10 seconds
- Shows active users count (from Airtable sessions)

### 🔄 Returning Visitor Welcome
- On first visit: creates record in Airtable `Visitors` table with IP, geo, timestamp
- On return visits: shows slide-up banner: *"Welcome back! Resume: /products"*
- Tracks which page they left on and offers a resume CTA

### 🤖 Chatbot
- Blue robot button (bottom-right) — click to open
- Knows visitor's city, visit count, name (if filled a form before)
- Answers questions about products, pricing, demos, warranty, delivery
- Logs every conversation to Airtable `Chat Sessions` table

### 🚪 Exit Intent Popup
- Detects when cursor moves to top of screen (about to close tab)
- Shows once per session only
- Offers Quote form or WhatsApp as alternatives

### 🎨 Theme Toggle
- Button in Header (sun/moon/monitor icon)
- 3 modes: Dark (default), Light, System
- System = follows OS preference automatically
- Saves preference to localStorage

### 📊 Google Sheets Dashboard
- Every page view → logged to "Page Views" tab
- Forms submitted → logged to "Form Submissions" tab
- Chat messages → logged to "Chat Sessions" tab
- Daily rollup → "Traffic Summary" tab

### ⚡ Auto Jira Scale Alert
- If 50+ users active simultaneously → creates high-priority Jira task automatically
- Task: `[Traffic Alert] N concurrent users — Consider scaling`
