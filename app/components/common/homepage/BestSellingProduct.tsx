// components/sections/bestselling-products.tsx
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    title: "Ultra Soft Sanitary Pads",
    image: "/product.png",
    price: 299,
    originalPrice: 399,
    rating: 4,
    reviews: "1.4k",
    tag: "Bestseller",
    tagColor: "bg-[#00D1C1]",
  },
  {
    title: "Reusable Menstrual Cup",
    image: "/product.png",
    price: 299,
    originalPrice: 399,
    rating: 4,
    reviews: "1.4k",
    tag: "Eco friendly",
    tagColor: "bg-[#00D1C1]",
  },
  {
    title: "Daily Comfort Pantyliners",
    image: "/product.png",
    price: 299,
    originalPrice: 399,
    rating: 4,
    reviews: "1.4k",
    tag: "Popular",
    tagColor: "bg-[#00D1C1]",
  },
  {
    title: "Complete Care Bundle",
    image: "/product.png",
    price: 299,
    originalPrice: 399,
    rating: 4,
    reviews: "1.4k",
    tag: "Best Value",
    tagColor: "bg-[#00D1C1]",
  },
];

export function BestsellingProducts() {
  return (
    <section className="py-10 bg-[#FDFCF9]">
      <div className="container mx-auto px-16">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl font-serif font-bold text-[#2C5F63]">Bestselling Products</h2>
          <p className="max-w-2xl mx-auto text-sm text-gray-500">
            Loved by thousands of women. Our most popular products for comfort, care, and confidence.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => {
            const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            
            return (
              <div key={index} className="group relative flex flex-col rounded-[24px] bg-white p-3 shadow-sm border border-transparent transition-all hover:shadow-md">
                {/* Wishlist Button */}
                <button className="absolute left-5 top-5 z-10 rounded-full bg-white p-1.5 text-gray-400 shadow-sm hover:text-red-500 transition-colors">
                  <Heart className="h-4 w-4" />
                </button>
                
                {/* Discount Badge */}
                <div className="absolute right-5 top-5 z-10">
                  <div className="rounded-lg bg-[#1A8D91] px-2 py-1 text-[10px] font-bold text-white">
                    {discount}% OFF
                  </div>
                </div>

                {/* Image */}
                <div className="relative aspect-square w-full overflow-hidden rounded-[20px] bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div className="mt-4 flex flex-col space-y-2 px-1">
                  <Badge className={`w-fit border-none px-2 py-0.5 text-[10px] text-white ${product.tagColor}`}>
                    {product.tag}
                  </Badge>
                  
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-1">{product.title}</h3>
                  
                  <div className="flex items-center gap-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 fill-current ${i >= product.rating ? 'text-gray-200' : ''}`} />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400">({product.reviews})</span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                    <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                  </div>

                  <Button className="w-full rounded-xl bg-[#1A8D91] py-5 text-sm font-semibold text-white hover:bg-[#146e71]">
                    Add to Cart
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Button */}
        <div className="mt-12 flex justify-center">
          <Button variant="outline" className="rounded-full border-[#1A8D91] px-10 py-6 text-[#1A8D91] hover:bg-[#D1E9EC] transition-colors">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}