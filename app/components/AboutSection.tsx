"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AboutSection = () => {
  return (
    <section className="bg-light-200 py-24">
      <div className="layout-container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Text Content */}
          <div className="order-1 lg:order-1">
            <h2 className="text-heading-lg text-dark-500 mb-6">
              About <span className="text-danger-500">Us</span>
            </h2>
            <p className="text-muted text-body-lg mb-8 max-w-xl">
              Teliosis World Outreach is a vibrant community of believers committed to spreading the Gospel and making
              disciples of all nations. Our mission is rooted in love, faith, and the transformative power of God&apos;s
              Word.
            </p>
            <p className="text-muted text-body-lg mb-10 max-w-xl">
              We believe in creating an atmosphere where everyone can experience God&apos;s presence, grow in their
              faith, and discover their God-given purpose.
            </p>
            <Button asChild variant="brand" size="xl">
              <Link href="/about">
                Learn More About Us
                <ArrowRight />
              </Link>
            </Button>
          </div>

          {/* Right Column - Image with Floating Card */}
          <div className="relative order-2 lg:order-2">
            <div className="relative">
              <Image
                src="/assets/aboutImage.png"
                alt="About Teliosis World Outreach"
                width={600}
                height={500}
                className="h-auto w-full rounded-2xl object-cover"
              />

              {/* Floating Card */}
              <div className="absolute right-0 -bottom-8 left-4 rounded-xl border border-gray-100 bg-white p-6 shadow-lg sm:right-8 sm:left-8 lg:right-auto lg:-bottom-10 lg:left-[-40px]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-heading-sm text-dark-500">15+ Years</p>
                    <p className="text-muted text-body-sm">Of Faithful Ministry</p>
                  </div>
                  <div className="h-px w-full bg-gray-200 sm:h-12 sm:w-px" />
                  <div>
                    <p className="text-heading-sm text-dark-500">5,000+</p>
                    <p className="text-muted text-body-sm">Community Members</p>
                  </div>
                  <div className="h-px w-full bg-gray-200 sm:h-12 sm:w-px" />
                  <div>
                    <p className="text-heading-sm text-dark-500">100+</p>
                    <p className="text-muted text-body-sm">Global Outreaches</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
