// Builds all email templates with the base64 logo embedded inline.
// Run via run_script. Each template ends up as a standalone .html file
// that the user can copy and paste straight into Gmail.

const LOGO_URI = await readFile('ui_kits/email_templates/pieces/_logo-data-uri.txt');

// -------- Shared building blocks ----------------------------------------
const FONT = `'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif`;

const wrap = ({ title, eyebrow, body, footerEmail = null, footerExtra = null, chapter = null }) => `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${title}</title>
</head>
<body style="margin:0; padding:0; background-color:#e8f6f8; font-family:${FONT};">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#e8f6f8;">
<tr><td align="center" style="padding:30px 10px;">

<table role="presentation" width="580" cellpadding="0" cellspacing="0" style="background-color:#FAFAFA; border-radius:12px; overflow:hidden; box-shadow:0 2px 16px rgba(99,200,212,0.15);">

  <!-- Header: centred logo on blue, optional eyebrow -->
  <tr>
    <td align="center" style="background-color:#63C8D4; padding:8px 40px 7px 40px;">
      <img src="${LOGO_URI}" width="127" height="127" alt="Raise" style="display:block; border:0; outline:none; text-decoration:none; width:127px; height:127px;">
      ${eyebrow ? `<p style="margin:12px 0 0 0; font-family:${FONT}; font-size:11px; text-transform:uppercase; letter-spacing:1.5px; color:#FAFAFA; opacity:0.85;">${eyebrow}</p>` : ''}
    </td>
  </tr>

  <!-- The four-colour bar -->
  <tr>
    <td style="font-size:0; line-height:0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="width:25%; height:4px; background-color:#5D215E;"></td>
          <td style="width:25%; height:4px; background-color:#AD2E53;"></td>
          <td style="width:25%; height:4px; background-color:#E88452;"></td>
          <td style="width:25%; height:4px; background-color:#F2CA1A;"></td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Body -->
${body}

  <!-- Footer -->
  <tr>
    <td style="background-color:#63C8D4; padding:18px 40px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="font-family:${FONT}; font-size:12px; color:#FAFAFA; line-height:1.5;">
            ${chapter ? `${chapter}<br>` : ''}Raise: A Celebration of Giving (Charity number: 1202899)<br>
            <a href="https://www.joinraise.org" style="color:#FAFAFA; text-decoration:underline;">joinraise.org</a>${footerEmail ? `
            &nbsp;&middot;&nbsp;
            <a href="mailto:${footerEmail}" style="color:#FAFAFA; text-decoration:underline;">${footerEmail}</a>` : ''}
            ${footerExtra ? `<br>${footerExtra}` : ''}
          </td>
        </tr>
      </table>
    </td>
  </tr>

</table>

</td></tr>
</table>
</body>
</html>`;

// Body fragments (each is one or more <tr> rows that drop inside the card)
const p = (text, marginBottom = 20) =>
  `<p style="margin:0 0 ${marginBottom}px 0; font-family:${FONT}; font-size:16px; line-height:1.6; color:#333333;">${text}</p>`;

const signoff = (name, role) => `
      <p style="margin:32px 0 2px 0; font-family:${FONT}; font-size:16px; color:#333333;">Warm regards,</p>
      <p style="margin:0; font-family:${FONT}; font-size:15px; font-weight:700; color:#5D215E;">${name}</p>
      <p style="margin:2px 0 0 0; font-family:${FONT}; font-size:13px; color:#999999;">${role}</p>`;

const cta = (text, href, variant = 'purple') => {
  const styles = {
    purple: 'background-color:#5D215E; color:#FAFAFA;',
    blue:   'background-color:#63C8D4; color:#FAFAFA;',
    yellow: 'background-color:#F2CA1A; color:#5D215E;',
  }[variant];
  return `
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 4px 0;">
        <tr><td style="border-radius:8px; ${styles}">
          <a href="${href}" style="display:inline-block; padding:13px 28px; font-family:${FONT}; font-size:15px; font-weight:700; color:inherit; text-decoration:none; border-radius:8px;">${text}</a>
        </td></tr>
      </table>`;
};

