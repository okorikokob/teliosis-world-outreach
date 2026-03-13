import { ArrowRight } from "lucide-react";

const GiveCTA = () => {
  return (
    <section className="py-20 text-center">
      <div className="layout-container max-w-3xl">
        <h2 className="mb-4 text-3xl font-black text-zinc-900 md:text-4xl">Go Beyond Regular Giving</h2>
        <p className="mb-8 text-lg text-gray-600">
          Looking to support our special projects, campus expansions, and ministry arms? Discover how you can partner
          with Teliosis World Outreach to make a global impact.
        </p>
        <a
          href="/partner"
          className="bg-danger-500 hover:bg-danger-600 hover:shadow-danger-500/20 inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white transition-all hover:shadow-lg"
        >
          View Partnership Options
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
};

export default GiveCTA;
