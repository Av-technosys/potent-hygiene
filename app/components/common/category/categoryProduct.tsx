"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const products = [

  {id:1,title:"Sanitary Pads",img:"/product.png"},
  {id:2,title:"Sanitary Pads",img:"/product.png"},

  {id:3,title:"Menstrual Cup",img:"/product.png"},
  {id:4,title:"Menstrual Cup",img:"/product.png"},

  {id:5,title:"Pantyliners",img:"/product.png"},
  {id:6,title:"Pantyliners",img:"/product.png"},

  {id:7,title:"Combo",img:"/product.png"},
  {id:8,title:"Combo",img:"/product.png"}

]

export default function CategoryProducts(){

  const router = useRouter()

  const [wishlist,setWishlist] = useState<number[]>([])

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setWishlist(data.map((p:any)=>p.id))
  },[])

  const toggleWishlist = (product:any)=>{

    const list = JSON.parse(localStorage.getItem("wishlist") || "[]")

    const exists = list.find((item:any)=>item.id === product.id)

    let updated

    if(exists){
      updated = list.filter((item:any)=>item.id !== product.id)
    }else{
      updated = [...list,product]
    }

    localStorage.setItem("wishlist",JSON.stringify(updated))

    // navbar instant update
    window.dispatchEvent(new StorageEvent("storage",{key:"wishlist"}))

    setWishlist(updated.map((p:any)=>p.id))
  }

  return(

    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 flex-1">

      {products.map((product)=>(

        <Card key={product.id} className="rounded-3xl bg-white shadow-sm">

          <CardContent className="p-4">

            <div className="relative aspect-square bg-[#EADCF3] rounded-xl flex items-center justify-center overflow-hidden">

              {/* Wishlist */}

              <button
                onClick={()=>toggleWishlist(product)}
                className="absolute top-2 left-2 bg-white rounded-full p-1 shadow"
              >
                <Heart
                  className={`w-4 h-4 ${
                    wishlist.includes(product.id)
                    ? "fill-red-500 text-red-500"
                    : "text-gray-500"
                  }`}
                />
              </button>

              {/* Discount */}

              <span className="absolute top-2 right-2 bg-[#1A8D91] text-white text-xs px-2 py-1 rounded-full">
                25% OFF
              </span>

              <Image
                src={product.img}
                alt={product.title}
                width={160}
                height={160}
              />

              {/* Badge */}

              <span className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Best Seller
              </span>

            </div>

            <div className="mt-5 space-y-3">

              <h3 className="font-semibold text-gray-800">
                {product.title}
              </h3>

              <Button
                className="w-full rounded-xl bg-[#1A8D91]"
                onClick={()=>router.push(`/shop?type=${product.title}`)}
              >
                View all
              </Button>

            </div>

          </CardContent>

        </Card>
      ))}

    </div>

  )
}