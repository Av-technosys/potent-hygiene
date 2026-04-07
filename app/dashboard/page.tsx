
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/page.tsx

import { getUserProfile } from "@/helper";
import { redirect } from "next/navigation";

import { StatsCards } from "../components/common/dashboard/StatsCards";
import { RecentOrders } from "../components/common/dashboard/RecentOrders";


export default async function DashboardPage() {
  let data;

  try {
    data = await getUserProfile();
  } catch (err: any) {
    if (err.message === "UNAUTHORIZED") {
      redirect("/login");
    }
    throw err;
  }

  return (
    <div className="max-w-325 mx-auto flex items-start gap-8">
      <div className="flex-1 w-full">

        {/* HEADER */}
        <div className="bg-linear-to-r from-[#168BA0] to-[#AFE7F1] rounded-2xl p-10 mb-8 text-white shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">
              Welcome back, {data.user.fullName || "User"}
            </h1>

            <p className="text-white/80 text-[15px] font-medium">
              Manage your account, track orders
            </p>
          </div>
        </div>

        {/* STATS */}
        <StatsCards stats={data.stats} />

        {/* ORDERS */}
        <RecentOrders orders={data.orders} />

        {/* <RecentRewards/> */}
      </div>
    </div>
  );
}