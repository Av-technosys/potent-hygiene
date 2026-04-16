"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconLayoutDashboard,
  IconUser,
  IconAddressBook,
  IconHistory,
  IconStar,
  IconGift,
  IconUsers,
} from "@tabler/icons-react";
import { LogoutButton } from "../LogoutButton";

export const DashboardSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { icon: IconLayoutDashboard, label: "Dashboard", href: "/dashboard" },
    {
      icon: IconUser,
      label: "Profile Information",
      href: "/dashboard/profile",
    },
    {
      icon: IconAddressBook,
      label: "Address Book",
      href: "/dashboard/address",
    },
    { icon: IconHistory, label: "Order History", href: "/dashboard/orders" },
    { icon: IconStar, label: "Review & Rating", href: "/dashboard/reviews" },
    {
      icon: IconGift,
      label: "Rewards & Security",
      href: "/dashboard/security",
    },
    { icon: IconUsers, label: "Referral Program", href: "/dashboard/referral" },
  ];

  return (
    <aside className="w-72 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hidden lg:block sticky top-8 h-fit">
      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                ? "bg-[#C9E6EA] text-[#333333] font-semibold"
                : "text-[#333333] hover:bg-gray-50"
                }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-[#168BA0] rounded-l-md" />
              )}
              <item.icon
                size={20}
                stroke={1.5}
                className={
                  isActive ? "text-[#168BA0]" : "group-hover:scale-110"
                }
              />
              <span className="text-[14px]">{item.label}</span>
            </Link>
          );
        })}
        <div className="mt-4 pt-2 border-t border-gray-100">
          <LogoutButton />
        </div>
      </nav>
    </aside>
  );
};
