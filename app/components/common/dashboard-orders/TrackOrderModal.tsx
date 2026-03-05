import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconTruck, IconCircle, IconCircleCheckFilled } from "@tabler/icons-react";

export const TrackOrderModal = ({ order }: { order: any }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" className="flex-1 border-[#1B8392] text-[#1B8392] py-3 md:py-5 rounded-xl font-bold flex gap-2 hover:bg-cyan-50">
        <IconTruck size={18} stroke={2.5} />
        Track Order
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[400px] rounded-xl p-4">
      <DialogHeader>
        <DialogTitle className="text-[18px] font-bold text-[#2D3748]">Track Order</DialogTitle>
      </DialogHeader>
      
      <div className="bg-[#E2F2F5] p-4 rounded-xl mb-3 mt-1">
        <p className="font-bold text-[#2D3748] text-[14px]">Order: {order.id}</p>
        <p className="text-[12px] text-gray-500 font-medium">Date: 23/05/2025</p>
      </div>

      <div className="space-y-0 relative ml-2">
        {/* Vertical Line */}
        <div className="absolute left-[9px] top-2 bottom-2 w-[2px] bg-gray-100" />
        
        {/* Status Steps */}
        {[
          { label: "Order Confirmed, 23/05/2025", done: true },
          { label: "Order Shipped, 23/05/2025", done: true },
          { label: "Out for Delivery", done: false },
          { label: "Delivered", done: false },
        ].map((step, idx) => (
          <div key={idx} className="flex items-start gap-4 pb-8 last:pb-0 relative z-10">
            {step.done ? (
              <IconCircleCheckFilled size={20} className="text-[#067D38] bg-white" />
            ) : (
              <IconCircle size={20} className="text-gray-300 bg-white" />
            )}
            <p className={`text-[14px] font-bold ${step.done ? "text-gray-500" : "text-gray-300"}`}>
              {step.label}
            </p>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full border-[#168BA0] text-[#168BA0] h-12 rounded-xl mt-6 font-bold uppercase tracking-wider">
        Cancel
      </Button>
    </DialogContent>
  </Dialog>
);