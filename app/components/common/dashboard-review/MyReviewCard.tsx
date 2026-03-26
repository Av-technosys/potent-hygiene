import { Badge } from "@/components/ui/badge";
import { IconStarFilled } from "@tabler/icons-react";
import { Star, ThumbsUp, User } from "lucide-react";

export const MyReviewCard = ({ review }: { review: any }) => (

  <div className="border-b border-gray-200 pb-8">
    <div className="flex items-start gap-4">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
        <User className="w-5 h-5 text-teal-600" />
      </div>

      <div className="flex-1">
        {/* Name + Badge */}
        <div className="flex items-center gap-3">
          <p className="font-medium">{review.name}</p>
          <span className={`text-xs ${review.isAdminApproved ? "bg-green-100 text-green-600" : "bg-yellow-100 text-gray-600"} px-2 py-1 rounded-full`}>
            {review.isAdminApproved ? "Approved" : "Pending"}
          </span>
        </div>

        {/* Stars + Time */}
        <div className="flex items-center gap-2 mt-1">
          <div className="flex text-yellow-400">
            {Array(review.rating)
              .fill(0)
              .map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400" />
              ))}
          </div>
          <span className="text-xs text-gray-500">
            ({review.createdAt.toDateString()})
          </span>
        </div>

        {/* Title */}
        {/* <p className="mt-3 font-medium text-sm">
                                    {review.title}
                                </p> */}

        {/* Content */}
        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
          {review.message}
        </p>

        <div className="w-full mt-3 flex items-center gap-2">
          {review?.media?.map((media: any, index: number) => (
            // console.log(`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${media.mediaURL}`)
            <img
              className="w-20 h-20 rounded-md"
              key={index}
              src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${media.mediaURL}`}
              alt="reviewImage"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);
