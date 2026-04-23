"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const PartnershipDetails = () => {
  const benefits = [
    "Prayerfully support the work of the ministry",
    "Give consistently toward outreach and discipleship",
    "Help spread the Gospel through teaching and missions",
    "Stand with us in raising lives through the Word of God",
    "Be part of what God is doing through Teliosis World Outreach",
  ];

  return (
    <section id="partnership" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="layout-container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="border-danger-500/20 bg-danger-500/10 text-danger-500 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2">
              <span className="text-body-sm font-medium">Partnership</span>
            </div>

            <h2 className="text-dark-500 mb-6 text-3xl font-semibold tracking-tight sm:text-4xl">
              More than just giving
            </h2>

            <div className="text-muted mb-8 space-y-4 text-base leading-7 sm:text-lg">
              <p>
                Ministry partnership is a commitment to stand with us in prayer, giving, and support as we advance the
                Gospel and raise disciples through the teaching of God’s Word.
              </p>

              <p>
                As a partner, you are not simply making a donation. You are taking part in the work of transforming
                lives, strengthening believers, and extending the reach of the ministry.
              </p>
            </div>

            <ul className="space-y-4">
              {benefits.map((item, idx) => (
                <li key={idx} className="text-dark-500 flex items-start gap-3">
                  <CheckCircle2 className="text-danger-500 mt-0.5 h-5 w-5 shrink-0" />
                  <span className="text-muted text-base leading-7">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto mt-8 w-full max-w-md lg:mx-0 lg:mt-0 lg:max-w-none">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-lg lg:aspect-auto lg:h-[450px]">
              <Image
                src="/assets/partner.jpg"
                alt="People joined together in prayer and unity"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="absolute -right-2 -bottom-6 rounded-2xl bg-white px-6 py-5 text-center shadow-xl sm:-right-8 sm:-bottom-8">
              <span className="text-danger-500 block text-3xl font-bold sm:text-4xl">Global</span>
              <span className="text-dark-500 text-xs font-semibold tracking-wider uppercase">Kingdom Impact</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipDetails;
