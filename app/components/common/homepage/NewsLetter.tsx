/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeEmail } from "@/helper";
import { toast } from "sonner";

type Props = {
  title?: string;
  subtitle?: string;
  bgImageDesktop?: string;
  bgImageMobile?: string;
  overlayColor?: string;
  buttonColor?: string;
};

export function Newsletter({
  title = "Stay Connected",
  subtitle = "Get 10% off your first order + wellness tips delivered to your inbox",
  bgImageDesktop = "/newsletter.png",
  bgImageMobile = "/newsletter2.png",
  overlayColor = "rgba(0,0,0,0.4)",
  buttonColor = "#1A8D91",
}: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setLoading(true);

      const res = await subscribeEmail(email);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
      setEmail("");
    } catch (err: any) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10 md:bg-[#F8F6F1]">
      <div className="container mx-auto px-4 md:px-0">
        <div className="relative overflow-hidden rounded-xl px-8 py-12 lg:px-16 lg:py-20">
          {/* BACKGROUND */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center lg:hidden"
              style={{ backgroundImage: `url(${bgImageMobile})` }}
            />
            <div
              className="hidden h-full w-full bg-cover bg-center lg:block"
              style={{ backgroundImage: `url(${bgImageDesktop})` }}
            />
            <div
              className="absolute inset-0"
              style={{ backgroundColor: overlayColor }}
            />
          </div>

          {/* CONTENT */}
          <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            {/* TEXT */}
            <div className="space-y-4 text-[#EFEDE0] text-center lg:text-left">
              <h2 className="text-3xl font-serif font-bold lg:text-5xl">
                {title}
              </h2>

              <p className="max-w-md mx-auto lg:mx-0 text-sm md:text-base opacity-90">
                {subtitle}
              </p>

              <p className="text-[10px] uppercase tracking-widest opacity-70 pt-2">
                We respect your privacy
              </p>
            </div>

            {/* INPUT */}
            <div className="flex items-center w-full max-w-md mx-auto lg:max-w-none">
              <div className="relative w-full">
                <Input
                  type="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 lg:h-16 w-full rounded-full border-none bg-white pr-4 pl-6 text-gray-800 shadow-xl"
                />

                <Button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="absolute right-1.5 top-1 h-11 lg:h-14 rounded-full px-6 font-bold text-white"
                  style={{ backgroundColor: buttonColor }}
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
