import Image from "next/image";
import { ArrowRight, CheckCircle2, Leaf, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative w-full z-0 bg-[#E6F4F6] py-8 md:py-12 px-6 md:px-16 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-5 lg:pr-10 order-1">
            <Badge className="w-fit border-none bg-white px-3 py-2 text-[10px] font-medium text-gray-500 shadow-sm uppercase tracking-widest">
               Comfort. Care. Confidence
            </Badge>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold leading-[1.2] text-[#2C5F63] lg:text-5xl xl:text-5xl">
              Embrace Your <br />
              <span className="text-[#1A8D91]">Naturals Wellness</span>
            </h1>

            <p className="max-w-md text-sm leading-relaxed text-gray-500/90 px-2 lg:px-0">
              Safe, sustainable, and dermatologically tested feminine hygiene
              products designed for your comfort and confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto">
              <Link href="/shop">
              <Button className="max-w-5xl sm:min-w-[160px] rounded-full bg-gradient-to-r from-[#168BA0] to-[#AFE7F1] px-10 py-6 text-sm font-semibold text-white transition-all hover:scale-105 shadow-md">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button></Link>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-6 pt-6 md:pt-4 text-[11px] md:text-[10px] font-semibold text-[#1A8D91] opacity-80">
              <span className="flex flex-col items-center md:flex-row md:gap-1.5">
                <CheckCircle2 className="h-6 w-6 md:h-3.5 md:w-3.5 mb-1 md:mb-0" />
                <span className="whitespace-nowrap">Derm Tested</span>
              </span>
              <span className="flex flex-col items-center md:flex-row md:gap-1.5">
                <Leaf className="h-6 w-6 md:h-3.5 md:w-3.5 mb-1 md:mb-0" />
                <span className="whitespace-nowrap">Eco-Friendly</span>
              </span>
              <span className="flex flex-col items-center md:flex-row md:gap-1.5">
                <Heart className="h-6 w-6 md:h-3.5 md:w-3.5 mb-1 md:mb-0" />
                <span className="whitespace-nowrap">Rash-Free</span>
              </span>
            </div>
          </div>
          <div className="relative flex items-center justify-center order-2 mt-12 lg:mt-0">
            <div className="absolute hidden md:block top-1/2 left-1/2 -z-[1] w-[130%] lg:w-[115%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40">
              <Image
                src="/heroSectionBgLayer.png"
                alt=""
                width={1200}
                height={1200}
                className="object-contain"
                priority
              />
            </div>
            <div className="relative z-10 w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[440px] overflow-hidden rounded-[30px] md:rounded-[40px] border-[10px] border-white">
              <Image
                src="/mainProduct.png"
                alt="Product"
                width={440}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -right-2 -top-6 lg:top-auto lg:-bottom-3 lg:left-[-40px] lg:right-auto z-20">
              <FloatingCard
                icon={<Leaf className="h-4 w-4" />}
                text="50K+"
                subtext="Happy Customers"
              />
            </div>
            <div className="absolute -left-2 -bottom-6 lg:bottom-auto lg:-top-3 lg:-right-10 lg:left-auto z-20">
              <FloatingCard
                icon={<Heart className="h-4 w-4" />}
                text="100% Organic"
                subtext="Certified Material"
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
    <div className="flex items-center gap-2.5 rounded-xl bg-white/95 backdrop-blur-sm p-2 md:p-3 shadow- border border-white/50 w-fit md:w-[155px]">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#D1E9EC] text-[#1A8D91]">
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] md:text-[11px] font-bold text-gray-800 whitespace-nowrap">
          {text}
        </span>
        <span className="text-[8px] md:text-[9px] text-[#1A8D91] font-medium leading-tight">
          {subtext}
        </span>
      </div>
    </div>
  );
}
