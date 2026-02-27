// components/sections/instagram-feed.tsx
import Image from "next/image";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const feedImages = [
  { id: 1, src: "/dummyLady.png" },
  { id: 2, src: "/dummyLady.png" },
  { id: 3, src: "/dummyLady.png" },
  { id: 4, src: "/dummyLady.png" },
  { id: 5, src: "/dummyLady.png" },
];

export function InstagramFeed() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#1A8D91] to-[#7ED4DB] py-10">
      <div className="container mx-auto px-16">
        {/* Header */}
        <div className="mb-12 text-center text-white">
          <h2 className="text-4xl font-serif font-bold lg:text-5xl">Join Our Community</h2>
          <p className="mt-2 text-lg opacity-90">@potenthygiene</p>
        </div>

        {/* Image Row */}
        <div className="flex flex-nowrap justify-center gap-4 overflow-x-auto pb-12 lg:flex-row lg:overflow-visible">
          {feedImages.map((image) => (
            <div 
              key={image.id} 
              className="relative aspect-square w-48 flex-shrink-0 overflow-hidden rounded-[24px] bg-white/20 shadow-lg transition-transform hover:scale-105 lg:w-56"
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

        {/* Action Button */}
        <div className="flex justify-center pt-4">
          <Button 
            variant="outline" 
            className="group rounded-full border-2 border-white bg-transparent px-8 py-6 text-white hover:bg-white hover:text-[#1A8D91]"
          >
            <Instagram className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
            Follow us on Instagram
          </Button>
        </div>
      </div>
    </section>
  );
}