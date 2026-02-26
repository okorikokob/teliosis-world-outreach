import FeaturedVideo from "./_components/FeaturedVideo";
import MediaHero from "./_components/MediaHero";
import RecentSermons from "./_components/RecentSermons";
import MediaCTA from "./_components/MediaCTA";

export function generateMetadata() {
  return {
    title: "Media & Sermons – Teliosis World Outreach",
    description:
      "Access our library of sermons, teachings, and inspirational messages. Listen anytime, anywhere and grow your faith with Teliosis World Outreach.",
    openGraph: {
      title: "Media & Sermons – Teliosis World Outreach",
      description:
        "Access our library of sermons, teachings, and inspirational messages. Listen anytime, anywhere and grow your faith with Teliosis World Outreach.",
    },
  };
}

export default function MediaPage() {
  return (
    <main>
      <MediaHero />
      <RecentSermons />
      <FeaturedVideo />
      <MediaCTA />
    </main>
  );
}
