"use client";

import { useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const categories = [
  { id: 1, title: "Combo", video: "/videos/combo.mp4", thumb: "/thumb1.png" },
  { id: 2, title: "Pads", video: "/videos/pads.mp4", thumb: "/thumb2.png" },
  { id: 3, title: "Menstrual Cup", video: "/videos/cup.mp4", thumb: "/thumb3.png" },
];

export function ProductCategories() {
  return (
    <section className="py-12 md:bg-[#F8F6F1]">
      <div className="container mx-auto px-6 md:px-20">
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent className="-ml-4">
            {categories.map((cat) => (
              <CarouselItem key={cat.id} className="pl-4 basis-[75%] md:basis-1/3">
                <VideoCard category={cat} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-between mt-6 md:hidden">
            <CarouselPrevious className="static translate-y-0 h-10 w-10 bg-[#D1E9EC] border-none text-[#1A8D91]" />
            <CarouselNext className="static translate-y-0 h-10 w-10 bg-[#D1E9EC] border-none text-[#1A8D91]" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

function VideoCard({ category }: { category: any }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div 
      className="group overflow-hidden rounded-md border bg-white transition-all  max-w-[300px] mx-auto"
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => { videoRef.current?.pause(); if(videoRef.current) videoRef.current.currentTime = 0; }}
    >
      <div className="relative aspect-square">
        <video
          ref={videoRef}
          src={category.video}
          poster={category.thumb}
          muted loop playsInline
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 ">
          <Play className="h-10 w-10 text-white fill-current " />
        </div>
      </div>

      <div className="p-5 text-center">
        <h3 className="text-lg font-bold text-gray-800">{category.title}</h3>
        <button className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-[#1A8D91]">
          Shop Now <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}