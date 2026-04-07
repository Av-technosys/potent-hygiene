import React from "react";
import { IconTargetArrow, IconEye } from "@tabler/icons-react";

const Vision = () => {
  return (
    <section className="container bg-white py-16">
      <div className="">


        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-neutral-800">
            Our Mission & Vision
          </h2>
          <p className="text-neutral-600 mt-3 text-sm sm:text-base">
            Guiding principles that drive everything we do
          </p>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


          <div className="border border-[#169bb2] rounded-2xl bg-cyan-50 p-6">
            <div className="w-fit bg-[#168ba0] text-white p-4 rounded-xl mb-6">
              <IconTargetArrow size={28} />
            </div>

            <h3 className="text-2xl font-bold text-neutral-800 mb-4">
              Our Mission
            </h3>

            <p className="text-neutral-700 text-base leading-relaxed">
              To provide clean, rash-free, eco-friendly menstrual hygiene
              products that prioritize women's health, comfort, and confidence.

            </p>
          </div>


          <div className="border border-[#d97706] rounded-2xl bg-orange-50 p-6">
            <div className="w-fit bg-[#d97706] text-white p-4 rounded-xl mb-6">
              <IconEye size={28} />
            </div>

            <h3 className="text-2xl font-bold text-neutral-800 mb-4">
              Our Vision
            </h3>

            <p className="text-neutral-700 text-base leading-relaxed">
              To build a healthier, more confident menstrual world where every
              woman has access to safe, sustainable, and comfortable hygiene
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Vision;