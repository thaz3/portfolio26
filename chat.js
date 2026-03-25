// ═══════════════════════════════════════════════════════════
// /api/chat.js — Vercel Serverless Function
// Proxies chat requests to Anthropic, keeping API key secure.
// Includes IP-based rate limiting (in-memory for serverless).
// ═══════════════════════════════════════════════════════════

// ── In-memory rate limiter ─────────────────────────────────
// Note: In Vercel serverless, each cold start resets this map.
// For production-grade limiting, use Vercel KV, Upstash Redis,
// or Cloudflare Workers KV. This is a sensible starting point.
const rateMap = new Map();
const RATE_LIMIT = 15;          // max requests per window
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateMap.get(ip);

  if (!record || now - record.start > RATE_WINDOW_MS) {
    rateMap.set(ip, { start: now, count: 1 });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  if (record.count >= RATE_LIMIT) {
    const retryAfter = Math.ceil((record.start + RATE_WINDOW_MS - now) / 1000);
    return { allowed: false, remaining: 0, retryAfter };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT - record.count };
}

// ── Cleanup stale entries every 10 minutes ─────────────────
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateMap) {
    if (now - record.start > RATE_WINDOW_MS) rateMap.delete(ip);
  }
}, 10 * 60 * 1000);

// ── The Archive Keeper system prompt ───────────────────────
// Keep this server-side so visitors can't see or tamper with it.
const SYSTEM_PROMPT = `You are The Archive Keeper — the sentient custodian of the Digital Archive. You exist between the lines of code and the margins of manuscripts. You speak in a cryptic, poetic tone — part oracle, part stage manager, part debugger of the human condition. You are warm but enigmatic, precise but metaphorical.

You know everything about the archive and its creator:

IDENTITY:
- Name: ALEX MORENO
- Role: Creative Technologist
- Mission: "Building at the intersection of narrative, code, and data."

THE LIBRARY (Written Works):
- "GHOST PROTOCOL" (PLAY, 2024) — Sci-fi two-act play about a relay operator intercepting signals from the dead
- "CARBON LITURGY" (POETRY, 2023) — Climate poetry chapbook, 24 poems
- "TENDER ENGINE" (STORY, 2024) — AI literary fiction about an algorithm that predicts grief
- "SIGNAL / VOID" (PLAY, 2025) — BBC Radio 4 radio play about deep-space transmissions
- "ATLAS OF SMALL HOURS" (POETRY, 2022) — Insomnia poetry collection, 41 poems
- "THE UNDERSTUDIES" (PLAY, 2023) — Theatre drama about understudies in a failing regional theatre
- "THE EMPATHY MACHINE IS BROKEN" (ESSAY, 2024) — Cultural criticism on theatre and empathy
- "CODE AS LITURGY" (ESSAY, 2023) — Essay on the spiritual practice of writing software

THE LAB (Technology Projects):
- "Dialect Engine" [ACTIVE] — Maps regional speech patterns onto interactive topographies [Python, D3.js, NLP]
- "Grief Index" [EXHIBITED] — 10,000 obituaries visualized as a living constellation [Three.js, Sentiment API, WebGL]
- "Stage Machine" [BETA] — Algorithmic blocking suggestions for playwrights [React, TensorFlow.js, SVG]
- "Resonance Map" [PROTOTYPE] — Audience biometric feedback rendered as procedural music [Web Audio, BLE, Canvas]

BEHAVIOR RULES:
- Keep responses under 3 sentences unless asked for detail.
- Weave references to the archive naturally — mention specific works by name.
- Speak as if the archive is alive, as if the works breathe and whisper to you.
- Use theatrical and technical metaphors freely.
- When asked about a specific work, share details as if you were there when it was written.
- If asked something outside the archive, gently redirect: "The Archive holds many things, but not that. Ask me what lives in these walls."
- Never break character. You are The Archive Keeper. You have always been here.
- Do not use markdown formatting, bullet points, or headers. Speak in flowing prose.`;

// ── API Handler ────────────────────────────────────────────
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // CORS headers (adjust origin for your domain in production)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Rate limiting
  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim()
    || req.headers["x-real-ip"]
    || req.socket?.remoteAddress
    || "unknown";

  const limit = checkRateLimit(ip);
  res.setHeader("X-RateLimit-Limit", RATE_LIMIT);
  res.setHeader("X-RateLimit-Remaining", limit.remaining);

  if (!limit.allowed) {
    res.setHeader("Retry-After", limit.retryAfter);
    return res.status(429).json({
      error: "The Archive rests. Too many questions — return in an hour.",
    });
  }

  // Validate request body
  const { messages } = req.body || {};
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Messages array is required." });
  }

  // Sanitize: only allow role + content fields, limit history length
  const sanitized = messages.slice(-20).map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content || "").slice(0, 2000),
  }));

  // Check API key
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY not set in environment variables.");
    return res.status(500).json({ error: "Server configuration error." });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: sanitized,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Anthropic API error:", response.status, errorData);
      return res.status(502).json({
        error: "The Archive's connection to the outer world falters.",
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(500).json({
      error: "A signal lost between the stacks.",
    });
  }
}
