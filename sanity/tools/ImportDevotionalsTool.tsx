// Custom Sanity Studio tool — lets an already-logged-in Studio admin upload
// the monthly "Meditations of the God-Kind" Word doc and publish all of its
// days in one action.
//
// No separate login: reaching this tool already requires a real Sanity
// session (Studio itself is gated by that), and publishing uses that same
// session's own client (useClient) so writes happen under the logged-in
// user's actual Sanity permissions — not a shared secret or elevated token.

import { Fragment, useState } from "react";
import { useClient } from "sanity";
import { useToast } from "@sanity/ui";
import { apiVersion } from "../env";
import { buildDevotionalDoc } from "../../lib/devotional-sanity-doc";

interface ParsedDevotionalDay {
  date: string;
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

interface ParseWarning {
  day?: number;
  message: string;
}

interface ParseResult {
  month: number;
  year: number;
  devotionals: ParsedDevotionalDay[];
  warnings: ParseWarning[];
}

interface PublishResult {
  published: string[];
  failed: { date: string; error: string }[];
}

const MONTH_OPTIONS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function defaultUploadTarget() {
  const now = new Date();
  // Default to next calendar month — that's the usual "upload ahead" case.
  const target = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return { month: target.getMonth() + 1, year: target.getFullYear() };
}

export function ImportDevotionalsTool() {
  const toast = useToast();
  const client = useClient({ apiVersion });

  const initialTarget = defaultUploadTarget();
  const [month, setMonth] = useState(initialTarget.month);
  const [year, setYear] = useState(initialTarget.year);
  const [file, setFile] = useState<File | null>(null);
  const [parsing, setParsing] = useState(false);
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState<PublishResult | null>(null);
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());

  function toggleExpanded(date: string) {
    setExpandedDates((prev) => {
      const next = new Set(prev);
      if (next.has(date)) next.delete(date);
      else next.add(date);
      return next;
    });
  }

  async function handleParse() {
    if (!file) {
      toast.push({ status: "warning", title: "Choose a .docx file first." });
      return;
    }
    setParsing(true);
    setParseResult(null);
    setPublishResult(null);
    setExpandedDates(new Set());
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("month", String(month));
      formData.append("year", String(year));

      const res = await fetch("/api/admin/devotionals/parse", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to parse document.");

      setParseResult(data);
      const validDays = data.devotionals.filter(
        (d: ParsedDevotionalDay) => d.title && d.scripture && d.verseText && d.discussion.length > 0
      ).length;
      toast.push({
        status: "success",
        title: `Parsed ${data.devotionals.length} day(s) — ${validDays} look complete.`,
      });
    } catch (err) {
      toast.push({ status: "error", title: err instanceof Error ? err.message : "Failed to parse document." });
    } finally {
      setParsing(false);
    }
  }

  async function handlePublish() {
    if (!parseResult) return;
    setPublishing(true);
    setPublishResult(null);

    const published: string[] = [];
    const failed: { date: string; error: string }[] = [];

    for (const d of parseResult.devotionals) {
      try {
        const doc = buildDevotionalDoc(d);
        await client.createOrReplace(doc);
        published.push(d.date);
      } catch (err) {
        failed.push({ date: d.date, error: err instanceof Error ? err.message : "Unknown error" });
      }
    }

    setPublishResult({ published, failed });
    toast.push({ status: "success", title: `Published ${published.length} day(s) to Sanity.` });
    if (failed.length > 0) {
      toast.push({ status: "error", title: `${failed.length} day(s) could not be published.` });
    }
    setPublishing(false);
  }

  const currentYear = new Date().getFullYear();
  const yearOptions = [currentYear - 1, currentYear, currentYear + 1, currentYear + 2];

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-900">Import Monthly Devotionals</h1>
      <p className="mt-2 text-sm text-gray-500">
        Upload the &ldquo;Meditations of the God-Kind&rdquo; Word document for a month. Each day should start on its
        own line with the date (e.g. &ldquo;August 1&rdquo; or &ldquo;Day 1&rdquo;), followed by TOPIC:, VERSE:, the
        discussion paragraphs, and optionally CONFESSION:, PRAYER:, and MEDITATION: lines.
      </p>