const callout = (rows) => `
  <tr>
    <td style="padding:0 40px 24px 40px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0fafb; border-radius:10px; border-left:4px solid #63C8D4;">
        <tr><td style="padding:20px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
        </td></tr>
      </table>
    </td>
  </tr>`;

const detailRow = (label, value) => `
              <tr>
                <td style="font-family:${FONT}; font-size:11px; text-transform:uppercase; letter-spacing:1.2px; color:#999999; padding-bottom:4px;">${label}</td>
              </tr>
              <tr>
                <td style="font-family:${FONT}; font-size:15px; font-weight:600; color:#333333; padding-bottom:14px;">${value}</td>
              </tr>`;

// -------- 1. BASE TEMPLATE (canonical empty shell) -----------------------
const baseTpl = wrap({
  title: 'Raise - Email',
  eyebrow: null,
  body: `
  <tr>
    <td style="padding:32px 40px 32px 40px;">
      ${p('Hi <strong>[NAME]</strong>,')}
      ${p('[Replace this paragraph with your message. Add more paragraphs as needed.]')}
      ${cta('[Button text]', '[LINK]', 'purple')}
      <p style="margin:8px 0 0 0; font-family:${FONT}; font-size:12px; font-style:italic; color:#999999;">[If no text or link is entered in the 'Add a link' panel, this button will not be copied.]</p>
      ${signoff('[Your name]', '[Your role]')}
    </td>
  </tr>`,
});

// -------- 2. CHAPTER COMMS (warm internal-to-chapters) --------------------
const commsTpl = wrap({
  title: 'Raise - Internal comms',
  eyebrow: null,
  body: `
  <tr>
    <td style="padding:32px 40px 32px 40px;">
      ${p('Hey <strong>[NAME]</strong> &#x1F44B;')}
      ${p('Hope your week is going well! Just a quick update from the national team.')}
      ${p('[Replace this paragraph with your message. Add more paragraphs as needed.]')}
      ${signoff('[Your name]', '[Your role]')}
    </td>
  </tr>`,
});

// -------- 3. REIMBURSEMENT (finance confirmation) -------------------------
const reimbursementTpl = wrap({
  title: 'Raise - Reimbursement Confirmation',
  eyebrow: 'Reimbursement Confirmation',
  body: `
  <tr>
    <td style="padding:28px 40px 12px 40px;">
      ${p('Hi <strong>[NAME]</strong>,')}
      ${p('Great news - your reimbursement has been processed successfully.')}
    </td>
  </tr>
  ${callout(`
              <tr><td style="font-family:${FONT}; font-size:11px; text-transform:uppercase; letter-spacing:1.2px; color:#999999; padding-bottom:6px;">Amount transferred</td></tr>
              <tr><td style="font-family:${FONT}; font-size:32px; font-weight:700; color:#5D215E;">&pound;[AMOUNT]</td></tr>
              <tr><td style="font-family:${FONT}; font-size:13px; color:#888888; padding-top:8px;">For: <span style="color:#555555;">[DESCRIPTION]</span></td></tr>`)}
  <tr>
    <td style="padding:0 40px 28px 40px;">
      ${p('The funds should now be available in your account. If you have any questions, just reply to this email.', 16)}
      ${p('Thanks for everything you do for Raise - we really appreciate it.', 0)}
    </td>
  </tr>
  <tr>
    <td style="padding:0 40px 32px 40px;">
      ${signoff('[Your name]', '[Your role]')}
    </td>
  </tr>`,
  footerEmail: 'treasurer@joinraise.org',
});

