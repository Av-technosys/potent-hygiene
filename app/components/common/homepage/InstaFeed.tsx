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

type Props = {
  title: string;
  username: string;
  gradientFrom: string;
  gradientTo: string;
  textColor: string;
  buttonColor: string;
};

export function InstagramFeed({
  title,
  username,
  gradientFrom,
  gradientTo,
  textColor,
  buttonColor,
}: Props) {
  return (
    <section
      className="w-full py-12 md:py-16 overflow-hidden"
      style={{
        background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      <div className="container mx-auto px-4 md:px-16">

        {/* HEADER */}
        <div className="mb-8 md:mb-12 text-center space-y-2">
          <h2
            className="md:text-4xl text-3xl font-serif font-bold"
            style={{ color: textColor }}
          >
            {title}
          </h2>

          <p
            className="text-sm md:text-lg font-medium"
            style={{ color: textColor }}
          >
            {username}
          </p>
        </div>

        {/* IMAGES */}
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

        {/* BUTTON */}
        <div className="flex justify-center pt-2">
          <Link href="https://www.instagram.com/potenthygiene" target="_blank">
            <Button
              variant="outline"
              className="group rounded-full px-8 py-6 shadow-sm transition-all duration-300"
              style={{
                borderColor: textColor,
                color: buttonColor,
                backgroundColor: "#fff",
              }}
            >
              <Instagram className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
              <span className="font-bold text-sm">
                Follow us on Instagram
              </span>
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}