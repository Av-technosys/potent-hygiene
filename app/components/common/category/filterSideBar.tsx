"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function FiltersSidebar() {
    return (
        <Card className="w-[280px] rounded-2xl shadow-md bg-white">
            <CardContent className="p-5 space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg">Filters</h2>
                    <button className="text-sm text-teal-600 font-medium">
                        Clear All
                    </button>
                </div>

                {/* Product Type */}
                <div>
                    <h3 className="font-medium mb-3">Product Type</h3>
                    <div className="space-y-2 text-sm">
                        {["Sanitary Pads", "Menstrual Cups", "Pantyliners", "Combos"].map((item) => (
                            <div key={item} className="flex items-center gap-2">
                                <Checkbox />
                                <label>{item}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Flow Type */}
                <div>
                    <h3 className="font-medium mb-3">Flow Type</h3>
                    <div className="space-y-2 text-sm">
                        {["Light", "Regular", "Heavy", "Ultra Heavy"].map((item) => (
                            <div key={item} className="flex items-center gap-2">
                                <Checkbox />
                                <label>{item}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Size */}
                <div>
                    <h3 className="font-medium mb-3">Size</h3>
                    <div className="space-y-2 text-sm">
                        {["Small", "Medium", "Large", "Extra Large"].map((item) => (
                            <div key={item} className="flex items-center gap-2">
                                <Checkbox />
                                <label>{item}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Material */}
                <div>
                    <h3 className="font-medium mb-3">Material</h3>
                    <div className="space-y-2 text-sm">
                        {["Organic Cotton", "Medical Grade Silicon", "Synthetic Blend"].map((item) => (
                            <div key={item} className="flex items-center gap-2">
                                <Checkbox />
                                <label>{item}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <h3 className="font-medium mb-3">Price Range</h3>
                    <div className="flex gap-2">
                        <Input placeholder="₹ 0" />
                        <Input placeholder="₹ 1000" />
                    </div>
                </div>

                {/* In Stock */}
                <div className="flex items-center gap-2">
                    <Checkbox />
                    <label className="text-sm">In Stock Only</label>
                </div>

            </CardContent>
        </Card>
    )
}