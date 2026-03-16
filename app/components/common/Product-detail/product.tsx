/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Star, Minus, Plus } from "lucide-react";
import Image from "next/image";

export default function ProductDetailPage({ variants,product}: any ) {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("Medium (280mm)");
    const [selectedFlow, setSelectedFlow] = useState("Regular Flow");
    const [selectedPlan, setSelectedPlan] = useState("2");


const selectedVariant = product?.variants?.[0];
    // Size extraction logic (Aapne jo pehle likha tha)
    const dynamicSizes = Array.from(new Set(
        variants?.flatMap((v: any) => {
            const sizeAttr = v.attributes?.find((a: any) => a.attribute === "size");
            return sizeAttr ? sizeAttr.value.split(",").map((s: string) => s.trim()) : [];
        }).filter(Boolean)
    ));

    // Flow extraction logic (Ab dynamic hai)
    const dynamicFlows = Array.from(new Set(
        variants?.flatMap((v: any) => {
            const flowAttr = v.attributes?.find((a: any) => a.attribute === "flow");
            return flowAttr ? flowAttr.value.split(",").map((s: string) => s.trim()) : [];
        }).filter(Boolean)
    ));

    // Discount percentage calculate karne ke liye
    const discount = selectedVariant?.strikethroughPrice && selectedVariant?.basePrice 
        ? Math.round(((selectedVariant.strikethroughPrice - selectedVariant.basePrice) / selectedVariant.strikethroughPrice) * 100)
        : 0;

        
    return (
        <div className="min-h-screen py-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* LEFT SIDE */}
                <div>
                    <div className=" ">
                        <Image
                        unoptimized
                            src={selectedVariant?.bannerImage}
                            alt="Product"
                            width={600}
                            height={500}
                            className="rounded-xl object-contain"
                        />
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-2 mt-8">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className="bg-white rounded-lg flex items-center justify-center"
                            >
                                <Image
                                    className="rounded-lg"
                                    src={"/product.png"}
                                    alt="thumb"
                                    width={100}
                                    height={100}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="space-y-6">

                    {/* Tags */}
                    <div className="flex gap-2">
                        <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full">
                            Bestseller
                        </span>
                        <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                            Organic
                        </span>
                    </div>

                    {/* Title */}
                    <div>
                        <h1 className="text-2xl font-semibold">
                           {variants?.[0]?.name}
                        </h1>
                        <p className="text-gray-500 text-sm">
                            {variants?.[0]?.description}
                        </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">4.7</span>
                        <span className="text-gray-500">| 1,248 reviews</span>
                    </div>

                    {/* Feature Badges */}
                    <div className="flex flex-wrap gap-2">
                        {[
                            "Organic Cotton Top Layer",
                            "Rash-Free Guarantee",
                            "High Absorbency",
                            "Biodegradable Materials",
                            "Dermatologically Tested",
                        ].map((feature) => (
                            <span
                                key={feature}
                                className="bg-[#F0FDFA] text-[#168BA0] text-xs px-3 py-1 rounded-full"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>

                    {/* Price */}
                   <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-[#168BA0]">₹{selectedVariant?.basePrice}</span>
                        {selectedVariant?.strikethroughPrice && (
                            <>
                                <span className="line-through text-gray-400">₹{selectedVariant?.strikethroughPrice}</span>
                                <span className="bg-[#DCFCE7] text-[#15803D] text-xs px-2 py-1 rounded-md">
                                    Save {discount} %
                                </span>
                            </>
                        )}
                    </div>
                    {/* Size Selection */}
                    <div>
                        <p className="text-sm font-medium mb-2">Select size</p>
                        <div className="flex flex-wrap gap-2">
                            {dynamicSizes.map((size: any) => (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 text-sm rounded-full border transition ${
                                        selectedSize === size
                                        ? "bg-[#168BA0] text-white border-[#168BA0]"
                                        : "bg-white border-gray-300 hover:border-[#168BA0]"
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Flow Type - NOW DYNAMIC */}
                    <div>
                        <p className="text-sm font-medium mb-2">Flow Type</p>
                        <div className="flex flex-wrap gap-2">
                            {dynamicFlows.map((flow: any) => (
                                <button
                                    key={flow}
                                    type="button"
                                    onClick={() => setSelectedFlow(flow)}
                                    className={`px-4 py-2 text-sm rounded-full border transition ${
                                        selectedFlow === flow
                                        ? "bg-[#168BA0] text-white border-[#168BA0]"
                                        : "bg-white border-gray-300 hover:border-[#168BA0]"
                                    }`}
                                >
                                    {flow}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div>
                        <p className="text-sm font-medium mb-2">Quantity</p>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded-full">
                                <button
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    className="p-2"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="px-4">{quantity}</span>
                                <button
                                    onClick={() => setQuantity((q) => q + 1)}
                                    className="p-2"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">
                        <button className="flex-1 bg-[#168BA0] hover:bg-[#44a4b5] text-white py-3 rounded-xl">
                            Add to Cart
                        </button>
                        <button className="flex-1 bg-black text-white py-3 rounded-xl">
                            Buy Now
                        </button>
                    </div>

                    {/* Subscription Section */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
                        <h2 className="font-semibold text-lg">Choose your Frequency</h2>
                        <p className="text-sm text-gray-500">
                            Subscribe & Get more discount
                        </p>

                        {[
                            { id: "1", label: "Monthly Subscription", price: "₹239" },
                            { id: "2", label: "Every 2 Months", price: "₹229" },
                            { id: "3", label: "Every 3 Months", price: "₹219" },
                        ].map((plan) => (
                            <div
                                key={plan.id}
                                onClick={() => setSelectedPlan(plan.id)}
                                className={`flex justify-between items-center border p-4 rounded-xl cursor-pointer ${
                                    selectedPlan === plan.id
                                    ? "border-teal-600 bg-teal-50"
                                    : "border-gray-200"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        checked={selectedPlan === plan.id}
                                        readOnly
                                    />
                                    <span className="text-sm">{plan.label}</span>
                                </div>
                                <span className="font-medium">{plan.price}</span>
                            </div>
                        ))}

                        <div className="flex justify-between items-center pt-4">
                            <span className="text-xl font-bold">₹239</span>
                            <button className="bg-[#168BA0] text-white px-6 py-3 rounded-xl">
                                Add to Cart
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}