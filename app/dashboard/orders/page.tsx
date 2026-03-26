/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { OrderCard } from "@/app/components/common/dashboard-orders/OrderCard";
import { OrderHistoryHeader } from "@/app/components/common/dashboard-orders/OrderHistoryHeader";
import { getOrdersByUserId } from "@/helper/order/action";
import { useEffect, useState } from "react";
import { OrderReview } from "./OrderReview";
import { useRouter } from "next/navigation";


export default function OrderHistoryPage() {
  const [ordersData, setOrdersData] = useState<any>([]);
  const [orderReview,setOrderReview] = useState(false);
  const [singleOrderData, setSingleOrderData] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUserOrders = async () => {
      const orders_data = await getOrdersByUserId();
      setOrdersData(orders_data);
    };

    fetchUserOrders();
  }, []);

  if (!ordersData || ordersData.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No orders found 📦
      </div>
    );
  }

    if (orderReview) {
    return (
      <OrderReview
        orderDetails={singleOrderData}
        setOrderReview={setOrderReview}
        onClick={() => router.back()}
      />
    );
  }
  return (
    <div className="space-y-6">
      <OrderHistoryHeader />

      <div className="flex flex-col">
        {ordersData?.map((item: any, index: number) => (
          <OrderCard key={index} order_details={item} setorderReview={setOrderReview} setSingleOrderData={setSingleOrderData} />
        ))}
      </div>
    </div>
  );
}