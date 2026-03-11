"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StatsCards } from "../components/common/dashboard/StatsCards";
import { RecentOrders } from "../components/common/dashboard/RecentOrders";
import { RecentRewards } from "../components/common/dashboard/RecentRewards";
import { LogoutButton } from "../components/common/LogoutButton";

export default function DashboardPage() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      router.replace("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/profile?email=${userEmail}`);
        const data = await res.json();

        if (res.ok) {
          setName(data.fullName);
        }
      } catch (error) {
        console.error("User fetch error:", error);
      }
    };

    fetchUser();
  }, [router]);

  return (
    <>
      <div className="max-w-325 mx-auto flex items-start gap-8">
        <div className="flex-1 w-full">

          <div className="bg-linear-to-r from-[#168BA0] to-[#AFE7F1] rounded-2xl p-10 mb-8 text-white shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">
                Welcome back, {name || "User"}
              </h1>

              <p className="text-white/80 text-[15px] font-medium">
                Manage your account, track orders, and earn rewards
              </p>
            </div>

            <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          <StatsCards />
          <RecentOrders />
          <RecentRewards />

          <div className="flex justify-end mt-4">
            <LogoutButton />
          </div>
        </div>
      </div>
    </>
  );
}