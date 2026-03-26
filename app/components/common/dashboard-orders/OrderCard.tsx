import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IconDownload } from "@tabler/icons-react";
import { TrackOrderModal } from "./TrackOrderModal";
import { RaiseSupportModal } from "./RaiseSupportModal";

export const OrderCard = ({ order_details, setorderReview,setSingleOrderData }: { order_details: any, setorderReview: any, setSingleOrderData: any }) => {
  // Variable ko yahan define kiya hai taaki niche logic mein issue na aaye

  const order = order_details;
  const items = order_details?.order_items;

  const isDelivered = order?.status === "delivered";

  const reviewHandler = () => {
    setorderReview(true);
    setSingleOrderData(order_details);
  };

  return (
    <Card className="p-0 border-none shadow-sm bg-white rounded-[20px] overflow-hidden mb-6">
      {/* Header Section: Order ID & Status */}
      <div className="p-6 pb-4 flex justify-between items-start  bg-linear-to-r from-[#FFF1F2] to-[#FFFBEB]">
        <div className="space-y-1 ">
          <div className="flex items-center gap-3 ">
            <h3 className="text-[16px] font-bold text-[#2D3748]">{order.id}</h3>
            <Badge
              className={`${
                isDelivered
                  ? "bg-[#DCFCE7] text-[#15824D]"
                  : "bg-[#DCF7FC] text-[#168BA0]"
              } border-none shadow-none text-[10px] px-2.5 py-0.5 font-bold uppercase`}
            >
              {order.status}
            </Badge>
          </div>
          <p className="text-[13px] text-gray-400 font-medium">
            Ordered on {order.createdAt.toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">
            Total Amount
          </p>
          <p className="text-[18px] font-bold text-[#2D3748]">
            ₹{order.totalAmountPaid}
          </p>
        </div>
      </div>

      {/* Items Section */}
      <div className="px-6  ">
        <div className="flex flex-col gap-4">
          {items?.map((item: any, idx: number) => (
            <div key={idx} className="flex justify-between items-center">
              <div className="flex items-start gap-4">
                <span>{idx + 1}.</span>
                <div className="w-20 h-20">
                  <img
                    src={item.productImage}
                    className="object-cover"
                    alt="product image"
                  />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#2D3748]">
                    {item.productName}
                  </p>
                  <p className="text-[12px] text-gray-400 font-medium">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
              <p className="text-[14px] font-bold text-[#2D3748]">
                ₹{item.productPrice}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tracking Info Section */}
      <div className="px-6  flex justify-between items-center">
        <div>
          {/* <p className="text-[11px] text-gray-400 font-bold uppercase">Tracking Number</p>
          <p className="text-[14px] font-bold text-[#2D3748] tracking-wide">{order.trackingNum}</p> */}
        </div>
        <div className="text-right">
          <p className="text-[11px] text-gray-400 font-bold uppercase">
            {isDelivered ? "Delivered At" : "Delivered At"}
          </p>
          <p className="text-[14px] break-all text-[#2D3748]">
            {order.addressLine1} , {order.addressLine2} <br /> {order.city},
            {order.state},{order.pincode}
          </p>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="p-6 flex flex-col md:flex-row gap-4">
        <Button className="flex-1 bg-[#168BA0] hover:bg-[#168BA0] md:py-5 py-3 rounded-xl font-bold flex gap-2">
          <IconDownload size={18} stroke={2.5} />
          Download Invoice
        </Button>

        {isDelivered && (
          <Button
            onClick={() => reviewHandler()}
            className="flex-1 bg-[#1D4E4E] hover:bg-[#1D4E4E] md:py-5 py-3 rounded-xl font-bold flex gap-2"
          >
            Review
          </Button>
        )}

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
