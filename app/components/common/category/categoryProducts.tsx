"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const products = [

  { id:1,title:"Sanitary Pads",price:299,oldPrice:399,image:"/product.png",flow:"Regular",size:"Medium",material:"Organic Cotton",stock:true,badge:"Bestseller"},
  { id:2,title:"Sanitary Pads",price:259,oldPrice:359,image:"/product.png",flow:"Heavy",size:"Large",material:"Organic Cotton",stock:true,badge:"Bestseller"},

  { id:3,title:"Menstrual Cup",price:399,oldPrice:499,image:"/product.png",flow:"Heavy",size:"Large",material:"Medical Grade Silicon",stock:true,badge:"Eco friendly"},
  { id:4,title:"Menstrual Cup",price:349,oldPrice:449,image:"/product.png",flow:"Regular",size:"Medium",material:"Medical Grade Silicon",stock:true,badge:"Eco friendly"},

  { id:5,title:"Pantyliners",price:199,oldPrice:299,image:"/product.png",flow:"Light",size:"Small",material:"Synthetic Blend",stock:true,badge:"Popular"},
  { id:6,title:"Pantyliners",price:189,oldPrice:249,image:"/product.png",flow:"Regular",size:"Medium",material:"Synthetic Blend",stock:true,badge:"Popular"},

  { id:7,title:"Combo",price:499,oldPrice:699,image:"/product.png",flow:"Regular",size:"Medium",material:"Organic Cotton",stock:true,badge:"Popular"},
  { id:8,title:"Combo",price:549,oldPrice:749,image:"/product.png",flow:"Heavy",size:"Large",material:"Organic Cotton",stock:true,badge:"Popular"}

]

export default function CategoryProducts(){

  const params = useSearchParams()
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

    // ✅ navbar instantly update
    window.dispatchEvent(new StorageEvent("storage",{key:"wishlist"}))

    setWishlist(updated.map((p:any)=>p.id))
  }

  const type = params.get("type")
  const flow = params.get("flow")
  const size = params.get("size")
  const material = params.get("material")
  const stock = params.get("stock")
  const min = Number(params.get("min"))
  const max = Number(params.get("max"))
  const sort = params.get("sort")

  let filteredProducts = products.filter((p)=>{

    if(type && p.title !== type) return false
    if(flow && p.flow !== flow) return false
    if(size && p.size !== size) return false
    if(material && p.material !== material) return false
    if(stock && !p.stock) return false
    if(min && p.price < min) return false
    if(max && p.price > max) return false

    return true
  })

  if(sort === "low") filteredProducts.sort((a,b)=>a.price - b.price)
  if(sort === "high") filteredProducts.sort((a,b)=>b.price - a.price)
  if(sort === "new") filteredProducts.sort((a,b)=>b.id - a.id)

  const addToCart = (product:any)=>{

    const cart = JSON.parse(localStorage.getItem("cart") || "[]")

    const existing = cart.find((item:any)=>item.id === product.id)

    if(existing){
      existing.quantity += 1
    }else{
      cart.push({...product,quantity:1})
    }

    localStorage.setItem("cart",JSON.stringify(cart))

    router.push("/cart")
  }

  return(

   <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 items-start">

      {filteredProducts.map((product)=>(

        <Card key={product.id} className="rounded-3xl bg-white shadow-sm">

          <CardContent className="p-3 md:p-4">

            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#EADCF3] flex items-center justify-center">

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

              <span className="absolute top-2 right-2 bg-[#1A8D91] text-white text-xs px-2 py-1 rounded-full">
                25% OFF
              </span>

              <Image
                src={product.image}
                alt={product.title}
                width={180}
                height={180}
              />

              <span className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                {product.badge}
              </span>

            </div>

            <div className="mt-4 space-y-3">

              <h3 className="text-base font-semibold text-gray-800">
                {product.title}
              </h3>

              <div className="flex gap-2 items-center">

                <span className="font-bold">
                  ₹{product.price}
                </span>

                <span className="text-xs line-through text-gray-400">
                  ₹{product.oldPrice}
                </span>

              </div>

              <Button
                onClick={()=>addToCart(product)}
                className="w-full rounded-xl bg-[#1A8D91] text-white"
              >
                Add to Cart
              </Button>

            </div>

          </CardContent>

        </Card>

      ))}

    </div>

  )
}