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
        <div className="grid gap-10 grid-cols-2 md:grid-cols-2 xl:grid-cols-4">

          {/* LOGO + TEXT */}
          <div className="space-y-4 col-span-2 xl:col-span-1">
            <Link href="/">
              <Image
                src="/logo1.png"
                alt="Potent Logo"
                width={140}
                height={80}
                className="object-contain"
              />
            </Link>

            <p className="text-sm text-white/90 leading-relaxed">
              Empowering women with safe, sustainable, and comfortable
              personal care products. Your wellness, our priority.
            </p>

            {/* SOCIAL ICONS (desktop only) */}
            <div className="hidden xl:flex items-center gap-4 pt-2">
              <Link href="https://www.facebook.com/potenthygiene" target="_blank">
                <IconBrandFacebook className="cursor-pointer" />
              </Link>
              <Link href="https://twitter.com/potenthygiene" target="_blank">
                <IconBrandX className="cursor-pointer" />
              </Link>
              <Link href="https://www.instagram.com/potenthygiene" target="_blank">
                <IconBrandInstagram className="cursor-pointer" />
              </Link>
              <Link href="mailto:care@potenthygiene.com">
                <IconMailFilled className="cursor-pointer" />
              </Link>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li><Link href="/shop">Shop All</Link></li>
              <li><Link href="/sanitary-pads">Sanitary Pads</Link></li>
              <li><Link href="/menstrual-cups">Menstrual Cups</Link></li>
              <li><Link href="/pantyliners">Pantyliners</Link></li>
              <li><Link href="/combo-packs">Combo Packs</Link></li>
            </ul>
          </div>

          {/* INFORMATION */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/faq">FAQs</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/shipping-policy">Shipping Policy</Link></li>
              <li><Link href="/refund-policy">Refund Policy</Link></li>
              <li><Link href="/terms-condition">Terms & Condition</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-span-2 xl:col-span-1">
            <Link href="/contact">
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            </Link>

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

            {/* SOCIAL ICONS MOBILE */}
            <div className="flex xl:hidden items-center gap-4 pt-4">
              <Link href="https://www.facebook.com/potenthygiene" target="_blank">
                <IconBrandFacebook className="cursor-pointer" />
              </Link>
              <Link href="https://twitter.com/potenthygiene" target="_blank">
                <IconBrandX className="cursor-pointer" />
              </Link>
              <Link href="https://www.instagram.com/potenthygiene" target="_blank">
                <IconBrandInstagram className="cursor-pointer" />
              </Link>
              <Link href="mailto:care@potenthygiene.com">
                <IconMailFilled className="cursor-pointer" />
              </Link>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-10 border-t border-white/30 pt-6 flex flex-col gap-3 text-sm text-white/80 md:flex-row md:items-center md:justify-between">
          <p>© 2024 Potent Hygiene. All rights reserved.</p>

          <div className="flex flex-wrap gap-4">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-condition">Terms & Conditions</Link>
            <Link href="/shipping-policy">Shipping Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;