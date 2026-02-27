// components/layout/footer.tsx
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A8D91] pt-16 pb-8 py-10 text-white">
      <div className="max-w-6xl mx-auto px-10 ">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">

          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <div className="inline-block rounded-xl bg-white p-2">
              <Image
                src="/logo.png"
                alt="Potent Hygiene Logo"
                width={150}
                height={50}
                className="object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed opacity-90">
              Empowering women with safe, sustainable, and comfortable personal care products.
              Your wellness, our priority.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="#" className="transition-transform hover:scale-110">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="transition-transform hover:scale-110">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="transition-transform hover:scale-110">
                <Mail className="h-5 w-5" />
              </Link>
              <Link href="#" className="transition-transform hover:scale-110">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-bold font-serif">Products</h3>
            <ul className="space-y-4 text-sm opacity-80">
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Sanitary Pads</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Menstrual Cups</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Pantyliners</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Combo Packs</Link></li>
            </ul>
          </div>

          {/* Column 3: Information */}
          <div>
            <h3 className="mb-6 text-lg font-bold font-serif">Information</h3>
            <ul className="space-y-4 text-sm opacity-80">
              <li><Link href="#" className="hover:opacity-100 transition-opacity">About Us</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Blog</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition-opacity">FAQs</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Shipping Policy</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="mb-6 text-lg font-bold font-serif">Contact Us</h3>
            <ul className="space-y-4 text-sm opacity-80">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4" />
                <span>hello@potenthygiene.com</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold">T:</span>
                <span>+1 (555) 987-6543</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold">A:</span>
                <span>456 Fashion Avenue, Style District, New York, NY 10013</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-white/10 pt-8 text-[10px] uppercase tracking-widest opacity-60 lg:flex-row">
          <p>© {currentYear} Potent Hygiene. All rights reserved.</p>
          <div className="mt-4 flex gap-6 lg:mt-0">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms & Conditions</Link>
            <Link href="#">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}