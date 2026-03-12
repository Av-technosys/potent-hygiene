"use client"

import Image from "next/image"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface CategoryProductsProps {
  categories: any[];
}

export default function CategoryProducts({ categories }: CategoryProductsProps){

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

    window.dispatchEvent(new StorageEvent("storage",{key:"wishlist"}))

    setWishlist(updated.map((p:any)=>p.id))
  }

  return(

    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 h-full gap-6 flex-1">

      {categories.map((product)=>(

        <div
          key={product.id}
          className="flex relative flex-col rounded-md p-3 shadow-md bg-white"
        >

          {/* Wishlist */}

          <button
            onClick={()=>toggleWishlist(product)}
            className="absolute left-2 top-2 z-10 rounded-full bg-white p-1.5 text-gray-400 shadow-sm"
          >
            <Heart
              className={`h-4 w-4 ${
                wishlist.includes(product.id)
                ? "fill-red-500 text-red-500"
                : ""
              }`}
            />
          </button>

          {/* Discount */}

          <div className="absolute right-2 top-2 z-10">
            <div className="rounded-xl bg-[#168BA0] px-2 py-1 text-[10px] font-bold text-white">
              25% OFF
            </div>
          </div>

          {/* Image */}

          <div
            className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-50 cursor-pointer"
            onClick={()=>router.push(`/shop?type=${product.title}`)}
          >
            <Image
              src={product.bannerImage}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
          </div>
  <span className="w-fit absolute bottom-23 left-1 rounded-full bg-[#10B981] px-2 py-0.5 text-[10px] text-white">
              Bestseller  
            </span>
          {/* Content */}

          <div className="mt-4 flex flex-col space-y-3 px-1 rounded-lg">

          

            <h3 className="text-sm font-bold text-gray-800 line-clamp-1">
              {product.name}
            </h3>

            <Button
              className="w-full rounded-md bg-[#168BA0] py-5 text-sm font-semibold text-white hover:bg-[#146e71]"
              onClick={()=>router.push(`/shop?type=${product.title}`)}
            >
              View all
            </Button>

          </div>

        </div>

      ))}

    </div>

  )
}