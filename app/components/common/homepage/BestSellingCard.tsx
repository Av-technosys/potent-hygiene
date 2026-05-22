/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { getImageUrl } from "@/lib/imageUrl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AddToWishlist from "@/app/components/common/category/addToWishlist";
import { addToCart } from "@/store/cartActions";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { NEXT_PUBLIC_S3_URL } from "@/env";

export default function BestsellingCard({ product, buttonColor, brand }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = async () => {
    await addToCart({
      productId: product.id,
      slug: product.slug || "",
      title: product.name,
      image: product.image || "/product.png",
      price: product.price || 0,
      originalPrice: product.oldPrice,
      quantity: 1,
      isQuantityChangable: true,
      sku: "default",
    });
  };

  const handleRedirect = () => {
    if (brand) {
      router.push(`/product-detail/${product.slug}`);
    } else {
      router.push(`/product-detail/${product.slug}`);
    }
  };
  return (
    <div
      onClick={handleRedirect}
      className="group relative flex flex-col rounded-lg bg-white p-3 shadow-sm"
    >
      {/* ✅ Wishlist */}
      <AddToWishlist
        product={{
          id: product.id,
          name: product.name,
          basePrice: product.price,
          bannerImage: product.image,
        }}
      />

      {/* Discount */}
      {product.oldPrice && (
        <div className="absolute right-2 top-2 z-10">
          <div
            className="rounded-xl px-2 py-1 text-[10px] font-bold text-white"
            style={{ backgroundColor: buttonColor || "#1A8D91" }}
          >
            {discount}% OFF
          </div>
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-4xl bg-gray-50">
        <Image
          src={getImageUrl(product.image || "/product.png")}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="mt-4 space-y-2">
        <Badge
          className="text-white text-[10px]"
          style={{ backgroundColor: buttonColor || "#00D1C1" }}
        >
          Bestseller
        </Badge>

        <h3 className="text-sm font-bold">{product.name}</h3>

        <div className="flex items-center gap-2">
          <span className="font-bold">₹{product.price}</span>

          {product.oldPrice && (
            <span className="line-through text-xs text-gray-400">
              ₹{product.oldPrice}
            </span>
          )}
        </div>

        {/* ✅ Add to Cart */}

        {product.hasVarientBox ? (
          <Link href={`/product-detail/${product.slug}`}>
            <Button className="w-full rounded-md bg-[#168BA0] py-5 text-sm font-semibold text-white hover:bg-[#146e71]">
              Add to Cart
            </Button>
          </Link>
        ) : (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className="w-full"
            style={{ backgroundColor: buttonColor || "#1A8D91" }}
          >
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
}
