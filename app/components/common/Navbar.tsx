// components/layout/navbar.tsx
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Content", href: "/content" },
];

export function Navbar() {
  return (
    <nav className="w-full border-b px-16  bg-white">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo - Replace with your exported SVG/PNG */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Potent Logo"
            width={120}
            height={40}
            className="h-36 w-auto"
          />
        </Link>

        {/* Navigation Links */}
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

        {/* Action Icons */}
        <div className="flex items-center space-x-5 text-[#1A8D91]">
          <button className="hover:opacity-70">
            <Search className="h-5 w-5" />
          </button>
          <button className="hover:opacity-70">
            <ShoppingBag className="h-5 w-5" />
          </button>
          <button className="hover:opacity-70">
            <Heart className="h-5 w-5" />
          </button>

          {/* Login Button - Styled to match Figma pill shape */}
          <Button
            variant="ghost"
            className="rounded-full bg-[#D1E9EC] px-6  text-[#1A8D91] hover:bg-[#b8dce1] hover:text-[#1A8D91]"
          >
            <User className="mr-2 h-4 w-4" />
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
}


