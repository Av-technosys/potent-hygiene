import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const AboutStory = () => {
  return (
    <section className="py-12 md:py-16 md:bg-[#F8F6F1] overflow-hidden">
      <div className="container mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          <div className="flex flex-col space-y-6 order-1">
            <div className="inline-block w-fit rounded-full border border-[#1A8D91] px-5 py-1.5 text-[10px] md:text-xs font-semibold text-[#1A8D91] bg-[#E6F4F6]/30 uppercase tracking-wider">
              About Us
            </div>
            <h2 className="md:text-4xl text-3xl font-serif font-bold text-[#333333]">
              Wellness for Women, <br className="hidden md:block" />
              <span className="text-[#168BA0] italic font-medium">
                Designed by Women
              </span>
            </h2>
            <div className="space-y-5 max-w-2xl mx-auto text-sm text-black/50 leading-relaxed">
              <p>
                Potent Hygiene was born from a simple belief — every woman
                deserves access to safe, comfortable, and sustainable menstrual
                care. We witnessed the challenges women face with traditional
                products and set out to create something better.
              </p>
              <p>
                Today, we&apos;re proud to offer a complete range of organic,
                dermatologically tested products that prioritize your health and
                the planet. Our journey is just beginning, and we&apos;re
                grateful to have you with us.
              </p>
            </div>
            <div className="pt-4">
              <Button className="w-full md:w-auto rounded-full bg-linear-to-r from-[#168BA0] to-[#AFE7F1] px-12 py-7 text-sm font-bold text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Read Our Full Story
              </Button>
            </div>
          </div>
          <div className="relative order-2 flex justify-center lg:justify-end items-end h-full">
            <div className="relative w-full max-w-125 aspect-[4/5] lg:aspect-square">
              <Image
                src="/girls.png"
                alt="Founders of Potent Hygiene"
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>
            <div className="absolute -bottom-10 right-0 -z-10 w-64 h-64 bg-[#E6F4F6] rounded-full blur-3xl opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
