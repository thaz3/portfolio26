# The Digital Archive — Deployment Guide

## What You Have

```
your-project/
├── portfolio.jsx          ← Your React portfolio (the artifact)
├── api/
│   └── chat.js            ← Serverless API proxy (keeps your key safe)
├── .env.example           ← Template for environment variables
└── DEPLOY.md              ← This file
```

## Step 1: Set Up a Vercel Project

Vercel is the simplest path — free tier handles this easily.

1. Create a new Next.js project (or Vite + Vercel adapter):

```bash
npx create-next-app@latest digital-archive
cd digital-archive
```

2. Copy your files in:
   - `portfolio.jsx` → Adapt into your main page component (e.g., `app/page.jsx` or `pages/index.jsx`). Remove the `export default` wrapper if needed and import it as your page.
   - `api/chat.js` → Copy to `api/chat.js` (Vercel auto-detects this as a serverless function)

## Step 2: Get Your Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Navigate to **Settings → API Keys**
4. Click **Create Key**, give it a name like "digital-archive"
5. Copy the key — it starts with `sk-ant-...`

**Cost estimate:** Claude Sonnet costs roughly $3 per million input tokens and $15 per million output tokens. A typical Archive Keeper exchange (short question + short poetic answer) costs about $0.003. Even 1,000 visitor conversations per month would run roughly $3.

## Step 3: Add Your API Key to Vercel

**Never put the key in your code or commit it to git.**

1. Go to your Vercel project dashboard
2. Navigate to **Settings → Environment Variables**
3. Add a new variable:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-your-actual-key-here`
   - **Environments:** Production, Preview, Development
4. Click Save

For local development, create a `.env.local` file:

```bash
cp .env.example .env.local
# Edit .env.local and paste your real key
```

`.env.local` is auto-ignored by git in Next.js projects.

## Step 4: How It Works

```
┌─────────────┐     POST /api/chat      ┌──────────────┐
│   Browser    │ ──────────────────────► │  Your Vercel  │
│  (visitor)   │     { messages: [...] } │  Serverless   │
│              │ ◄────────────────────── │  Function     │
│  portfolio   │     { content: [...] }  │              │
└─────────────┘                          └──────┬───────┘
                                                │
                                   x-api-key:   │  POST
                                   sk-ant-...   │  anthropic.com
                                                ▼
                                         ┌──────────────┐
                                         │  Anthropic   │
                                         │  Claude API  │
                                         └──────────────┘
```

The visitor's browser never sees your API key. It only talks to `/api/chat` on your own domain. Your serverless function adds the key and forwards to Anthropic.

## Step 5: Rate Limiting

The included `api/chat.js` has built-in rate limiting:

- **15 requests per IP per hour** (adjustable via `RATE_LIMIT` constant)
- In-memory storage (resets on cold starts)
- Returns a 429 status with an in-character error message

For higher-traffic sites, upgrade to persistent rate limiting:

- **Vercel KV** (Redis, built into Vercel): `npm i @vercel/kv`
- **Upstash Redis** (serverless Redis): `npm i @upstash/ratelimit @upstash/redis`

## Step 6: Customize the System Prompt

The Archive Keeper's personality and knowledge live in the `SYSTEM_PROMPT` constant inside `api/chat.js`. When you update your real works and projects in `portfolio.jsx`, **also update the prompt in `api/chat.js`** so the Keeper knows about your actual portfolio.

The prompt is server-side intentionally — visitors can't inspect or manipulate it.

## Step 7: Deploy

```bash
# Push to GitHub, connect to Vercel, done:
git add .
git commit -m "initial deploy"
git push origin main

# Or deploy directly:
npx vercel
```

Vercel auto-detects the `api/` directory and deploys your serverless function alongside the frontend.

## Alternative: Netlify

If you prefer Netlify, move `api/chat.js` to `netlify/functions/chat.js` and adjust the export:

```js
// netlify/functions/chat.js
export async function handler(event) {
  // ... same logic, but use event.body and return { statusCode, body }
}
```

Update the fetch URL in the portfolio to `/.netlify/functions/chat`.

## Alternative: Self-Hosted (Express)

```js
// server.js
import express from "express";
import { config } from "dotenv";
config();

const app = express();
app.use(express.json());
app.use(express.static("public")); // serve your built frontend

app.post("/api/chat", async (req, res) => {
  // ... same logic as api/chat.js
});

app.listen(3000);
```

## Security Checklist

- [ ] API key is ONLY in environment variables, never in code
- [ ] `.env.local` is in `.gitignore`
- [ ] Rate limiting is enabled
- [ ] System prompt is server-side only
- [ ] Input is sanitized (max 20 messages, 2000 chars each — already done in api/chat.js)
- [ ] CORS is configured for your domain (update `Access-Control-Allow-Origin` from `*` to your domain)
