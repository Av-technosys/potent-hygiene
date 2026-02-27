import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const StoryTruth = () => {
  return (
    <section className="w-full md:bg-[#F8F6F1] py-12 md:py-20 px-4 md:px-16 overflow-hidden">
      <div className="container mx-auto mac-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20">
          
          {/* --- Left Content Section --- */}
          <div className="flex flex-col space-y-4 order-1">
            <Badge 
              variant="outline" 
              className="w-fit border-[#1A8D91] text-[#1A8D91] font-medium rounded-full px-4 py-1.5 bg-[#E6F4F6]"
            >
              Own Your Cycle
            </Badge>

            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#333333] leading-tight">
              The <span className="text-[#1A8D91]">Nakd</span> Truth
            </h2>

            <div className="space-y-2 max-w-xl">
              <p className="text-gray-600 leading-relaxed text-sm md:text-base font-medium">
                Good hygiene is not just about routine — it&apos;s about feeling comfortable, 
                confident, and cared for every single day. At Potent Hygiene, we believe 
                personal care should be simple, honest, and empowering.
              </p>
              
              <p className="hidden md:block text-gray-500 leading-relaxed text-sm md:text-base">
                Our goal is to make hygiene conversations normal and accessible by providing 
                products and information that support everyday well-being. Whether it&apos;s daily 
                freshness, intimate care, or overall hygiene, we focus on solutions that respect 
                your body and your lifestyle.
              </p>

              <p className="hidden md:block text-gray-500 leading-relaxed text-sm md:text-base">
                We encourage awareness, informed choices, and self-care without hesitation or 
                stigma. Because when hygiene becomes effortless, confidence follows naturally.
              </p>
            </div>

            <div className="pt-4">
              <Button className="rounded-full bg-gradient-to-r from-[#1A8D91] to-[#7ED4DB] px-10 py-6 text-sm font-semibold text-white shadow-lg hover:scale-105 transition-all">
                Read Our Full Story
              </Button>
            </div>
          </div>

          {/* --- Right Image Section --- */}
          <div className="relative order-2">
            {/* Image Container with Custom Border Radius */}
            <div className="relative z-10 w-full aspect-[4/5] md:aspect-square overflow-hidden rounded-[2rem] md:rounded-[3rem] ">
              <Image
                src="/thestory.png" // Replace with your actual image path
                alt="Woman holding product"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Subtle decorative background (Optional - to match the vibe) */}
            <div className="absolute -bottom-6 -right-6 -z-10 w-full h-full bg-[#E6F4F6] rounded-[3rem]" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default StoryTruth;