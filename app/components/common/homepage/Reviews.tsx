// components/sections/testimonials.tsx
import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ashley Cooper",
    location: "Mumbai",
    avatar: "/avtar.png", // Ensure you have these placeholder images
    rating: 4,
    text: '"Finally found pads that don\'t cause any irritation! The organic cotton makes such a difference. I\'ve been using Potent Hygiene for 6 months now and I\'m never going back."',
    product: "Organic Cotton Pads",
  },
  // Repeat for 6 items to match your image grid...
];

export function Testimonials() {
  // Creating an array of 6 identical items for the demo based on your image
  const displayTestimonials = Array(6).fill(testimonials[0]);

  return (
    <section className="py-10 bg-[#FDFCF9]">
      <div className="container mx-auto px-16">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-serif font-bold text-gray-900 lg:text-5xl">
            What Our Customers Say
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-gray-500 leading-relaxed">
            Join thousands of happy customers who have made the switch to healthier feminine care.
          </p>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTestimonials.map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-50 flex flex-col justify-between transition-all hover:shadow-md"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < item.rating ? "fill-[#1A8D91] text-[#1A8D91]" : "text-gray-200"}`} 
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-sm leading-relaxed text-gray-600 mb-4">
                  {item.text}
                </p>

                {/* Purchased Link */}
                <div className="text-xs font-medium text-[#1A8D91] mb-8">
                  Purchased: <span className="underline cursor-pointer">{item.product}</span>
                </div>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-4 border-t pt-6 border-gray-100">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="object-cover grayscale"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{item.name}</h4>
                  <p className="text-xs text-gray-400">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}