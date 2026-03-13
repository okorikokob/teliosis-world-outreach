import GiveCTA from "./_components/GiveCTA";
import GiveHero from "./_components/GiveHero";
import GiveSection from "./_components/GiveSection";

export function generateMetadata() {
  return {
    title: "Give – Teliosis World Outreach",
    description: "Your generosity fuels our mission; every gift makes an eternal difference.",
  };
}

export default function GivePage() {
  return (
    <main>
      <GiveHero />
      <GiveSection />
      <GiveCTA />
    </main>
  );
}
