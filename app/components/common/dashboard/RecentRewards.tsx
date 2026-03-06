import { IconShoppingCart, IconUserPlus } from '@tabler/icons-react';
import Link from 'next/link';

const rewards = [
  { id: 1, title: "Order ORD-2024-1234", date: "3/15/2024", icon: IconShoppingCart, amount: "+68 Coins", color: "bg-[#FFDFDF] text-[#FF0000]" },
  { id: 2, title: "Friend Emma Joined", date: "3/15/2024", icon: IconUserPlus, amount: "+68 Coins", color: "bg-[#FEF3C7] text-[#D97706]" },
  { id: 3, title: "Order ORD-2024-1234", date: "3/15/2024", icon: IconShoppingCart, amount: "+68 Coins", color: "bg-[#FFDFDF] text-[#FF0000]" },
];

export const RecentRewards = () => (
  <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 mt-6">
    <div className="flex justify-between items-center mb-5">
      <h2 className="text-[16px] font-bold text-[#333333] uppercase tracking-wide">Recent Rewards</h2>
      <Link href="/rewards" className="text-[12px] font-bold text-[#168BA0] hover:underline">View All</Link>
    </div>
    <div className="flex flex-col gap-3">
      {rewards.map((reward) => (
        <div key={reward.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl">
          <div className="flex items-center gap-4">
            <div className={`${reward.color} p-2.5 rounded-[12px]`}>
              <reward.icon size={20} stroke={2} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#666666]">{reward.title}</p>
              <p className="text-[11px] text-[#666666] font-medium">{reward.date}</p>
            </div>
          </div>
          <span className="font-bold text-[#DD7706] ml-5 text-sm">{reward.amount}</span>
        </div>
      ))}
    </div>
  </section>
);