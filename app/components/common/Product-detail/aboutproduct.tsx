"use client";

import { useState } from "react";

export default function AboutProduct({ variant }: { variant: any }) {
    const [selectedTab, setSelectedTab] = useState("Description");

    const tabs = ["Description", "Usage", "Benefits", "Ingredients", "Safety"];

    // Find the attribute corresponding to the selected tab
    const selectedAttribute = variant?.attributes?.find((a: any) => a.attribute === selectedTab);

    return (
        <main>
            {/* Tabs */}
            <div className=" py-6 flex justify-center">
                <div className="flex flex-wrap gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                            className={`px-4 py-2 text-sm rounded-full border transition ${selectedTab === tab
                                ? "bg-[#168BA0] text-white border-[#168BA0]"
                                : "bg-white border-gray-300 hover:border-[#168BA0]"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dynamic Content */}
            <div className=" mb-6 bg-gray-100 rounded-xl border border-gray-200 p-6 md:p-8 min-h-[200px]">
                {/* Fixed Heading */}
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    {selectedTab === "Description" ? "Product Description" :
                        selectedTab === "Usage" ? "How to Use" :
                            selectedTab === "Safety" ? "Safety Information" :
                                selectedTab}
                </h2>

                {/* Dynamic Rich Text */}
                {selectedAttribute && selectedAttribute.value ? (
                    <div
                        dangerouslySetInnerHTML={{ __html: selectedAttribute.value }}
                        className="text-sm text-gray-700 leading-relaxed max-w-4xl 
                        [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ul>li]:mb-1 
                        [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4 [&>ol>li]:mb-1 
                        [&>h1]:text-xl [&>h1]:font-semibold [&>h1]:mb-3 [&>h1]:text-gray-900 
                        [&>h2]:text-lg [&>h2]:font-semibold [&>h2]:mb-3 [&>h2]:text-gray-900 
                        [&>h3]:text-base [&>h3]:font-semibold [&>h3]:mb-2 [&>h3]:text-gray-900 
                        [&>p]:mb-4 [&>p:last-child]:mb-0"
                    />
                ) : (
                    <p className="text-sm text-gray-500 italic">
                        No {selectedTab.toLowerCase()} information available for this product variant.
                    </p>
                )}
            </div>
        </main>
    );
}