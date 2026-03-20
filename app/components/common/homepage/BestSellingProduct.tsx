"use client"

import Image from "next/image"
import { Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const products = [

  { id:1,title:"Sanitary Pads",price:299,oldPrice:399,image:"/product.png",badge:"Bestseller"},
  

  { id:2,title:"Menstrual Cup",price:399,oldPrice:499,image:"/product.png",badge:"Eco friendly"},
  

  { id:3,title:"Pantyliners",price:199,oldPrice:299,image:"/product.png",badge:"Popular"},
 

  { id:4,title:"Combo",price:499,oldPrice:699,image:"/product.png",badge:"Popular"},
  

]

export function BestsellingProducts(){

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

  const addToCart = (product:any)=>{

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log("cartttt",cart)

    const existing = cart.find((item:any)=>item.id === product.id)

    if(existing){
      existing.quantity += 1
    }else{
      cart.push({...product,quantity:1})
    }

    localStorage.setItem("cart",JSON.stringify(cart))

    router.push("/cart")
  }

  return (

    <section className="py-10 md:bg-[#F8F6F1] overflow-hidden">

      <div className="container mx-auto px-4 md:px-16">

        <div className="text-center mb-8 md:mb-12 space-y-2 md:space-y-4">

          <h2 className="md:text-4xl text-3xl font-serif font-bold text-[#333333]">
            Bestselling Products
          </h2>

          <p className="max-w-2xl mx-auto text-sm text-black/50 leading-relaxed">
            Loved by thousands of women. Our most popular products for comfort,
            care, and confidence.
          </p>

        </div>

        <div className="flex overflow-x-auto pb-6 gap-4 md:grid md:grid-cols-4 md:gap-6 no-scrollbar snap-x snap-mandatory">

          {products.map((product,index)=>{

            const discount = Math.round(
              ((product.oldPrice - product.price) / product.oldPrice) * 100
            )

            return (

              <div
                key={index}
                className="group relative flex flex-col min-w-65 md:min-w-0 rounded-[24px] bg-white p-3 shadow-sm hover:shadow-md snap-start"
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
                  <div className="rounded-xl bg-[#1A8D91] px-2 py-1 text-[10px] font-bold text-white">
                    {discount}% OFF
                  </div>
                </div>

                {/* Image */}

                <div
                  className="relative aspect-square w-full overflow-hidden rounded-[20px] bg-gray-50 cursor-pointer"
                  onClick={()=>router.push(`/shop?type=${product.title}`)}
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}

                <div className="mt-4 flex flex-col space-y-2 px-1">

                  <Badge className="w-fit border-none px-2 py-0.5 text-[10px] text-white bg-[#00D1C1]">
                    {product.badge}
                  </Badge>

                  <h3 className="text-sm font-bold text-gray-800 line-clamp-1">
                    {product.title}
                  </h3>

                  {/* Rating */}

                  <div className="flex items-center gap-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_,i)=>(
                        <Star key={i} className="h-3 w-3 fill-current"/>
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400">(1.4k)</span>
                  </div>

                  {/* Price */}

                  <div className="flex items-center gap-2 pt-1">

                    <span className="text-lg font-bold text-gray-900">
                      ₹{product.price}
                    </span>

                    <span className="text-xs text-gray-400 line-through">
                      ₹{product.oldPrice}
                    </span>

                  </div>

                  {/* Cart */}

                  <Button
                    onClick={()=>addToCart(product)}
                    className="w-full rounded-xl bg-[#1A8D91] py-5 text-sm font-semibold text-white hover:bg-[#146e71]"
                  >
                    Add to Cart
                  </Button>

                </div>

              </div>

            )

          })}

        </div>

        <div className="mt-8 flex justify-center">

          <Link href="/shop">

            <Button
              variant="outline"
              className="rounded-full border-[#1A8D91] px-10 py-6 text-[#1A8D91] hover:bg-[#D1E9EC]"
            >
              View All Products
            </Button>

          </Link>

        </div>

      </div>

    </section>

  )

}