// -------- 4. ANNOUNCEMENT (generic: events, programmes, team updates, etc.) -
const announcementTpl = wrap({
  title: 'Raise - Announcement',
  eyebrow: null,
  body: `
  <tr>
    <td style="padding:28px 40px 8px 40px;">
      ${p('Hey <strong>[NAME]</strong> &#x1F44B;')}
      <p style="margin:0 0 18px 0; font-family:${FONT}; font-size:22px; font-weight:700; line-height:1.3; color:#5D215E;">[ANNOUNCEMENT HEADLINE]</p>
      ${p('[Replace this paragraph with the body of your announcement &mdash; what you&rsquo;re sharing, why it matters, and any context the reader needs.]')}
      ${p('[Optional second paragraph &mdash; or remove this line.]')}
    </td>
  </tr>
  ${callout(`
              ${detailRow('[Detail label]', '[Detail value]')}
              ${detailRow('[Detail label]', '[Detail value]')}
              ${detailRow('[Detail label]', '[Detail value]')}`)}
  <tr>
    <td style="padding:0 40px 8px 40px;">
      ${p('[Closing line &mdash; what you&rsquo;d like the reader to do, react to, or expect next.]')}
      ${cta('[Button text]', '[LINK]', 'purple')}
      <p style="margin:8px 0 0 0; font-family:${FONT}; font-size:12px; font-style:italic; color:#999999;">[If no text or link is entered in the 'Add a link' panel, this button will not be copied.]</p>
    </td>
  </tr>
  <tr>
    <td style="padding:8px 40px 32px 40px;">
      ${signoff('[Your name]', '[Your role]')}
    </td>
  </tr>`,
});

// -------- 5. EXTERNAL PARTNER (polished outreach) -------------------------
const partnerTpl = wrap({
  title: 'Raise - External comms',
  eyebrow: null,
  body: `
  <tr>
    <td style="padding:32px 40px 8px 40px;">
      ${p('Hi <strong>[NAME]</strong>,')}
      <p style="margin:0 0 18px 0; font-family:${FONT}; font-size:22px; font-weight:700; line-height:1.3; color:#5D215E;">[Subject of what you&rsquo;re writing about]</p>
      ${p('Hope you&rsquo;re well. I&rsquo;m writing on behalf of <strong>Raise: A Celebration of Giving</strong> &mdash; a student-led charity running fundraising chapters at universities across the UK.')}
      ${p('[Replace this paragraph with the body of your message &mdash; what you&rsquo;re asking, what you&rsquo;re offering, and any context they&rsquo;ll need.]')}
      ${p('[Optional second paragraph &mdash; or remove this line.]')}
      ${cta('[Button text]', '[LINK]', 'purple')}
      <p style="margin:8px 0 0 0; font-family:${FONT}; font-size:12px; font-style:italic; color:#999999;">[If no text or link is entered in the 'Add a link' panel, this button will not be copied.]</p>
    </td>
  </tr>
  <tr>
    <td style="padding:14px 40px 12px 40px;">
      ${p('Thanks for your time &mdash; I look forward to hearing from you.')}
      ${signoff('[Your name]', '[Your role]')}
    </td>
  </tr>
  <tr>
    <td style="padding:0 40px 32px 40px;">
      <p style="margin:0; font-family:${FONT}; font-size:12px; color:#999999; line-height:1.5;">More about us: <a href="https://www.joinraise.org" style="color:#5D215E; text-decoration:underline;">joinraise.org</a> &middot; Charity number 1202899</p>
    </td>
  </tr>`,
});

// -------- 6. EVENT INVITE -------------------------------------------------
const eventInviteTpl = wrap({
  title: 'Raise - You\u2019re invited',
  eyebrow: null,
  body: `
  <tr>
    <td style="padding:28px 40px 8px 40px;">
      ${p('Hey <strong>[NAME]</strong> &#x1F44B;')}
      <p style="margin:0 0 18px 0; font-family:${FONT}; font-size:22px; font-weight:700; line-height:1.3; color:#5D215E;">[Event name] &mdash; you&rsquo;re invited.</p>
      ${p('[One- or two-sentence description of what the event is and why someone should come.]')}
    </td>
  </tr>
  ${callout(`
              ${detailRow('When', '[Date], [Time]')}
              ${detailRow('Where', '[Location, with address]')}
              ${detailRow('Who&rsquo;s coming', '[Audience - chapters, alumni, partners, etc.]')}
              <tr><td style="font-family:${FONT}; font-size:13px; color:#555555; line-height:1.5;">[Any extra detail - dress code, dietary requirements, what to bring.]</td></tr>`)}
  <tr>
    <td style="padding:0 40px 12px 40px;">
      ${cta('RSVP now', '[LINK]', 'purple')}
    </td>
  </tr>
  <tr>
    <td style="padding:14px 40px 32px 40px;">
      ${p('Can&rsquo;t wait to see you there.')}
      ${signoff('[Your name]', '[Your role]')}
    </td>
  </tr>`,
});

