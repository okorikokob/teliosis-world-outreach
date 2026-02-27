import MinistryArms from "./_components/MinistryArms";
import PartnerCTA from "./_components/PartnerCTA";
import PartnerHero from "./_components/PartnerHero";
import PartnershipDetails from "./_components/PartnershipDetails";

export function generateMetadata() {
  return {
    title: "Become a Partner – Teliosis World Outreach",
    description:
      "Join us in expanding God's kingdom globally. Partner with our ministry arms including Nachadava, Storehouse, Radio, and more.",
  };
}

export default function PartnerPage() {
  return (
    <main>
      <PartnerHero />
      <PartnershipDetails />
      <MinistryArms />
      <PartnerCTA />
    </main>
  );
}
