import { Button } from "@/components/ui/button";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="bg-white py-24">
      <div className="layout-container">
        <div className="mx-auto max-w-4xl text-center">
          {/* Heading */}
          <h2 className="text-heading-lg text-dark-500 mb-6">Ready to Be Part of Our Story?</h2>

          {/* Description */}
          <p className="text-body-lg text-muted mb-10">
            Join us this Sunday and experience what it means to be part of a loving, faith-filled community.
          </p>

          {/* Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild variant="brand" size="xl" className="shadow-xl">
              <Link href="/visit">Plan Your Visit</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="text-dark-500 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <Link href="#journey">Learn Our History</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
