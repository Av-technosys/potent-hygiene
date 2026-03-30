/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { OrderCard } from "@/app/components/common/dashboard-orders/OrderCard";
import { OrderHistoryHeader } from "@/app/components/common/dashboard-orders/OrderHistoryHeader";
import { getOrdersByUserId } from "@/helper/order/action";
import { useEffect, useState } from "react";
import { OrderReview } from "./OrderReview";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrderHistoryPage() {
  const [ordersData, setOrdersData] = useState<any>([]);
  const [orderReview, setOrderReview] = useState(false);
  const [singleOrderData, setSingleOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const orders_data = await getOrdersByUserId();
        setOrdersData(orders_data || []);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  // ✅ 1. Review Screen (highest priority)
  if (orderReview) {
    return (
      <OrderReview
        orderDetails={singleOrderData}
        setOrderReview={setOrderReview}
        onClick={() => router.back()}
      />
    );
  }

  // ✅ 2. Loading
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="p-6 border-none shadow-sm bg-white rounded-[15px]">
          <div className="space-y-2">
            <Skeleton className="h-5 w-40 bg-gray-300" />
            <Skeleton className="h-4 w-56 bg-gray-200" />
          </div>
        </Card>

        {[...Array(3)].map((_, i) => (
          <Card
            key={i}
            className="p-0 border-none shadow-sm bg-white rounded-[20px] overflow-hidden"
          >
            <div className="p-6 pb-4 flex justify-between bg-gray-100">
              <Skeleton className="h-5 w-32 bg-gray-300" />
              <Skeleton className="h-5 w-20 bg-gray-200" />
            </div>

            <div className="p-6 space-y-4">
              <Skeleton className="h-20 w-full bg-gray-200" />
              <Skeleton className="h-20 w-full bg-gray-200" />
            </div>

            <div className="p-6 flex gap-4">
              <Skeleton className="h-12 w-full bg-gray-300" />
              <Skeleton className="h-12 w-full bg-gray-200" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // ✅ 3. Empty State (ONLY AFTER LOADING)
  if (!ordersData || ordersData.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No orders found 📦
      </div>
    );
  }

  // ✅ 4. Actual UI
  return (
    <div className="space-y-6">
      <OrderHistoryHeader />

      <div className="flex flex-col">
        {ordersData.map((item: any, index: number) => (
          <OrderCard
            key={index}
            order_details={item}
            setorderReview={setOrderReview}
            setSingleOrderData={setSingleOrderData}
          />
        ))}
      </div>
    </div>
  );
}