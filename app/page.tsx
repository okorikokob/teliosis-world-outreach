import Hero from "./_components/Hero";
import AboutSection from "./_components/AboutSection";
import DevotionalSection from "./_components/DevotionalSection";
import NewHereSection from "./_components/NewHereSection";

import TeliosisSection from "./_components/TeliosisSchoolSection";
import { getAllDevotionals, getFeaturedDevotional } from "@/lib/sanity.queries";
import Marquee from "./_components/Marque";
import TestimoniesSection from "./_components/TestimoniesSection";
import PartnerSection from "./_components/PartnerSection";

const devotionals = await getAllDevotionals();
const featuredDevotional = await getFeaturedDevotional();

const Page = () => {
  return (
    <div>
      <Hero />
      {/* <Marquee text="SUNDAY SERVICE: 8:00 AM & 10:00 AM • WEDNESDAY: 6:00 PM • THURSDAY: 6:00 PM • " /> */}
      <AboutSection />
      <DevotionalSection devotionals={devotionals} featuredDevotional={featuredDevotional} />
      <NewHereSection />

      <TeliosisSection />
      <TestimoniesSection />
      <PartnerSection />
    </div>
  );
};

export default Page;
