// components/sections/newsletter.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  return (
    <section className="py-10 md:bg-[#F8F6F1]">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="relative overflow-hidden rounded-[32px] px-8 py-16 lg:px-20 lg:py-24">
          {/* ✅ Responsive Background Images */}
          <div className="absolute inset-0">
            {/* Mobile Image */}
            <div
              className="absolute inset-0 bg-cover bg-center lg:bg-[url('/newsletter.png')] brightness-75"
              
            ></div>

            {/* Desktop Image */}
            <div className="hidden h-full w-full bg-[url('/newsletter2.png')] bg-cover bg-center lg:block"></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            {/* Left Side */}
            <div className="space-y-4 text-white">
              <h2 className="text-3xl font-serif font-bold lg:text-5xl">
                Stay Connected
              </h2>
              <p className="max-w-md text-sm opacity-90 leading-relaxed">
                Get 10% off your first order + wellness tips delivered to your
                inbox
              </p>
              <p className="text-[10px] uppercase tracking-widest opacity-70">
                We respect your privacy
              </p>
            </div>

            {/* Right Side */}
            <div className="relative flex items-center">
              <div className="relative w-full">
                <Input
                  type="email"
                  placeholder="Enter your Email"
                  className="h-14 lg:h-16 w-full rounded-full border-none bg-white px-6 lg:px-8 text-gray-800 shadow-xl placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button className="absolute right-2 top-2 h-10 lg:h-12 rounded-full bg-[#1A8D91] px-6 lg:px-8 font-bold text-white transition-all hover:bg-[#146e71] active:scale-95">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
