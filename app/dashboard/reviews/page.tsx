"use client";

import { MyReviewCard } from "@/app/components/common/dashboard-review/MyReviewCard";
import { ReviewCard, ReviewHeader } from "@/app/components/common/dashboard-review/ReviewHeader";



const PENDING_REVIEWS = [
  { id: "1", name: "Organic Cotton Pads - Regular Flow", orderId: "ORD-2024-1234", deliveredDate: "2024-03-18" },
  { id: "2", name: "Organic Cotton Pads - Regular Flow", orderId: "ORD-2024-1234", deliveredDate: "2024-03-18" },
  { id: "3", name: "Organic Cotton Pads - Regular Flow", orderId: "ORD-2024-1234", deliveredDate: "2024-03-18" },
];

const MY_REVIEWS = [
  { id: "1", name: "Menstrual Cup - Size A", rating: 5, date: "May, 2025", comment: "Absolutely love this product! It is comfortable, easy to use, and eco-friendly. Best purchase I have made for my period care routine." },
  { id: "2", name: "Menstrual Cup - Size A", rating: 5, date: "May, 2025", comment: "Absolutely love this product! It is comfortable, easy to use, and eco-friendly. Best purchase I have made for my period care routine." },
];

export default function ReviewPage() {
  return (
    <div className="space-y-6">
      <ReviewHeader />
      
      <div className="bg-white p-6 rounded-[20px] shadow-sm space-y-4">
        <h3 className="text-[16px] font-bold text-[#2D3748]">Product You Can Review</h3>
        {PENDING_REVIEWS.map((item) => (
          <ReviewCard key={item.id} product={item} />
        ))}
      </div>

      <div className="bg-white p-6 rounded-[20px] shadow-sm space-y-4">
        <h3 className="text-[16px] font-bold text-[#2D3748]">Your Review</h3>
        {MY_REVIEWS.map((review) => (
          <MyReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}