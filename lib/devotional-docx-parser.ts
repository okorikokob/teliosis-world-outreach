// Parses a "Meditations of the God-Kind" monthly Word doc into per-day
// devotional entries. Admin picks the month/year at upload time, so this
// only needs to find the *day number* in each heading line, not a full date.
//
// Detection is intentionally conservative: a paragraph only counts as a day
// heading if it is short and consists of nothing but a recognizable
// date/day marker (month name, "Day N", ISO date, or a slash date). A missed
// heading shows up as an obvious gap in the preview; a false-positive
// heading would silently scramble two days together, which is worse.

import mammoth from "mammoth";

export interface ParsedDevotionalDay {
  date: string; // YYYY-MM-DD
  day: number;
  title: string;
  scripture: string;
  verseText: string;
  discussion: string[];
  confession?: string;
  pray?: string;
  meditationScripture?: string;
  meditationText?: string;
  action?: string;
}

export interface ParseWarning {
  day?: number;
  message: string;
}

export interface ParseResult {
  month: number;
  year: number;
  devotionals: ParsedDevotionalDay[];
  warnings: ParseWarning[];
}

const MONTH_NAMES = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const FIELD_LABELS: { field: string; pattern: RegExp }[] = [
  { field: "title", pattern: /^(?:topic|title)\s*:\s*/i },
  { field: "scripture", pattern: /^(?:verse|scripture|text|key\s*verse)\s*:\s*/i },
  { field: "confession", pattern: /^confession\s*:\s*/i },
  { field: "pray", pattern: /^(?:prayer|pray)\s*:\s*/i },
  { field: "meditationScripture", pattern: /^meditation\s*scripture\s*:\s*/i },
  { field: "meditationText", pattern: /^meditation\s*text\s*:\s*/i },
  { field: "meditation", pattern: /^meditat(?:e|ion)\s*:\s*/i },
  { field: "action", pattern: /^action\s*:\s*/i },
];

async function docxToParagraphs(buffer: Buffer): Promise<string[]> {
  const { value: html } = await mammoth.convertToHtml({ buffer });
  const paragraphs: string[] = [];
  const regex = /<(p|h[1-6]|li)[^>]*>([\s\S]*?)<\/\1>/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html))) {
    const text = match[2]
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, " ")
      .trim();
    if (text) paragraphs.push(text);
  }
  return paragraphs;
}

function clampDay(value: number): number | null {
  return value >= 1 && value <= 31 ? value : null;
}

function extractDayNumber(text: string, month: number): number | null {
  const clean = text.trim();
  if (clean.length === 0 || clean.length > 80) return null;

  const monthName = MONTH_NAMES[month - 1];
  const monthAbbrev = monthName.slice(0, 3);
  const monthPattern = `(?:${monthName}|${monthAbbrev})`;

  // "July 1", "July 1, 2026", "July 1st"
  let m = clean.match(new RegExp(`^${monthPattern}\\.?\\s+(\\d{1,2})(?:st|nd|rd|th)?,?\\s*(?:\\d{4})?$`, "i"));
  if (m) return clampDay(parseInt(m[1], 10));

  // "1 July", "1st July, 2026", optional weekday prefix "Wednesday, 1 July 2026"
  m = clean.match(
    new RegExp(`^(?:[A-Za-z]+,?\\s+)?(\\d{1,2})(?:st|nd|rd|th)?\\s+${monthPattern}\\.?,?\\s*(?:\\d{4})?$`, "i")
  );
  if (m) return clampDay(parseInt(m[1], 10));

  // "Day 1" / "DAY 1"
  m = clean.match(/^day\s*(\d{1,2})$/i);
  if (m) return clampDay(parseInt(m[1], 10));

  // ISO "2026-07-01" — only if month component matches the selected month
  m = clean.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m && parseInt(m[2], 10) === month) return clampDay(parseInt(m[3], 10));

  // "01/07/2026" — accept either DD/MM or MM/DD, whichever matches the selected month
  m = clean.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (m) {
    const a = parseInt(m[1], 10);
    const b = parseInt(m[2], 10);
    if (b === month) return clampDay(a);
    if (a === month) return clampDay(b);
  }

  return null;
}

// Splits a "REF; text" or 'REF "text"' style line into its two parts.
function splitReferenceLine(rest: string): { reference: string; text: string } {
  const quoteMatch = rest.match(/^(.*?)[;:,]?\s*["“](.+?)["”]\s*$/);
  if (quoteMatch) {
    return { reference: quoteMatch[1].trim().replace(/[;:,]$/, ""), text: quoteMatch[2].trim() };
  }
  const semiIdx = rest.indexOf(";");
  if (semiIdx > -1) {
    return {
      reference: rest.slice(0, semiIdx).trim(),
      text: rest
        .slice(semiIdx + 1)
        .trim()
        .replace(/^["“]|["”]$/g, ""),
    };
  }
  return { reference: rest.trim(), text: "" };
}

function daysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}

export async function parseDevotionalDocx(buffer: Buffer, month: number, year: number): Promise<ParseResult> {
  const paragraphs = await docxToParagraphs(buffer);
  const warnings: ParseWarning[] = [];

  // Find heading paragraphs, keeping only a strictly increasing day sequence
  // to filter out any incidental false-positive matches in body text.
  const headings: { index: number; day: number }[] = [];
  let lastDay = 0;
  for (let i = 0; i < paragraphs.length; i++) {
    const day = extractDayNumber(paragraphs[i], month);
    if (day !== null && day > lastDay) {
      headings.push({ index: i, day });
      lastDay = day;
    }
  }

  if (headings.length === 0) {
    warnings.push({
      message:
        "No day headings were recognized in this document. Each day should start on its own line with the date " +
        `(e.g. "${MONTH_NAMES[month - 1]} 1" or "Day 1").`,
    });
    return { month, year, devotionals: [], warnings };
  }

  const devotionals: ParsedDevotionalDay[] = [];

  for (let h = 0; h < headings.length; h++) {
    const { index, day } = headings[h];
    const end = h + 1 < headings.length ? headings[h + 1].index : paragraphs.length;
    const block = paragraphs.slice(index + 1, end);

    let title = "";
    let scriptureLine = "";
    let meditationLine = "";
    let meditationScriptureField = "";
    let meditationTextField = "";
    let confession = "";
    let pray = "";
    let action = "";
    const discussion: string[] = [];

    let currentField: string | null = "discussion";

    for (const para of block) {
      const labelHit = FIELD_LABELS.find(({ pattern }) => pattern.test(para));
      if (labelHit) {
        const rest = para.replace(labelHit.pattern, "").trim();
        switch (labelHit.field) {
          case "title":
            title = rest;
            currentField = null;
            break;
          case "scripture":
            scriptureLine = rest;
            currentField = null;
            break;
          case "confession":
            confession = rest;
            currentField = "confession";
            break;
          case "pray":
            pray = rest;
            currentField = "pray";
            break;
          case "meditation":
            meditationLine = rest;
            currentField = "meditation";
            break;
          case "meditationScripture":
            meditationScriptureField = rest;
            currentField = "meditationScriptureField";
            break;
          case "meditationText":
            meditationTextField = rest;
            currentField = "meditationTextField";
            break;
          case "action":
            action = rest;
            currentField = "action";
            break;
        }
        continue;
      }

      // No label on this paragraph — it continues whatever field is open.
      if (currentField === "discussion" || currentField === null) {
        discussion.push(para);
        currentField = "discussion";
      } else if (currentField === "confession") {
        confession += " " + para;
      } else if (currentField === "pray") {
        pray += " " + para;
      } else if (currentField === "meditation") {
        meditationLine += " " + para;
      } else if (currentField === "meditationScriptureField") {
        meditationScriptureField += " " + para;
      } else if (currentField === "meditationTextField") {
        meditationTextField += " " + para;
      } else if (currentField === "action") {
        action += " " + para;
      }
    }

    const { reference: scripture, text: verseText } = splitReferenceLine(scriptureLine);

    let meditationScripture: string | undefined;
    let meditationText: string | undefined;
    if (meditationScriptureField || meditationTextField) {
      meditationScripture = meditationScriptureField || undefined;
      meditationText = meditationTextField || undefined;
    } else if (meditationLine) {
      const split = splitReferenceLine(meditationLine);
      meditationScripture = split.reference || undefined;
      meditationText = split.text || undefined;
    }

    const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    if (!title) warnings.push({ day, message: `Day ${day}: no TOPIC/TITLE line found.` });
    if (!scripture) warnings.push({ day, message: `Day ${day}: no VERSE/SCRIPTURE line found.` });
    if (!verseText) warnings.push({ day, message: `Day ${day}: scripture line found but no quoted verse text.` });
    if (discussion.length === 0) warnings.push({ day, message: `Day ${day}: no discussion paragraphs found.` });

    devotionals.push({
      date,
      day,
      title,
      scripture,
      verseText,
      discussion,
      confession: confession || undefined,
      pray: pray || undefined,
      meditationScripture,
      meditationText,
      action: action || undefined,
    });
  }

  const totalDays = daysInMonth(month, year);
  const foundDays = new Set(devotionals.map((d) => d.day));
  for (let d = 1; d <= totalDays; d++) {
    if (!foundDays.has(d)) {
      warnings.push({ day: d, message: `Day ${d} of the month was not found in the document.` });
    }
  }

  return { month, year, devotionals, warnings };
}
