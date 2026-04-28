"use client";

const PartnerCTA = () => {
  return (
    <section className="bg-danger-500 py-20 text-center md:py-28">
      <div className="layout-container flex flex-col items-center">
        <h2 className="text-heading-md md:text-heading-lg mb-6 text-white">Have questions about partnership?</h2>

        <p className="text-body-lg mb-10 max-w-2xl text-white/90">
          Our team is available to guide you and help you take the next step in supporting the ministry.
        </p>

        <a
          href="https://wa.me/2347010848004"
          target="_blank"
          rel="noopener noreferrer"
          className="text-danger-500 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-bold hover:bg-gray-50"
        >
          Chat on WhatsApp
        </a>
      </div>
    </section>
  );
};

export default PartnerCTA;
