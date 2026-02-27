// components/sections/testimonials.tsx
import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ashley Cooper",
    location: "Mumbai",
    avatar: "/avtar.png",
    rating: 5,
    text: '"Finally found pads that don\'t cause any irritation! The organic cotton makes such a difference. I\'ve been using Potent Hygiene for 6 months now and I\'m never going back."',
    product: "Organic Cotton Pads",
  },
  // Aap yahan different testimonials add kar sakte hain
];

export function Testimonials() {
  // Demo ke liye 6 items
  const displayTestimonials = Array(6).fill(testimonials[0]);

  return (
    <section className="py-12 md:py-20 md:bg-[#F8F6F1] overflow-hidden">
      <div className="container mx-auto px-4 md:px-16">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
            What Our Customers Say
          </h2>
          <p className="max-w-2xl mx-auto text-[13px] md:text-sm text-gray-500 leading-relaxed px-4">
            Join thousands of happy customers who have made the switch to healthier feminine care.
          </p>
        </div>

        {/* --- X-SCROLL GRID --- */}
        {/* Mobile: flex-row overflow | Laptop: 3-column grid */}
        <div className="flex overflow-x-auto pb-8 gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 no-scrollbar snap-x snap-mandatory">
          {displayTestimonials.map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-6 md:p-8 rounded-[28px] md:rounded-[32px] shadow-sm border border-gray-100 flex flex-col justify-between transition-all hover:shadow-md min-w-[300px] md:min-w-0 snap-start"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex gap-1 mb-5 md:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 md:h-5 md:w-5 ${i < item.rating ? "fill-[#1A8D91] text-[#1A8D91]" : "text-gray-200"}`} 
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-[13px] md:text-sm leading-relaxed text-gray-600 mb-4 italic">
                  {item.text}
                </p>

                {/* Purchased Link */}
                <div className="text-[11px] md:text-xs font-medium text-[#1A8D91] mb-8">
                  Purchased: <span className="underline cursor-pointer">{item.product}</span>
                </div>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-4 border-t pt-5 md:pt-6 border-gray-50">
                <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full bg-gray-100">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="object-cover grayscale"
                  />
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-gray-900">{item.name}</h4>
                  <p className="text-[10px] md:text-xs text-gray-400">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}