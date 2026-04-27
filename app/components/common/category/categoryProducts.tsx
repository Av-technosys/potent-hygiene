/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { addToCart as addToCartAction } from "@/store/cartActions";
import AddToWishlist from "./addToWishlist";
import Link from "next/link";

export default function CategoryProducts({ products }: any) {
  

  // ✅ FIXED ADD TO CART
  const addToCart = async (product: any) => {
    await addToCartAction({
      productId: product.id,
      sku: "default",
      slug: product.slug || "",
      title: product.name,
      image: product.bannerImage || "/product.png",
      price: product.basePrice || 0,
      originalPrice: product.strikethroughPrice,
      quantity: 1,
      isQuantityChangable:true
    });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full gap-6 flex-1">
      {
        products.length > 0 ? products?.map((value: any) => (
        <div
          key={value.id}
          className="flex relative flex-col rounded-md p-3 shadow-md bg-white"
        >
          {/* Wishlist */}
          <AddToWishlist product={value} />
          {/* Discount */}
          {value.strikethroughPrice && (
            <div className="absolute right-2 top-2 z-10">
              <div className="rounded-xl bg-[#168BA0] px-2 py-1 text-[10px] font-bold text-white">
                SALE
              </div>
            </div>
          )}

          {/* Image */}
          <Link
            className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-50"
            href={`/product-detail/${value.slug}`}
          >
            <Image
              src={value.bannerImage || "/product.png"}
              alt={value.name}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              unoptimized
            />
          </Link>

          {/* Badge */}
          <span className="w-fit absolute bottom-31 left-1 rounded-full bg-[#10B981] px-2 py-0.5 text-[10px] text-white">
            Bestseller
          </span>

          {/* Content */}
          <div className="mt-4 flex flex-col space-y-3 px-1 rounded-lg">
            <h3 className="text-sm font-bold text-gray-800 line-clamp-1">
              {value.name}
            </h3>

            <div className="flex items-center gap-2 text-sm">
              <span className="font-bold text-gray-900">
                ₹{value.basePrice}
              </span>

              {value.strikethroughPrice && (
                <span className="text-xs line-through text-gray-400">
                  ₹{value.strikethroughPrice}
                </span>
              )}
            </div>

            {value.hasVarientBox ? (
              <Link href={`/product-detail/${value.slug}`}>
                <Button className="w-full rounded-md bg-[#168BA0] py-5 text-sm font-semibold text-white hover:bg-[#146e71]">
                  Add to Cart
                </Button>
              </Link>
            ) : (
              <Button
                className="w-full rounded-md bg-[#168BA0] py-5 text-sm font-semibold text-white hover:bg-[#146e71]"
                onClick={() => addToCart(value)}
              >
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      ))
      :
      <div className="text-center py-20 text-gray-500">
        No products found
      </div>
      }
    </div>
  );
}
