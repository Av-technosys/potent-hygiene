/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useWishlistStore } from "@/store/WishlistStore";
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
import { isUserLoggedIn } from "@/helper/auth/action";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { getImageUrl } from "@/lib/imageUrl";
import { syncWishlistFromDB } from "@/store/WishlistActions";
import { syncCartFromDB } from "@/store/cartActions";

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

  const wishlistCount = useWishlistStore((state) => state.totalItems());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const isAuth = await isUserLoggedIn();
      setIsLoggedIn(isAuth);

      if (isAuth) {
        await Promise.all([syncWishlistFromDB(), syncCartFromDB()]);
      } else {
        useWishlistStore.getState().setWishlist([]);
        useCartStore.getState().clearCart();
      }
    };

    checkSession();
  }, []);

  return (
    <nav className="w-full border-b bg-white relative">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-16">
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
                          className={`flex items-center space-x-4 px-4 py-4 rounded-r-xl transition-all ${isActive
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
          <ProductSearch />

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



function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ id: string, name: string, slug: string, bannerImage: string }[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setShowDropdown(true);
    setLoading(true);

    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
        const data = await res.json();
        setResults(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="relative">
      <InputGroup className="rounded-full ring ring-[#168BA0]">
        <InputGroupInput
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => { if (searchTerm) setShowDropdown(true); }}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />
        <InputGroupAddon align={"inline-end"}>
          <Search className="text-gray-500" size={20} />
        </InputGroupAddon>
      </InputGroup>

      {showDropdown && (
        <div className="absolute top-full mt-2 w-full min-w-[300px] bg-white border rounded-2xl shadow-lg z-50 right-0 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500 text-sm">Searching...</div>
          ) : results.length > 0 ? (
            <div className="flex flex-col">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product-detail/${product.slug}`}
                  className="flex items-center gap-3 p-3 hover:bg-gray-100 transition-colors border-b last:border-b-0"
                  onClick={() => setShowDropdown(false)}
                >
                  {product.bannerImage ? (
                    <Image
                      src={getImageUrl(product.bannerImage)}
                      alt={product.name || "Product"}
                      width={40}
                      height={40}
                      className="rounded-md object-cover w-10 h-10"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded-md flex-shrink-0" />
                  )}
                  <span className="text-sm font-medium text-gray-700 line-clamp-2">{product.name}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500 text-sm">Product not found.</div>
          )}
        </div>
      )}
    </div>
  );
}