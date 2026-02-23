import { Hero, AboutSection, DevotionalSection, NewHereSection } from "./components";
import TeliosisSection from "./components/TeliosisSchoolSection";

const Page = () => {
  return (
    <div>
      <Hero />
      <AboutSection />
      <DevotionalSection />
      <NewHereSection />
      <TeliosisSection />
    </div>
  );
};

export default Page;
