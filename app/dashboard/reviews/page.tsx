/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import { MyReviewCard } from "@/app/components/common/dashboard-review/MyReviewCard";
import {
  ReviewCard,
  ReviewHeader,
} from "@/app/components/common/dashboard-review/ReviewHeader";
import { apiFetch } from "@/lib/apiFetch";

export default function ReviewPage() {

  const [reviews, setReviews] = useState<any[]>([]);

  const [pendingReviews] = useState([
    {
      id: "1",
      name: "Organic Cotton Pads - Regular Flow",
      orderId: "ORD-2024-1234",
      deliveredDate: "2024-03-18",
    },
  ]);

useEffect(() => {
  const loadReviews = async () => {
    try {
      const res = await apiFetch("/reviews");

      if (res.status === 200) {
        setReviews(res.data);
      } else {
        console.error("❌ Failed to fetch reviews:", res.data);
      }

    } catch (error) {
      console.error("💥 Error fetching reviews:", error);
    }
  };

  loadReviews();
}, []);
  return (
    <div className="space-y-6">
      <ReviewHeader />

      {/* Product You Can Review */}

      <div className="bg-white p-6 rounded-[20px] shadow-sm space-y-4">
        <h3 className="text-[16px] font-bold text-[#2D3748]">
          Product You Can Review
        </h3>

        {pendingReviews.map((item) => (
          <ReviewCard key={item.id} product={item} />
        ))}
      </div>

      {/* Your Review */}

      <div className="bg-white p-6 rounded-[20px] shadow-sm space-y-4">
        <h3 className="text-[16px] font-bold text-[#2D3748]">
          Your Review
        </h3>

        {reviews.map((review) => (
          <MyReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}