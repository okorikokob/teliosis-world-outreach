"use client";

import { Button } from "@/components/ui/button";
import PartnerModal from "./PartnerModal";

const PartnerCTA = () => {
  return (
    <section className="bg-danger-500 py-20 text-center md:py-28">
      <div className="layout-container flex flex-col items-center">
        <h2 className="text-heading-md md:text-heading-lg mb-6 text-white">Join the Movement</h2>

        <p className="text-body-lg mb-10 max-w-2xl text-white/90">
          Your partnership today creates eternal impact tomorrow. Let's reach the world together.
        </p>

        <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          {/* This button triggers our new Modal! */}
          <PartnerModal>
            <Button
              size="xl"
              variant="secondary"
              className="text-danger-500 w-full rounded-full bg-white font-bold hover:bg-gray-50 sm:w-auto"
            >
              Become a Partner
            </Button>
          </PartnerModal>

          {/* <Button
            size="xl"
            className="w-full rounded-full border-2 border-white bg-transparent font-bold text-white hover:bg-white/10 sm:w-auto"
          >
            Schedule a Call
          </Button> */}
        </div>
      </div>
    </section>
  );
};

export default PartnerCTA;
