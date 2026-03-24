/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  IconBuildingStore,
  IconHome,
  IconInfoCircle,
  IconMenu2,
  IconNews,
  IconPhone,
  IconShoppingBag,
  IconSquareRoundedX,
  IconUser,
  IconLayoutDashboard,
  IconHistory,
  IconStar,
  IconShieldLock,
  IconAddressBook,
} from "@tabler/icons-react";
import { useCartStore } from "@/store/cartStore";
import { session } from "@/helper/auth/action";

const navLinks = [
  { name: "Home", href: "/", icon: <IconHome size={20} /> },
  { name: "Shop", href: "/shop", icon: <IconBuildingStore size={20} /> },
  { name: "About", href: "/about", icon: <IconInfoCircle size={20} /> },
  { name: "Blog", href: "/blog", icon: <IconNews size={20} /> },
  { name: "FAQs", href: "/faq", icon: <IconPhone size={20} /> },
];

const dashboardLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <IconLayoutDashboard size={20} />,
  },
  {
    name: "Profile Info",
    href: "/dashboard/profile",
    icon: <IconUser size={20} />,
  },
  {
    name: "Address Book",
    href: "/dashboard/address",
    icon: <IconAddressBook size={20} />,
  },
  {
    name: "Order History",
    href: "/dashboard/orders",
    icon: <IconHistory size={20} />,
  },
  {
    name: "Review & Ratings",
    href: "/dashboard/reviews",
    icon: <IconStar size={20} />,
  },
  {
    name: "Rewards & Security",
    href: "/dashboard/rewards",
    icon: <IconShieldLock size={20} />,
  },
];

export function Navbar() {
  const totalItems = useCartStore((state) => state.totalItems());

  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isDashboard = useMemo(
    () => pathname.startsWith("/dashboard"),
    [pathname],
  );

  const [wishlistCount, setWishlistCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const loadData = () => {
      const raw = localStorage.getItem("wishlist");

      const wishlist = JSON.parse(raw || "[]");

      setWishlistCount(wishlist.length);
    };

    const checkSession = async () => {
      try {
        const res: any = await session();

        const isAuth = res?.authenticated ?? false;
        setIsLoggedIn(isAuth);
      } catch (err) {
        console.log(err);
        setIsLoggedIn(false);
      }
    };

    loadData();
    checkSession();

    window.addEventListener("storage", loadData);
    window.addEventListener("wishlistUpdated", loadData);

    return () => {
      window.removeEventListener("storage", loadData);
      window.removeEventListener("wishlistUpdated", loadData);
    };
  }, []);

  return (
    <nav className="w-full border-b bg-white relative">
      <div className="container mx-auto max-w-7xl flex h-20 items-center justify-between px-4 md:px-16">
        <div className="flex items-center">
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="text-[#1A8D91] p-1">
                  <IconMenu2 size={28} />
                </button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="w-75 bg-white p-0 border-r-0 [&>button]:hidden"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                <div className="flex flex-col h-full">
                  <div className="px-7 pt-6 pb-6">
                    <button
                      onClick={() => setOpen(false)}
                      className="text-[#1A8D91]"
                    >
                      <IconSquareRoundedX size={35} />
                    </button>
                  </div>

                  <div
                    className="flex-1 space-y-1 px-3"
                    key={isDashboard ? "dash-menu" : "main-menu"}
                  >
                    {(isDashboard ? dashboardLinks : navLinks).map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={`flex items-center space-x-4 px-4 py-4 rounded-r-xl transition-all ${
                            isActive
                              ? "bg-[#D1E9EC] text-[#1A8D91] border-l-8 border-[#1A8D91] rounded-md font-semibold"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <span
                            className={
                              isActive ? "text-[#1A8D91]" : "text-gray-500"
                            }
                          >
                            {link.icon}
                          </span>
                          <span className="text-[16px]">{link.name}</span>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="px-3 mb-6">
                    <Link
                      href={
                        isDashboard ? "/" : isLoggedIn ? "/dashboard" : "/login"
                      }
                      onClick={() => setOpen(false)}
                      className="flex items-center space-x-4 px-4 py-4 rounded-r-xl bg-[#D1E9EC] text-[#1A8D91] border-l-8 rounded-md border-[#1A8D91] font-semibold"
                    >
                      {isDashboard ? (
                        <IconHome size={20} />
                      ) : (
                        <IconUser size={20} />
                      )}

                      <span className="text-[16px]">
                        {isDashboard
                          ? "Main Website"
                          : isLoggedIn
                            ? "Account Dashboard"
                            : "Login"}
                      </span>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/" className="hidden md:block shrink-0">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={40}
              className="h-36 w-auto"
            />
          </Link>
        </div>

        <div className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={110}
              height={35}
              className="h-28 w-auto"
            />
          </Link>
        </div>

        <div className="hidden space-x-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#1A8D91] hover:text-[#146e71]"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-3 md:space-x-5 text-[#1A8D91]">
          {/* Cart with Zustand count */}
          <div className="relative">
            <Link href="/cart">
              <IconShoppingBag className="h-5 w-5 cursor-pointer" />
            </Link>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <div className="relative">
            <Link href="/wishlist">
              <Heart className="h-5 w-5 cursor-pointer" />
            </Link>

            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </div>

          <button>
            <Search className="h-5 w-5" />
          </button>

          <Link href={isLoggedIn ? "/dashboard/profile" : "/login"}>
            <Button
              variant="ghost"
              className="hidden md:flex rounded-full bg-[#D1E9EC] px-6 text-[#1A8D91]"
            >
              <User className="mr-2 h-4 w-4" />{" "}
              {isLoggedIn ? "Account" : "Login"}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
