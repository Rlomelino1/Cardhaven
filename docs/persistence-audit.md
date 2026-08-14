# What the app actually persists (stage 2 audit)

Read from `index.html` at commit `002b27f`, not from a description of it.

## The three functions

```js
const KEY = "riftbound-deckbuilder-v1";

function save(){                       // index.html:292
  localStorage.setItem(KEY, JSON.stringify({
    deckName, pool, legend, champion, zones, variants
  }));
}
function load(){                       // index.html:300
  Object.assign(S, JSON.parse(localStorage.getItem(KEY)));
}
function wipe(){                       // index.html:308
  localStorage.removeItem(KEY); location.reload();
}
```

One key, one blob, whole-object read and write. There is no per-deck record and no
concept of a user. `save()` is called on essentially every mutation (add, bump, rename,
legend change, variants toggle, import).

`S` holds twelve fields; `save()` writes six of them. The split is not arbitrary — the
six it writes are the ones that survive a reload — but it is not the split the database
wants either.

## Verdict per field

| Field in `S` | Persisted today | Belongs in | Why |
|---|---|---|---|
| `deckName` | yes | **deck row** — `name` column | The deck's own identity. A column, not part of the blob, because stage 5 lists and renames decks without parsing jsonb. |
| `zones` | yes | **deck row** — inside `payload` jsonb | The deck itself. Four arrays: `main`, `runes`, `battlefields`, `sideboard`. |
| `legend` | yes | **deck row** — inside `payload` | Part of deck identity. Stored wrong today; see "Shrink the payload" below. |
| `champion` | yes | **deck row** — inside `payload` | Same. |
| `pool` | **yes — this is the problem** | **nowhere** | See below. |
| `variants` | yes | **settings row** | A browser-filter preference, not deck content. Follows the user across devices; does not belong to any one deck. |
| `q` | no | nowhere | Search box text. Correctly transient. |
| `domainFilter` | no | nowhere | Correctly transient. |
| `typeFilter` | no | nowhere | Correctly transient. |
| `rarityFilter` | no | nowhere | Correctly transient. |
| `limit` | no | nowhere | Pagination cursor, reset to 48 on every filter change. Correctly transient. |
| `target` | no | nowhere | **Dead state** — declared at `index.html:276`, never read or written anywhere else. Flagged, not removed (out of scope for this stage). |

## `pool` must not go in the database

`save()` writes the entire normalized 352-card pool into the same blob as the deck.
That is correct for localStorage — it is what lets the app reopen without re-importing —
and it is exactly wrong for Postgres:

- It is **identical for every user**. Storing it per-user is a straight duplication of
  static data, and `docs/CLAUDE.md` already rules it out: *"The card pool stays a static
  JSON file served alongside the HTML — never rows in the database."*
- It is large. Each entry carries `text`, `image`, `artist`, `domains`, and nine more
  fields; 352 of them is a few hundred KB of JSON. Against a 0.5 GB storage cap and a
  5 GB/month transfer cap, writing that on every `+1` to a card is the single most
  expensive thing the app could do.
- It would break the payload size constraint in the migration on the first save.

So `pool` stays in localStorage as a client-side cache and never reaches the Data API.
The deck row references cards; it does not contain them.

## Shrink the payload before it ships (stage 4, not now)

`zones` currently stores a **full copy of the card object** per entry —
`list.push({...card, id: uid(), qty: 1})` at `index.html:530`. A 40-card main deck
carries 40 complete card records including rules text and image URLs. `legend` is the
same: `S.legend = {...card}` at line 526.

The row only needs a reference and a quantity:

```json
{ "legend": "OGN-123", "champion": "OGN-456",
  "zones": { "main": [{"ref": "OGN-001", "qty": 3}], "runes": [], ... } }
```

Everything else is re-derivable from the static pool at load time. This turns a
~150 KB deck into ~2 KB.

Two things to fix while doing it:

- **`id: uid()`** is a `Math.random()` key used only so `bump()` can find a row
  (`index.html:540`). It is meaningless across devices and must not be persisted.
- **`legend` is stored as an object but `champion` as a bare name string**
  (`index.html:536`). Inconsistent, and `champion` being a *name* collides directly with
  the base/Showcase rule in `docs/CLAUDE.md`: identity keys on **collector number**.
  Both should be a collector-number ref.

The migration below does not enforce the reference shape, deliberately — the client
still writes fat objects today, and a constraint that rejects them would break stage 4
before the conversion lands. The constraints check size and structure, not card schema.

## Bugs noticed while reading (not fixed here)

- `load()` does `Object.assign(S, JSON.parse(raw))` with no validation. Anything in
  localStorage lands directly in state. Low impact today because `save()` only writes
  six keys, but a stale or hand-edited blob can inject arbitrary fields.
- `wipe()` is wired to a button labelled **"Reset"** and clears the pool along with the
  deck, so clearing a deck forces a 352-card re-import. The `confirm()` text is honest
  about it, but the button label is not.
- There is no way to unset `champion` once set — `setChampion` writes it, nothing
  clears it. `clearLegend()` exists; the champion equivalent does not.
- The known Showcase/base 3-copy bug is visible here: `addCard` dedupes on
  `nk(c.name)` (`index.html:528`), and all 352 names are unique, so a Showcase printing
  and its base card occupy separate entries with separate 3-copy caps. Stage 7.
