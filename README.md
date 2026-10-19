# Millionaire Training

A practice app for *Who Wants To Be A Millionaire?* — the full 15-question
ladder, four lifelines, and stats that work out which subjects need the most
work.

No build step, no dependencies, no server. Open `index.html` and play.

## Getting it on a phone

This is the main way it's meant to be played. Two steps:

**1. Publish it.** In this repo on GitHub: **Settings → Pages → Source:
Deploy from a branch → Branch: `main`, folder `/ (root)` → Save.** After a
minute GitHub gives you a URL like
`https://<username>.github.io/millionaire-training/` — the last part is the
repository name, so it changes if the repo is renamed.

Nothing in the app hardcodes that path: the manifest, the service worker and
every asset reference are relative, so renaming the repository moves the app
without a code change. Only this README mentions the name.

**2. Install it on the phone.** Open that URL on the phone, then:

- **iPhone (Safari)** — Share button → *Add to Home Screen*.
- **Android (Chrome)** — ⋮ menu → *Add to Home screen* / *Install app*.

It then launches full screen from the home icon, with no browser bars, like
a normal app. Portrait and landscape both work, and the lock-in button is
pinned to the bottom of the screen so it's always in reach.

**It works with no signal.** A service worker caches the app on first visit,
so it opens and plays on the Tube or anywhere with no reception — it just
falls back to the bundled question bank until the connection is back.

### If the repository is renamed

The published URL contains the repository name, so renaming the repo moves
the site. The app needs no changes, but on any phone that already has it:

- **The old link stops working.** Delete the old home screen icon and add
  the app again from the new URL, or the icon may keep opening the old copy
  from its offline cache rather than showing an error.
- **Saved stats survive.** Browser storage is tied to the host
  (`phillbagnall.github.io`), not the path, so the accuracy history and weak
  categories carry over to the new address on the same phone and browser.

### Running it on a computer

Double-click `index.html`, or serve the folder if you want the service
worker and live API calls to behave exactly as they do when published:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## How it plays

### Fastest Finger First

Every full game opens with it, as the show does: four items to put in the
correct order against a **20-second clock**. Tap them in order, and a
numbered badge shows each placement as it is locked in; **Start again**
clears the lot if a change of mind is needed. On a keyboard, `A`–`D` place
items and `Backspace` starts over.

**The question comes first, and the clock does not run while it does.** On
the show the host reads the question out and the answers are only revealed
afterwards, so reading time costs nothing. The app mirrors that: the
question appears alone with the clock greyed out at 20.0, read aloud where
the device supports speech, and otherwise held on screen for a pause scaled
to its length. The answers appear and the clock starts together — **Ready**
(or `Space`) skips ahead once she has taken it in. Reading time is never
counted in her recorded time.

If a device has no speech voices the app falls back to the on-screen pause
rather than revealing instantly, so there is always time to read.

There are no rival contestants to beat, so the measure is her own time,
which is the thing worth driving down. Afterwards each placement is marked
right or wrong individually, the true order is shown, and the time is
recorded.

Getting it wrong does not block the game — **Take your seat** carries on to
the ladder either way, since a session cut short at the first hurdle is poor
practice. **Fastest Finger First** on the home screen drills it on its own,
question after question.

These are an ordering format that no trivia API provides, so they come from
a hand-written bank of about 150 in `js/fff-questions.js` — chronology
(British and world history, monarchs, Prime Ministers, science, culture),
size and quantity, compass direction, alphabetical and sequences. Questions do not repeat until
the bank has been worked through. To add more, append
`{ q: '...', order: ['first', 'second', 'third', 'fourth'] }`, listing the
items in their **correct** order; the app shuffles them for display.

### The main game

- **The ladder** — £100 up to £1,000,000 over fifteen questions. Get one
  wrong and you drop to the last safety net you passed.
- **Safety nets**, as in the current ITV format:
  - **£1,000 at Q5** is fixed and automatic.
  - **The second net is yours to choose.** From Q6 onwards, and *before you
    see each question*, you are asked whether to make the upcoming prize
    your net. You get one go at it, and it cannot be set above £500,000
    (Q14). Once set it is locked, and it shows ringed in green on the
    ladder. Reach it and you cannot fall below it — set it and miss it, and
    you are back to the £1,000.
- **Locking in** — pick an answer, then confirm it. The pause before the
  reveal gets longer as the money climbs, as it does on the show.
- **Walk away** — available at any point, and banks the amount for the last
  question answered correctly.
- **Keep playing after a wrong answer** (optional, off by default) — the
  questions carry on to Q15 so a session is always a full fifteen, but the
  run is still scored where it ended. The money, the recorded level and the
  best-level stat all come from the first wrong answer, so results stay
  comparable with a straight game; the result screen adds how many were
  answered correctly overall, and missed rungs are struck through on the
  ladder.
- **Difficulty** — questions 1–3 are the show's opening pitch, 4–6 easy,
  7–11 medium, 12–15 hard. The show stays gentle for a good while, so the
  hard tier only starts where the real money does.
