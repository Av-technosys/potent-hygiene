"use client";

import { useState } from "react";

export default function AboutProduct() {
    const [selectedTab, setSelectedTab] = useState("Description");

    const tabs = ["Description", "Usage", "Benefits", "Ingredients", "Safety"];

    const tabContent: Record<string, React.ReactNode> = {
        Description: (
            <>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Product Description
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-4xl">
                    Our premium sanitary pads are crafted with 100% organic cotton for
                    maximum comfort and breathability. The ultra-soft top layer stays dry
                    all day while the absorbent core provides reliable leak protection.
                    Each pad features a moisture-wicking surface that keeps you feeling
                    fresh and confident.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-sm font-medium text-gray-800 mb-1">Material</p>
                        <p className="text-sm text-gray-600">Organic</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-800 mb-1">Type</p>
                        <p className="text-sm text-gray-600">Heavy Flow</p>
                    </div>
                </div>
            </>
        ),

        Usage: (
            <>
                <h2 className="text-lg font-semibold mb-4">How to Use</h2>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                    <li>Remove the adhesive strip.</li>
                    <li>Place the pad firmly inside underwear.</li>
                    <li>Change every 4–6 hours for hygiene.</li>
                </ul>
            </>
        ),

        Benefits: (
            <>
                <h2 className="text-lg font-semibold mb-4">Benefits</h2>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                    <li>100% Organic cotton</li>
                    <li>Rash-free guarantee</li>
                    <li>High absorbency core</li>
                    <li>Eco-friendly & biodegradable</li>
                </ul>
            </>
        ),

        Ingredients: (
            <>
                <h2 className="text-lg font-semibold mb-4">Ingredients</h2>
                <p className="text-sm text-gray-600">
                    Organic Cotton, Biodegradable Plant-Based Fiber, Non-Toxic Adhesive.
                </p>
            </>
        ),

        Safety: (
            <>
                <h2 className="text-lg font-semibold mb-4">Safety Information</h2>
                <p className="text-sm text-gray-600">
                    Dermatologically tested. Free from chlorine, fragrance, and harmful
                    chemicals. Dispose responsibly.
                </p>
            </>
        ),
    };

    return (
        <main>
            {/* Tabs */}
            <div className="container mx-auto px-6 py-6 flex justify-center">
                <div className="flex flex-wrap gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                            className={`px-4 py-2 text-sm rounded-full border transition ${selectedTab === tab
                                ? "bg-teal-600 text-white border-teal-600"
                                : "bg-white border-gray-300 hover:border-teal-600"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dynamic Content */}
            <div className="container mx-auto px-10  mb-6 bg-gray-100 rounded-xl border border-gray-200 p-6 md:p-8">
                {tabContent[selectedTab]}
            </div>
        </main>
    );
}