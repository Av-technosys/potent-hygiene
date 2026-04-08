import Image from "next/image";
import React from "react";

const AboutBanner = () => {
  return (
    <section className="relative w-full overflow-hidden">


      <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh]">
        <Image
          src="/aboutbanner.png"
          alt="About Potent Hygiene"
          fill
          priority
          className="object-cover"
        />


        <div className="absolute inset-0 bg-black/40" />


        <div className="absolute inset-0 flex items-center justify-center text-center px-4 sm:px-6">
          <div className="text-white space-y-2 sm:space-y-3 z-20">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold">
              About Potent Hygiene
            </h1>

            <p className="text-sm sm:text-base md:text-lg font-normal">
              Redefining feminine care with comfort, safety, and sustainability
            </p>
          </div>
        </div>
      </div>

    </section>
  );
};

export default AboutBanner;