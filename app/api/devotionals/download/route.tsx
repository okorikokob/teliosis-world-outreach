import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { Document, Page, Text, View, Image, StyleSheet, renderToBuffer } from "@react-pdf/renderer";
import { client } from "@/lib/sanity.client";

interface MonthDevotional {
  title: string;
  publishedAt: string;
  scripture: string;
  verseText?: string;
  content?: unknown;
  confession?: string;
  pray?: string;
  meditationScripture?: string;
  meditationText?: string;
}

// Extracts plain-text paragraphs from Sanity Portable Text blocks (ignores non-block types like images).
function blocksToParagraphs(blocks: unknown): string[] {
  if (!Array.isArray(blocks)) return [];
  return blocks
    .map((block) => {
      if (!block || typeof block !== "object" || (block as { _type?: string })._type !== "block") return "";
      const children = (block as { children?: { text?: string }[] }).children;
      if (!Array.isArray(children)) return "";
      return children.map((child) => child.text ?? "").join("");
    })
    .filter(Boolean);
}

// @react-pdf/renderer's Image can be handed a local filesystem path, but its
// path resolver (@react-pdf/image) runs the string through Node's legacy
// url.parse — which misreads a Windows drive letter ("C:\...") as a URL
// protocol and silently fails to load the file. Reading the file into a
// Buffer ourselves sidesteps that entirely and works on every platform.
const LOGO_BUFFER = fs.readFileSync(path.join(process.cwd(), "public", "assets", "logo.png"));

const RED = "#dc2626";
const DARK = "#1a1818";
const MUTED = "#6b7280";
const ZINC_950 = "#09090b";

// ─────────────────────────────────────────────
// Static front/back matter — mirrors the source "Meditations of the God-Kind"
// booklet page-for-page. Edit here if the wording, bank accounts, meeting
// schedule, or featured event ever change from one issue to the next.
// ─────────────────────────────────────────────
const MEETING_SCHEDULE = {
  main: [
    { day: "Wednesdays", detail: "School of the Spirit — 6PM" },
    { day: "Thursdays", detail: "School of Prayer, Prophecy and Miracles — 6PM" },
    { day: "Sundays", detail: "1st Service: 8AM  |  2nd Service: 10AM" },
  ],
  mainVenue: "Teliosis World Outreach, after the Catholic Church, Tudunwada-Sauka Road, Tudunwada, Lugbe, Abuja",
  other: [
    { day: "Tuesday", detail: "School of the Spirit — 6PM" },
    { day: "Friday", detail: "Prophecy, Healings and Miracles — 6PM" },
    { day: "Sunday", detail: "Supernatural Impact — 8AM" },
  ],
  otherVenue: "King of Peace, Zhidu Village, Lugbe Airport Road, Abuja",
};

const CONNECT_SOCIALS = "Facebook  ·  Telegram  ·  Spotify  ·  Instagram  ·  Tiktok  ·  Youtube  —  @teliosisworldoutreach";
const CONNECT_CALL = "Call/SMS: 07010638658   |   WhatsApp: 09090603248";
const CONNECT_RADIO = "Listen LIVE on Radio: Independent FM — 89.7FM every Tuesday at 5:00PM";

const PRELUDE_PARAGRAPHS = [
  "The bible in different places likens the Word of God to seed and the earth is likened to the heart of man. When the right seed is sown and nurtured, it without a doubt brings forth the desired tree and consequently the desired fruit. Observe that not many people see the seed when it is planted. The seed planted in the earth is not obvious to the on looking eye. The period of nurturing usually seems a waste of time as no one really sees any visible change in the earth. But after a while, something begins to happen. Growth becomes visible. Little by little, the planted seed becomes a huge tree visible to the on-lookers, celebrated and beneficial to everyone.",
  "This is what it is in our lives also. The seed you sow in your heart will ultimately bring about visible results in your life through your finances, your health, your career, your family and so on. Sow the right seeds, consistently nurture these plantings, and you will reap the right results.",
  "This is the reason for this book Meditations of the God-kind. This is the word of God; the right seeds, presented to you, in little portions, for you to plant in your heart and nurture through daily meditation and confession, and see yourself reap tremendous harvest in every area of your life, daily.",
  "I encourage you to make it a personal habit to confess the word out loud daily as you study. If you do this, we have assurance from the word of God and innumerable testimonies that you will make your way prosperous and have good success.",
];

