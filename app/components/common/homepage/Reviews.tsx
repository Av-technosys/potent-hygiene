import Image from "next/image";
import { Star } from "lucide-react";

type Props = {
  title?: string;
  subtitle?: string;
  primaryColor?: string;
  bgColor?: string;
};

const testimonials = [
  {
    id: 1,
    name: "Ashley Cooper",
    location: "Mumbai",
    avatar: "/avtar.png",
    rating: 5,
    text: `"Finally found pads that don't cause any irritation!..."`,
    product: "Organic Cotton Pads",
  },
];

export function Testimonials({
  title = "What Our Customers Say",
  subtitle = "Join thousands of happy customers who have made the switch to healthier feminine care.",
  primaryColor = "#1A8D91",
  bgColor = "#F8F6F1",
}: Props) {
  const displayTestimonials = Array(6).fill(testimonials[0]);

  return (
    <section
      className="py-12 md:py-16 overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <div className="container mx-auto px-4 md:px-16">

        {/* HEADER */}
        <div className="text-center mb-10 md:mb-16 space-y-3">
          <h2 className="md:text-4xl text-3xl font-serif font-bold text-[#333333]">
            {title}
          </h2>

          <p className="max-w-2xl mx-auto text-sm text-black/50 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* CARDS */}
        <div className="flex overflow-x-auto pb-8 gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 no-scrollbar snap-x snap-mandatory">
          {displayTestimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-[28px] md:rounded-md shadow-sm border flex flex-col justify-between min-w-[300px] md:min-w-0 snap-start"
            >
              <div>
                {/* STARS */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < item.rating
                          ? "fill-current"
                          : "text-gray-200"
                      }`}
                      style={{ color: primaryColor }}
                    />
                  ))}
                </div>

                {/* TEXT */}
                <p className="text-sm text-gray-600 mb-4 italic">
                  {item.text}
                </p>

                {/* PRODUCT */}
                <div
                  className="text-xs font-medium mb-4"
                  style={{ color: primaryColor }}
                >
                  Purchased:{" "}
                  <span className="underline cursor-pointer">
                    {item.product}
                  </span>
                </div>
              </div>

              {/* USER */}
              <div className="flex items-center gap-4 border-t pt-5">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="object-cover grayscale"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-900">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {item.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}