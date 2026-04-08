
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = {
  badgeText: string;
  title: string;
  highlight: string;
  paragraphs: string[];
  image: string;
  primaryColor: string;
  gradientFrom: string;
  gradientTo: string;
  bgAccent: string;
  tickerColor?: string;
  tickerText?: string;
};

export function OurStory({
  badgeText,
  title,
  highlight,
  paragraphs,
  image,
  primaryColor,
  gradientFrom,
  gradientTo,
  bgAccent,
  tickerColor,
  tickerText,
}: Props) {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
          {/* IMAGE */}
          <div className="relative order-2 lg:order-1">
            {/* <div
              className="absolute inset-0 -rotate-2 rounded-[40px] lg:scale-105"
              style={{ backgroundColor: bgAccent }}
            /> */}

            <div className="relative z-10 overflow-hidden rounded-[24px] md:rounded-[30px] shadow-sm">
              <Image
                src={image}
                alt="story"
                width={600}
                height={600}
                className="w-full object-cover"
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex flex-col space-y-5 md:space-y-6 order-1 lg:order-2">
            {/* Badge */}
            <div
              className="inline-block w-fit rounded-full px-4 py-1.5 text-xs font-medium"
              style={{
                border: `1px solid ${primaryColor}`,
                color: primaryColor,
                backgroundColor: `${primaryColor}20`,
              }}
            >
              {badgeText}
            </div>

            {/* Heading */}
            <h2 className="md:text-4xl text-3xl font-playfair font-bold">
              {title} <span style={{ color: primaryColor }}>{highlight}</span>
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 text-md font-roboto text-black/50 leading-relaxed">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Button */}
            <div className="pt-2 md:pt-4">
              <Button
                className="rounded-full px-10 py-6 text-sm font-bold text-white"
                style={{
                  background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
                }}
              >
                Read Our Full Story
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div
        className="mt-16 w-full py-3 overflow-hidden"
        style={{ backgroundColor: tickerColor ? tickerColor : primaryColor }}
      >
        <div className="whitespace-nowrap flex gap-10 animate-marquee">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-white text-sm font-medium">
              {tickerText}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
