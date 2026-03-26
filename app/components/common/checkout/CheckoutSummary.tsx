/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { initiateRazorpayPayment } from "@/lib/razorpay";
import { toast } from "sonner";
import { getCart } from "@/helper";
import { clearCart } from "@/store/cartActions";

export function CheckoutSummary({ selected, address, userId }: any) {
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const filteredAddress = address.filter((item: any) => item.id === selected);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await getCart();

      if (!res.success) return;

      setCart(res?.items ?? []);
      calculateTotal(res?.items ?? []);
    };

    fetchCart();
  }, []);

  const calculateTotal = (cartData: any[]) => {
    const subtotal = cartData.reduce(
      (acc, item) => acc + (item.price || 0) * item.quantity,
      0,
    );
    setTotal(subtotal);
  };

  const gst = total * 0.18;
  const shipping = total > 0 ? 50 : 0;
  const final = total + gst + shipping;

  const handlePayment = async () => {
    try {
      setLoading(true);

      if (!selected) {
        toast.error("Please select an address");
        return;
      }

      const res: any = await initiateRazorpayPayment({
        amount: final,
        name: "POTENT HYGIENE",
        description: "Order Payment",
        items: cart,
        // userId,
        address: filteredAddress[0],
      });

      toast.success("Payment Successful 🎉");

      clearCart()
      router.push(`/order-confirmation/${res?.orderId}`);
    } catch (err) {
      toast.error("Payment Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-md border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-[#333333]">Order Summary</h2>

      <div className="space-y-4 border-b pb-6">
        <div className="flex justify-between text-sm text-[#666666]">
          <span>Subtotal</span>
          <span className="font-bold text-[#333333]">₹{total.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm text-[#666666]">
          <span>GST (18%)</span>
          <span className="font-bold text-[#333333]">₹{gst.toFixed(2)}</span>
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
          <span className="text-lg font-bold text-[#333333]">Total</span>

          <span className="text-2xl font-black text-[#333333]">
            ₹{final.toFixed(2)}
          </span>
        </div>
      </div>

      <Button
        onClick={handlePayment}
        disabled={loading}
        className="h-14 w-full rounded-xl bg-[#168BA0] text-lg font-bold"
      >
        {loading ? "Processing..." : `Pay ₹${final}`}
      </Button>

      <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 mt-3">
        <ShieldCheck className="h-4 w-4 text-[#00FF1E]" />
        Secure Checkout
      </div>
    </div>
  );
}
