# Lumen Health

> **Your visit, in your words.**
>
> A patient-facing post-visit companion that translates the SOAP note back to the patient — plain-language summary, action items, medications, and a glossary of medical terms used.

A portfolio piece by [Niroo Arjuna](https://www.linkedin.com/in/nirooa/) built as:

1. The target app for a Pendo product-analytics demo (Senior Customer Engineer ANZ application)
2. A thought experiment for Heidi Health: what sits between **Heidi Scribe** (clinician documentation) and **Heidi Comms** (patient operational messaging)?

---

## Why this exists

Patients forget 40-80% of what doctors say within minutes. SOAP notes are written for clinicians, not patients. There is no consumer surface that translates the visit back to the person whose health it concerns.

Lumen Health proposes that surface:

| Heidi product | What it does | For whom |
|---|---|---|
| Heidi Scribe | Ambient transcription → SOAP note | Clinician |
| Heidi Evidence | Citation-backed decision support | Clinician |
| Heidi Comms | Bookings, reminders, follow-ups | Patient (operational) |
| Heidi Remote | Wearable transcription mic | Clinician |
| **Lumen Health (this)** | **Plain-language summary, action items, medications, glossary** | **Patient (clinical)** |

---

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19, TypeScript
- Tailwind CSS v4 + shadcn/ui
- Clerk (keyless mode for local dev)
- Forked from [Kiranism/next-shadcn-dashboard-starter](https://github.com/Kiranism/next-shadcn-dashboard-starter)

---

## Run locally

```bash
npm install
cp env.example.txt .env.local   # Clerk keyless mode works without keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Click through the keyless Clerk popup the first time.

The two key routes:

- `/dashboard/overview` — **My Visits** (list of past consultations)
- `/dashboard/patient-portal` — **Single visit detail** (the Pendo demo target)

---

## Pendo instrumentation

The Pendo agent is wired in `src/components/lumen/pendo-snippet.tsx`. To enable:

1. Sign up for [Pendo Free](https://www.pendo.io/pendo-free/) and activate the 30-day trial at registration *before* installing the snippet
2. Grab the API key from `Settings → Subscription Settings`
3. Add to `.env.local` (and Vercel environment variables):
   ```
   NEXT_PUBLIC_PENDO_API_KEY=your-key-here
   ```
4. The snippet initialises after Clerk loads, so `visitor.id` (Clerk user ID) and `account.id` (`lumen-health-demo`) are always defined before the first event fires.

Without the key, the snippet is a no-op and the app still runs.

---

## Mock data

All data lives in `src/lib/mock-visits.ts` — three visits with summaries, action items, medications, and glossary terms. No backend required for the demo.

In a real product these would come from the clinician's documentation tool (e.g. Heidi Scribe) and be translated into patient-facing language by an LLM with clinical guardrails.

---

## Out of scope (deliberately)

- Real backend or database
- Real LLM for the "Ask a question" feature (currently a stub)
- HIPAA compliance — this is a portfolio piece, not real PHI
- FHIR ingestion of actual SOAP notes
- Multi-tenant or role-based access control

---

## Acknowledgements

Built on the excellent [Kiranism/next-shadcn-dashboard-starter](https://github.com/Kiranism/next-shadcn-dashboard-starter) (MIT). All shadcn/ui components used as-is.
