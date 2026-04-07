import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  title: string;
  primaryColor: string;
};

const features = [
  {
    title: "100% safe & Dermatologically Tested",
    description:
      "Dermatologically tested products that meet the highest safety standards for your peace of mind.",
  },
  {
    title: "Eco-Friendly Packaging",
    description:
      "Biodegradable and recyclable packaging designed to minimize environmental impact.",
  },
  {
    title: "Sustainable Hygiene Solutions",
    description:
      "Eco-friendly materials and packaging that care for you and the planet we call home.",
  },
  {
    title: "Designed for Comfort",
    description:
      "Soft, breathable materials designed specifically for sensitive skin and maximum comfort.",
  },
  {
    title: "Designed for Comfort",
    description:
      "Soft, breathable materials designed specifically for sensitive skin and maximum comfort.",
  },
];

export function BrandWhyChoose({ title, primaryColor }: Props) {
  return (
    <section className="py-12 md:py-16 text-center">

      {/* TITLE */}
      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-10">
        {title}
      </h2>

      {/* 🔥 CAROUSEL (ALL DEVICES) */}
      <div className="px-4 md:px-16">
        <Carousel>
          <CarouselContent>
            {features.map((feature, i) => (
              <CarouselItem
                key={i}
                className="
                  basis-[85%] 
                  sm:basis-[60%] 
                  md:basis-[45%] 
                  lg:basis-[30%]
                "
              >
                <div className="bg-white p-6 rounded-xl shadow-sm border h-full">

                  <div
                    className="w-10 h-10 mb-4 flex items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${primaryColor}20` }}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: primaryColor }}
                    />
                  </div>

                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {feature.description}
                  </p>

                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Controls */}
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

    </section>
  );
}