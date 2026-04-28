/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Heart, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RelatedProducts({ products, themeColor }: any) {
 
if(products.length > 0){
    return (
    <section className="w-full mx-auto pb-16">
      <div className=" py-4 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
          You May Also Like
        </h2>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6  md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {products.map((product: any, index: number) => (
            <div
              key={index}
              // Laptop: 'md:w-auto' ensures grid controls the size.
              // Mobile: 'w-[280px]' and 'flex-shrink-0' enables the scroll.
              className="bg-white rounded-2xl shadow-md p-4 relative hover:shadow-lg transition shrink-0 md:w-auto md:shrink"
            >
              {/* Wishlist */}
              <button className="absolute top-2 left-2 bg-white rounded-full p-1 shadow">
                <Heart
                style={{color:themeColor.darkColor}}
                  className="w-4 h-4 text-gray-500"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = themeColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#6b7280";
                  }}
                />{" "}
              </button>

              {/* Discount Badge */}
              <span
                className="absolute top-2 right-2 text-white text-xs px-3 py-1 rounded-full"
                style={{ backgroundColor: themeColor.darkColor || "#168BA0" }}
              >
                25% OFF
              </span>

              {/* Product Image */}
              <Link href={product.slug} className="rounded-xl overflow-hidden">
                <Image
                  src={product.bannerImage}
                  alt={product.name}
                  width={200}
                  height={150}
                  className="w-full  object-cover"
                />
              </Link>

              {/* Tag */}
              <span className="inline-block mt-4 bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                {product.category}
              </span>

              <Link href={product.slug} >
                {/* Title */}
                <h3 className="mt-3 text-sm font-medium text-gray-900 leading-snug">
                  {product.name}
                </h3>
              </Link>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-2 text-yellow-400">
                {Array(product.rating)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                  ))}
                <span className="text-gray-500 text-xs ml-1">
                  ({product.reviewCount})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mt-3">
                <span className="text-lg font-semibold">
                  ₹{product.basePrice}
                </span>
                <span className="text-gray-400 line-through text-sm">
                  ₹{product.strikethroughPrice}
                </span>
              </div>

              {/* Button */}
             


              {product.hasVarientBox ? (
              <Link href={`/product-detail/${product.slug}`}>
                <Button style={{backgroundColor:themeColor.darkColor}} className="w-full rounded-md  py-5 text-sm font-semibold text-white hover:bg-[#146e71]">
                  Add to Cart
                </Button>
              </Link>
            ) : (
               <button
                className="w-full mt-4 text-white text-sm py-2.5 rounded-lg transition"
                style={{ backgroundColor: themeColor.darkColor || "#168BA0" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "brightness(0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "brightness(1)";
                }}
              >
                Add to Cart
              </button>
            )}

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
}
