import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { IconPencil, IconStarFilled } from "@tabler/icons-react";

export const WriteReviewModal = ({ product }: { product: any }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button className="bg-[#168BA0] hover:bg-[#2494a8] h-11 px-6 rounded-xl font-semibold flex max-sm:w-full gap-2">
        <IconPencil size={18} />
        Write a review
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[400px] rounded-xl p-4">
      <DialogHeader>
        <DialogTitle className="text-[18px] font-semibold text-[#2D3748]">Write a Review</DialogTitle>
      </DialogHeader>

      <div className="bg-[#E9F7F9] p-4 rounded-xl my-1">
        <p className="font-bold text-[#2D3748] text-[14px]">Order: {product.orderId}</p>
        <p className="text-[12px] text-gray-500 font-medium">Date: 23/05/2025</p>
      </div>

      <div className="space-y-2 text-center">
        <div className="space-y-1">
          <label className="text-[14px] font-semibold text-[#333333] block text-left">Your Rating</label>
          <div className="flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <IconStarFilled key={i} size={26} className="text-[#FFD400] cursor-pointer hover:scale-110 transition-transform" />
            ))}
          </div>
        </div>

        <div className="space-y-2 text-left">
          <label className="text-[14px] font-semibold text-[#333333]">Your Review</label>
          <Textarea 
            placeholder="Share your experience with this product..."
            className="min-h-[80px] rounded-xl border-gray-100 focus-visible:ring-[#1B8392]"
          />
          <p className="text-[10px] text-gray-400 font-semibold uppercase">0/500 Words</p>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <Button className="flex-1 bg-[#1B8392] hover:bg-[#168BA0] h-12 rounded-md font-bold">Submit</Button>
        <Button variant="outline" className="flex-1 border-[#1B8392] text-[#1B8392] h-12 rounded-md font-bold">Cancel</Button>
      </div>
    </DialogContent>
  </Dialog>
);