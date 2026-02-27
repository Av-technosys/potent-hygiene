// components/sections/our-story.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function OurStory() {
  return (
    <section className="py-12 md:py-20 md:bg-[#F8F6F1]">
      {/* Mobile: px-4 | Laptop: px-16 */}
      <div className="container mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
          
          {/* Image Section: Mobile par bottom (order-2) | Laptop par left (lg:order-1) */}
          <div className="relative order-2 lg:order-1">
            {/* The soft blue decorative background shape (Laptop only hidden on mobile if needed) */}
            <div className="absolute inset-0 -rotate-2 rounded-[40px] bg-[#E9F1F3] lg:scale-105" />
            
            {/* The main yoga woman image */}
            <div className="relative z-10 overflow-hidden rounded-[24px] md:rounded-[30px] shadow-sm">
              <Image 
                src="/ourStory.png" 
                alt="Woman practicing yoga"
                width={600}
                height={500}
                className="w-full object-cover aspect-[4/3] md:aspect-square lg:aspect-[4/3]"
              />
            </div>
          </div>

          {/* Content Section: Mobile par top (order-1) | Laptop par right (lg:order-2) */}
          <div className="flex flex-col space-y-5 md:space-y-6 order-1 lg:order-2">
            {/* Badge */}
            <div className="inline-block w-fit rounded-full border border-[#1A8D91] px-4 py-1.5 text-[10px] md:text-xs font-medium text-[#1A8D91] bg-[#E6F4F6]/50">
              Our Story
            </div>
            
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight text-gray-900">
              Built for Women, <br className="hidden md:block" />
              <span className="text-[#1A8D91]">By Women</span>
            </h2>

            {/* Description */}
            <div className="space-y-4 text-xs md:text-sm leading-relaxed text-gray-500">
              <p>
                Potent Hygiene was born from a simple belief — every woman deserves access 
                to safe, comfortable, and sustainable menstrual care. We witnessed the 
                challenges women face with traditional products and set out to create something 
                better.
              </p>
              <p>
                Today, we are proud to offer a complete range of organic, dermatologically tested 
                products that prioritize your health and the planet. Our journey is just beginning, 
                and we are grateful to have you with us.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-2 md:pt-4">
              <Button className="w-full md:w-fit rounded-full bg-gradient-to-r from-[#1A8D91] to-[#7ED4DB] px-10 py-6 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95">
                Read Our Full Story
              </Button>
            </div>
          </div>

        </div>
      </div>

      {/* Ticker (Blue Strip at the bottom of the section as seen in the screenshot) */}
      <div className="mt-16 w-full bg-[#168BA0] py-3 overflow-hidden">
        <div className="whitespace-nowrap flex gap-10 animate-marquee">
           {[...Array(5)].map((_, i) => (
             <span key={i} className="text-white text-sm md:text-base font-medium">
               Potent Hygiene - Where Your Wellness Comes First
             </span>
           ))}
        </div>
      </div>
    </section>
  );
}