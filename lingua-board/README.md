# LinguaBoard

A chalkboard-themed flashcard app for learning Spanish, French, Japanese, Hindi, and Nepali — vocabulary, phrases, grammar, and quizzes, with offline progress tracking and optional AI voice pronunciation.

## Features
- Flashcards for vocabulary (filterable by category), everyday phrases, and grammar points
- Multiple-choice quiz mode with per-language best-score tracking
- Daily streak counter and per-word "known" progress, saved locally in the browser
- Phonetic pronunciation guide on every card
- Tap-to-speak: uses the browser's built-in voice by default, with an optional upgrade to real cloud-generated speech (via your own ElevenLabs API key) for languages like Nepali that most browsers don't support natively
- Installable as an offline-capable app (PWA) — works after the first load even with no internet connection, aside from the optional cloud voice feature
- No build step, no framework, no backend — a single HTML file plus a manifest and service worker

## Running locally
Just open `index.html` in a browser — no server required. For the installable/offline behavior to work correctly, though, serve it over HTTP(S) rather than opening the file directly:
```bash
npx serve .
```
or use the VS Code "Live Server" extension.

## Deploying
### GitHub Pages
1. Push this repo to GitHub.
2. Go to **Settings → Pages** → set source to the `main` branch, root folder → Save.
3. Your app will be live at `https://YOUR_USERNAME.github.io/REPO_NAME/`.

### Vercel
1. Go to vercel.com → **Add New → Project** → import this GitHub repo.
2. Leave the framework preset as "Other" (no build step needed) and deploy.
3. Vercel serves it over HTTPS automatically, which is required for the app to be installable as a PWA.

## Installing the app
Once deployed over HTTPS (GitHub Pages or Vercel both work), open the live URL in Chrome, Edge, or most mobile browsers and you should see an **Install** option (desktop: icon in the address bar; mobile: "Add to Home Screen" in the browser menu). After installing, the app opens in its own window/icon and keeps working offline.

## Adding a cloud voice (optional)
1. Create a free account at [elevenlabs.io](https://elevenlabs.io) and generate an API key.
2. In the running app, click **🔑 Voice** in the header, paste the key, and save.
3. Tap the speaker button on any card to hear real spoken audio instead of the browser's built-in voice.

⚠️ The key is stored only in your browser's local storage and is sent directly to ElevenLabs when used. Don't share a copy of this app with your key already saved in it.

## Project structure
```
index.html            the entire app: HTML, CSS, and JS in one file
manifest.json          PWA manifest (name, icons, theme color)
service-worker.js      caches the app shell for offline use
icons/                 app icons for home screen / install prompts
```
