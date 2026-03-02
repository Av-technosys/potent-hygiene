"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Star } from "lucide-react"

const products = new Array(8).fill({
    title: "Ultra Soft Sanitary Pads",
    price: 299,
    oldPrice: 399,
    rating: 4.5,
    reviews: "1.4k",
    badge: "25% OFF",
    tag: "Bestseller",
    image: "/product.png", // replace with your image
})

export default function CategoryProducts() {
    return (
        <div className="grid grid-cols-4 gap-6 flex-1">
            {products.map((product, index) => (
                <Card
                    key={index}
                    className="rounded-2xl bg-white shadow-md hover:shadow-lg transition-all"
                >
                    <CardContent className="p-4 space-y-3">

                        {/* Image Section */}
                        <div className="relative rounded-xl overflow-hidden bg-gray-50">

                            {/* Heart Icon */}
                            <button className="absolute top-3 left-3 bg-white rounded-full p-1 shadow-sm">
                                <Heart size={16} className="text-gray-600" />
                            </button>

                            {/* Discount Badge */}
                            <span className="absolute top-3 right-3 bg-teal-600 text-white text-xs px-2 py-1 rounded-full">
                                {product.badge}
                            </span>

                            <div className="flex justify-center p-6">
                                <Image
                                    src={product.image}
                                    alt="product"
                                    width={120}
                                    height={120}
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Tag */}
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full w-fit">
                            {product.tag}
                        </span>

                        {/* Title */}
                        <h3 className="text-sm font-semibold leading-tight">
                            {product.title}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-1 text-sm">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{product.rating}</span>
                            <span className="text-gray-500">({product.reviews})</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-base">
                                ₹{product.price}
                            </span>
                            <span className="text-gray-400 line-through text-sm">
                                ₹{product.oldPrice}
                            </span>
                        </div>

                        {/* Add to Cart */}
                        <Button className="w-full bg-teal-600 hover:bg-teal-700">
                            Add to Cart
                        </Button>

                    </CardContent>
                </Card>
            ))}
        </div>
    )
}