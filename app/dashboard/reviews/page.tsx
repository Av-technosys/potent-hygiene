/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import { MyReviewCard } from "@/app/components/common/dashboard-review/MyReviewCard";
import {
  ReviewCard,
  ReviewHeader,
} from "@/app/components/common/dashboard-review/ReviewHeader";
import { apiFetch } from "@/lib/apiFetch";
import { getUserAllReviews } from "@/helper";

export default function ReviewPage() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(
    ()=>{
      const fetchReviews = async () => {
        const reviews_data:any = await getUserAllReviews();

        setReviews(reviews_data);
      };
      fetchReviews();
    },[]
  )

  // const [pendingReviews] = useState([
  //   {
  //     id: "1",
  //     name: "Organic Cotton Pads - Regular Flow",
  //     orderId: "ORD-2024-1234",
  //     deliveredDate: "2024-03-18",
  //   },
  // ]);

  // const reviews = [
  //   {
  //     id: "rev_1",
  //     product: "Menstrual Cup - Size A",
  //     rating: 5,
  //     date: "May, 2025",
  //     status: "Delivered",
  //     review:
  //       "Absolutely love this product! It is comfortable, easy to use, and eco-friendly. Best purchase I have made for my period care routine.",
  //   },
  //   {
  //     id: "rev_2",
  //     product: "Menstrual Cup - Size A",
  //     rating: 4,
  //     date: "April, 2025",
  //     status: "Delivered",
  //     review:
  //       "Good quality product. Took a couple of tries to get used to it, but now it works perfectly.",
  //   },
  //   {
  //     id: "rev_3",
  //     product: "Menstrual Cup - Size B",
  //     rating: 3,
  //     date: "March, 2025",
  //     status: "Delivered",
  //     review:
  //       "The product is decent, but sizing was slightly off for me. Might try a different size next time.",
  //   },
  
    
  // ];

  return (
    <div className="space-y-6">
      <ReviewHeader />

      {/* Product You Can Review */}

      {/* <div className="bg-white p-6 rounded-[20px] shadow-sm space-y-4">
        <h3 className="text-[16px] font-bold text-[#2D3748]">
          Product You Can Review
        </h3>

        {pendingReviews.map((item) => (
          <ReviewCard key={item.id} product={item} />
        ))}
      </div> */}

      {/* Your Review */}

      <div className="bg-white p-6 rounded-[20px] shadow-sm space-y-4">
        <h3 className="text-[16px] font-bold text-[#2D3748]">Your Review</h3>

        {reviews?.map((review) => (
          <MyReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
