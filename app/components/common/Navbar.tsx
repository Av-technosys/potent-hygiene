"use client"; 

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { IconBuildingStore, IconHome, IconInfoCircle, IconMenu2, IconNews, IconPhone, IconShoppingBag, IconSquareRoundedX, IconUser } from "@tabler/icons-react";

const navLinks = [
  { name: "Home", href: "/", icon: <IconHome size={20} />, active: true },
  { name: "Shop", href: "/shop", icon: <IconBuildingStore size={20} /> },
  { name: "About", href: "/about", icon: <IconInfoCircle size={20} /> },
  { name: "Blog", href: "/blog", icon: <IconNews size={20} /> },
  { name: "FAQs", href: "/faq", icon: <IconPhone size={20} /> }, 
  
  
];

export function Navbar() {
  const [open, setOpen] = useState(false); 

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
              <SheetContent side="left" className="w-[300px] bg-white p-0 border-r-0 [&>button]:hidden">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="px-7 pt-6 pb-6">
                    <button onClick={() => setOpen(false)} className="text-[#1A8D91]">
                      <IconSquareRoundedX size={35} />
                    </button>
                  </div>

                  <div className="flex-1 space-y-1 px-3">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setOpen(false)} 
                        className={`flex items-center space-x-4 px-4 py-4 rounded-r-xl transition-all ${
                          link.active 
                          ? "bg-[#D1E9EC] text-[#1A8D91] border-l-[8px] border-[#1A8D91] rounded-md font-semibold" 
                          : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span className={link.active ? "text-[#1A8D91]" : "text-gray-500"}>
                          {link.icon}
                        </span>
                        <span className="text-[16px]">{link.name}</span>
                      </Link>
                    ))}
                  </div>

                  <div className="px-3 mb-6">
                    <Link
                      href="/account"
                      onClick={() => setOpen(false)}
                      className="flex items-center space-x-4 px-4 py-4 rounded-r-xl bg-[#D1E9EC] text-[#1A8D91] border-l-[8px] rounded-md border-[#1A8D91] font-semibold"
                    >
                      <IconUser size={20} />
                      <span className="text-[16px]">Account</span>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Link href="/" className="hidden md:block flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Potent Logo"
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
              alt="Potent Logo"
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
              className="text-sm font-medium text-[#1A8D91] transition-colors hover:text-[#146e71]"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-3 md:space-x-5 text-[#1A8D91]">
        <Link href="/cart">
  <IconShoppingBag className="w-6 h-6 cursor-pointer text-[#11879A]" />
</Link>
          <button className="hover:opacity-70">
            <Search className="md:h-5 md:w-5 w-6 h-6 " />
          </button>
          <button className="hidden md:block hover:opacity-70">
            <Heart className="md:h-5 md:w-5 w-6 h-6 " />
          </button>
         <Link href="/login">
          <Button
            variant="ghost"
            className="hidden md:flex rounded-full bg-[#D1E9EC] px-6 text-[#1A8D91] hover:bg-[#b8dce1]"
          >
            <User className="mr-2 h-4 w-4" />
            Login
          </Button></Link>
        </div>
      </div>
    </nav>
  );
}