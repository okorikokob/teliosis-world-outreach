import CampusesHero from "./_components/CampusesHero";
import CampusList from "./_components/CampusList";

export function generateMetadata() {
  return {
    title: "Our Campuses – Teliosis World Outreach",
    description:
      "Teliosis World Outreach has three campuses across Abuja — Wuse, Tudunwada, and Zhidu. Find service times, directions, and contact details for each.",
    openGraph: {
      title: "Our Campuses – Teliosis World Outreach",
      description:
        "Teliosis World Outreach has three campuses across Abuja — Wuse, Tudunwada, and Zhidu. Find service times, directions, and contact details for each.",
    },
  };
}

export default function CampusesPage() {
  return (
    <main>
      <CampusesHero />
      <CampusList />
    </main>
  );
}
