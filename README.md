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

## Use

1. Set a **Start date** and save it.
2. Check **Today's prayer**.
3. Click **Read today's prayer** to hear the prayer, short pause, then Psalm prompt.
4. Use **Timeline preview** to see the next days.
