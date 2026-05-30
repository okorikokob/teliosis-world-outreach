"use client";

import { useState } from "react";
import { MapPin, Phone, Clock, ExternalLink, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
// Campus data — add more campuses here as needed
// ─────────────────────────────────────────────
const CAMPUSES = [
  {
    id: "city",
    name: "City Campus",
    shortAddress: "Jabi, FCT Abuja",
    address: "Suite 350, Dominion Hub\nRock of Ages Mall, Jabi\nFCT Abuja",
    mapEmbed:
      "https://maps.google.com/maps?q=Suite+350+Dominion+Hub+Rock+of+Ages+Mall+Jabi+Abuja&t=&z=15&ie=UTF8&iwloc=&output=embed",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Suite+350+Dominion+Hub+Rock+of+Ages+Mall+Jabi+Abuja",
    phone: "+234 701 914 5771 / +234 814 629 0513",
    email: "teliosisworldoutreach@gmail.com",
    serviceTimes: [{ day: "Last Saturday of Every Month", time: "4:00 PM – 7:00 PM" }],
  },
  {
    id: "tudunwada",
    name: "Tudunwada Campus",
    shortAddress: "Lugbe, Abuja",
    address: "After Catholic Church\nSauka Road, Tudunwada\nFHA Lugbe, Abuja",
    // FIX: Using exact coordinates extracted from the Google Maps link for a precise pin
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1970.3571170132373!2d7.363908625571797!3d8.998421113006497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e71e79b74fb25%3A0x6a996a6047010166!2sTeliosis%20World%20Outreach!5e0!3m2!1sen!2sng!4v1779930787918!5m2!1sen!2sng",
    mapLink: "https://www.google.com/maps/place/Teliosis+World+Outreach/@8.9984211,7.3639086,18z",
    phone: "+234 701 914 5771 / +234 814 629 0513",
    email: "teliosisworldoutreach@gmail.com",
    serviceTimes: [
      { day: "Sunday", time: "8:00 AM & 10:00 AM" },
      { day: "Wednesday", time: "6:00 PM" },
    ],
  },
  {
    id: "zhidu",
    name: "Zhidu Campus",
    shortAddress: "FHA Lugbe, Abuja",
    address: "King of Peace Hotel\nZhidu, FHA Lugbe\nAbuja",
    // NOTE: Zhidu not yet on Google Maps — using address string until registered
    mapEmbed:
      "https://maps.google.com/maps?q=King+of+Peace+Hotel+Zhidu+FHA+Lugbe+Abuja&t=&z=15&ie=UTF8&iwloc=&output=embed",
    mapLink: "https://www.google.com/maps/search/?api=1&query=King+of+Peace+Hotel+Zhidu+FHA+Lugbe+Abuja",
    phone: "+234 701 914 5771 / +234 814 629 0513",
    email: "teliosisworldoutreach@gmail.com",
    serviceTimes: [
      { day: "Sunday", time: "8:00 AM" },
      { day: "Tuesday", time: "6:00 PM" },
      { day: "Friday", time: "6:00 PM" },
    ],
  },
];

const LocationDetails = () => {
  // City campus selected by default
  const [activeCampusId, setActiveCampusId] = useState("city");

  const campus = CAMPUSES.find((c) => c.id === activeCampusId) ?? CAMPUSES[0];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="layout-container">
        {/* ── Campus Selector Boxes ── */}
        <div className="mb-10">
          <h2 className="text-heading-md text-dark mb-6">Our Campuses</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {CAMPUSES.map((c) => {
              const isActive = c.id === activeCampusId;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCampusId(c.id)}
                  className={cn(
                    "group flex flex-col items-start gap-2 rounded-[1.5rem] border p-6 text-left transition-all duration-300",
                    isActive
                      ? "border-danger-500 bg-danger-500 shadow-danger-500/20 text-white shadow-lg"
                      : "hover:border-danger-500/40 border-gray-100 bg-gray-50 hover:bg-gray-100"
                  )}
                >
                  <div className="flex w-full items-center justify-between">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300",
                        isActive ? "bg-white/20" : "bg-danger-100 group-hover:bg-danger-500/10"
                      )}
                    >
                      <MapPin size={16} className={isActive ? "text-white" : "text-danger-500"} />
                    </div>
                    {isActive && (
                      <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold tracking-widest text-white uppercase">
                        Selected
                      </span>
                    )}
                  </div>

                  <div>
                    <p
                      className={cn(
                        "text-base font-bold transition-colors duration-300",
                        isActive ? "text-white" : "text-dark"
                      )}
                    >
                      {c.name}
                    </p>
                    <p
                      className={cn(
                        "mt-0.5 text-xs transition-colors duration-300",
                        isActive ? "text-white/70" : "text-muted"
                      )}
                    >
                      {c.shortAddress}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Campus Details + Map ── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-10 lg:gap-10 xl:gap-14">
          {/* Info Cards */}
          <div className="flex flex-col gap-4 lg:col-span-3">
            <h3 className="text-heading-sm text-dark mb-2">{campus.name}</h3>

            {/* Address */}
            <div className="flex items-start gap-4 rounded-[1.5rem] border border-gray-100 bg-gray-50 p-6 transition-colors hover:bg-gray-100">
              <div className="bg-danger-100 text-danger-500 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="text-dark mb-1 text-base font-bold">Address</h4>
                <p className="text-body-sm text-muted whitespace-pre-line">{campus.address}</p>
                <a
                  href={campus.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-danger-500 hover:text-danger-500/80 mt-3 inline-flex items-center text-xs font-bold"
                >
                  Open in Google Maps
                  <ExternalLink className="ml-1 size-3" />
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-start gap-4 rounded-[1.5rem] border border-gray-100 bg-gray-50 p-6 transition-colors hover:bg-gray-100">
              <div className="bg-danger-100 text-danger-500 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="text-dark mb-1 text-base font-bold">Contact</h4>
                <a
                  href={`tel:${campus.phone.split("/")[0].trim().replace(/\s/g, "")}`}
                  className="text-body-sm text-muted hover:text-danger-500 block transition-colors"
                >
                  {campus.phone}
                </a>
                <a
                  href={`mailto:${campus.email}`}
                  className="text-body-sm text-muted hover:text-danger-500 mt-1 flex items-center gap-1 transition-colors"
                >
                  <Mail size={12} />
                  {campus.email}
                </a>
              </div>
            </div>

            {/* Service Times */}
            <div className="flex items-start gap-4 rounded-[1.5rem] border border-gray-100 bg-gray-50 p-6 transition-colors hover:bg-gray-100">
              <div className="bg-danger-100 text-danger-500 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <Clock size={20} />
              </div>
              <div>
                <h4 className="text-dark mb-2 text-base font-bold">Service Times</h4>
                <ul className="flex flex-col gap-2">
                  {campus.serviceTimes.map((s) => (
                    <li key={s.day} className="flex items-center justify-between gap-4">
                      <span className="text-body-sm text-dark font-semibold">{s.day}</span>
                      <span className="text-body-sm text-muted">{s.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Map — key prop forces iframe remount on campus switch for correct pin */}
          <div className="h-[400px] w-full overflow-hidden rounded-3xl border border-gray-200 shadow-sm lg:col-span-7 lg:h-auto lg:min-h-[600px]">
            <iframe
              key={campus.id}
              title={`${campus.name} Map`}
              src={campus.mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="contrast-[1.1] grayscale-[0.2] filter transition-all hover:filter-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationDetails;
