"use client";

import Image from "next/image";
import { Minus, Plus, ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { getImageUrl } from "@/lib/imageUrl";

import { updateCartQuantity, removeFromCart } from "@/store/cartActions";
import { NEXT_PUBLIC_S3_URL } from "@/env";

export function CartItems() {
  const router = useRouter();

  // ✅ reactive Zustand state
  const items = useCartStore((state) => state.items);



  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-[#333333]">Your Cart</h2>
        <p className="text-sm text-[#666666]">
          {items.length} {items.length === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <button
            onClick={() => router.push("/shop")}
            className="flex items-center gap-2 text-sm font-bold text-[#168BA0] mx-auto"
          >
            <ArrowLeft className="h-4 w-4" /> Continue Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item: any) => (
            <div
              key={`${item.productId}-${item.sku || "default"}`}
              className="flex flex-col sm:flex-row  gap-4 p-4 border rounded-lg bg-white shadow-sm"
            >
              {/* Product Image */}
              <div className="flex-shrink-0 w-full sm:w-[100px]">
                <Image
                  src={getImageUrl(item.image)}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="w-full h-auto object-cover rounded-md"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col sm:flex-row  sm:justify-between gap-8">
                <div className="space-y-1">
                  <h3 className="font-semibold text-[#333333]">{item.title}</h3>
                  <p className="text-lg font-bold text-[#168BA0]">
                    ₹{item.price}
                  </p>
                </div>

                {item?.cartSizes && item?.cartSizes.length > 0 ? (
                  <div className="flex-1 flex flex-col gap-3 w-full sm:w-auto">
                    {/* Sizes List */}
                    <div className="space-y-2">
                      {item.cartSizes.map((size: any) => (
                        <div
                          key={size.id}
                          className="flex  justify-between items-center bg-gray-50 px-3 py-2 rounded-lg"
                        >
                          <span className="text-sm text-gray-600">
                            {size.name}
                          </span>

                          <span className="text-sm font-semibold text-gray-800 bg-white px-2 py-0.5 rounded-md shadow-sm">
                            Qty: {size.qty}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200"></div>

                    {/* Remove Button */}
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 transition-all"
                        onClick={() =>
                          removeFromCart(item.productId, item.sku, item?.uuid, item?.cartSizes)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="font-medium">Remove</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-md hover:bg-gray-100"
                          onClick={() =>
                            updateCartQuantity(
                              item.productId,
                              item.quantity - 1,
                              item.sku,
                            )
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-md hover:bg-gray-100"
                          onClick={() =>
                            updateCartQuantity(
                              item.productId,
                              item.quantity + 1,
                              item.sku,
                            )
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* 🗑 Remove Button - Light colored */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() =>
                          removeFromCart(item.productId, item.sku, item?.uuid)
                        }
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}

          {/* Continue Shopping Button */}
          <button
            onClick={() => router.push("/shop")}
            className="flex items-center gap-2 text-sm font-bold text-[#168BA0] hover:text-[#0f6b7a] transition-colors mt-4"
          >
            <ArrowLeft className="h-4 w-4" /> Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}