// -------- 7. IMPACT REPORT (big-number hero, end-of-year) -----------------
const impactReportTpl = wrap({
  title: 'Raise - Impact this year',
  eyebrow: null,
  body: `
  <tr>
    <td style="padding:28px 40px 8px 40px;">
      ${p('Hi <strong>[NAME]</strong>,')}
      <p style="margin:0 0 20px 0; font-family:${FONT}; font-size:22px; font-weight:700; line-height:1.3; color:#5D215E;">Together, we did something extraordinary.</p>
    </td>
  </tr>
  <tr>
    <td style="padding:0 40px 24px 40px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0fafb; border-radius:10px;">
        <tr>
          <td align="center" style="padding:28px 24px 20px;">
            <p style="margin:0; font-family:${FONT}; font-size:11px; text-transform:uppercase; letter-spacing:1.5px; color:#888888;">Raised this year</p>
            <p style="margin:8px 0 0 0; font-family:${FONT}; font-size:48px; font-weight:800; color:#5D215E; line-height:1;">&pound;[TOTAL]</p>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 18px 22px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" width="33%" style="padding:6px;">
                  <p style="margin:0; font-family:${FONT}; font-size:24px; font-weight:700; color:#AD2E53; line-height:1;">[N]</p>
                  <p style="margin:6px 0 0 0; font-family:${FONT}; font-size:11px; text-transform:uppercase; letter-spacing:1px; color:#888888;">Chapters</p>
                </td>
                <td align="center" width="34%" style="padding:6px;">
                  <p style="margin:0; font-family:${FONT}; font-size:24px; font-weight:700; color:#E88452; line-height:1;">[N]</p>
                  <p style="margin:6px 0 0 0; font-family:${FONT}; font-size:11px; text-transform:uppercase; letter-spacing:1px; color:#888888;">Donors</p>
                </td>
                <td align="center" width="33%" style="padding:6px;">
                  <p style="margin:0; font-family:${FONT}; font-size:24px; font-weight:700; color:#F2CA1A; line-height:1; text-shadow:0 1px 0 rgba(0,0,0,0.08);">[N]</p>
                  <p style="margin:6px 0 0 0; font-family:${FONT}; font-size:11px; text-transform:uppercase; letter-spacing:1px; color:#888888;">Volunteers</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:0 40px 12px 40px;">
      ${p('[One paragraph thanking the reader and giving the headline story behind the numbers.]')}
      ${p('[Optional second paragraph - a specific moment, a beneficiary story, a chapter highlight.]')}
      ${cta('[Button text]', '[LINK]', 'purple')}
    </td>
  </tr>
  <tr>
    <td style="padding:14px 40px 32px 40px;">
      ${signoff('[Your name]', '[Your role]')}
    </td>
  </tr>`,
});

// -------- Write all files ------------------------------------------------
const templates = {
  '01_base.html':                 baseTpl,
  '02_chapter_comms.html':        commsTpl,
  '03_reimbursement.html':        reimbursementTpl,
  '04_internal_programme.html':   announcementTpl,
  '05_partner_external.html':     partnerTpl,
  '06_event_invite.html':         eventInviteTpl,
  '07_impact_report.html':        impactReportTpl,
};
for (const [name, html] of Object.entries(templates)) {
  await saveFile(`ui_kits/email_templates/${name}`, html);
  log(`Wrote ${name} (${html.length} chars)`);
}
log('Done. ' + Object.keys(templates).length + ' templates generated.');
