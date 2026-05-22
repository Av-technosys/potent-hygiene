/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createCancelRequest, createReturnRequest } from "@/helper/order/action";
import { useFileUpload } from "@/helper/useFileUpload";
import { IconDownload, IconRefresh, IconX } from "@tabler/icons-react";
import { TrackOrderModal } from "./TrackOrderModal";
import { RaiseSupportModal } from "./RaiseSupportModal";
import { ChangeEvent, useState, useTransition } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { getImageUrl } from "@/lib/imageUrl";

export const OrderCard = ({ order_details, setorderReview,setSingleOrderData }: { order_details: any, setorderReview: any, setSingleOrderData: any }) => {
  // Variable ko yahan define kiya hai taaki niche logic mein issue na aaye

  const order = order_details;
  const items = order_details?.order_items;

  const isDelivered = order?.status === "delivered";
  const canCancel = ["pending", "paid", "processing"].includes(order?.status) && !order?.cancelRequest;

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
            ₹{order.totalAmount}
          </p>
        </div>
      </div>

      {/* Items Section */}
      <div className="px-6  ">
        <div className="flex flex-col gap-4">
          {items?.map((item: any, idx: number) => (
            <div key={idx} className="flex flex-col gap-3 border-b border-gray-100 py-4 last:border-b-0 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <span>{idx + 1}.</span>
                <div className="relative w-20 h-20 overflow-hidden">
                  <Image
                    src={getImageUrl(item.productImage)}
                    alt="product image"
                    fill
                    sizes="80px"
                    className="object-cover"
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
              <div className="flex flex-col items-start gap-2 md:items-end">
                <p className="text-[14px] font-bold text-[#2D3748]">
                  ₹{item.productPrice}
                </p>
                {isDelivered && (
                  item.returnRequest ? (
                    <Badge className="bg-orange-100 text-orange-700 border-none">
                      Return {item.returnRequest.status ?? "pending"}
                    </Badge>
                  ) : (
                    <ReturnRequestDialog orderItem={item} />
                  )
                )}
              </div>
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

        {canCancel && <CancelRequestDialog orderId={order.id} />}

        {order?.cancelRequest && (
          <Button disabled className="flex-1 bg-orange-100 text-orange-700 hover:bg-orange-100 md:py-5 py-3 rounded-xl font-bold">
            Cancel {order.cancelRequest.status ?? "pending"}
          </Button>
        )}

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

function CancelRequestDialog({ orderId }: { orderId: string }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [isPending, startTransition] = useTransition();

  const submit = () => {
    startTransition(async () => {
      const result = await createCancelRequest(orderId, reason);
      if (result.success) {
        toast.success(result.message);
        setOpen(false);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex-1 bg-red-50 text-red-700 hover:bg-red-100 md:py-5 py-3 rounded-xl font-bold flex gap-2">
          <IconX size={18} stroke={2.5} />
          Cancel Order
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Order</DialogTitle>
          <DialogDescription>Tell us why you want to cancel this order.</DialogDescription>
        </DialogHeader>
        <Textarea
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          placeholder="Reason for cancellation"
        />
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button type="button" disabled={isPending || !reason.trim()} onClick={submit}>
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ReturnRequestDialog({ orderItem }: { orderItem: any }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { upload, uploading } = useFileUpload();

  const submit = () => {
    startTransition(async () => {
      const result = await createReturnRequest(orderItem.id, reason, imageUrls);
      if (result.success) {
        toast.success(result.message);
        setOpen(false);
      } else {
        toast.error(result.message);
      }
    });
  };

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    const uploaded = await Promise.all(files.map((file) => upload(file, "return-requests")));
    setImageUrls((current) => [
      ...current,
      ...uploaded
        .map((file) => file.fileKey)
        .filter(Boolean),
    ]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#1D4E4E] hover:bg-[#1D4E4E] rounded-xl font-bold flex gap-2">
          <IconRefresh size={16} stroke={2.5} />
          Return
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Return Request</DialogTitle>
          <DialogDescription>Share the issue and upload product images for admin review.</DialogDescription>
        </DialogHeader>
        <Textarea
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          placeholder="Reason for return"
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onFileChange}
          className="text-sm"
        />
        {imageUrls.length > 0 && (
          <p className="text-sm text-muted-foreground">{imageUrls.length} image uploaded</p>
        )}
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button type="button" disabled={isPending || uploading || !reason.trim()} onClick={submit}>
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
