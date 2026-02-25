import { Flower2 } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/aboutpage-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="layout-container relative flex h-full items-center justify-center">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2 backdrop-blur-sm">
            <Flower2 className="text-danger-500 h-5 w-5" />
            <span className="text-body-md font-medium text-white">Our Story</span>
          </div>

          {/* Heading */}
          <h1 className="text-heading-xl text-light-100 mb-6 max-w-4xl">Transforming Lives Through Faith</h1>

          {/* Description */}
          <p className="text-body-xl max-w-3xl text-white/90">
            For over 25 years, we've been a beacon of hope and love in our community, dedicated to helping people
            discover their purpose.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
