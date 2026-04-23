import ContactForm from "./_components/ContactForm";
import LocationDetails from "./_components/LocationDetails";
import LocationHero from "./_components/LocationHero";

export function generateMetadata() {
  return {
    title: "Visit Us & Contact – Teliosis World Outreach",
    description:
      "Plan your visit to Teliosis World Outreach. Find our location, service times, directions, parking information, and get in touch with our team.",
    openGraph: {
      title: "Visit Us & Contact – Teliosis World Outreach",
      description:
        "Plan your visit to Teliosis World Outreach. Find our location, service times, directions, parking information, and get in touch with our team.",
    },
  };
}

export default function LocationPage() {
  return (
    <main>
      <LocationHero />
      <LocationDetails />
      <ContactForm />
    </main>
  );
}
