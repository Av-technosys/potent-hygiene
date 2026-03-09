import { IconChevronRight, IconCoin, IconShoppingBag, IconWallet } from "@tabler/icons-react";

const stats = [
  { 
    label: "Total Orders", 
    value: "12", 
    icon: IconShoppingBag, 
    bg: "bg-[#FFEBEC]", 
    iconCol: "text-[#FF1B27]" 
  },
  { 
    label: "Rewards Coins", 
    value: "450", 
    icon: IconCoin, 
    bg: "bg-[#FEF3C7]", 
    iconCol: "text-[#FFCC00]"
  },
  { 
    label: "Total Spent", 
    value: "₹3,500", 
    icon: IconWallet, 
    bg: "bg-[#DCFCE7]", 
    iconCol: "text-[#00A137]" 
  },
];

export const StatsCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {stats.map((stat) => (
      <div 
        key={stat.label} 
        className="bg-white p-6 rounded-4xl shadow-sm border border-gray-50 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
      >
        <div className="flex justify-between items-start">
          <div className={`${stat.bg} ${stat.iconCol} p-2.5 rounded-2xl flex items-center justify-center`}>
            <stat.icon size={22} stroke={2} />
          </div>
          <IconChevronRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
        </div>
        
        <div className="mt-6">
          <h3 className="text-[26px] font-bold text-[#2D3748] leading-none mb-2">
            {stat.value}
          </h3>
          <p className="text-[14px] text-gray-400 font-semibold tracking-tight uppercase">
            {stat.label}
          </p>
        </div>
      </div>
    ))}
  </div>
);