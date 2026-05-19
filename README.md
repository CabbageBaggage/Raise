# Email Templates — Raise UI kit

Seven Gmail-paste-ready email templates that share the Raise visual vocabulary, with a parallel set of MWA Cambridge mirrors. A small gallery (`index.html`) lets non-technical users pick a template, optionally fill in a link, and copy the email straight into Gmail.

## What's here

Every template ships in two forms — `NN_<name>.html` for **Raise**, `mwa_NN_<name>.html` for **MWA Cambridge** (same layout, MWA wordmark in the header, MWA footer line). The gallery's brand toggle switches between them.

| # | Template | Use it when… |
|---|---|---|
| 01 | `01_base.html` | You want a clean Raise-branded email and will write the body yourself. Pinned at the top of the sidebar as the recommended starting point. |
| 02 | `02_chapter_comms.html` | An internal note between chapters and the National Team, in either direction. Light scaffolding, generous whitespace. |
| 03 | `03_reimbursement.html` | Confirming a paid reimbursement. £-amount in a highlighted callout, short and functional. **Only template that keeps an email address in the footer** (`treasurer@joinraise.org` for Raise, `cambridge-treasurer@joinraise.org` for MWA). |
| 04 | `04_internal_programme.html` | Generic announcement — events, new programmes, team members, meetings, anything with a headline and a few key facts. |
| 05 | `05_partner_external.html` | Polished outreach to anyone outside the org (partners, grantmakers, donors, colleges). The one-line "writing on behalf of Raise/MWA…" intro is what makes it work. |
| 06 | `06_event_invite.html` | Inviting people to an event with When / Where / Who and an RSVP button. |
| 07 | `07_impact_report.html` | End-of-year summary with a headline £-total, three supporting metrics, and an optional link to a fuller writeup. |

All seven sign off with the generic `[Your name]` / `[Your role]` placeholders — no person or role is hard-coded.

## Using the gallery

1. Open `index.html` in a browser.
2. Pick a template from the sidebar. Use the **Raise / MWA** toggle at the top of the sidebar to switch brands.
3. (Optional) **Add a link** panel — appears under the bullets for templates that have a CTA button. Type a button label and URL to bake them into the copy. Leave both fields blank and the button is dropped from the copied email entirely. Bare domains (e.g. `example.com`) are auto-prefixed with `https://`.
4. Click **Copy For Email** and paste straight into the Gmail compose body.

On screens under ~760px the sidebar collapses behind a sticky "Templates" bar at the top of the page so the gallery is still usable on a phone.

## Placeholders

All editable bits are wrapped in `[BRACKETS]` so they're easy to find and replace in Gmail:

`[NAME]`, `[ANNOUNCEMENT HEADLINE]`, `[Subject of what you're writing about]`, `[Detail label]`, `[Detail value]`, `[AMOUNT]`, `[DESCRIPTION]`, `[Button text]`, `[LINK]`, `[Your name]`, `[Your role]`

## Anatomy of every template

```
┌─────────────────────────────────────────────────┐
│  #e8f6f8 page background                        │
│  ┌────────────────────────────────────────┐    │
│  │  #63C8D4 header  (8px / 7px padding)   │    │
│  │  ┌──────┐                              │    │
│  │  │ logo │  (127×127 Raise · 200×100   │    │
│  │  └──────┘   MWA wordmark)              │    │
│  │  EYEBROW (optional, uppercase)         │    │
│  ├────────────────────────────────────────┤    │
│  │ ▓▓▓▓ ▓▓▓▓ ▓▓▓▓ ▓▓▓▓  ← 4-colour bar   │    │
│  ├────────────────────────────────────────┤    │
│  │  #FAFAFA body                          │    │
│  │  Hi [NAME] 👋                          │    │
│  │  ...                                   │    │
│  │  Warm regards,                         │    │
│  │  [Your name]   ← #5D215E               │    │
│  │  [Your role]   ← #999999               │    │
│  ├────────────────────────────────────────┤    │
│  │  #63C8D4 footer                        │    │
│  │  Raise: A Celebration of Giving        │    │
│  │  joinraise.org                         │    │
│  │  (MWA omits the Raise charity line)    │    │
│  └────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

Every template uses HTML tables (because Outlook). Every style is inlined. The logo is base64-embedded so it survives in emails forwarded across networks.

## Component reference

These are the HTML fragments the build script composes. See `pieces/build.js` (Raise) or `pieces/build-mwa.js` (MWA) for the canonical source.

### Header

```html
<tr>
  <td align="center" style="background-color:#63C8D4; padding:8px 40px 7px 40px;">
    <img src="data:image/png;base64,..." width="127" height="127" alt="Raise" style="display:block;">
    <!-- optional eyebrow -->
    <p style="margin:12px 0 0 0; font-size:11px; text-transform:uppercase; letter-spacing:1.5px; color:#FAFAFA; opacity:0.85;">
      Reimbursement Confirmation
    </p>
  </td>
