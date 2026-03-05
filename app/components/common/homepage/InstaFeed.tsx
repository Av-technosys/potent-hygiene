import Image from "next/image";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const feedImages = [
  { id: 1, src: "/dummyLady.png" },
  { id: 2, src: "/dummyLady.png" },
  { id: 3, src: "/dummyLady.png" },
  { id: 4, src: "/dummyLady.png" },
  { id: 5, src: "/dummyLady.png" },
];

export function InstagramFeed() {
  return (
    <section className="w-full md:bg-linear-to-r from-[#168BA0] to-[#AFE7F1] py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-16">
        <div className="mb-8 md:mb-12 text-center space-y-2">
          <h2 className="md:text-4xl text-3xl font-serif font-bold text-[#333333] md:text-[#F8F9FA]">Join Our Community</h2>
          <p className="text-sm md:text-lg md:text-[#F8F9FA] text-[#333333] font-medium">@potenthygiene</p>
        </div>
        <div className="flex overflow-x-auto pb-8 gap-4 md:grid md:grid-cols-4 lg:grid-cols-5 md:overflow-visible no-scrollbar snap-x snap-mandatory">
          {feedImages.map((image) => (
            <div 
              key={image.id} 
              className="relative aspect-square min-w-[200px] md:min-w-0 w-full overflow-hidden rounded-[20px] md:rounded-[32px] shadow-sm transition-transform hover:scale-105 snap-start"
            >
              <Image
                src={image.src}
                alt="Community post"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center pt-2">
          <Button 
            variant="outline" 
            className="group rounded-full border border-[#F8F9FA] bg-white px-8 py-6 text-[#1A8D91] shadow-sm hover:bg-[#1A8D91] hover:text-white transition-all duration-300"
          >
            <Instagram className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
             <Link href="https://www.instagram.com/potenthygiene" target="_blank">
            <span className="font-bold text-sm">Follow us on Instagram</span></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}