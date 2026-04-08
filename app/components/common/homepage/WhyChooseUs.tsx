// components/sections/why-choose-us.tsx
import { ShieldCheck, Leaf, Globe, Heart, Droplets, Award } from "lucide-react";

const features = [
  {
    title: "100% safe & Dermatologically Tested",
    description:
      "Dermatologically tested products that meet the highest safety standards for your peace of mind.",
    icon: <ShieldCheck className="h-6 w-6 text-white" />,
  },
  {
    title: "Eco-Friendly Packaging",
    description:
      "Biodegradable and recyclable packaging designed to minimize environmental impact.",
    icon: <Leaf className="h-6 w-6 text-white" />,
  },
  {
    title: "Sustainable Hygiene Solutions",
    description:
      "Eco-friendly materials and packaging that care for you and the planet we call home.",
    icon: <Globe className="h-6 w-6 text-white" />,
  },
  {
    title: "Designed for Comfort & Care",
    description:
      "Soft, breathable materials designed specifically for sensitive skin and maximum comfort.",
    icon: <Heart className="h-6 w-6 text-white" />,
  },
  {
    title: "High Absorbency Quality",
    description:
      "Advanced absorption technology provides superior protection and all-day comfort.",
    icon: <Droplets className="h-6 w-6 text-white" />,
  },
  {
    title: "Certified Organic Materials",
    description:
      "Made with certified organic cotton and natural materials free from harmful chemicals.",
    icon: <Award className="h-6 w-6 text-white" />,
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-12 md:py-8 md:bg-[#F8F6F1] overflow-hidden">
      {/* Mobile: px-4 | Laptop: px-16 */}
      <div className="container mx-auto px-4 md:px-16">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
          <h3 className="md:text-4xl text-3xl font-serif font-bold text-[#333333]">
            Why Choose Potent Hygiene?
          </h3>
          <p className="max-w-2xl mx-auto text-sm text-black/50 leading-relaxed px-2">
            We are committed to providing products that care for you and the
            planet. Here is what makes us different.
          </p>
        </div>

        {/* --- X-SCROLL GRID --- */}
        {/* Mobile: flex-row with overflow | Laptop: 3-column grid */}
        <div
          className="
  flex overflow-x-auto gap-4 pb-8
  no-scrollbar snap-x snap-mandatory
"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="
        bg-white p-6 md:p-8 rounded-[28px] md:rounded-[32px]
        shadow-sm border border-gray-50 transition-all hover:shadow-md group
        
       w-[75%] sm:w-[60%] md:w-[45%] lg:w-[30%]
        flex-shrink-0 snap-start                        
      "
            >
              {/* Icon */}
              <div className="mb-5 md:mb-6 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl md:rounded-2xl bg-linear-to-br from-[#168BA0] to-[#AFE7F1] shadow-inner group-hover:rotate-6 transition-transform">
                {feature.icon}
              </div>

              {/* Text */}
              <h3 className="mb-2 md:mb-3 text-lg md:text-xl font-bold text-gray-900 font-serif leading-tight">
                {feature.title}
              </h3>

              <p className="text-[13px] md:text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
