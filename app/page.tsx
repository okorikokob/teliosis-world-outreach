import Hero from "./_components/Hero";
import AboutSection from "./_components/AboutSection";
import DevotionalSection from "./_components/DevotionalSection";
import NewHereSection from "./_components/NewHereSection";
import PartnerSection from "./_components/PartnerSection";
import TeliosisSection from "./_components/TeliosisSchoolSection";
import { getAllDevotionals, getFeaturedDevotional } from "@/lib/sanity.queries";

const devotionals = await getAllDevotionals();
const featuredDevotional = await getFeaturedDevotional();

const Page = () => {
  return (
    <div>
      <Hero />
      <AboutSection />
      <DevotionalSection devotionals={devotionals} featuredDevotional={featuredDevotional} />
      <NewHereSection />
      <TeliosisSection />
      <PartnerSection />
    </div>
  );
};

export default Page;
