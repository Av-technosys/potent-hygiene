/* eslint-disable @typescript-eslint/no-explicit-any */

import { OrderCard } from "@/app/components/common/dashboard-orders/OrderCard";
import { OrderHistoryHeader } from "@/app/components/common/dashboard-orders/OrderHistoryHeader";
import { getOrdersByUserId } from "@/helper/order/action";

export const dynamic = "force-dynamic"; 
export const revalidate = 60; 

export default async function OrderHistoryPage() {
  let ordersData: any[] = [];

  try {
    const data: any = await getOrdersByUserId();
    ordersData = data || [];
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    ordersData = [];
  }


  if (!ordersData || ordersData.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No orders found 📦
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <OrderHistoryHeader />

      <div className="flex flex-col">
        {ordersData.map((item: any, index: number) => (
          <OrderCard key={index} order_details={item} />
        ))}
      </div>
    </div>
  );
}