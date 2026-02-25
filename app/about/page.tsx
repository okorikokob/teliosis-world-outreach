import AboutHero from "./_components/AboutHero";
import JourneySection from "./_components/JourneySection";

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
      <JourneySection />
    </main>
  );
}