</tr>
```

### Four-colour bar

```html
<tr>
  <td style="font-size:0; line-height:0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="width:25%; height:4px; background-color:#5D215E;"></td>
      <td style="width:25%; height:4px; background-color:#AD2E53;"></td>
      <td style="width:25%; height:4px; background-color:#E88452;"></td>
      <td style="width:25%; height:4px; background-color:#F2CA1A;"></td>
    </tr></table>
  </td>
</tr>
```

> **Don't reorder this. Don't drop a colour. Don't add a gap.** It's the brand's most important visual signature.

### Hero headline (purple, body-scoped)

```html
<p style="margin:0 0 18px 0; font-size:22px; font-weight:700; line-height:1.3; color:#5D215E;">
  [ANNOUNCEMENT HEADLINE]
</p>
```

### Callout / amount card

```html
<table role="presentation" width="100%" style="background-color:#f0fafb; border-radius:10px; border-left:4px solid #63C8D4;">
  <tr><td style="padding:20px 24px;">
    <p style="margin:0; font-size:11px; text-transform:uppercase; letter-spacing:1.2px; color:#999;">Amount transferred</p>
    <p style="margin:6px 0 0; font-size:32px; font-weight:700; color:#5D215E;">&pound;[AMOUNT]</p>
    <p style="margin:8px 0 0; font-size:13px; color:#888;">For: <span style="color:#555;">[DESCRIPTION]</span></p>
  </td></tr>
</table>
```

### CTA button

```html
<table role="presentation" cellpadding="0" cellspacing="0">
  <tr><td style="border-radius:8px; background-color:#5D215E;">
    <a href="[LINK]" style="display:inline-block; padding:13px 28px; font-size:15px; font-weight:700; color:#FAFAFA; text-decoration:none; border-radius:8px;">[Button text]</a>
  </td></tr>
</table>
```

`cta(text, href, variant)` in the build scripts supports three variants: `purple` (default, `#5D215E` bg + `#FAFAFA` text), `blue` (`#63C8D4`), `yellow` (`#F2CA1A` bg + `#5D215E` text). All current templates use purple — the gallery's "Add a link" panel fills the `[Button text]` / `[LINK]` placeholders or strips the button if both fields are blank.

### Sign-off

```html
<p style="margin:32px 0 2px 0; font-size:16px; color:#333;">Warm regards,</p>
<p style="margin:0; font-size:15px; font-weight:700; color:#5D215E;">[Your name]</p>
<p style="margin:2px 0 0 0; font-size:13px; color:#999;">[Your role]</p>
```

### Footer

```html
<tr>
  <td style="background-color:#63C8D4; padding:18px 40px;">
    <p style="margin:0; font-size:12px; color:#FAFAFA; line-height:1.5;">
      Raise: A Celebration of Giving (Charity number: 1202899)<br>
      <a href="https://www.joinraise.org" style="color:#FAFAFA;">joinraise.org</a>
    </p>
  </td>
</tr>
```

MWA footers swap the first line for `May Week Alternative · Cambridge` and drop the Raise charity line. Only the Reimbursement template appends a `mailto:` link after `joinraise.org`.

## Voice cheatsheet

| Template | Greeting | Tone | Emoji |
|---|---|---|---|
| Empty shell | `Hi [NAME],` | Whatever you make it | Optional |
| Internal comms | `Hey [NAME] 👋` | Warm, peer | 👋 ok |
| Reimbursement | `Hi [NAME],` | Functional, short | None |
| Announcement | `Hey [NAME] 👋` | Direct, peer | 👋 ok |
| External comms | `Hi [NAME],` | Warm-professional | None |
| Event invite | `Hey [NAME] 👋` / `Hi [NAME],` | Excited but tidy | 👋 ok |
| Impact report | `Hi [NAME],` | Grateful, factual | None |

## Build & customisation

- `pieces/build.js` — composes the 7 Raise templates from shared fragments.
- `pieces/build-mwa.js` — same, for the MWA mirrors.
- `pieces/_logo-data-uri.txt` / `_mwa-logo-data-uri.txt` — base64 logo data URIs that each template embeds inline.
- `pieces/raise-logo.png` / `mwa-logo.png` — same logos as visible files, used by the gallery sidebar.

To change a shared element (header padding, footer wording, the four-colour bar) edit the relevant `build*.js` once and re-run it — every template inherits the change.

## Hard email-HTML rules

These bite later if you forget them:

- **All styles inline** — Gmail strips `<style>` blocks.
- **Tables for layout** — flex/grid break in Outlook.
- **No CSS `background-image`** — Outlook ignores it.
- **Total file < 102 KB** or Gmail clips the email mid-render.
- **HTML entities for special chars**: `&pound;` for £, `&middot;` for ·, `&mdash;` for —, `&#x1F44B;` for 👋.
- **British English**, brand rule.

See the root `colors_and_type.css` for the full Raise design system.
