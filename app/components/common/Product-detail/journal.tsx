"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";

export default function JournalsSection() {
    const articles = [1, 2, 3];

    return (
        <section className="w-full  py-20">
            <div className=" mx-auto ">

                {/* Header */}
                <div className="text-center mb-14">
                    <h2 className="text-4xl font-semibold text-gray-900 mb-4">
                        Journals
                    </h2>
                    <p className="text-gray-600 text-base">
                        Tips, guides, and insights for your menstrual health journey.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {articles.map((item, index) => (
                        <div key={index} className="group">

                            {/* Image */}
                            <div className="relative rounded-2xl overflow-hidden">
                                <Image
                                    src="/journal.png" // replace with your uploaded image
                                    alt="Journal"
                                    width={400}
                                    height={260}
                                    className="w-full h-[260px] object-cover group-hover:scale-105 transition duration-500"
                                />

                                {/* Category Badge */}
                                <span className="absolute top-4 left-4 bg-purple-500 text-white text-xs px-3 py-1 rounded-full">
                                    Wellness
                                </span>
                            </div>

                            {/* Date */}
                            <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                                <Calendar className="w-4 h-4 text-teal-600" />
                                Jan 15, 2026
                            </div>

                            {/* Title */}
                            <h3 className="mt-3 text-lg font-semibold text-gray-900 leading-snug">
                                Understanding Your Menstrual Cycle: A Complete Guide
                            </h3>

                            {/* Description */}
                            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                                Learn about the four phases of your menstrual cycle and how to
                                work with your body for optimal wellness.
                            </p>
                        </div>
                    ))}
                </div>

                {/* Button */}
                <div className="flex justify-center mt-16">
                    <button className="px-8 py-3 border-2 border-teal-600 text-teal-600 rounded-full hover:bg-teal-600 hover:text-white transition duration-300 shadow-sm">
                        View All Articles
                    </button>
                </div>

            </div>
        </section>
    );
}