const HOW_TO_USE_STEPS = [
  "Pick a quiet time and place, preferably early in the morning.",
  "Purpose in your heart to do this daily.",
  "No need to be in a hurry. Take it daily.",
  "Study the Word for the day and take notes if necessary.",
  "Confess the words for confession out loud. Make these confessions as loud as you can. If your environment is not so conducive for shouting, still say the words loud enough for your ears to hear them.",
  "It will help you to take this booklet/eBook everywhere you go. So that several times during your day, you can bring out the booklet/eBook and make the confessions of the day. Make these confessions as often as you can.",
  "Just before going to bed at night, take the night time meditation and confess it out loud as many times as you can.",
  "Believe with all your heart and act in line with what you believe.",
];

const RECEIVE_JESUS_PRAYER =
  "Dear Heavenly Father, thank you for sending Jesus to pay the price for my salvation. I believe in my heart that Jesus came in the flesh and died for my sins. I believe he rose from the dead on the third day. I believe He ascended into heaven and will come back to judge the living and the dead. I right now confess Jesus as my Lord and Savior. I am born again. My name is written in the book of Life. I am saved. Thank you, Lord. Hallelujah!";

const PARTNERSHIP_ACCOUNTS = [
  { number: "1029794288", name: "Teliosis Eternal Life Glo Ass Children Bible Club" },
  { number: "1029794381", name: "Teliosis Eternal Life Global Ass MOG Devotional" },
  { number: "1029794635", name: "Teliosis Eternal Life Global Assemblies Radio" },
  { number: "1029794745", name: "Teliosis Eternal Life Global Assemblies Storehouse" },
  { number: "1029794817", name: "Teliosis Eternal Life Global Assemblies Campus 3 (Zhidu Campus)" },
  { number: "1029795254", name: "Teliosis Eternal Life Global Assemblies Missions" },
  { number: "1029795481", name: "Teliosis Eternal Life Global Ass Building Project" },
  { number: "1029795546", name: "Teliosis Eternal Life Global Assemblies TSTM" },
  { number: "1029796000", name: "Teliosis Eternal Life Global Ass Campus 1 (Tudunwada)" },
  { number: "1029796165", name: "Teliosis Eternal Life Global Ass Campus 2 (EECA Campus)" },
];

// The source booklet drops one promotional page in the middle of the month
// (after the 16th day) — a partnership/giving page and a featured-event
// flyer. This is specific to the July 2026 issue; update or remove
// FEATURED_EVENT for months without one.
const MID_MONTH_INSERT_AFTER_DAY = 16;

const FEATURED_EVENT = {
  presents: "Teliosis Eternal Life Global Assemblies Presents",
  title: "Eternal Life Conference",
  withLine: "With Pastor Peter E. Nwoji",
  date: "Sunday 26th July 2026",
  time: "4PM",
  venue: "Bible Guest House, Ndola Crescent, adjacent Grand Ibro Hotel, Wuse Zone 5",
  live: "Live on YouTube: teliosisworldoutreach",
  contact: "For more info: 07019145771 or www.teliosisworldoutreach.org",
};

const TELIOSIS_STATEMENT_PARAGRAPHS = [
  "This is the Teliosis you heard about and we're glad to have you here.",
  "Teliosis is not only a fellowship of maturing saints, but very importantly a school. A school to disciple Nations and train disciples to disciple others.",
  "Our slogan at Teliosis is Perfecting the Saints... And our God given vision is to:",
  "1. Draw men and women all over the world into an intimate knowledge and fellowship with the Lord Jesus Christ;",
  "2. Teaching them to know the reality of the power of the Word of God;",
  "3. Showing them how to live the God-life.",
  "We accomplish all of these through intense and undistracted teaching of the Word, Effectual prayers and practical discipleship.",
  "Teliosis World Outreach has Campuses and Fellowship Centres all over the world.",
  "We challenge you to stay with us for an uninterrupted 3 month period and see the Word of God totally change your life.",
  "Welcome to Teliosis World Outreach... Perfecting the Saints.",
];

