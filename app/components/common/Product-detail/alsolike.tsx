"use client";

import Image from "next/image";
import { Heart, Star } from "lucide-react";

export default function RelatedProducts() {
    const products = [
        { title: "Ultra Soft Sanitary Pads", tag: "Bestseller", image: "/product.png" },
        { title: "Reusable Menstrual Cup", tag: "Eco friendly", image: "/product.png" },
        { title: "Daily Comfort Pantyliners", tag: "Popular", image: "/product.png" },
        { title: "Daily Comfort Pantyliners", tag: "Popular", image: "/product.png" },
        { title: "Daily Comfort Pantyliners", tag: "Popular", image: "/product.png" },
    ];

    return (
        <section className="w-full py-16">
            <div className="container mx-auto px-4">

                {/* Section Title */}
                <h2 className="text-2xl font-semibold text-gray-900 mb-10">
                    You May Also Like
                </h2>

                {/* Laptop: Exact same grid classes as your original code.
                   Mobile: Added 'flex overflow-x-auto' which gets reset by 'md:grid'
                */}
                <div className="flex overflow-x-auto pb-4 gap-6 no-scrollbar md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-6 md:pb-0">

                    {products.map((product, index) => (
                        <div
                            key={index}
                            // Laptop: 'md:w-auto' ensures grid controls the size.
                            // Mobile: 'w-[280px]' and 'flex-shrink-0' enables the scroll.
                            className="bg-white rounded-2xl shadow-md p-4 relative hover:shadow-lg transition flex-shrink-0 w-[280px] md:w-auto md:flex-shrink"
                        >
                            {/* Wishlist */}
                            <button className="absolute top-2 left-2 bg-white rounded-full p-1 shadow">
                                <Heart className="w-4 h-4 text-gray-500" />
                            </button>

                            {/* Discount Badge */}
                            <span className="absolute top-2 right-2 bg-[#168BA0] text-white text-xs px-3 py-1 rounded-full">
                                25% OFF
                            </span>

                            {/* Product Image */}
                            <div className="rounded-xl overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    width={300}
                                    height={220}
                                    className="w-full h-[200px] object-cover"
                                />
                            </div>

                            {/* Tag */}
                            <span className="inline-block mt-4 bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                                {product.tag}
                            </span>

                            {/* Title */}
                            <h3 className="mt-3 text-sm font-medium text-gray-900 leading-snug">
                                {product.title}
                            </h3>

                            {/* Rating */}
                            <div className="flex items-center gap-1 mt-2 text-yellow-400">
                                {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400" />
                                    ))}
                                <span className="text-gray-500 text-xs ml-1">(1.4k)</span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-2 mt-3">
                                <span className="text-lg font-semibold">₹299</span>
                                <span className="text-gray-400 line-through text-sm">
                                    ₹399
                                </span>
                            </div>

                            {/* Button */}
                            <button className="w-full mt-4 bg-[#168BA0] hover:bg-teal-700 text-white text-sm py-2.5 rounded-lg transition">
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}