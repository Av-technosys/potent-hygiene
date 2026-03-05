"use client";
import Image from "next/image";
import { Minus, Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const cartData = [
  {
    id: 1,
    name: "Organic Cotton Sanitary Pads - Heavy Flow",
    category: "Sanitary Pads",
    price: 299,
    quantity: 1,
    image: "/product3.png", 
  },
  {
    id: 2,
    name: "Lee's Menstrual Cup - Resuable",
    category: "Menstrual Cup",
    price: 299,
    quantity: 1,
    image: "/product3.png", 
  }
];

export function CartItems() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-[#333333]">Your Cart</h2>
        <p className="text-sm text-[#666666]">{cartData.length} items in your cart</p>
      </div>

      {cartData.map((item) => (
        <div key={item.id} className="relative flex items-center gap-3 rounded-md border border-gray-100 p-2 shadow-sm bg-white md:p-4 md:rounded-xl">
          
          {/* Product Image */}
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-[#F8F8F8] md:h-32 md:w-32 md:rounded-lg">
            <Image src={item.image} alt={item.name} fill className="object-cover" />
          </div>

          {/* Product Details */}
          <div className="flex flex-1 flex-col pr-12 md:pr-0">
            <h3 className="text-[14px] font-bold text-[#333333] leading-tight md:text-lg">
              {item.name}
            </h3>
            <p className="text-[11px] text-[#999999] mt-0.5 md:text-sm">{item.category}</p>
            
            <div className="mt-2">
              <span className="text-lg font-bold text-[#333333]">₹{item.price}</span>
            </div>
            
            <p className="text-[11px] text-[#666666] mt-1 md:hidden">Quantity: {item.quantity}x</p>
          </div>

          {/* --- Quantity Controls --- */}
          
          {/* 1. Laptop View (Horizontal) */}
          <div className="hidden md:flex items-center gap-4 mt-4">
            <span className="text-xs font-medium text-gray-500">Quantity:</span>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-[#168BA0] text-[#168BA0]">
                <Minus className="h-3 w-3" />
              </Button>
              <div className="flex h-8 w-16 items-center justify-center rounded-full bg-[#168BA0] text-sm font-bold text-white">
                {item.quantity}
              </div>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-[#168BA0] text-[#168BA0]">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* 2. Mobile View (Vertical Side Bar - Exact as image_32c70f.png) */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 md:hidden">
            <button className="flex h-8 w-8 items-center justify-center rounded-full border border-[#168BA0] text-[#168BA0] bg-white">
              <Plus className="h-4 w-4" />
            </button>
            <div className="flex h-12 w-8 items-center justify-center rounded-full bg-[#168BA0] text-sm font-bold text-white">
              {item.quantity}
            </div>
            <button className="flex h-8 w-8 items-center justify-center rounded-full border border-[#168BA0] text-[#168BA0] bg-white">
              <Minus className="h-4 w-4" />
            </button>
          </div>

        </div>
      ))}

      <button className="flex items-center gap-2 text-sm font-bold text-[#168BA0] transition-colors hover:opacity-80 mt-4">
        <ArrowLeft className="h-4 w-4" /> Continue Shopping
      </button>
    </div>
  );
}