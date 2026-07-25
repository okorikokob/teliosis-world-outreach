import { NextResponse } from "next/server";
import { parseDevotionalDocx } from "@/lib/devotional-docx-parser";

export const runtime = "nodejs";

// Intentionally unauthenticated: this only extracts text from an uploaded
// .docx and returns it as JSON — it never writes to Sanity. The actual
// publish step happens client-side from the Studio tool using the logged-in
// admin's own Sanity session, which is the real access boundary.
const MAX_FILE_BYTES = 15 * 1024 * 1024;

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const month = Number(formData.get("month"));
  const year = Number(formData.get("year"));

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }
  if (!file.name.toLowerCase().endsWith(".docx")) {
    return NextResponse.json({ error: "Please upload a .docx file." }, { status: 400 });
  }
  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: "File is too large." }, { status: 400 });
  }
  if (!month || month < 1 || month > 12 || !year || year < 2020 || year > 2100) {
    return NextResponse.json({ error: "Invalid month/year." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const result = await parseDevotionalDocx(buffer, month, year);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Devotional docx parse error:", err);
    return NextResponse.json({ error: "Failed to parse the document." }, { status: 500 });
  }
}