const CLOSING_BLURB_PARAGRAPHS = [
  "This meditational is specially designed to enhance your spiritual growth and maturity, thereby positioning you for victorious living in every aspect of life's endeavors.",
  "Enjoy a truly supernatural life as you take a daily dose of God's word through this meditational.",
];

const styles = StyleSheet.create({
  page: { paddingTop: 40, paddingBottom: 46, paddingHorizontal: 44, fontSize: 10.3, fontFamily: "Helvetica", color: DARK },

  // Cover — dark brand background with soft red/purple glow accents,
  // matching the site's own "Lead Pastor" section treatment.
  coverPage: { padding: 0, backgroundColor: ZINC_950 },
  coverGlowRed: {
    position: "absolute",
    top: -120,
    left: -120,
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: "#dc2626",
    opacity: 0.18,
  },
  coverGlowPurple: {
    position: "absolute",
    bottom: -140,
    right: -140,
    width: 380,
    height: 380,
    borderRadius: 190,
    backgroundColor: "#9333ea",
    opacity: 0.16,
  },
  coverContent: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 56 },
  coverLogo: { width: 72, height: 72, marginBottom: 22 },
  coverEyebrow: { fontSize: 10, letterSpacing: 3, color: "#ffffff", opacity: 0.85, textTransform: "uppercase", marginBottom: 10 },
  coverTitle: { fontSize: 40, fontWeight: 700, color: "#ffffff", textAlign: "center", lineHeight: 1.15 },
  coverSubtitle: { fontSize: 12, color: "#ffffff", opacity: 0.85, textAlign: "center", marginTop: 14 },
  coverRule: { width: 48, height: 3, backgroundColor: RED, marginTop: 26 },
  coverBadge: {
    marginTop: 22,
    backgroundColor: RED,
    color: "#ffffff",
    fontSize: 14,
    fontWeight: 700,
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 4,
  },
  coverFooter: { position: "absolute", bottom: 32, left: 0, right: 0, textAlign: "center", fontSize: 9, color: "#ffffff", opacity: 0.6 },

  // Full-page logo watermark — repeats behind every content page, including
  // continuation pages when a day's content overflows one page.
  watermarkLayer: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center" },
  watermarkLogo: { width: 320, height: 320, opacity: 0.1 },

  // Static / heading pages
  kicker: { fontSize: 9.5, fontWeight: 700, letterSpacing: 2, color: RED, textTransform: "uppercase", marginBottom: 8, textAlign: "center" },
  h1: { fontSize: 20, fontWeight: 700, color: DARK, marginBottom: 20, textAlign: "center", textTransform: "uppercase" },
  paragraph: { fontSize: 11.5, lineHeight: 1.6, color: "#262626", marginBottom: 14, textAlign: "justify" },
  listItem: { fontSize: 11.5, lineHeight: 1.6, color: "#262626", marginBottom: 10, paddingLeft: 14, textAlign: "justify" },
  signatureBlock: { marginTop: 24, alignItems: "flex-end" },
  signatureName: { fontSize: 12, fontWeight: 700, color: DARK },
  signatureRole: { fontSize: 10.5, color: MUTED, fontStyle: "italic" },
  quoteBox: { borderLeftWidth: 2, borderLeftColor: RED, paddingLeft: 16, marginVertical: 6 },
  quoteText: { fontSize: 11.5, lineHeight: 1.6, color: "#262626", fontStyle: "italic" },

  // Daily devotional masthead — centered, repeated per day like the source booklet
  masthead: { alignItems: "center", marginBottom: 14 },
  mastheadLogo: { width: 34, height: 34, marginBottom: 6 },
  mastheadTitle: { fontSize: 13, fontWeight: 700, color: DARK, textAlign: "center", letterSpacing: 0.5, textTransform: "uppercase" },
  mastheadSubtitle: { fontSize: 8.5, color: MUTED, textAlign: "center", marginTop: 3, fontStyle: "italic" },
  mastheadDate: { fontSize: 9.5, fontWeight: 700, color: RED, textAlign: "center", textTransform: "uppercase", letterSpacing: 1, marginTop: 7 },
  mastheadRule: { width: "100%", height: 1, backgroundColor: "#e5e5e5", marginTop: 12 },

  fieldLine: { fontSize: 11, lineHeight: 1.5, marginBottom: 6 },
  fieldLabel: { fontWeight: 700 },
  fieldValueItalic: { fontStyle: "italic" },

  sectionDivider: { flexDirection: "row", alignItems: "center", marginTop: 12, marginBottom: 10 },
  sectionDividerLine: { flex: 1, height: 1, backgroundColor: "#e5e5e5" },
  sectionDividerLabel: { fontSize: 9, fontWeight: 700, letterSpacing: 2, color: MUTED, marginHorizontal: 8, textTransform: "uppercase" },

  body: { fontSize: 11, lineHeight: 1.55, color: "#262626", marginBottom: 10, textAlign: "justify" },

  inlineNote: { fontSize: 11, lineHeight: 1.55, marginTop: 10, textAlign: "justify", color: "#262626" },
  inlineNoteLabel: { fontWeight: 700, color: RED, textTransform: "uppercase" },

  // Partnership page
  accountRow: { flexDirection: "row", marginBottom: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#eeeeee" },
  accountNumber: { width: 95, fontSize: 11, fontWeight: 700, color: RED },
  accountName: { flex: 1, fontSize: 11, color: "#333333" },

  // "Join us" schedule page
  scheduleCard: { backgroundColor: "#fafafa", borderRadius: 4, padding: 16, marginBottom: 16 },
  scheduleTitle: { fontSize: 12, fontWeight: 700, color: DARK, marginBottom: 10, textAlign: "center" },
  scheduleRow: { fontSize: 11, color: "#333333", marginBottom: 5, textAlign: "center" },
  scheduleVenue: { fontSize: 10, color: MUTED, marginTop: 8, fontStyle: "italic", textAlign: "center" },
  connectBlock: { marginTop: 8, alignItems: "center" },
  connectLine: { fontSize: 10.5, color: "#333333", marginBottom: 6, textAlign: "center" },

  // Event flyer page — dark branded card, no photo dependency
  eventCard: { backgroundColor: ZINC_950, borderRadius: 8, padding: 32, alignItems: "center" },
  eventPresents: { fontSize: 9, color: "#ffffff", opacity: 0.7, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12, textAlign: "center" },
  eventTitle: { fontSize: 26, fontWeight: 700, color: "#ffffff", textAlign: "center", marginBottom: 8 },
  eventWith: { fontSize: 11.5, color: "#ffffff", opacity: 0.85, textAlign: "center", marginBottom: 18 },
  eventRow: { flexDirection: "row", gap: 6, marginBottom: 8 },
  eventLabel: { fontSize: 10.5, fontWeight: 700, color: RED, textTransform: "uppercase" },
  eventValue: { fontSize: 10.5, color: "#ffffff" },
  eventFooter: { fontSize: 10, color: "#ffffff", opacity: 0.75, textAlign: "center", marginTop: 18 },
});

