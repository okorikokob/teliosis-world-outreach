"use client";

import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const LocationDetails = () => {
  // We encode the address so it can be passed into the Google Maps URLs safely
  const mapQuery = "Teliosis+Tudunwada+Campus,+Sauka+Road,+Tudunwada+FHA+Lugbe,+Abuja";

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="layout-container">
        {/* The 10-column grid for the exact 30/70 split */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-10 lg:gap-10 xl:gap-14">
          {/* LEFT COLUMN: Info Cards (30%) */}
          <div className="flex flex-col gap-4 lg:col-span-3">
            <h2 className="text-heading-md text-dark mb-4">Location Details</h2>

            {/* UPDATED ADDRESS CARD */}
            <div className="flex items-start gap-4 rounded-[1.5rem] border border-gray-100 bg-gray-50 p-6 transition-colors hover:bg-gray-100">
              <div className="bg-danger-100 text-danger-500 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="text-dark mb-1 text-base font-bold">Address</h3>
                <p className="text-body-sm text-muted">
                  Teliosis Tudunwada Campus
                  <br />
                  After Catholic Church, Sauka Road
                  <br />
                  Tudunwada FHA Lugbe, Abuja.
                </p>
                {/* Dynamically links to the Google Maps search for this address */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-danger-500 hover:text-danger-500/80 mt-3 inline-flex items-center text-xs font-bold"
                >
                  Open in Google Maps <ExternalLink className="ml-1 size-3" />
                </a>
              </div>
            </div>

            {/* Contact Card */}
            <div className="flex items-start gap-4 rounded-[1.5rem] border border-gray-100 bg-gray-50 p-6 transition-colors hover:bg-gray-100">
              <div className="bg-danger-100 text-danger-500 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="text-dark mb-1 text-base font-bold">Contact</h3>
                <p className="text-body-sm text-muted">
                  (555) 123-4567
                  <br />
                  hello@teliosis.org
                </p>
              </div>
            </div>

            {/* Service Times Card */}
            <div className="flex items-start gap-4 rounded-[1.5rem] border border-gray-100 bg-gray-50 p-6 transition-colors hover:bg-gray-100">
              <div className="bg-danger-100 text-danger-500 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <Clock size={20} />
              </div>
              <div>
                <h3 className="text-dark mb-1 text-base font-bold">Service Times</h3>
                <p className="text-body-sm text-muted">
                  Sunday: 9:00 AM & 11:00 AM
                  <br />
                  Wednesday: 7:00 PM
                </p>
              </div>
            </div>

            {/* First Time Visitor CTA Card */}
            <div className="bg-danger-500 shadow-danger-500/20 mt-4 flex flex-col items-start gap-4 rounded-[1.5rem] p-8 text-white shadow-lg">
              <h3 className="text-lg font-bold">First Time Visitor?</h3>
              <p className="text-sm text-white/90">
                Arrive 15 minutes early and look for our Welcome Team at the main entrance. They'll help you find
                parking and get you settled.
              </p>
              <Button
                variant="secondary"
                className="text-danger-500 mt-2 w-full rounded-full bg-white font-bold hover:bg-gray-50"
              >
                Plan Your Visit
              </Button>
            </div>
          </div>

          {/* RIGHT COLUMN: Map (70%) */}
          <div className="h-[400px] w-full overflow-hidden rounded-3xl border border-gray-200 shadow-sm lg:col-span-7 lg:h-auto lg:min-h-[600px]">
            {/* UPDATED IFRAME: Uses the encoded address to drop a pin right in Lugbe, Abuja */}
            <iframe
              title="Church Location Map"
              src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="contrast-[1.1] grayscale-[0.2] filter transition-all hover:filter-none"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationDetails;
