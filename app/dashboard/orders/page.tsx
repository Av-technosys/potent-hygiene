"use client";

import { OrderCard } from "@/app/components/common/dashboard-orders/OrderCard";
import { OrderHistoryHeader } from "@/app/components/common/dashboard-orders/OrderHistoryHeader";


const ORDERS_DATA = [
  {
    id: "ORD-2024-1234",
    status: "In transit",
    date: "March 15, 2024",
    total: "₹699.00",
    trackingNum: "TRK123456789",
    deliveryDate: "3/18/2024",
    items: [
      { name: "Organic Cotton Pads - Regular Flow", quantity: 1, price: "₹499.00" },
      { name: "pH Balance Intimate Wash", quantity: 1, price: "₹200.00" }
    ]
  },
  {
    id: "ORD-2024-1235",
    status: "Delivered",
    date: "March 15, 2024",
    total: "₹699.00",
    trackingNum: "TRK123456789",
    deliveryDate: "3/18/2024",
    items: [
      { name: "Organic Cotton Pads - Regular Flow", quantity: 1, price: "₹499.00" },
      { name: "pH Balance Intimate Wash", quantity: 1, price: "₹200.00" }
    ]
  }
];

export default function OrderHistoryPage() {
  return (
    <div className="space-y-6">
      <OrderHistoryHeader />
      <div className="flex flex-col">
        {ORDERS_DATA.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}