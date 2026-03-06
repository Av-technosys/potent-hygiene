"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useEffect, useState } from "react"

export default function WishlistProducts(){

  const [products,setProducts] = useState<any[]>([])

  useEffect(()=>{

    const loadWishlist = ()=>{
      const data = JSON.parse(localStorage.getItem("wishlist") || "[]")
      setProducts(data)
    }

    loadWishlist()

    window.addEventListener("storage",loadWishlist)

    return ()=>{
      window.removeEventListener("storage",loadWishlist)
    }

  },[])

  const removeWishlist = (id:number)=>{

    const updated = products.filter(p=>p.id !== id)

    localStorage.setItem("wishlist",JSON.stringify(updated))

    window.dispatchEvent(
      new StorageEvent("storage",{key:"wishlist"})
    )

    setProducts(updated)
  }

  if(products.length === 0){
    return(
      <div className="text-center py-20 text-gray-500">
        Your wishlist is empty
      </div>
    )
  }

  return(

    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

      {products.map((product)=>(
        <Card key={product.id} className="rounded-3xl shadow-sm">

          <CardContent className="p-4">

            <div className="relative aspect-square bg-[#EADCF3] rounded-xl flex items-center justify-center">

              <button
                onClick={()=>removeWishlist(product.id)}
                className="absolute top-2 left-2 bg-white rounded-full p-1 shadow"
              >
                <Heart className="w-4 h-4 fill-red-500 text-red-500"/>
              </button>

              <Image
                src={product.image || product.img}
                alt={product.title}
                width={180}
                height={180}
              />

            </div>

            <div className="mt-4 space-y-3">

              <h3 className="font-semibold text-gray-800">
                {product.title}
              </h3>

              {product.price && (
                <div className="flex gap-2 items-center">
                  <span className="font-bold">₹{product.price}</span>
                  <span className="text-xs line-through text-gray-400">
                    ₹{product.oldPrice}
                  </span>
                </div>
              )}

              <Button className="w-full rounded-xl bg-[#1A8D91] text-white">
                Add to Cart
              </Button>

            </div>

          </CardContent>

        </Card>
      ))}

    </div>
  )
}