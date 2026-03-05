import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  return (
    <section className="py-10 md:bg-[#F8F6F1]">
      <div className="container mx-auto px-4 md:px-0">
        <div className="relative overflow-hidden md:rounded-none rounded-xl px-8 py-12 lg:px-16 lg:py-20">
          
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center lg:hidden"
              style={{ backgroundImage: "url('/newsletter2.png')" }}
            ></div>
            <div 
              className="hidden h-full w-full bg-cover bg-center lg:block"
              style={{ backgroundImage: "url('/newsletter.png')" }}
            ></div>
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="space-y-4 text-[#EFEDE0] text-center lg:text-left">
              <h2 className="text-3xl font-serif font-bold lg:text-5xl  leading-tight">
                Stay Connected
              </h2>
              <p className="max-w-md mx-auto lg:mx-0 text-sm md:text-base opacity-90 leading-relaxed">
                Get 10% off your first order + wellness tips delivered to your inbox
              </p>
              <p className="text-[10px] uppercase tracking-widest opacity-70 pt-2">
                We respect your privacy
              </p>
            </div>
            <div className="relative flex items-center w-full max-w-md mx-auto lg:max-w-none">
              <div className="relative w-full">
                <Input
                  type="email"
                  placeholder="Enter your Email"
                  className="h-14 lg:h-16 w-full rounded-full border-none bg-[#3A404F] md:bg-white px-6 lg:px-8 text-gray-800 shadow-xl placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button className="absolute md:right-0 right-1.5 top-1.5 md:top-0 h-11 md:lg:h-16 rounded-full bg-[#1A8D91] px-6 lg:px-10 font-bold text-white transition-all hover:bg-[#146e71] active:scale-95">
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