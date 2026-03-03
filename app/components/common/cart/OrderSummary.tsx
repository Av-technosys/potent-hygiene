// components/cart/OrderSummary.tsx
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OrderSummary() {
  return (
    <div className="rounded-md border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-[#333333]">Order Summary</h2>
      <div className="space-y-4 border-b pb-6">
        <div className="flex justify-between text-sm text-[#666666]">
          <span>Subtotal</span>
          <span className="font-bold text-[#333333]">₹299.00</span>
        </div>
        <div className="flex justify-between text-sm text-[#666666]">
          <span>GST (18%)</span>
          <span className="font-bold text-[#333333]">₹53.82</span>
        </div>
        <div className="flex justify-between text-sm text-[#666666]">
          <span>Shipping</span>
          <span className="font-bold text-[#333333]">₹50.00</span>
        </div>
      </div>

      <div className="py-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-[#333333]">Total</span>
          <span className="text-2xl font-black text-[#333333]">₹402.82</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button className="h-14 w-full rounded-xl bg-[#168BA0] text-lg font-bold hover:bg-[#146e71]">
          Continue
        </Button>
        <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
          <ShieldCheck className="h-4 w-4 text-[#00FF1E]" />
          Secure Checkout
        </div>
      </div>
    </div>
  );
}