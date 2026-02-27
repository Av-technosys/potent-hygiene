import React from 'react'
import Image from "next/image";
import { Button } from "@/components/ui/button";

const AboutStory = () => {
  return (
    <section className="py-12 md:py-24 md:bg-[#F8F6F1] overflow-hidden">
      {/* Container with responsive padding */}
      <div className="container mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          
          {/* --- Text Content Section --- */}
          {/* order-1 ensures text stays on top in mobile */}
          <div className="flex flex-col space-y-6 order-1">
            {/* Badge */}
            <div className="inline-block w-fit rounded-full border border-[#1A8D91] px-5 py-1.5 text-[10px] md:text-xs font-semibold text-[#1A8D91] bg-[#E6F4F6]/30 uppercase tracking-wider">
              About Us
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-serif font-bold leading-[1.1] text-gray-900">
              Wellness for Women, <br className="hidden md:block" />
              <span className="text-[#1A8D91] italic font-medium">Designed by Women</span>
            </h2>

            {/* Description Paragraphs */}
            <div className="space-y-5 max-w-xl text-gray-500 text-sm md:text-base leading-relaxed">
              <p>
                Potent Hygiene was born from a simple belief — every woman deserves access 
                to safe, comfortable, and sustainable menstrual care. We witnessed the 
                challenges women face with traditional products and set out to create something 
                better.
              </p>
              <p>
                Today, we&apos;re proud to offer a complete range of organic, dermatologically tested 
                products that prioritize your health and the planet. Our journey is just beginning, 
                and we&apos;re grateful to have you with us.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button className="w-full md:w-auto rounded-full bg-gradient-to-r from-[#1A8D91] to-[#7ED4DB] px-12 py-7 text-sm font-bold text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Read Our Full Story
              </Button>
            </div>
          </div>

          {/* --- Image Section --- */}
          {/* order-2 puts image at the bottom in mobile */}
          <div className="relative order-2 flex justify-center lg:justify-end items-end h-full">
            <div className="relative w-full max-w-[500px] aspect-[4/5] lg:aspect-square">
              <Image
                src="/girls.png" // Is image ko bin-bg (transparent) use karein
                alt="Founders of Potent Hygiene"
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>
            
            {/* Soft decorative background glow (optional, based on the vibe) */}
            <div className="absolute -bottom-10 right-0 -z-10 w-64 h-64 bg-[#E6F4F6] rounded-full blur-3xl opacity-50" />
          </div>

        </div>
      </div>
    </section>
  )
}

export default AboutStory