"use client"

import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function OrderSummary() {

  const [total,setTotal] = useState(0)
  const router = useRouter()

  const calculateTotal = ()=>{

    const cart = JSON.parse(localStorage.getItem("cart") || "[]")

    const subtotal = cart.reduce(
      (acc:any,item:any)=> acc + item.basePrice * item.quantity,
      0
    )

    setTotal(subtotal)
  }

  useEffect(()=>{

    calculateTotal()

    window.addEventListener("cartUpdated", calculateTotal)

    return ()=>{
      window.removeEventListener("cartUpdated", calculateTotal)
    }

  },[])

  const gst = total * 0.18
  const shipping = total > 0 ? 50 : 0
  const final = total + gst + shipping

  return (
    <div className="rounded-md border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold text-[#333333]">
        Order Summary
      </h2>

      <div className="space-y-4 border-b pb-6">

        <div className="flex justify-between text-sm text-[#666666]">
          <span>Subtotal</span>
          <span className="font-bold text-[#333333]">
            ₹{total.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-sm text-[#666666]">
          <span>GST (18%)</span>
          <span className="font-bold text-[#333333]">
            ₹{gst.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-sm text-[#666666]">
          <span>Shipping</span>
          <span className="font-bold text-[#333333]">
            ₹{shipping.toFixed(2)}
          </span>
        </div>

      </div>

      <div className="py-6">
        <div className="flex justify-between items-center">

          <span className="text-lg font-bold text-[#333333]">
            Total
          </span>

          <span className="text-2xl font-black text-[#333333]">
            ₹{final.toFixed(2)}
          </span>

        </div>
      </div>

      <Button
        onClick={()=>router.push("/checkout")}
        className="h-14 w-full rounded-xl bg-[#168BA0] text-lg font-bold"
      >
        Checkout
      </Button>

      <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 mt-3">
        <ShieldCheck className="h-4 w-4 text-[#00FF1E]" />
        Secure Checkout
      </div>

    </div>
  );
}