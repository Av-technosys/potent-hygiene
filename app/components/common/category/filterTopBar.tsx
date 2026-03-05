"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSearchParams, useRouter } from "next/navigation"

const products = [

  { id:1,title:"Sanitary Pads",price:299,flow:"Regular",size:"Medium",material:"Organic Cotton",stock:true},
  { id:2,title:"Sanitary Pads",price:259,flow:"Heavy",size:"Large",material:"Organic Cotton",stock:true},

  { id:3,title:"Menstrual Cup",price:399,flow:"Heavy",size:"Large",material:"Medical Grade Silicon",stock:true},
  { id:4,title:"Menstrual Cup",price:349,flow:"Regular",size:"Medium",material:"Medical Grade Silicon",stock:true},

  { id:5,title:"Pantyliners",price:199,flow:"Light",size:"Small",material:"Synthetic Blend",stock:true},
  { id:6,title:"Pantyliners",price:189,flow:"Regular",size:"Medium",material:"Synthetic Blend",stock:true},

  { id:7,title:"Combo",price:499,flow:"Regular",size:"Medium",material:"Organic Cotton",stock:true},
  { id:8,title:"Combo",price:549,flow:"Heavy",size:"Large",material:"Organic Cotton",stock:true}

]

export default function FilterBar(){

  const router = useRouter()
  const params = useSearchParams()

  const type = params.get("type")
  const flow = params.get("flow")
  const size = params.get("size")
  const material = params.get("material")
  const stock = params.get("stock")
  const min = Number(params.get("min"))
  const max = Number(params.get("max"))

  const keyword = type || "All Products"

  const filteredProducts = products.filter((p)=>{

    if(type && p.title !== type) return false
    if(flow && p.flow !== flow) return false
    if(size && p.size !== size) return false
    if(material && p.material !== material) return false
    if(stock && !p.stock) return false
    if(min && p.price < min) return false
    if(max && p.price > max) return false

    return true
  })

  const handleSort = (value:string)=>{
    const newParams = new URLSearchParams(params.toString())
    newParams.set("sort",value)
    router.push(`?${newParams.toString()}`)
  }

  return (

    <div className="w-full bg-white border-b">

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        <div className="text-sm text-gray-700">

          <span className="font-medium">
            Showing {filteredProducts.length} Products
          </span>

          {" "}for Result{" "}

          <span className="font-semibold">
            “{keyword}”
          </span>

        </div>

        <div className="flex items-center gap-3">

          <span className="text-sm text-gray-600">
            Sort by:
          </span>

          <Select onValueChange={handleSort}>

            <SelectTrigger className="w-40 bg-white">
              <SelectValue placeholder="Featured" />
            </SelectTrigger>

            <SelectContent>

              <SelectItem value="featured">
                Featured
              </SelectItem>

              <SelectItem value="low">
                Price: Low to High
              </SelectItem>

              <SelectItem value="high">
                Price: High to Low
              </SelectItem>

              <SelectItem value="new">
                Newest
              </SelectItem>

            </SelectContent>

          </Select>

        </div>

      </div>

    </div>

  )
}