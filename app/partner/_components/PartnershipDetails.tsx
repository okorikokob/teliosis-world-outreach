"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const PartnershipDetails = () => {
  const benefits = [
    "Monthly financial commitment",
    "Regular prayer support",
    "Exclusive partner updates",
    "Annual partner gatherings",
    "Mission trip opportunities",
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="layout-container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT COLUMN: Text Content */}
          <div>
            <span className="text-danger-500 mb-3 block text-sm font-bold tracking-widest uppercase">Partnership</span>
            <h2 className="text-heading-md text-dark mb-6">More Than Just Giving</h2>

            <div className="text-body-lg text-muted mb-8 space-y-4">
              <p>
                Ministry partnership is a covenant relationship where you commit to regularly support our mission
                through prayer, financial giving, and active engagement. Partners are the backbone of everything we do.
              </p>
              <p>
                As a partner, you're not just donating—you're investing in eternal impact. You're helping to reach the
                unreached, disciple believers, and plant churches where the Gospel has never been heard.
              </p>
            </div>

            <ul className="space-y-4">
              {benefits.map((item, idx) => (
                <li key={idx} className="text-dark flex items-center gap-3">
                  <CheckCircle2 className="text-danger-500 size-5 shrink-0" />
                  <span className="text-muted text-md">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT COLUMN: Image & Floating Card */}
          <div className="relative mx-auto mt-8 w-full max-w-md lg:mx-0 lg:mt-0 lg:max-w-none">
            {/* NEXT.JS IMAGE INTEGRATION */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-lg lg:aspect-auto lg:h-[450px]">
              <Image
                src="/assets/partner.jpg"
                alt="Hands joined together forming a red heart"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="absolute -right-2 -bottom-6 flex flex-col items-center justify-center rounded-2xl bg-white px-8 py-6 shadow-xl sm:-right-8 sm:-bottom-8">
              <span className="text-danger-500 mb-1 text-[2.5rem] leading-none font-black">15</span>
              <span className="text-dark text-[10px] font-bold tracking-wider uppercase">Churches Planted</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipDetails;
