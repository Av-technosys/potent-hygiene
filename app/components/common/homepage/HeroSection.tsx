// components/sections/hero.tsx
import Image from "next/image";
import { ArrowRight, CheckCircle2, Leaf, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative w-full z-0 bg-[#E6F4F6] py-12 px-16  overflow-hidden">
      <div className="container mx-auto px-12">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left Content - Tightened Typography */}
          <div className="flex flex-col space-y-4 lg:pr-10">
            <Badge className="w-fit border-none bg-white px-3 py-1 text-[10px] font-medium text-gray-500 shadow-sm uppercase tracking-widest">
              ✨ Comfort. Care. Confidence
            </Badge>

            <h1 className="text-4xl font-serif font-bold leading-[1.15] text-[#2C5F63] lg:text-5xl xl:text-6xl">
              Embrace Your <br />
              <span className="text-[#1A8D91]">Naturals Wellness</span>
            </h1>

            <p className="max-w-md text-sm leading-relaxed text-gray-500/90">
              Safe, sustainable, and dermatologically tested feminine hygiene
              products designed for your comfort and confidence.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              {/* Increased padding from px-7 to px-10 to give it more "heft" */}
              <Button className="min-w-[160px] rounded-full bg-gradient-to-r from-[#1A8D91] to-[#7ED4DB] px-10 py-6 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg active:scale-95">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                className="min-w-[160px] rounded-full border-[#1A8D91] px-8 py-6 text-sm font-semibold text-[#1A8D91] hover:bg-[#D1E9EC] transition-all active:scale-95"
              >
                Explore Collection
              </Button>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-4 text-[10px] font-semibold text-[#1A8D91] opacity-80">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" /> Dermatologically Tested
              </span>
              <span className="flex items-center gap-1.5">
                <Leaf className="h-3.5 w-3.5" /> Eco-Friendly
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5" /> Rash-Free Comfort
              </span>
            </div>
          </div>

          {/* Right Image Area - Controlled Proportions */}
          <div className="relative flex items-center justify-center">
            {/* Background Layer - Reduced Scale & Opacity */}
            <div className="absolute top-1/2 left-1/2 -z-[1] w-[115%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40">
              <Image
                src="/heroSectionBgLayer.png"
                alt=""
                width={1200}
                height={1200}
                className="object-contain"
                priority
              />
            </div>

            {/* Main Image - Max width set to prevent "too big" look */}
            <div className="relative z-10 w-full max-w-[380px] lg:max-w-[440px] overflow-hidden rounded-[40px] border-[5px] border-white shadow-xl transition-all duration-500 hover:scale-[1.01]">
              <Image
                src="/mainProduct.png"
                alt="Potent Hygiene Product"
                width={440}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Floating Cards - Minimalist sizing */}
            <div className="absolute -left-4 top-[80%] z-20 hidden lg:flex">
              <FloatingCard
                icon={<Leaf className="h-4 w-4" />}
                text="50K+"
                subtext="Happy Customers"
              />
            </div>

            <div className="absolute -right-2 top-[1%] z-20 hidden lg:block">
              <FloatingCard
                icon={<Heart className="h-4 w-4" />}
                text="100% Organic"
                subtext="Certified Safe"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingCard({
  icon,
  text,
  subtext,
}: {
  icon: React.ReactNode;
  text: string;
  subtext: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-white/95 backdrop-blur-sm p-2.5 shadow-lg border border-white/50 transition-transform duration-300 hover:scale-110 cursor-default">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D1E9EC] text-[#1A8D91]">
        {icon}
      </div>
      <div className="pr-2">
        <div className="text-[11px] font-bold text-gray-800 leading-tight">
          {text}
        </div>
        <div className="text-[9px] text-[#1A8D91] font-medium leading-tight">
          {subtext}
        </div>
      </div>
    </div>
  );
}
