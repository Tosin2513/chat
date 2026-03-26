# Family Prayer & Fasting Journey

A small static web app that moves through your prayer plan day-by-day, with fasting reminders and optional text-to-speech.

## Preview locally

From the project folder:

```bash
python3 -m http.server 8000
```

Then open:

- <http://localhost:8000>

If port `8000` is busy, pick another port:

```bash
python3 -m http.server 5173
```

Then open <http://localhost:5173>.

## Deploy on Netlify

This project is a static site, so use these settings:

- Base directory: *(empty)*
- Build command: *(empty)*
- Publish directory: `.`

A `netlify.toml` file is included with these defaults.

### If the deployed site does not open

1. Confirm Netlify is deploying the branch that contains your latest commit.
2. Confirm publish directory is `.`.
3. Open **Deploys** and check for any failed deploy.
4. If the URL shows 404, trigger a **Clear cache and deploy site**.
5. Verify `index.html` exists at repository root.

## Use

1. Set a **Start date** and save it.
2. Check **Today's prayer**.
3. Click **Read today's prayer** to hear the prayer, short pause, then Psalm prompt.
4. Use **Timeline preview** to see the next days.