// Renders a nested-Text label + value pair, e.g. "TOPIC: It's Practical".
function FieldLine({ label, children, italic }: { label: string; children: React.ReactNode; italic?: boolean }) {
  return (
    <Text style={styles.fieldLine}>
      <Text style={styles.fieldLabel}>{label}: </Text>
      <Text style={italic ? styles.fieldValueItalic : undefined}>{children}</Text>
    </Text>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <View style={styles.sectionDivider}>
      <View style={styles.sectionDividerLine} />
      <Text style={styles.sectionDividerLabel}>{label}</Text>
      <View style={styles.sectionDividerLine} />
    </View>
  );
}

// Faint, full-bleed logo watermark repeated behind every content page —
// `fixed` makes it re-render on continuation pages when content overflows.
function Watermark() {
  return (
    <View style={styles.watermarkLayer} fixed>
      {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf/renderer's Image is a PDF drawing primitive, not an HTML img */}
      <Image src={LOGO_BUFFER} style={styles.watermarkLogo} />
    </View>
  );
}

function DayMasthead({ dateLabel }: { dateLabel: string }) {
  return (
    <View style={styles.masthead}>
      {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf/renderer's Image is a PDF drawing primitive, not an HTML img */}
      <Image src={LOGO_BUFFER} style={styles.mastheadLogo} />
      <Text style={styles.mastheadTitle}>Meditations of the God-Kind</Text>
      <Text style={styles.mastheadSubtitle}>(Daily Meditations for Living the God-Life)</Text>
      <Text style={styles.mastheadDate}>{dateLabel}</Text>
      <View style={styles.mastheadRule} />
    </View>
  );
}

function StaticPage({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Page size="A4" style={styles.page}>
      <Watermark />
      <Text style={styles.kicker}>{kicker}</Text>
      {title && <Text style={styles.h1}>{title}</Text>}
      {children}
    </Page>
  );
}

function DevotionalDayPage({ devotional }: { devotional: MonthDevotional }) {
  const paragraphs = blocksToParagraphs(devotional.content);
  const dateLabel = new Date(devotional.publishedAt).toLocaleDateString("en-NG", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Africa/Lagos",
  });

  return (
    <Page size="A4" style={styles.page}>
      <Watermark />
      <DayMasthead dateLabel={dateLabel} />

      <FieldLine label="Topic">{devotional.title.toUpperCase()}</FieldLine>
      {devotional.verseText && (
        <FieldLine label="Verse" italic>
          {devotional.scripture}; &ldquo;{devotional.verseText}&rdquo;
        </FieldLine>
      )}

      <SectionDivider label="Discussion" />
      {paragraphs.map((p, i) => (
        <Text key={i} style={styles.body}>
          {p}
        </Text>
      ))}

      {devotional.confession && (
        <Text style={styles.inlineNote}>
          <Text style={styles.inlineNoteLabel}>Confession: </Text>
          {devotional.confession}
        </Text>
      )}

      {devotional.pray && (
        <Text style={styles.inlineNote}>
          <Text style={styles.inlineNoteLabel}>Prayer: </Text>
          {devotional.pray}
        </Text>
      )}

      {devotional.meditationText && (
        <Text style={styles.inlineNote}>
          <Text style={styles.inlineNoteLabel}>Meditation: </Text>
          {devotional.meditationScripture} — {devotional.meditationText}
        </Text>
      )}
    </Page>
  );
}

function JoinUsSchedulePage() {
  return (
    <StaticPage kicker="Join Us" title="Meetings This Month">
      <View style={styles.scheduleCard}>
        <Text style={styles.scheduleTitle}>Main Campus</Text>
        {MEETING_SCHEDULE.main.map((row) => (
          <Text key={row.day} style={styles.scheduleRow}>
            {row.day}: {row.detail}
          </Text>
        ))}
        <Text style={styles.scheduleVenue}>{MEETING_SCHEDULE.mainVenue}</Text>
      </View>

      <View style={styles.scheduleCard}>
        <Text style={styles.scheduleTitle}>Other Campus</Text>
        {MEETING_SCHEDULE.other.map((row) => (
          <Text key={row.day} style={styles.scheduleRow}>
            {row.day}: {row.detail}
          </Text>
        ))}
        <Text style={styles.scheduleVenue}>{MEETING_SCHEDULE.otherVenue}</Text>
      </View>

      <View style={styles.connectBlock}>
        <Text style={[styles.scheduleTitle, { marginBottom: 6 }]}>Connect With Us</Text>
        <Text style={styles.connectLine}>{CONNECT_SOCIALS}</Text>
        <Text style={styles.connectLine}>{CONNECT_CALL}</Text>
        <Text style={styles.connectLine}>{CONNECT_RADIO}</Text>
      </View>
    </StaticPage>
  );
}

function PartnershipPage() {
  return (
    <StaticPage kicker="Sow a Seed" title="For Partnership">
      <Text style={[styles.paragraph, { marginBottom: 14, textAlign: "center" }]}>
        UBA Bank — account options by ministry expression:
      </Text>
      {PARTNERSHIP_ACCOUNTS.map((acc) => (
        <View key={acc.number} style={styles.accountRow}>
          <Text style={styles.accountNumber}>{acc.number}</Text>
          <Text style={styles.accountName}>{acc.name}</Text>
        </View>
      ))}
      <Text style={[styles.paragraph, { marginTop: 14, fontStyle: "italic", textAlign: "center" }]}>
        &ldquo;And God will generously provide all you need. Then you will always have everything you need and
        plenty left over to share with others.&rdquo; — 2 Corinthians 9:8 (NLT)
      </Text>
    </StaticPage>
  );
}

function EventFlyerPage() {
  return (
    <Page size="A4" style={styles.page}>
      <Watermark />
      <Text style={styles.kicker}>Join Us</Text>
      <View style={styles.eventCard}>
        <Text style={styles.eventPresents}>{FEATURED_EVENT.presents}</Text>
        <Text style={styles.eventTitle}>{FEATURED_EVENT.title}</Text>
        <Text style={styles.eventWith}>{FEATURED_EVENT.withLine}</Text>

        <View style={styles.eventRow}>
          <Text style={styles.eventLabel}>Date:</Text>
          <Text style={styles.eventValue}>{FEATURED_EVENT.date}</Text>
        </View>
        <View style={styles.eventRow}>
          <Text style={styles.eventLabel}>Time:</Text>
          <Text style={styles.eventValue}>{FEATURED_EVENT.time}</Text>
        </View>
        <View style={styles.eventRow}>
          <Text style={styles.eventLabel}>Venue:</Text>
          <Text style={styles.eventValue}>{FEATURED_EVENT.venue}</Text>
        </View>

        <Text style={styles.eventFooter}>{FEATURED_EVENT.live}</Text>
        <Text style={styles.eventFooter}>{FEATURED_EVENT.contact}</Text>
      </View>
    </Page>
  );
}

function ClosingPage() {
  return (
    <StaticPage kicker="Meditations of the God-Kind" title="Join Us Daily">
      {CLOSING_BLURB_PARAGRAPHS.map((p, i) => (
        <Text key={i} style={[styles.paragraph, { textAlign: "center" }]}>
          {p}
        </Text>
      ))}
      <View style={styles.connectBlock}>
        <Text style={[styles.scheduleTitle, { marginBottom: 6 }]}>
          Meditations of the God-Kind &amp; Prayers
        </Text>
        <Text style={styles.connectLine}>6:30AM – 7AM, Mondays to Saturdays</Text>
        <Text style={styles.connectLine}>Live on Telegram @teliosisworldoutreach</Text>
      </View>
    </StaticPage>
  );
}

function MonthlyDevotionalPdf({ devotionals, monthLabel }: { devotionals: MonthDevotional[]; monthLabel: string }) {
  const firstHalf = devotionals.slice(0, MID_MONTH_INSERT_AFTER_DAY);
  const secondHalf = devotionals.slice(MID_MONTH_INSERT_AFTER_DAY);

  return (
    <Document>
      {/* Cover */}
      <Page size="A4" style={styles.coverPage}>
        <View style={styles.coverGlowRed} />
        <View style={styles.coverGlowPurple} />
        <View style={styles.coverContent}>
          {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf/renderer's Image is a PDF drawing primitive, not an HTML img */}
          <Image src={LOGO_BUFFER} style={styles.coverLogo} />
          <Text style={styles.coverEyebrow}>Teliosis World Outreach</Text>
          <Text style={styles.coverTitle}>Meditations of{"\n"}the God-Kind</Text>
          <Text style={styles.coverSubtitle}>(Daily Meditations for Living the God-Life)</Text>
          <View style={styles.coverRule} />
          <Text style={styles.coverBadge}>{monthLabel.toUpperCase()}</Text>
        </View>
        <Text style={styles.coverFooter}>A Publication of Teliosis World Outreach</Text>
      </Page>

      <JoinUsSchedulePage />

      {/* Prelude */}
      <StaticPage kicker="A Word From Pastor Peter" title="Prelude">
        {PRELUDE_PARAGRAPHS.map((p, i) => (
          <Text key={i} style={styles.paragraph}>
            {p}
          </Text>
        ))}
        <View style={styles.signatureBlock}>
          <Text style={styles.signatureName}>Peter E. Nwoji</Text>
          <Text style={styles.signatureRole}>Lead Pastor, Teliosis World Outreach</Text>
          <Text style={styles.signatureRole}>Author: Meditations of the God-Kind</Text>
        </View>
      </StaticPage>

      {/* How to use */}
      <StaticPage kicker="Getting Started" title="How to Use Meditations of the God-Kind">
        {HOW_TO_USE_STEPS.map((step, i) => (
          <Text key={i} style={styles.listItem}>
            {i + 1}. {step}
          </Text>
        ))}
        <Text style={styles.paragraph}>
          Many are testifying daily. Your testimony will bless somebody. Please share your testimonies with us by
          sending an email to teliosisworldoutreach@gmail.com. If you would like us to pray with you on any issue or
          for counselling, please reach us on +234 909 0603 248 or +234 701 0638 658. Also follow us on all social
          media platforms @teliosisworldoutreach.
        </Text>
      </StaticPage>

      {/* Receive Jesus */}
      <StaticPage kicker="An Invitation" title="Receive Jesus Today">
        <Text style={styles.paragraph}>Would you like to receive Jesus as Lord and Savior of your life? Then say this prayer:</Text>
        <View style={styles.quoteBox}>
          <Text style={styles.quoteText}>&ldquo;{RECEIVE_JESUS_PRAYER}&rdquo;</Text>
        </View>
        <Text style={[styles.paragraph, { marginTop: 10 }]}>
          If you said this prayer, please contact us via the details above and we will send you the e-book; NEW
          CREATION 101, free of charge, to help you grow in leaps and bounds as a Christian.
        </Text>
      </StaticPage>

      {/* First half of the daily entries */}
      {firstHalf.map((devotional, index) => (
        <DevotionalDayPage key={index} devotional={devotional} />
      ))}

      {/* Mid-month promotional pages — matches the source's page order */}
      {secondHalf.length > 0 && (
        <>
          <PartnershipPage />
          <EventFlyerPage />
        </>
      )}

      {/* Remaining daily entries */}
      {secondHalf.map((devotional, index) => (
        <DevotionalDayPage key={MID_MONTH_INSERT_AFTER_DAY + index} devotional={devotional} />
      ))}

      {/* If the month is short enough that there was no "second half", still include partnership info */}
      {secondHalf.length === 0 && <PartnershipPage />}

      {/* Teliosis statement */}
      <StaticPage kicker="Welcome" title="The Teliosis Statement">
        {TELIOSIS_STATEMENT_PARAGRAPHS.map((p, i) => (
          <Text key={i} style={styles.paragraph}>
            {p}
          </Text>
        ))}
      </StaticPage>

      <ClosingPage />
    </Document>
  );
}

export async function GET() {
  const now = new Date();
  const watParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(now);
  const watYear = Number(watParts.find((p) => p.type === "year")?.value);
  const watMonth = Number(watParts.find((p) => p.type === "month")?.value);

  const WAT_OFFSET_MS = 60 * 60 * 1000;
  const monthStart = new Date(Date.UTC(watYear, watMonth - 1, 1, 0, 0, 0) - WAT_OFFSET_MS);
  const monthEnd = new Date(Date.UTC(watYear, watMonth, 1, 0, 0, 0) - WAT_OFFSET_MS);

  const devotionals = await client.fetch<MonthDevotional[]>(
    `*[_type == "devotional" && publishedAt >= $start && publishedAt < $end] | order(publishedAt asc) {
      title, publishedAt, scripture, verseText, content, confession, pray, meditationScripture, meditationText
    }`,
    { start: monthStart.toISOString(), end: monthEnd.toISOString() }
  );

  if (devotionals.length === 0) {
    return NextResponse.json({ error: "No devotionals found for this month yet." }, { status: 404 });
  }

  const monthLabel = new Date(Date.UTC(watYear, watMonth - 1, 1)).toLocaleDateString("en-NG", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const buffer = await renderToBuffer(<MonthlyDevotionalPdf devotionals={devotionals} monthLabel={monthLabel} />);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="MOG-${monthLabel.replace(" ", "-")}.pdf"`,
    },
  });
}
