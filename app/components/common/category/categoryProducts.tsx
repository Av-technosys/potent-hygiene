"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star } from "lucide-react"

const products = new Array(8).fill({
  title: "Ultra Soft Sanitary Pads",
  price: 299,
  oldPrice: 399,
  rating: 4,
  reviews: "1.4k",
  tag: "Bestseller",
  image: "/product.png",
})

export default function CategoryProducts() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-1">
      {products.map((product, index) => {

        const discount = Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )

        return (
          <Card
            key={index}
            className="group relative rounded-[24px] bg-white p-3 shadow-sm hover:shadow-md transition-all border border-transparent"
          >
            <CardContent className="p-0">

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

              {/* Image Section */}
              <div className="relative aspect-square w-full overflow-hidden rounded-[20px] bg-gray-50">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="mt-4 flex flex-col space-y-2 px-1">

                {/* Tag */}
                <Badge className="w-fit border-none px-2 py-0.5 text-[10px] text-white bg-[#00D1C1]">
                  {product.tag}
                </Badge>

                {/* Title */}
                <h3 className="text-sm font-bold text-gray-800 line-clamp-1">
                  {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 fill-current ${
                          i >= product.rating ? "text-gray-200" : ""
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    ₹{product.oldPrice}
                  </span>
                </div>

                {/* Button */}
                <Button className="w-full rounded-xl bg-[#1A8D91] py-5 text-sm font-semibold text-white hover:bg-[#146e71]">
                  Add to Cart
                </Button>
              </div>

            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}