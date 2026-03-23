/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

// ✅ IMPORT HELPER
import { addToCart as addToCartAction } from "@/store/cartActions";

export default function CategoryProducts({ products }: any) {
  const router = useRouter();

  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(data.map((p: any) => p.id));
  }, []);

  const toggleWishlist = (product: any) => {
    const list = JSON.parse(localStorage.getItem("wishlist") || "[]");

    const exists = list.find((item: any) => item.id === product.id);

    let updated;

    if (exists) {
      updated = list.filter((item: any) => item.id !== product.id);
    } else {
      updated = [...list, product];
    }

    localStorage.setItem("wishlist", JSON.stringify(updated));

    window.dispatchEvent(new StorageEvent("storage", { key: "wishlist" }));

    setWishlist(updated.map((p: any) => p.id));
  };

  // ✅ FIXED ADD TO CART
  const addToCart = async (product: any) => {
    await addToCartAction({
      productVariantId: product.id, // ✅ IMPORTANT
      sku: "default", // or derive if needed
      slug: product.slug || "",
      title: product.name,
      image: product.bannerImage || "/product.png",
      price: product.basePrice || 0,
      originalPrice: product.strikethroughPrice,
    });

    toast.success("Product added to cart successfully.");
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 h-full gap-6 flex-1">
      {products?.map((value: any) => (
        <div
          key={value.id}
          className="flex relative flex-col rounded-md p-3 shadow-md bg-white"
        >
          {/* Wishlist */}
          <button
            onClick={() => toggleWishlist(value)}
            className="absolute left-2 top-2 z-10 rounded-full bg-white p-1.5 text-gray-400 shadow-sm"
          >
            <Heart
              className={`h-4 w-4 ${
                wishlist.includes(value.id)
                  ? "fill-red-500 text-red-500"
                  : ""
              }`}
            />
          </button>

          {/* Discount */}
          {value.strikethroughPrice && (
            <div className="absolute right-2 top-2 z-10">
              <div className="rounded-xl bg-[#168BA0] px-2 py-1 text-[10px] font-bold text-white">
                SALE
              </div>
            </div>
          )}

          {/* Image */}
          <div
            className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-50"
            onClick={() => router.push(`/product-detail/${value.slug}`)}
          >
            <Image
              src={value.bannerImage || "/product.png"}
              alt={value.name}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              unoptimized
            />
          </div>

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

            <Button
              className="w-full rounded-md bg-[#168BA0] py-5 text-sm font-semibold text-white hover:bg-[#146e71]"
              onClick={() => addToCart(value)}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}