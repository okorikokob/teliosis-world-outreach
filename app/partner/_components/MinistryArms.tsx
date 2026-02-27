"use client";

import { ArrowRight } from "lucide-react";
import PartnerModal from "./PartnerModal"; // Import the modal

const MinistryArms = () => {
  const arms = [
    {
      id: "mission", // Added an ID to match the Select dropdown values
      category: "Global Outreach",
      title: "Mission",
      description:
        "Supporting missionaries planting churches and spreading the Gospel in unreached areas across the globe.",
      metric: "50+",
      metricLabel: "Active Missionaries",
    },
    {
      id: "radio",
      category: "Broadcast",
      title: "Radio",
      description:
        "Reaching thousands daily with the message of hope, faith, and salvation through our broadcast networks.",
      metric: "10k+",
      metricLabel: "Daily Listeners",
    },
    {
      id: "storehouse",
      category: "Community Provision",
      title: "Storehouse",
      description:
        "Providing food, clothing, and essential resources to families in need within our local communities.",
      metric: "5,000",
      metricLabel: "Families Fed",
    },
    {
      id: "devotional",
      category: "Spiritual Growth",
      title: "Devotional",
      description: "Equipping believers worldwide with daily scripture readings and faith-building teachings.",
      metric: "1,200",
      metricLabel: "Daily Readers",
    },
    {
      id: "children",
      category: "Next Generation",
      title: "Children",
      description:
        "Laying a strong biblical foundation for the youngest members of our community in a safe, fun environment.",
      metric: "500+",
      metricLabel: "Kids Reached",
    },
    {
      id: "nachadava",
      category: "Youth Empowerment",
      title: "Nachadava",
      description: "Empowering young people with skills, mentorship, and the undeniable truth of the Gospel.",
      metric: "1,000",
      metricLabel: "Youth Empowered",
    },
  ];

  return (
    <section id="impact" className="scroll-mt-20 bg-gray-50 py-16 md:py-24">
      <div className="layout-container">
        <div className="mb-14 text-center">
          <h2 className="text-heading-md text-dark mb-4">Partner Impact</h2>
          <p className="text-body-md text-muted font-normal">
            See how your partnerships are changing lives globally through our ministry arms.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {arms.map((arm, idx) => (
            <div
              key={idx}
              className="group flex flex-col justify-between rounded-[2rem] bg-black p-8 transition-transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <div>
                <span className="text-danger-500 mb-4 block text-[10px] font-bold tracking-widest uppercase">
                  {arm.category}
                </span>
                <h3 className="mb-3 text-2xl font-bold text-white">{arm.title}</h3>
                <p className="mb-8 text-sm leading-relaxed text-gray-400">{arm.description}</p>
              </div>

              <div className="mt-auto border-t border-white/10 pt-6">
                <div className="mb-6">
                  <span className="text-danger-500 mb-1 block text-4xl font-black tracking-tight">{arm.metric}</span>
                  <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">{arm.metricLabel}</span>
                </div>

                {/* NEW: Partner Button mapped to this specific card */}
                <PartnerModal defaultInterest={arm.id}>
                  <button className="hover:bg-danger-500 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-sm font-bold text-white transition-colors">
                    Partner with {arm.title} <ArrowRight size={16} />
                  </button>
                </PartnerModal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MinistryArms;
