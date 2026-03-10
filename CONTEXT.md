# owMAIL — Context Document

## What is owMAIL?

**owMAIL** is an AI-powered email management platform built by Owbitz. It connects to your email inbox and transforms it into a smart business intelligence hub. Instead of manually reading through emails to track invoices, commissions, appointments, and pending tasks, owMAIL does it automatically — reading, processing, and surfacing the data that matters.

---

## Tech Stack

- **Frontend:** Next.js 14 (App Router), Material UI, TypeScript, color brand `#1A8F87` (teal)
- **Backend:** FastAPI (Python), IMAP email processing, JWT authentication
- **AI Layer:** LLM-powered chatbot (`owi`) with real email context
- **Deploy:** Linux systemd services, Docker optional

---

## Core Features

### 1. Dashboard
Real-time stats pulled from processed emails:
- Total sales
- Total commissions earned
- Number of invoices processed
- Pending vs. paid commissions (progress bars)
- Quick-access links to all sections

### 2. Email Processing (`/email`)
- Connects to any IMAP mailbox (configured via `.env`)
- Scans for unread emails every 5 minutes (auto-scheduler) or on-demand
- Extracts XML attachments (electronic invoices — Ecuador SRI format)
- Detects duplicates automatically
- Calculates commissions based on configured rates

### 3. Invoices (`/invoices`)
- Full list of electronically processed invoices
- Status tracking (processed, duplicate, pending)
- Date, amount, issuer, and commission details

### 4. Commissions (`/commissions`)
- Automatic commission calculation from invoices
- Pending vs. paid status
- Per-client breakdown

### 5. Reports (`/reports`)
- Export to Excel and PDF
- Filterable by date range and client
- Sales, commissions, and invoice reports
- Branded with owMAIL header

### 6. owi — AI Chatbot (`/owi`)
The crown jewel of owMAIL. **owi** is an AI assistant that has real-time access to your email inbox. You can ask it:
- "What unread emails do I have?"
- "Summarize my latest emails"
- "Did any invoice arrive today?"
- "Are there any emails from clients?"
- Custom questions about commissions, appointments, pending tasks — anything in your inbox

owi uses an LLM backend with actual email context injected, so its answers are grounded in your real inbox data.

### 7. Settings (`/settings`)
- Reset test data
- System info
- Connection verification

---

## Brand Identity

- **Product name:** owMAIL
- **Company:** Owbitz
- **Primary color:** `#1A8F87` (teal/emerald green)
- **Logo:** `owmail-logo.png` — the Owbitz logo (teal OW with upward arrow)
- **Tagline concept:** Manage your email with AI. See your business clearly.

---

## Target User

Businesses and freelancers who:
- Receive invoices by email (especially SRI Ecuador XML format)
- Need to track commissions automatically
- Want AI-powered inbox insights without opening every email
- Want to visualize stats (sales, commissions, appointments, etc.) from email data

---

---

# VIDEO GENERATION PROMPT

## Project: owMAIL — 30-Second Promo Video (9:16 vertical format)

### Assets
- Logo file: `owmail-logo.png` (teal Owbitz logo with upward arrow)
- Brand color: `#1A8F87`
- Background: deep dark (`#0D1117`) or clean white, with teal accents
- Font: bold, modern sans-serif (Inter, Poppins, or similar)

---

### Video Structure (30 seconds, ~900 frames at 30fps)

**[0s – 3s] LOGO INTRO**
Black/dark background. The owMAIL logo fades in from scale 0.6 → 1.0 with a soft glow pulse in teal. Below it, "owMAIL" text types in letter by letter. Hold 1 second.

**[3s – 8s] HOOK — THE PROBLEM**
Logo shrinks to top-left corner (small, persistent).
Big centered text animates in word by word:
> "Your inbox is full."
> "But what does it actually say?"
Subtle email icons float in background (semi-transparent).

**[5s – 10s] PRODUCT INTRO**
Background transitions to teal gradient. Large bold text:
> "Meet owMAIL"
Subtext slides up:
> "AI-powered email management"
Logo pulses once.

**[10s – 17s] FEATURE REEL — STATS**
Split screen or card animations showing:
- Card 1: Dashboard icon + "Visualize everything" → animated stat numbers counting up ($12,450 commissions, 134 invoices)
- Card 2: Email icon + "Automatic processing" → progress bar filling
- Card 3: Chart icon + "Sales · Commissions · Appointments · Anything in your inbox"
Each card slides in from the bottom with a slight bounce.

**[17s – 24s] OWI — THE AI CHATBOT**
Dark chat bubble UI mockup appears.
A chat message types in:
> User: "Did any invoice arrive today?"
> owi (teal bubble): "Yes! 3 invoices from Empresa XYZ totaling $4,200. All commissions calculated."
Small "owi" avatar (teal circle with robot icon) blinks.
Text overlay: **"Ask anything. owi knows your inbox."**

**[24s – 28s] CALL TO ACTION**
Clean white/teal background.
Animated text:
> "owMAIL"
> "Your inbox, intelligently managed."
Logo scales up to center with a clean drop shadow.

**[28s – 30s] OUTRO**
Owbitz logo + "owbitz.com" fade in below.
Teal particle burst or subtle glow.

---

### Style Guidelines
- **Tone:** Professional, clean, modern — not playful
- **Animations:** Smooth spring interpolations, no harsh cuts
- **Color palette:** `#0D1117` (background), `#1A8F87` (primary), `#FFFFFF` (text), `#e6f7f6` (soft teal tint)
- **Typography:** Bold headlines (weight 800), clean body text (weight 400)
- **Logo animation:** Scale + opacity spring-in on first appearance, small persistent logo top-left after intro
- **No voiceover needed** — text tells the full story

---

### Remotion Implementation Notes

Use `@remotion/spring` for all entrance animations.
Recommended composition: 900 frames, 30fps, 1080×1920 (9:16).

```tsx
// Suggested frame breakdown:
const FRAMES = {
  logoIntro: { start: 0, end: 90 },       // 0–3s
  hook: { start: 90, end: 240 },           // 3–8s
  productIntro: { start: 150, end: 300 },  // 5–10s
  featureReel: { start: 300, end: 510 },   // 10–17s
  owiChat: { start: 510, end: 720 },       // 17–24s
  cta: { start: 720, end: 840 },           // 24–28s
  outro: { start: 840, end: 900 },         // 28–30s
}
```

Each section should use `interpolate` and `spring` from `remotion` for smooth entrance/exit transitions.
The logo PNG should be loaded with `<Img>` from `remotion` for frame-accurate rendering.
