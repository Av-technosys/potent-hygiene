"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const products = [
    { id: 1, title: "Sanitary Pads", img: "/product.png", badge: "25% OFF", tag: "Bestseller" },
    { id: 2, title: "Menstrual Cup", img: "/product.png", badge: "25% OFF", tag: "New" },
    { id: 3, title: "Pantyliners", img: "/product.png", badge: "25% OFF", tag: "Popular" },
    { id: 4, title: "Combo", img: "/product.png", badge: "25% OFF", tag: "Value Pack" },
    { id: 5, title: "Menstrual Cup", img: "/product.png", badge: "25% OFF", tag: "Reusable" },
    { id: 6, title: "Combo", img: "/product.png", badge: "25% OFF", tag: "Bundle" },
    { id: 7, title: "Sanitary Pads", img: "/product.png", badge: "25% OFF", tag: "Organic" },
    { id: 8, title: "Pantyliners", img: "/product.png", badge: "25% OFF", tag: "Soft" },
]

export default function CategoryProducts() {
    return (
        <div className="grid grid-cols-4 gap-6 flex-1">

            {products.map((product) => (
                <Card
                    key={product.id}
                    className="rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-white"
                >
                    <CardContent className="p-4 space-y-3">

                        {/* Badge */}
                        <div className="flex justify-end">
                            <span className="bg-teal-600 text-white text-xs px-3 py-1 rounded-full">
                                {product.badge}
                            </span>
                        </div>

                        {/* Image */}
                        <div className="flex justify-center  ">
                            <Image
                                src={product.img}
                                alt={product.title}
                                width={120}
                                height={120}
                                className="object-contain"
                            />
                        </div>

                        {/* Tag */}
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                            {product.tag}
                        </span>

                        {/* Title */}
                        <h3 className="font-semibold text-sm">{product.title}</h3>

                        {/* Button */}
                        <Button className="w-full bg-teal-600 hover:bg-teal-700">
                            View all
                        </Button>

                    </CardContent>
                </Card>
            ))}

        </div>
    )
}