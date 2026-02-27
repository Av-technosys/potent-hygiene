"use client";

import { Star, ThumbsUp, User } from "lucide-react";

export default function ProductReviews() {
    const ratingBreakdown = [
        { stars: 5, percent: 78 },
        { stars: 4, percent: 15 },
        { stars: 3, percent: 5 },
        { stars: 2, percent: 1 },
        { stars: 1, percent: 1 },
    ];

    const reviews = Array(3).fill({
        name: "Priya S.",
        time: "2 Weeks ago",
        title: "Best pads I have ever used!",
        content:
            "These are incredibly soft and comfortable. No rashes at all, and they last all day. Will definitely be buying again!",
        helpful: 24,
    });

    return (
        <div className="container mx-auto py-10">

            {/* TOP SUMMARY CARD */}
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-8 flex flex-col md:flex-row justify-between gap-10">

                {/* LEFT */}
                <div className="flex-1">
                    <h2 className="text-lg font-semibold mb-4">Customer Reviews</h2>

                    <div className="flex items-center gap-4">
                        <span className="text-4xl font-bold">4.8</span>

                        <div>
                            <div className="flex text-yellow-400">
                                {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400" />
                                    ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">234 Reviews</p>
                        </div>
                    </div>

                    <button className="mt-6 px-5 py-2 text-sm border border-teal-600 text-teal-600 rounded-full hover:bg-teal-50 transition">
                        Write a Review
                    </button>
                </div>

                {/* RIGHT - Breakdown */}
                <div className="flex-1 space-y-3">
                    {ratingBreakdown.map((item) => (
                        <div key={item.stars} className="flex items-center gap-3">
                            <span className="text-sm w-6">{item.stars}</span>
                            <Star className="w-4 h-4 -ml-5 text-yellow-400 fill-yellow-400" />

                            <div className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-teal-600"
                                    style={{ width: `${item.percent}%` }}
                                />
                            </div>

                            <span className="text-xs text-gray-600 w-10 text-right">
                                {item.percent}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* REVIEW LIST */}
            <div className="mt-10 space-y-8">
                {reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-8">

                        <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                                <User className="w-5 h-5 text-teal-600" />
                            </div>

                            <div className="flex-1">

                                {/* Name + Badge */}
                                <div className="flex items-center gap-3">
                                    <p className="font-medium">{review.name}</p>
                                    <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                                        Verified Purchase
                                    </span>
                                </div>

                                {/* Stars + Time */}
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex text-yellow-400">
                                        {Array(5)
                                            .fill(0)
                                            .map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="w-4 h-4 fill-yellow-400"
                                                />
                                            ))}
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        ({review.time})
                                    </span>
                                </div>

                                {/* Title */}
                                <p className="mt-3 font-medium text-sm">
                                    {review.title}
                                </p>

                                {/* Content */}
                                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                    {review.content}
                                </p>

                                {/* Helpful */}
                                <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>Helpful ({review.helpful})</span>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}