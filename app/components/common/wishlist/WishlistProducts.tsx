/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/WishlistStore";
import { removeFromWishlist } from "@/store/WishlistActions";
import { addToCart } from "@/store/cartActions";

export default function WishlistProducts() {
  const products = useWishlistStore((state) => state.items);

  const removeWishlist = async (productVariantId: string) => {
    await removeFromWishlist(productVariantId);
  };

  const addToCartHandler = async (product: any) => {
    await addToCart({
      productVariantId: product.productVariantId,
      sku: "default",
      slug: product.slug || "",
      title: product.name,
      image: product.image || "/product.png",
      price: product.price || 0,
      originalPrice: product.strikethroughPrice,
    });

    // optional: remove after adding
    await removeFromWishlist(product.productVariantId);
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        Your wishlist is empty
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product: any) => (
        <Card key={product.productVariantId} className="rounded-3xl shadow-sm">
          <CardContent className="p-4">
            <div className="relative aspect-square bg-[#EADCF3] rounded-xl flex items-center justify-center">
              <button
                onClick={() => removeWishlist(product.productVariantId)}
                className="absolute top-2 left-2 bg-white rounded-full p-1 shadow"
              >
                <Heart className="w-4 h-4 fill-red-500 text-red-500" />
              </button>

              <Image
                alt={"product image"}
                src={product.image}
                width={180}
                height={180}
              />
            </div>

            <div className="mt-4 space-y-3">
              <h3 className="font-semibold text-gray-800">{product.name}</h3>

              {product.price && (
                <div className="flex gap-2 items-center">
                  <span className="font-bold">₹{product.price}</span>
                  {product.strikethroughPrice && (
                    <span className="text-xs line-through text-gray-400">
                      ₹{product.strikethroughPrice}
                    </span>
                  )}
                </div>
              )}

              <Button
                onClick={() => addToCartHandler(product)}
                className="w-full rounded-xl bg-[#1A8D91] text-white"
              >
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
