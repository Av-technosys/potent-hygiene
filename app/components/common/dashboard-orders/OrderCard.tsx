import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IconDownload } from "@tabler/icons-react";
import { TrackOrderModal } from "./TrackOrderModal";
import { RaiseSupportModal } from "./RaiseSupportModal";

export const OrderCard = ({ order }: { order: any }) => {
  // Variable ko yahan define kiya hai taaki niche logic mein issue na aaye
  const isDelivered = order.status === "Delivered";

  return (
    <Card className="p-0 border-none shadow-sm bg-white rounded-[20px] overflow-hidden mb-6">
      {/* Header Section: Order ID & Status */}
      <div className="p-6 pb-4 flex justify-between items-start  bg-linear-to-r from-[#FFF1F2] to-[#FFFBEB]">
        <div className="space-y-1 ">
          <div className="flex items-center gap-3 ">
            <h3 className="text-[16px] font-bold text-[#2D3748]">{order.id}</h3>
            <Badge className={`${
              isDelivered ? "bg-[#DCFCE7] text-[#15824D]" : "bg-[#DCF7FC] text-[#168BA0]"
            } border-none shadow-none text-[10px] px-2.5 py-0.5 font-bold uppercase`}>
              {order.status}
            </Badge>
          </div>
          <p className="text-[13px] text-gray-400 font-medium">Ordered on {order.date}</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Total Amount</p>
          <p className="text-[18px] font-bold text-[#2D3748]">{order.total}</p>
        </div>
      </div>

      {/* Items Section */}
      <div className="px-6 py-4 space-y-4 ">
        {order.items.map((item: any, idx: number) => (
          <div key={idx} className="flex justify-between items-center pb-4 border-b border-gray-200 last:border-none last:pb-0">
            <div>
              <p className="text-[14px] font-bold text-[#2D3748]">{item.name}</p>
              <p className="text-[12px] text-gray-400 font-medium">Quantity: {item.quantity}</p>
            </div>
            <p className="text-[14px] font-bold text-[#2D3748]">{item.price}</p>
          </div>
        ))}
      </div>

      {/* Tracking Info Section */}
      <div className="px-6 py- flex justify-between items-center">
        <div>
          <p className="text-[11px] text-gray-400 font-bold uppercase">Tracking Number</p>
          <p className="text-[14px] font-bold text-[#2D3748] tracking-wide">{order.trackingNum}</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-gray-400 font-bold uppercase">
            {isDelivered ? "Delivered On" : "Delivered On"} 
          </p>
          <p className="text-[14px] font-bold text-[#2D3748]">{order.deliveryDate}</p>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="p-6 flex flex-col md:flex-row gap-4">
        <Button className="flex-1 bg-[#168BA0] hover:bg-[#168BA0] md:py-5 py-3 rounded-xl font-bold flex gap-2">
          <IconDownload size={18} stroke={2.5} />
          Download Invoice
        </Button>
        
        {/* State ke hisab se sahi Modal call hoga */}
        {isDelivered ? (
          <RaiseSupportModal order={order} />
        ) : (
          <TrackOrderModal order={order} />
        )}
      </div>
    </Card>
  );
};