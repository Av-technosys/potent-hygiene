"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

const products = [
  { id: 1, title: "Sanitary Pads", img: "/product.png", tag: "Bestseller" },
  { id: 2, title: "Menstrual Cup", img: "/product.png", tag: "New" },
  { id: 3, title: "Pantyliners", img: "/product.png", tag: "Popular" },
  { id: 4, title: "Combo", img: "/product.png", tag: "Value Pack" },
  { id: 5, title: "Sanitary Pads", img: "/product.png", tag: "Bestseller" },
  { id: 6, title: "Menstrual Cup", img: "/product.png", tag: "New" },
  { id: 7, title: "Pantyliners", img: "/product.png", tag: "Popular" },
  { id: 8, title: "Combo", img: "/product.png", tag: "Value Pack" },
  { id: 9, title: "Combo", img: "/product.png", tag: "Value Pack" },
  { id: 10, title: "Sanitary Pads", img: "/product.png", tag: "Bestseller" },
  { id: 11, title: "Menstrual Cup", img: "/product.png", tag: "New" },
  { id: 12, title: "Pantyliners", img: "/product.png", tag: "Popular" },
]

export default function CategoryProducts() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 flex-1">
      {products.map((product) => (
        <Card
          key={product.id}
          className="relative rounded-3xl bg-white shadow-sm hover:shadow-md transition-all overflow-hidden"
        >
          <CardContent className="p-3 md:p-4 relative">

            {/* Image Wrapper */}
            <div className="relative aspect-square w-full bg-[#EADCF3] rounded-xl overflow-visible flex items-center justify-center">

              {/* Heart */}
              <div className="absolute -top-3 left-4 bg-white rounded-full p-2 shadow-sm z-20">
                <Heart className="w-4 h-4 text-gray-500 hover:text-red-500 transition" />
              </div>

              {/* Discount */}
              <div className="absolute -top-3 right-4 bg-[#1A8D91] text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm z-20">
                25% OFF
              </div>

              {/* Product Image */}
              <Image
                src={product.img}
                alt={product.title}
                width={180}
                height={180}
                className="object-contain rounded-xl"
              />

              {/* Tag - Half inside half outside */}
              <div className="absolute -bottom-3 left-4 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm z-20">
                {product.tag}
              </div>
            </div>

            {/* Content */}
            <div className="mt-6 space-y-3">
              <h3 className="text-base font-semibold text-gray-800">
                {product.title}
              </h3>

              <Button className="w-full rounded-xl bg-[#1A8D91] hover:bg-[#146e71] text-white font-medium">
                View all
              </Button>
            </div>

          </CardContent>
        </Card>
      ))}
    </div>
  )
}