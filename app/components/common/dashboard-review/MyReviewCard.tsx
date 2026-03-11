import { Badge } from "@/components/ui/badge";
import { IconStarFilled } from "@tabler/icons-react";

export const MyReviewCard = ({ review }: { review: any }) => (
  <div className="p-5  rounded-md space-y-3 relative mb-4  border border-gray-200 ">
    <div className="flex justify-between items-start ">
      <div className="space-y-1">
        <p className="text-[14px] font-bold text-[#2D3748]">
          {review.productName}
        </p>

        <div className="flex items-center gap-1">
          {[...Array(review.rating)].map((_, i) => (
            <IconStarFilled key={i} size={14} className="text-[#FFD700]" />
          ))}

          <span className="text-[11px] text-gray-400 ml-2 font-medium">
            {review.deliveredDate}
          </span>
        </div>
      </div>

      <Badge className="bg-[#DCFCE7] text-[#15824D] border-none shadow-none text-[10px] font-bold">
        Delivered
      </Badge>
    </div>

    <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
      {review.comment}
    </p>
  </div>
);