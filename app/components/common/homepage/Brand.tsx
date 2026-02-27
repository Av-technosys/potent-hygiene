"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const brands = [
  { id: 1, name: "Ovy", src: "/ovy.png" },
  { id: 2, name: "LooWay", src: "/loway.png" },
  { id: 3, name: "SaniTrip", src: "/sanitrio.png" },
];

export function BrandAccordion() {
  // Changed: Initial state is null so all start at equal width
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-10 bg-[#FDFCF9]">
      <div className="container mx-auto px-16">
        
        <div className="text-center mb-8 space-y-2">
          <h2 className="text-3xl font-serif font-bold text-[#2C5F63]">Our Brands</h2>
          <p className="max-w-xl mx-auto text-xs text-gray-500">
            Premium feminine hygiene products, crafted for your comfort.
          </p>
        </div>

        <div 
          className="flex flex-col lg:flex-row h-[350px] w-full gap-0 overflow-hidden rounded-2xl shadow-lg border border-gray-100"
          // Reset when mouse leaves the entire section
          onMouseLeave={() => setHoveredId(null)}
        >
          {brands.map((brand) => (
            <div
              key={brand.id}
              onMouseEnter={() => setHoveredId(brand.id)}
              className={cn(
                "relative h-full transition-all duration-500 ease-in-out cursor-pointer overflow-hidden flex-1",
                // Only expands if a specific ID is hovered, otherwise stays flex-1
                hoveredId === brand.id ? "lg:flex-[1.5]" : "lg:flex-1"
              )}
            >
              <Image
                src={brand.src}
                alt={brand.name}
                fill
                className="object-cover transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              
              {/* Subtle darkening: only active when something else is being hovered */}
              <div className={cn(
                "absolute inset-0 bg-black/10 transition-opacity duration-300",
                hoveredId === null || hoveredId === brand.id ? "opacity-0" : "opacity-100"
              )} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}