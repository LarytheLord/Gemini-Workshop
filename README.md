# Gemini Ultra Starter (5‑Hour Workshop + Mini‑Hack)

**Why this exists:** single-folder, minimal setup for CS/IT students to try **all three**: Web demo (tiny API), CLI, and prompts — exactly what your workshop covers.

## Quickstart
1) Install deps:
```bash
npm install
```
2) Set your key:
```bash
cp .env.example .env
# edit .env to add GOOGLE_API_KEY
```
3) **Run as CLI** (fastest):
```bash
node index.mjs --task "make 5 flashcards as JSON" --file ./eval/notes.txt
```
4) **Run as API + Web demo**:
```bash
npm run web       # serves POST /api/ai and a tiny HTML page at http://localhost:5173
```

## What you can do in class
- **Web (Studio)** for ideation (not in this repo).
- **CLI**: transform files (summaries, tests, flashcards).
- **API**: hit `/api/ai` from a tiny HTML form.

## Files
```
.
├─ index.mjs          # one file: CLI + Express API
├─ public/index.html  # 25-line form to call /api/ai
├─ prompts.md         # copy/paste prompts used in workshop
├─ eval/notes.txt     # sample text for CLI
├─ .env.example       # GOOGLE_API_KEY=...
├─ package.json       # scripts for web & cli
├─ .gitignore
└─ README.md
```

## Submission (for hack sprint)
- Push repo link + 60–90s screen recording.
- Add a "How we used Gemini" section in README.
