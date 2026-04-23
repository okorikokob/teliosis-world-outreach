import { Button } from "@/components/ui/button";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="layout-container">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-dark-500 mb-6 text-3xl font-semibold tracking-tight sm:text-4xl">Ready to Join Us?</h2>

          <p className="text-muted mb-10 text-base leading-7 sm:text-lg">
            Join us this Sunday and experience the power of God’s Word, prayer, and a community committed to spiritual
            growth.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild variant="brand" size="xl" className="shadow-xl">
              <Link href="/contact">Plan Your Visit</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
