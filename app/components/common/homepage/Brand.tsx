"use client";

import Image from "next/image";

const brands = [
  { id: 1, name: "Ovy", src: "/ovy.png", href: "/ovy" },
  { id: 2, name: "Looway", src: "/loway.png", href: "/loway" },
  { id: 3, name: "Sanitrip", src: "/sanitrio.png", href: "/sanitrip" },
];
export function BrandAccordion() {
  return (
    <section className="py-12 bg-[#F8F6F1]">
      <div className="container mx-auto px-4 md:px-12">
        {/* Heading */}
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#333]">
            Our Brands
          </h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-black/60">
            Discover our range of brands for premium feminine hygiene products,
            thoughtfully crafted for your comfort and wellness.
          </p>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-3 md:flex md:flex-wrap md:justify-center gap-8 md:gap-16">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              className="flex flex-col items-center group cursor-pointer"
            >
              {/* Circle */}
              <div className="relative w-28 h-28 md:w-56 md:h-56 rounded-full overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105">
                {/* Background */}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
