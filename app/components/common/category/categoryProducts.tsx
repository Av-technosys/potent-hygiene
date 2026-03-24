"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import AddToWishlist from "./addToWishlist";
import { getUserId, getUserWishlist } from "@/helper";

export default function CategoryProducts({ products }: any) {
  const router = useRouter();

  const [wishlist, setWishlist] = useState<string[]>([]);

  const fetchWishlist = async () => {
      const email: any = localStorage.getItem("userEmail");
      if (email !== null) {
        const userid: any = await getUserId(email);
        const data = await getUserWishlist(userid);
        setWishlist(data.map((p: any) => p.productVariantId));
      }
    };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const addToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = cart.find((item: any) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
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
          <AddToWishlist productVarientId={value.id} wishlist={wishlist} setWishlist={setWishlist} />

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
