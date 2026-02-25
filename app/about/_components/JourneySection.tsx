import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const JourneySection = () => {
  return (
    <section className="bg-light-100 relative overflow-hidden py-24">
      <div className="layout-container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Text Content */}
          <div className="order-1">
            <div className="border-danger-500/20 bg-danger-500/10 text-danger-500 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium">
              <Heart className="text-danger-500 h-4 w-4" fill="currentColor" />
              <span className="text-body-sm text-danger-500 font-medium">Our Journey</span>
            </div>

            <h2 className="text-heading-lg text-dark-500 mb-6">A Journey of Faith & Community</h2>

            <p className="text-muted text-body-lg mb-6 max-w-xl">
              Founded in 1999 by Pastor Michael and a small group of believers, FaithChurch began in a living room with
              just 12 people. What started as a simple gathering has grown into a vibrant community.
            </p>

            <p className="text-muted text-body-lg mb-10 max-w-xl">
              Our journey has been marked by God&apos;s faithfulness and the dedication of countless volunteers who have
              poured their hearts into building a place where everyone belongs.
            </p>

            <Button variant="brand" size="xl">
              Read Our Full History
            </Button>
          </div>

          {/* Right Column - Image with Floating Card */}
          <div className="relative order-2">
            <div className="relative">
              <Image
                src="/assets/aboutImage.png"
                alt="Our Journey - Teliosis World Outreach"
                width={600}
                height={500}
                className="h-auto w-full rounded-2xl object-cover"
              />

              {/* Floating Card - Simplified with just years */}
              <div className="absolute right-0 -bottom-8 left-4 rounded-xl border border-gray-100 bg-white p-8 shadow-lg sm:right-8 sm:left-8 lg:right-auto lg:-bottom-10 lg:left-[-40px]">
                <div className="text-center">
                  <p className="text-display-sm text-danger-500 mb-2">25+</p>
                  <p className="text-body-md text-dark-500 font-medium">Years of Ministry</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
