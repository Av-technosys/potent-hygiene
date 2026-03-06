"use client";
import Image from "next/image";
import { Minus, Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function CartItems() {

  const [cart,setCart] = useState<any[]>([])
  const router = useRouter()

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("cart") || "[]")
    setCart(data)
  },[])

  const updateCart = (newCart:any[])=>{
    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))

    // trigger update for OrderSummary
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const increaseQty = (id:number)=>{
    const updated = cart.map((item)=>
      item.id === id ? {...item, quantity:item.quantity+1} : item
    )
    updateCart(updated)
  }

  const decreaseQty = (id:number)=>{
    const updated = cart
      .map((item)=>
        item.id === id ? {...item, quantity:item.quantity-1} : item
      )
      .filter((item)=>item.quantity > 0)

    updateCart(updated)
  }

  return (
    <div className="space-y-6">

      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-[#333333]">Your Cart</h2>
        <p className="text-sm text-[#666666]">{cart.length} items in your cart</p>
      </div>

      {cart.map((item) => (
        <div key={item.id} className="relative flex items-center gap-3 rounded-md border border-gray-100 p-2 shadow-sm bg-white md:p-4 md:rounded-xl">
          
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-[#F8F8F8] md:h-32 md:w-32 md:rounded-lg">
            <Image src={item.image} alt={item.title} fill className="object-cover" />
          </div>

          <div className="flex flex-1 flex-col pr-12 md:pr-0">
            <h3 className="text-[14px] font-bold text-[#333333] md:text-lg">
              {item.title}
            </h3>

            <div className="mt-2">
              <span className="text-lg font-bold text-[#333333]">
                ₹{item.price}
              </span>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-4 mt-4">

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={()=>decreaseQty(item.id)}
            >
              <Minus className="h-3 w-3" />
            </Button>

            <div className="flex h-8 w-16 items-center justify-center rounded-full bg-[#168BA0] text-sm font-bold text-white">
              {item.quantity}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={()=>increaseQty(item.id)}
            >
              <Plus className="h-3 w-3" />
            </Button>

          </div>

          {/* Mobile */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 md:hidden">

            <button
              onClick={()=>increaseQty(item.id)}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#168BA0]"
            >
              <Plus className="h-4 w-4" />
            </button>

            <div className="flex h-10 w-7 items-center justify-center rounded-full bg-[#168BA0] text-sm font-bold text-white">
              {item.quantity}
            </div>

            <button
              onClick={()=>decreaseQty(item.id)}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#168BA0]"
            >
              <Minus className="h-4 w-4" />
            </button>

          </div>

        </div>
      ))}

      <button
        onClick={()=>router.push("/category")}
        className="flex items-center gap-2 text-sm font-bold text-[#168BA0] mt-4"
      >
        <ArrowLeft className="h-4 w-4" /> Continue Shopping
      </button>

    </div>
  );
}