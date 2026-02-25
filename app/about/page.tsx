import AboutHero from "./_components/AboutHero";
import MissionVisionSection from "./_components/MissionVisionSection";
import JourneySection from "./_components/JourneySection";
import LeadershipSection from "./_components/LeadershipSection";
import ImpactSection from "./_components/ImpactSection";
import CTASection from "./_components/CTASection";

export function generateMetadata() {
  return {
    title: "About Us – Teliosis World Outreach",
    description:
      "Learn about our mission, history, and the journey of Teliosis World Outreach in serving the community.",
    openGraph: {
      title: "About Us – Teliosis World Outreach",
      description:
        "Learn about our mission, history, and the journey of Teliosis World Outreach in serving the community.",
    },
  };
}

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <MissionVisionSection />
      <JourneySection />
      <LeadershipSection />
      <ImpactSection />
      <CTASection />
    </main>
  );
}
