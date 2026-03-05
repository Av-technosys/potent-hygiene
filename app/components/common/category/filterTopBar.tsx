"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SlidersHorizontal } from "lucide-react"

interface FilterBarProps {
  total: number
  keyword: string
}

export default function FilterBar({ total, keyword }: FilterBarProps) {
  return (
    <div className="w-full bg-white border-b">

      <div className="max-w-7xl mx-auto px-4 py-3">

       {/* ✅ MOBILE VIEW */}
<div className="flex items-center gap-3 md:hidden">

  {/* All */}
  <Button
    variant="outline"
    className="rounded-full border-gray-300 bg-white hover:bg-gray-50"
  >
    All
  </Button>

  {/* Sort By */}
  <Select>
    <SelectTrigger className="rounded-full border-gray-300 bg-white hover:bg-gray-50">
      <SelectValue placeholder="Sort by" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="featured">Featured</SelectItem>
      <SelectItem value="low">Price: Low to High</SelectItem>
      <SelectItem value="high">Price: High to Low</SelectItem>
      <SelectItem value="new">Newest</SelectItem>
    </SelectContent>
  </Select>

  {/* Filter */}
  <Select>
    <SelectTrigger className="rounded-full border-gray-300 bg-white hover:bg-gray-50">
      <SelectValue placeholder="Filter" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">All</SelectItem>
      <SelectItem value="pads">Sanitary Pads</SelectItem>
      <SelectItem value="cups">Menstrual Cups</SelectItem>
      <SelectItem value="liners">Pantyliners</SelectItem>
    </SelectContent>
  </Select>

</div>
        {/* ✅ DESKTOP VIEW */}
        <div className="hidden md:flex items-center justify-between">

          <div className="text-sm text-gray-700">
            <span className="font-medium">
              Showing {total} Products
            </span>{" "}
            for Result{" "}
            <span className="font-semibold">“{keyword}”</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Sort by:</span>

            <Select defaultValue="featured">
              <SelectTrigger className="w-40 bg-white">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="low">Low to High</SelectItem>
                <SelectItem value="high">High to Low</SelectItem>
                <SelectItem value="new">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>

      </div>
    </div>
  )
} 