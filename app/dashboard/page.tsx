import React from 'react'
import { StatsCards } from '../components/common/dashboard/StatsCards';
import { RecentOrders } from '../components/common/dashboard/RecentOrders';
import { RecentRewards } from '../components/common/dashboard/RecentRewards';

export default function DashboardPage() {
  return (
    <>
 
    
      <div className="max-w-[1300px] mx-auto flex items-start gap-8">
        
  

        {/* Right Content Area */}
        <div className="flex-1 w-full">
          
          {/* Component 1: Banner */}
          <div className="bg-linear-to-r from-[#168BA0] to-[#AFE7F1] rounded-2xl p-10 mb-8 text-white shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Welcome back, Nike Johnson!</h1>
              <p className="text-white/80 text-[15px] font-medium">Manage your account, track orders, and earn rewards</p>
            </div>
            {/* Optional decorative circle for banner depth */}
            <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          {/* Component 2: Counter Stats */}
          <StatsCards/>

          {/* Component 3: Recent Orders */}
          <RecentOrders/>

          {/* Component 4: Recent Rewards */}
          <RecentRewards/>
          
        </div>
      </div>
    </>
  );
}