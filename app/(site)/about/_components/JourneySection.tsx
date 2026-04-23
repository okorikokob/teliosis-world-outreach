import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const JourneySection = () => {
  return (
    <section className="bg-light-100 relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="layout-container">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-1">
            <div className="border-danger-500/20 bg-danger-500/10 text-danger-500 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2">
              <Heart className="text-danger-500 h-4 w-4" fill="currentColor" />
              <span className="text-body-sm font-medium">Our Journey</span>
            </div>

            <h2 className="text-dark-500 mb-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              A journey of discipleship, growth, and transformation
            </h2>

            <div className="max-w-xl space-y-5">
              <p className="text-muted text-base leading-7 sm:text-lg">
                Teliosis World Outreach is a fellowship of maturing saints and a school of discipleship, committed to
                raising people into intimate fellowship with Jesus Christ through the teaching of God’s Word, effectual
                prayer, and practical discipleship.
              </p>

              <p className="text-muted text-base leading-7 sm:text-lg">
                In every Teliosis meeting, lives are transformed through the clear teaching of Scripture, the
                manifestation of the Holy Spirit, and the power of God in action.
              </p>

              <p className="text-muted text-base leading-7 sm:text-lg">
                Through the ministry of Pastor Peter E. Nwoji and the labor of the Teliosis family, believers are built
                up, empowered, and equipped to dominate their world through the Word of God and prayer.
              </p>

              <p className="text-muted text-base leading-7 sm:text-lg">
                Today, Teliosis World Outreach continues to impact lives through campuses and fellowship centres across
                the world, remaining committed to perfecting the saints and discipling nations.
              </p>
            </div>

            {/* <div className="mt-8">
              <Link href="/about/history" className="inline-block">
                <Button variant="brand" size="xl">
                  Read Our Full History
                </Button>
              </Link>
            </div> */}
          </div>

          <div className="relative order-2">
            <div className="relative">
              <Image
                src="/assets/aboutImage.png"
                alt="Teliosis World Outreach gathering"
                width={600}
                height={500}
                className="h-[320px] w-full rounded-2xl object-cover sm:h-[420px] lg:h-[520px]"
              />

              <div className="absolute inset-x-4 -bottom-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-lg sm:inset-x-auto sm:right-6 sm:left-6 sm:p-6 lg:right-auto lg:-bottom-8 lg:-left-8 lg:w-[220px]">
                <div className="text-center lg:text-left">
                  <p className="text-danger-500 mb-1 text-3xl font-semibold sm:text-4xl">8+</p>
                  <p className="text-dark-500 text-sm font-medium sm:text-base">Years of Ministry</p>
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
