// components/sections/our-story.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function OurStory() {
  return (
    <section className="py-10 bg-[#FDFCF9]">
      <div className="container mx-auto px-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          
          {/* Left Side: Image with Decorative Background */}
          <div className="relative">
            {/* The soft pink background shape */}
            <div className="absolute inset-0 -rotate-3 rounded-[40px] bg-[#F5E6E8] lg:scale-105" />
            
            {/* The main image */}
            <div className="relative z-10 overflow-hidden rounded-[30px] shadow-sm">
              <Image 
                src="/ourStory.png" // Export the yoga woman image
                alt="Woman practicing yoga"
                width={600}
                height={450}
                className="w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="flex flex-col space-y-6">
            <div className="inline-block w-fit rounded-full border border-[#1A8D91] px-4 py-1 text-xs font-medium text-[#1A8D91]">
              Our Story
            </div>
            
            <h2 className="text-4xl font-serif font-bold leading-tight text-gray-900 lg:text-5xl">
              Built for Women, <br />
              <span className="text-[#1A8D91]">By Women</span>
            </h2>

            <div className="space-y-4 text-sm leading-relaxed text-gray-500">
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

            <div className="pt-4">
              <Button className="rounded-full bg-gradient-to-r from-[#1A8D91] to-[#7ED4DB] px-10 py-6 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105">
                Read Our Full Story
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}