# Vignesh — Generative AI

AI-first introduction experience.

## Routes

| Path | Purpose |
|------|---------|
| `/` | Meet Vignesh AI — primary chat experience |
| `/profile` | Interactive portfolio (supporting material) |

## Run

```bash
npm install
npm run dev
```

## Content

- `src/data/profile.json` — all UI copy
- `src/data/knowledge.json` — AI knowledge base

## AI backend

Mock responses by default via `src/services/aiService.ts`.

To connect a real API, set:

```bash
VITE_AI_API_URL=https://your-api.example.com/chat
```

Expect `POST` with `{ "question": "..." }` and JSON `{ "answer": "..." }`.

## Deploy

Vercel-ready SPA (`vercel.json` rewrites). Build: `npm run build`
