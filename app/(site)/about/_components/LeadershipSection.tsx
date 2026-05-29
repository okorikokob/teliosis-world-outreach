"use client";

import { useState } from "react";
import Image from "next/image";
import { Users, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
// Data — defined outside component
// ─────────────────────────────────────────────
const LEAD_PASTOR = {
  name: "Pastor Peter E. Nwoji",
  role: "Lead Pastor / Teacher",
  image: "/assets/pastor-peter2.jpeg",
  bio: [
    'Pastor Peter E. Nwoji is the Lead Pastor of Teliosis World Outreach, aka Eternal Life Global Assemblies, a dynamic ministry with multiple campuses and fellowship centers. A passionate and dedicated servant of God, Pastor Nwoji is driven by his divine mandate to "perfect the saints" as outlined in Ephesians 4:11-13.',
    "Known for his profound teaching of the Word, Pastor Nwoji inspires believers to grow spiritually and live Christ-centered lives. His messages are transformational, rooted in sound biblical principles, and aimed at equipping individuals for their God-given purposes.",
    "Pastor Peter has written several impactful books that provide guidance on Christian living, spiritual growth, and fulfilling divine purpose. His writings reflect his commitment to empowering believers with knowledge and understanding of the scriptures.",
    "Pastor Peter E. Nwoji is not just a leader; he is a visionary, teacher, and servant dedicated to advancing the Kingdom of God and making a lasting impact on the world. He is married to Pastor Adama Nwoji, who serves with him in ministry. They are blessed with three sons.",
  ],
};

const PASTORS = [
  {
    id: "joshua",
    name: "Pastor Joshua Andrew",
    role: "Campus Pastor, Tudunwada Campus",
    image: "/assets/pastor-josh.jpeg",
    bio: "The Campus Pastor of Teliosis World Outreach, Tudunwada Campus, serves with a commitment to teaching the Word of God and nurturing believers in their walk with Christ. Through faithful ministry, discipleship, and pastoral care, he helps members grow in spiritual understanding and practical Christian living. He is devoted to advancing the vision of Teliosis World Outreach and raising disciples who are grounded in the scriptures. He is happily married and serves alongside his beautiful wife in the work of the ministry.",
  },
  {
    id: "samuel",
    name: "Pastor Samuel O. Durojaiye",
    role: "Campus Pastor, Zhidu Campus",
    image: "/assets/pastor-sam.jpeg",
    bio: "The Campus Pastor of Teliosis World Outreach, Zhidu Campus, is dedicated to the ministry of the Word, prayer, and discipleship. His passion is to see believers established in the faith and equipped to live out the realities of the Gospel in their daily lives. With a heart for people and a commitment to the vision of Teliosis World Outreach, he labours to build a community of believers who know Christ, grow in His Word, and make Him known to others. He is happily married and continuously serving faithfully in ministry.",
  },
  {
    id: "olamilekan",
    name: "Pastor Olamilekan Adeusi",
    role: "Ministry Executive Officer (M.E.O)",
    image: "/assets/pastor-ola.jpeg",
    bio: "Pastor Olamilekan Adeusi serves as the Ministry Executive Officer (M.E.O) of Teliosis World Outreach, providing strategic leadership and oversight for the administrative and operational structure of the ministry. He coordinates several key expressions of the ministry including the Teliosis School of the Teaching Ministry, ministry publications, radio outreach, financial administration, and day-to-day operations. His service reflects a deep commitment to excellence, faithful stewardship, sound administration, and the perfecting of the saints through the ministry of God\'s Word.",
  },
];

// ─────────────────────────────────────────────
// Pastor Card — hover/tap overlay
// ─────────────────────────────────────────────
const PastorCard = ({ pastor }: { pastor: (typeof PASTORS)[0] }) => {
  // Mobile tap state — desktop uses pure CSS hover
  const [tapped, setTapped] = useState(false);

  return (
    <div
      className="group relative h-[420px] cursor-pointer overflow-hidden rounded-3xl sm:h-[460px]"
      onClick={() => setTapped((prev) => !prev)}
    >
      {/* ── Photo ── */}
      <Image
        src={pastor.image}
        alt={pastor.name}
        fill
        className={cn(
          "object-cover object-[center_20%] transition-transform duration-700",
          // Scale up slightly on hover/tap for depth
          "group-hover:scale-105",
          tapped && "scale-105"
        )}
      />

      {/* ── Always-visible bottom gradient + name/role ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Name & role — always visible at bottom */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 p-6 transition-all duration-500 ease-in-out",
          // On hover/tap — slide name up to make room for bio
          "group-hover:translate-y-0 group-hover:pb-4",
          tapped ? "translate-y-0 pb-4" : ""
        )}
      >
        <p className="text-danger-500 text-xs font-bold tracking-widest uppercase">{pastor.role}</p>
        <h3 className="mt-1 text-xl font-black text-white">{pastor.name}</h3>

        {/* Mobile hint — only shown before first tap */}
        {!tapped && <p className="text-md mt-1 font-medium text-white/40 md:hidden">Tap to read bio</p>}
      </div>

      {/* ── Bio overlay — slides up on hover/tap ── */}
      <div
        className={cn(
          // Base: sits fully below the card (translateY 100%)
          "absolute inset-x-0 bottom-0 rounded-b-3xl bg-zinc-900/95 px-6 pt-5 pb-6 backdrop-blur-sm",
          "transition-all duration-500 ease-in-out",
          // Desktop hover
          "translate-y-full group-hover:translate-y-0",
          // Mobile tap
          tapped ? "translate-y-0" : ""
        )}
      >
        {/* Role + name repeated inside overlay so context is clear */}
        <div className="mb-3 flex items-start justify-between gap-2">
          <div>
            <p className="text-danger-500 text-[10px] font-bold tracking-widest uppercase">{pastor.role}</p>
            <h3 className="text-sm font-black text-white">{pastor.name}</h3>
          </div>
          {/* Tap to close hint on mobile */}
          <button
            className="text-white/40 md:hidden"
            aria-label="Close bio"
            onClick={(e) => {
              e.stopPropagation();
              setTapped(false);
            }}
          >
            <ChevronUp className="h-4 w-4" />
          </button>
        </div>

        {/* Divider */}
        <div className="bg-danger-500/30 mb-3 h-px w-full" />

        {/* Bio text — scrollable if too long */}
        <p className="line-clamp-6 text-sm leading-relaxed text-gray-300 sm:line-clamp-none">{pastor.bio}</p>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Main Section
// ─────────────────────────────────────────────
const LeadershipSection = () => {
  return (
    <>
      {/* ── Section Header — white bg ── */}
      <section className="bg-white pt-16 pb-16 lg:pt-8">
        <div className="layout-container">
          <div className="text-center">
            <div className="border-danger-500/20 bg-danger-500/10 text-danger-500 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2">
              <Users className="h-4 w-4" />
              <span className="text-body-sm font-medium">Pastoral Team</span>
            </div>
            <h2 className="text-dark-500 mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">Meet Our Pastors</h2>
          </div>
        </div>
      </section>

      {/* ── Lead Pastor — full-bleed dark section ── */}
      <section className="relative overflow-hidden bg-zinc-950 py-20 lg:py-28">
        <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 -bottom-40 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[100px]" />

        <div className="layout-container relative z-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Image */}
            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <div className="absolute -top-4 -left-4 h-full w-full rounded-3xl border border-white/10" />
              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src={LEAD_PASTOR.image}
                  alt={LEAD_PASTOR.name}
                  width={600}
                  height={720}
                  priority
                  className="h-[480px] w-full object-cover object-top lg:h-[600px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent lg:hidden" />
                <div className="absolute inset-x-6 bottom-6 lg:hidden">
                  <p className="text-danger-500 text-xs font-bold tracking-widest uppercase">{LEAD_PASTOR.role}</p>
                  <h3 className="mt-1 text-2xl font-black text-white">{LEAD_PASTOR.name}</h3>
                </div>
              </div>
            </div>

            {/* Bio Content */}
            <div>
              <div className="border-danger-500/30 bg-danger-500/10 text-danger-500 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest uppercase">
                Lead Pastor
              </div>

              <div className="hidden lg:block">
                <h3 className="mb-1 text-3xl font-black text-white xl:text-5xl">{LEAD_PASTOR.name}</h3>
                <p className="text-danger-500 mb-8 text-sm font-semibold tracking-wide">{LEAD_PASTOR.role}</p>
              </div>

              <div className="flex flex-col gap-4">
                {LEAD_PASTOR.bio.map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed text-gray-300 lg:text-base">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pastoral Team Grid — white bg ── */}
      <section className="bg-white pt-16 pb-16 sm:pb-20 lg:pb-24">
        <div className="layout-container">
          <div className="mb-12 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-muted text-xs font-bold tracking-widest uppercase">Pastoral Team</span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {PASTORS.map((pastor) => (
              <PastorCard key={pastor.id} pastor={pastor} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LeadershipSection;
