// components/sections/newsletter.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  return (
    <section className="py-10 bg-[#FDFCF9]">
      <div className="container mx-auto px-16">
        {/* Main Gradient Card */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#1A8D91] to-[#7ED4DB] px-8 py-16 lg:px-20 lg:py-24">
          
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            
            {/* Left Side: Content */}
            <div className="space-y-4 text-white">
              <h2 className="text-4xl font-serif font-bold lg:text-5xl">
                Stay Connected
              </h2>
              <p className="max-w-md text-sm opacity-90 leading-relaxed">
                Get 10% off your first order + wellness tips delivered to your inbox
              </p>
              <p className="text-[10px] uppercase tracking-widest opacity-70">
                We respect your privacy
              </p>
            </div>

            {/* Right Side: Input Field */}
            <div className="relative flex items-center">
              <div className="relative w-full">
                <Input 
                  type="email" 
                  placeholder="Enter your Email" 
                  className="h-16 w-full rounded-full border-none bg-white px-8 py-4 text-gray-800 shadow-xl placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button 
                  className="absolute right-2 top-2 h-12 rounded-full bg-[#1A8D91] px-8 font-bold text-white transition-all hover:bg-[#146e71] active:scale-95"
                >
                  Subscribe
                </Button>
              </div>
            </div>

          </div>

          {/* Optional: Subtle decorative circles for that "Figma" feel */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-black/5 blur-3xl" />
        </div>
      </div>
    </section>
  );
}