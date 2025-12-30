import HeroSection from './_components/home/HeroSection';
import LatestSermonSection from './_components/home/LatestSermonSection';
import AboutSection from './_components/home/AboutSection';
import WorshipWithUsSection from './_components/home/WorshipWithUsSection';
import UpcomingEventSection from './_components/home/UpcomingEventSection';
import MissionSection from './_components/home/MissionSection';
import GiveCtaSection from './_components/home/GiveCtaSection';
import ContactCtaSection from './_components/home/ContactCtaSection';

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <AboutSection />
  <WorshipWithUsSection />
      <LatestSermonSection />
      <UpcomingEventSection />
      <MissionSection />
      <GiveCtaSection />
      <ContactCtaSection />
    </div>
  );
}
