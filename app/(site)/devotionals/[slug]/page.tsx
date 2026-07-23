import { client } from "@/sanity/lib/client";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ShareButton from "./_components/ShareButton";

const DEVOTIONAL_QUERY = `*[_type == "devotional" && slug.current == $slug][0]{
  title,
  slug,
  publishedAt,
  scripture,
  verseText,
  content,
  confession,
  pray,
  meditationScripture,
  meditationText,
  readTime,
  excerpt,
  "imageUrl": coverImage.asset->url,
  topics
}`;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const devotional = await client.fetch(
    `*[_type == "devotional" && slug.current == $slug][0]{
      title,
      excerpt,
      "imageUrl": coverImage.asset->url
    }`,
    { slug }
  );

  if (!devotional) {
    return {
      title: "Devotional Not Found",
      description: "The devotional you are looking for could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = devotional.title;
  const description = devotional.excerpt || "Daily devotional from Teliosis World Outreach.";
  const image = devotional.imageUrl || "/assets/hero-background.png";
  const url = `/devotionals/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

const components: PortableTextComponents = {
  block: {
    blockquote: ({ children }) => (
      <div className="border-danger-500 relative my-12 overflow-hidden rounded-2xl border-l-4 bg-gray-50 px-8 py-10 md:px-12">
        <span className="text-danger-500/10 absolute -top-2 left-4 font-serif text-8xl leading-none select-none">
          “
        </span>
        <div className="relative z-10 text-xl leading-relaxed font-medium text-gray-800 italic md:text-2xl">
          {children}
        </div>
      </div>
    ),
    h2: ({ children }) => <h2 className="mt-16 mb-6 text-3xl font-black text-gray-900">{children}</h2>,
    normal: ({ children }) => <p className="mb-6 text-lg leading-loose text-gray-600">{children}</p>,
  },
};

export default async function DevotionalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const devotional = await client.fetch(DEVOTIONAL_QUERY, { slug });

  if (!devotional) notFound();

  return (
    <main className="min-h-screen bg-white pb-20">
      <header className="bg-dark py-25 text-center text-white">
        <div className="layout-container px-6">
          <p className="text-danger-500 mb-4 text-xs font-bold tracking-widest uppercase">
            {new Date(devotional.publishedAt)
              .toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
              .toUpperCase()}
          </p>
          <h1 className="text-4xl font-black tracking-tight uppercase md:text-6xl">{devotional.title}</h1>
        </div>
      </header>

      <article className="layout-container -mt-8 mb-20 px-6">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-gray-50 bg-white p-8 shadow-2xl md:p-16">
          <div className="mb-6 border-b border-gray-50 pb-6 text-center">
            <span className="mb-4 block text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
              Verse of the Day
            </span>
            <p className="text-lg leading-relaxed font-medium text-gray-600 italic">
              &ldquo;{devotional.verseText}&rdquo;
            </p>
            <p className="text-danger-500 mt-4 font-bold">{devotional.scripture}</p>
          </div>

          <div className="prose prose-lg prose-p:text-gray-600 prose-p:leading-loose mb-6 max-w-none">
            <h3 className="text-dark mb-6 flex items-center gap-4 text-xs font-black tracking-widest uppercase">
              Discussion <div className="h-px flex-1 bg-gray-100" />
            </h3>
            <PortableText value={devotional.content} components={components} />
          </div>

          {devotional.confession && (
            <div className="bg-danger-600 mb-6 transform rounded-[2rem] p-8 shadow-xl transition-transform hover:scale-[1.02] md:p-10">
              <h4 className="mb-4 text-[10px] font-black tracking-[0.2em] uppercase opacity-80">Confession</h4>
              <p className="text-lg leading-relaxed text-gray-600">{devotional.confession}</p>
            </div>
          )}

          {devotional.pray && (
            <div className="bg-danger-600 mb-6 transform rounded-[2rem] p-8 shadow-xl transition-transform hover:scale-[1.02] md:p-10">
              <h4 className="mb-4 text-[10px] font-black tracking-[0.2em] uppercase opacity-80">Prayer</h4>
              <p className="text-lg leading-relaxed text-gray-600">{devotional.pray}</p>
            </div>
          )}

          {devotional.meditationText && (
            <div className="rounded-[2rem] border border-gray-100 bg-gray-50 p-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-danger-500 h-2 w-2 animate-pulse rounded-full" />
                <h4 className="text-xs font-black tracking-widest text-gray-500 uppercase">Meditation</h4>
              </div>
              <p className="text-lg leading-relaxed text-gray-600 italic">
                <strong>{devotional.meditationScripture}</strong> — {devotional.meditationText}
              </p>
            </div>
          )}

          <div className="mt-10 flex justify-center border-t border-gray-50 pt-8">
            <ShareButton
              title={devotional.title}
              slug={devotional.slug.current}
              image={devotional.imageUrl}
              description={devotional.excerpt}
            />
          </div>
        </div>
      </article>
    </main>
  );
}

export const revalidate = 0;
