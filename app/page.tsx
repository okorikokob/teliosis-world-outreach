import { Hero, AboutSection, DevotionalSection, NewHereSection } from "./components";
import PartnerSection from "./components/PartnerSection";
import TeliosisSection from "./components/TeliosisSchoolSection";

const Page = () => {
  return (
    <div>
      <Hero />
      <AboutSection />
      <DevotionalSection />
      <NewHereSection />
      <TeliosisSection />
      <PartnerSection />
    </div>
  );
};

export default Page;
