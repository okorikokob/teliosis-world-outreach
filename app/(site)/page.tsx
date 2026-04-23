import { getAllDevotionals, getFeaturedDevotional } from "@/lib/sanity.queries";
import AboutSection from "../_components/AboutSection";
import DevotionalSection from "../_components/DevotionalSection";
import Hero from "../_components/Hero";
import NewHereSection from "../_components/NewHereSection";
import PartnerSection from "../_components/PartnerSection";
import TeliosisSection from "../_components/TeliosisSchoolSection";

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

      <PartnerSection />
    </div>
  );
};

export default Page;
