// components/checkout/CheckoutSummary.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export function CheckoutSummary() {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>

      {/* Product Mini Preview */}
      <div className="flex gap-4 mb-6">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-50 border">
          <Image src="/product3.png" alt="Product" fill className="object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-[13px] font-bold text-gray-800 leading-tight">
            Organic Cotton Sanitary Pads - Heavy Flow
          </h3>
          <p className="text-[11px] text-gray-400 mt-1 uppercase">QTY: 1</p>
          <p className="text-sm font-bold text-[#188B9E] mt-0.5">₹ 299</p>
        </div>
      </div>

      {/* Coupon Code */}
      <div className="mb-8">
        <label className="block text-sm font-bold text-gray-700 mb-2">Apply Coupons Code</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Enter Code" 
            className="flex-1 rounded-md border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-[#188B9E]" 
          />
          <Button className="bg-[#188B9E] hover:bg-[#146e71] text-white px-6 font-bold">Apply</Button>
        </div>
      </div>

      {/* Pricing Details */}
      <div className="space-y-3 border-b border-dashed pb-6">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Subtotal</span>
          <span className="font-medium text-gray-800">₹299.00</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>GST (18%)</span>
          <span className="font-medium text-gray-800">₹53.82</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Shipping</span>
          <span className="font-medium text-gray-800">₹50.00</span>
        </div>
      </div>

      {/* Total */}
      <div className="mt-6 flex items-center justify-between mb-8">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-2xl font-bold text-gray-900">₹402.82</span>
      </div>

      {/* Action Button */}
      <Button className="w-full bg-[#188B9E] hover:bg-[#146e71] py-7 text-lg font-bold rounded-xl mb-4">
        Continue
      </Button>

      <div className="flex items-center justify-center gap-2 text-[11px]  font-medium">
        <ShieldCheck className="h-4 w-4 text-[#00FF1E]" />
        Secure Checkout
      </div>
    </div>
  );
}