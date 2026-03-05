import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  IconBrandFacebook,
  IconBrandX,
  IconBrandInstagram,
  IconMail,
  IconPhone,
  IconMapPin,
  IconMailFilled,
} from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#11879A] text-white">
      <div className="mx-auto max-w-screen-xl px-6 py-12">
        
        {/* TOP SECTION */}
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">

          {/* LOGO + TEXT */}
          <div className="space-y-4">
            <Image
              src="/logo1.png"
              alt="Potent Logo"
              width={140}
              height={80}
              className="object-contain"
            />

            <p className="text-sm text-white/90 leading-relaxed">
              Empowering women with safe, sustainable, and comfortable
              personal care products. Your wellness, our priority.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <IconBrandFacebook className="cursor-pointer" />
              <IconBrandX className="cursor-pointer" />
              <IconBrandInstagram className="cursor-pointer" />
              <IconMailFilled className="cursor-pointer" />
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li><Link href="#">Shop All</Link></li>
              <li><Link href="#">Sanitary Pads</Link></li>
              <li><Link href="#">Menstrual Cups</Link></li>
              <li><Link href="#">Pantyliners</Link></li>
              <li><Link href="#">Combo Packs</Link></li>
            </ul>
          </div>

          {/* INFORMATION */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Blog</Link></li>
              <li><Link href="#">FAQs</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Shipping Policy</Link></li>
              <li><Link href="#">Refund Policy</Link></li>
              <li><Link href="#">Terms & Condition</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>

            <div className="space-y-3 text-sm text-white/90">
              <p className="flex items-start gap-2">
                <IconMail size={18} />
                Care@potenthygiene.com
              </p>

              <p className="flex items-start gap-2">
                <IconPhone size={18} />
                +91 6375813154
              </p>

              <p className="flex items-start gap-2">
                <IconMapPin size={18} />
                A-37b, Gokul Vatika, Durgapura, 302018 Jaipur RJ, India
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-10 border-t border-white/30 pt-6 flex flex-col gap-3 text-sm text-white/80 md:flex-row md:items-center md:justify-between">
          <p>© 2024 Potent Hygiene. All rights reserved.</p>

          <div className="flex flex-wrap gap-4">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms & Conditions</Link>
            <Link href="#">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;