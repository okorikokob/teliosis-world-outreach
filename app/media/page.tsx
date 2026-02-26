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
      type: "website",
      url: "https://www.teliosis-world-outreach.org/media",
      images: [
        {
          url: "https://www.teliosis-world-outreach.org/assets/media-og.jpg",
          width: 1200,
          height: 630,
          alt: "Teliosis World Outreach Media",
        },
      ],
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