      <div className="mt-8 space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <label className="mb-1 block text-xs font-bold text-gray-700">Month</label>
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm"
            >
              {MONTH_OPTIONS.map((name, i) => (
                <option key={name} value={i + 1}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-gray-700">Year</label>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm"
            >
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2 sm:col-span-2">
            <label className="mb-1 block text-xs font-bold text-gray-700">Word Document (.docx)</label>
            <input
              type="file"
              accept=".docx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm"
            />
          </div>
        </div>

        <button
          onClick={handleParse}
          disabled={parsing || !file}
          className="rounded-full bg-gray-900 px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {parsing ? "Parsing…" : "Parse Document"}
        </button>
      </div>

      {parseResult && (
        <div className="mt-8 space-y-6">
          {parseResult.warnings.length > 0 && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              <p className="mb-2 font-bold">{parseResult.warnings.length} warning(s):</p>
              <ul className="list-inside list-disc space-y-1">
                {parseResult.warnings.map((w, i) => (
                  <li key={i}>{w.message}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs font-bold text-gray-500 uppercase">
                <tr>
                  <th className="w-6 px-4 py-3"></th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Scripture</th>
                  <th className="px-4 py-3">Paragraphs</th>
                  <th className="px-4 py-3">Extras</th>
                </tr>
              </thead>
              <tbody>
                {parseResult.devotionals.map((d) => {
                  const complete = d.title && d.scripture && d.verseText && d.discussion.length > 0;
                  const expanded = expandedDates.has(d.date);
                  return (
                    <Fragment key={d.date}>
                      <tr
                        onClick={() => toggleExpanded(d.date)}
                        className={`cursor-pointer border-b border-gray-100 hover:bg-gray-50 ${complete ? "" : "bg-red-50"}`}
                      >
                        <td className="px-4 py-2 text-gray-400">{expanded ? "▾" : "▸"}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{d.date}</td>
                        <td className="px-4 py-2">{d.title || <span className="text-red-500">missing</span>}</td>
                        <td className="px-4 py-2">{d.scripture || <span className="text-red-500">missing</span>}</td>
                        <td className="px-4 py-2">{d.discussion.length}</td>
                        <td className="px-4 py-2 text-xs text-gray-500">
                          {[d.confession && "confession", d.pray && "prayer", d.meditationText && "meditation"]
                            .filter(Boolean)
                            .join(", ") || "—"}
                        </td>
                      </tr>
                      {expanded && (
                        <tr className="border-b border-gray-100 bg-gray-50/60">
                          <td colSpan={6} className="space-y-3 px-4 py-4 text-sm text-gray-700">
                            <div>
                              <span className="text-xs font-bold text-gray-500 uppercase">Verse</span>
                              <p className="mt-1">
                                {d.scripture || "—"}
                                {d.verseText && <>; &ldquo;{d.verseText}&rdquo;</>}
                              </p>
                            </div>
                            <div>
                              <span className="text-xs font-bold text-gray-500 uppercase">Discussion</span>
                              {d.discussion.length > 0 ? (
                                d.discussion.map((p, i) => (
                                  <p key={i} className="mt-1">
                                    {p}
                                  </p>
                                ))
                              ) : (
                                <p className="mt-1 text-red-500">No discussion paragraphs found.</p>
                              )}
                            </div>
                            {d.confession && (
                              <div>
                                <span className="text-xs font-bold text-gray-500 uppercase">Confession</span>
                                <p className="mt-1">{d.confession}</p>
                              </div>
                            )}
                            {d.pray && (
                              <div>
                                <span className="text-xs font-bold text-gray-500 uppercase">Prayer</span>
                                <p className="mt-1">{d.pray}</p>
                              </div>
                            )}
                            {(d.meditationScripture || d.meditationText) && (
                              <div>
                                <span className="text-xs font-bold text-gray-500 uppercase">Meditation</span>
                                <p className="mt-1">
                                  {d.meditationScripture}
                                  {d.meditationScripture && d.meditationText && " — "}
                                  {d.meditationText}
                                </p>
                              </div>
                            )}
                            {d.action && (
                              <div>
                                <span className="text-xs font-bold text-gray-500 uppercase">Action</span>
                                <p className="mt-1">{d.action}</p>
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          <button
            onClick={handlePublish}
            disabled={publishing}
            className="bg-danger-500 hover:bg-danger-600 rounded-full px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {publishing ? "Publishing…" : `Publish ${parseResult.devotionals.length} Day(s) to Sanity`}
          </button>
        </div>
      )}

      {publishResult && (
        <div className="mt-6 space-y-3">
          <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            Published {publishResult.published.length} day(s).
          </div>
          {publishResult.failed.length > 0 && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              <p className="mb-2 font-bold">{publishResult.failed.length} day(s) failed:</p>
              <ul className="list-inside list-disc space-y-1">
                {publishResult.failed.map((f) => (
                  <li key={f.date}>
                    {f.date}: {f.error}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-sm text-gray-500">
            The downloadable PDF at <code>/api/devotionals/download</code> always reflects the current calendar
            month, so it will pick up this content automatically once the month starts.
          </p>
        </div>
      )}
    </div>
  );
}