- **The first three questions** never come from an API. No trivia API's
  "easy" tier matches the show's opening, so Q1–3 are always served from a
  hand-written *starter* bank in `js/fallback-questions.js`. These are
  pitched to match real £100 questions — easy but *adult*, with a British
  frame of reference ("At which ceremony is the monarch given his or her
  crown?"), rather than childishly simple. Five are genuine questions from
  the show; the rest are written to sit at the same level. Add more by
  appending entries with `d: 'starter'`.

### Lifelines

| Lifeline | Behaviour |
|---|---|
| **50:50** | Removes two wrong answers. |
| **Ask the Audience** | Simulated vote. The crowd is reliable on easy questions and much less so on hard ones, and only votes on answers still on the board. |
| **Phone a Friend** | 30-second timer. The friend is right about 90% of the time on easy questions, 70% on medium, 45% on hard — and the confidence wording tells you roughly how much to trust it. |
| **Ask the Host** | The host answers off the cuff: right about 85% of the time on easy, 60% on medium, 40% on hard. He says how sure he is, and he is sometimes confident and wrong — reading that is the point. |

### Keyboard

`A` `B` `C` `D` select an answer, `Enter` locks it in, `Esc` closes a
lifeline pop-up.

## Where the questions come from

Questions are pulled live so the range stays broad, with layered fallbacks
so a game never stalls:

1. **[The Trivia API](https://the-trivia-api.com)** — the main source. It is
   a British database and is asked with `region=GB`, which holds back
   questions unsuitable for a UK audience. It leads because Open Trivia DB,
   being community-written and largely American, skews hard towards US
   general knowledge — presidents, state capitals, American sports.
2. **[Open Trivia DB](https://opentdb.com)** — the fallback if the first is
   unreachable. A session token stops it repeating questions, and requests
   are rate-limited to one every five seconds as the API requires. Most
   requests ask for *no* category, so each returns a broad mix; niche
   categories (video games, anime, comics, board games, gadgets) are
   filtered out as too far from the show.
3. **Bundled bank** (`js/fallback-questions.js`) — around 190 questions
   shipped with the app, so it works offline, on a flaky connection, or
   while the live pools are still filling. Its *starter* tier also serves
   Q1–3 of every game regardless of the network.

Questions are held in per-difficulty pools that top themselves up in the
background, so pulling the next question is instant. Recently seen questions
are remembered (last 500) and skipped.

To add your own questions, append entries to `js/fallback-questions.js` —
`c` category, `d` difficulty, `q` question, `a` correct answer, `w` three
wrong answers.

## Stats and weak-spot targeting

Everything is stored in the browser's `localStorage` on that device only —
no accounts, nothing sent anywhere.

The stats screen shows games played, best winnings, best level reached,
overall accuracy, and a per-category breakdown with accuracy, questions
seen, and average answer time. Fastest Finger First gets its own row:
attempts, how often the order was right, the fastest correct time and the
average correct time. Only correct attempts count towards the times — a
fast wrong answer is worth nothing on the show. Categories with at least four questions seen
and under 70% accuracy are marked as **drilling**.

With *"Target my weakest categories"* switched on (the default), about 40% of
background fetches ask for one of the four weakest categories, and the pool
is shuffled so those questions are spread through a game rather than arriving
in a block. That works on weak spots without narrowing the range, since the
real show can ask about anything.

**Reset all stats** on the stats screen clears the lot.

## Settings

| Setting | Default | Effect |
|---|---|---|
| Target my weakest categories | on | Biases question selection towards weak subjects |
| Keep playing after a wrong answer | off | Carries on to Q15 for practice; the result is still scored at the first mistake |
| Read Fastest Finger questions aloud | on | Speaks the question before revealing the answers; falls back to a timed on-screen pause |
| Question timer (45s) | off | Adds a countdown; running out counts as a wrong answer |
| Sound | on | Short synthesised cues for select, lock-in, correct and wrong |

## Files

```
index.html                 markup for all four screens
css/styles.css             all styling
js/questions.js            live sourcing, pools, fallbacks, weak-topic bias
js/fallback-questions.js   bundled offline question bank
js/fff-questions.js        Fastest Finger First ordering questions
js/stats.js                localStorage stats and settings
js/app.js                  game rules, lifelines, UI wiring
manifest.webmanifest       app name, icons and colours when installed
sw.js                      service worker — caches the app for offline play
icons/                     home screen icons
```

### Updating it after a change

The service worker serves the cached copy first and refreshes in the
background, so a change you push appears the *second* time the app is
opened. To see it immediately, close and reopen the app twice, or bump
`CACHE` in `sw.js` to a new version string.

### If the phone says "This app is already installed" but won't open it

Chrome identifies an installed web app by the `id` in the manifest. This app
sets one explicitly (`"id": "millionaire-training"`) so its identity does not
depend on the URL — but installs made from an earlier address, before that was
set, are registered under a different identity whose start URL no longer
exists. Chrome then offers to open an app that cannot open.

To clear it: long-press the old icon → **App info** → **Uninstall** (an
installed web app appears as an ordinary Android app), or **Settings → Apps**
and uninstall anything called *Millionaire* or *Millionaire Training*. Then
reopen the current URL in Chrome and install again.
