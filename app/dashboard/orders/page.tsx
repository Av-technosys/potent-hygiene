/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { OrderCard } from "@/app/components/common/dashboard-orders/OrderCard";
import { OrderHistoryHeader } from "@/app/components/common/dashboard-orders/OrderHistoryHeader";
import { getOrdersByUserId } from "@/helper/order/action";
import { useEffect, useState } from "react";


export default function OrderHistoryPage() {
  const [ordersData, setOrdersData] = useState<any>([]);
  useEffect(() => {
    const fetchUserOrders = async () => {
      const orders_data = await getOrdersByUserId();
      setOrdersData(orders_data);
    };

    fetchUserOrders();
  }, []);

  if (ordersData.length === 0) {
    return <div>Loading orders...</div>;
  }
  return (
    <div className="space-y-6">
      <OrderHistoryHeader />
      <div className="flex flex-col">
        {ordersData?.map((item: any, index: number) => (
          <OrderCard key={index} order_details={item} />
        ))}
      </div>
    </div>
  );
}
