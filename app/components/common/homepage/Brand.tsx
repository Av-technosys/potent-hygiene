"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const brands = [
  { id: 1, name: "Ovy", src: "/ovy.png" },
  { id: 2, name: "Looway", src: "/loway.png" },
  { id: 3, name: "Sanitrip", src: "/sanitrio.png" },
];

export function BrandAccordion() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-10 md:bg-[#F8F6F1">
      <div className="container mx-auto px-4 md:px-16">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl font-serif font-bold text-[#333333]">
            Our Trusted Brands
          </h2>
          <p className="max-w-xl mx-auto text-[11px] md:text-xs text-gray-500">
            Discover our range of brands for premium feminine hygiene products,
            thoughtfully crafted for your comfort and wellness.
          </p>
        </div>
        <div className="flex md:hidden flex-row justify-between items-start gap-2">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex flex-col items-center gap-3 flex-1"
            >
              <div className="relative h-28 w-28 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                <Image
                  src={brand.src}
                  alt={`${brand.name} background`}
                  fill
                  className="object-cover"
                />
                <div className="bg-white px-3 py-1.5 rounded-full shadow-sm w-[85%] ">
                  <span className="">
                    <Image
                      src={brand.src}
                      alt={`${brand.name}`}
                      fill
                      className="object-cover"
                    />
                  </span>
                </div>
              </div>
              <span className="text-[14px] font-serif font-semibold text-[#000000]">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
        <div
          className="hidden md:flex flex-row h-[350px] w-full gap-0 overflow-hidden  shadow-lg border border-gray-100"
          onMouseLeave={() => setHoveredId(null)}
        >
          {brands.map((brand) => (
            <div
              key={brand.id}
              onMouseEnter={() => setHoveredId(brand.id)}
              className={cn(
                "relative h-full transition-all duration-500 ease-in-out cursor-pointer overflow-hidden flex-1",
                hoveredId === brand.id ? "lg:flex-[1.5]" : "lg:flex-1",
              )}
            >
              <Image
                src={brand.src}
                alt={brand.name}
                fill
                className="object-cover transition-transform duration-500"
                sizes="33vw"
              />
              <div
                className={cn(
                  "absolute inset-0 bg-black/10 transition-opacity duration-300",
                  hoveredId === null || hoveredId === brand.id
                    ? "opacity-0"
                    : "opacity-100",
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
