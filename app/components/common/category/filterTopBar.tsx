"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterBarProps {
    total: number
    keyword: string
}

export default function FilterBar({ total, keyword }: FilterBarProps) {
    return (
        <div className="w-full ">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* LEFT TEXT */}
                <div className="text-sm text-gray-700">
                    <span className="font-medium">
                        Showing {total} Products
                    </span>{" "}
                    for Result{" "}
                    <span className="font-semibold">“{keyword}”</span>
                </div>

                {/* RIGHT SORT */}
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">Sort by:</span>

                    <Select defaultValue="featured">
                        <SelectTrigger className="w-[140px] h-9 text-sm bg-white">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="featured">Featured</SelectItem>
                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                            <SelectItem value="newest">Newest</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}