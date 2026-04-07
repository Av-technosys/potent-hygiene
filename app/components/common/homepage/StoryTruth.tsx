import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// const StoryTruth = () => {
//   return (
//     <section className="w-full md:bg-[#F8F6F1] py-12 md:py-16 px-4 md:px-16 overflow-hidden">
//       <div className="container mx-auto mac-w-7xl">
//         <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20">
//           <div className="flex flex-col space-y-4 order-1">
//             <Badge 
//               variant="outline" 
//               className="w-fit border-[#1A8D91] text-[#1A8D91] font-medium rounded-full px-4 py-1.5 bg-[#E6F4F6]"
//             >
//               Own Your Cycle
//             </Badge>

//             <h2 className="md:text-4xl text-3xl font-serif font-bold text-[#333333]">
//               The <span className="text-[#1A8D91]">Nakd</span> Truth
//             </h2>

//             <div className="space-y-2 max-w-xl">
//               <p className="text-black/70 leading-relaxed text-sm md:text-base font-medium">
//                 Good hygiene is not just about routine — it&apos;s about feeling comfortable, 
//                 confident, and cared for every single day. At Potent Hygiene, we believe 
//                 personal care should be simple, honest, and empowering.
//               </p>
              
//               <p className="hidden md:block text-black/50 leading-relaxed text-sm md:text-base">
//                 Our goal is to make hygiene conversations normal and accessible by providing 
//                 products and information that support everyday well-being. Whether it&apos;s daily 
//                 freshness, intimate care, or overall hygiene, we focus on solutions that respect 
//                 your body and your lifestyle.
//               </p>

//               <p className="hidden md:block text-black/50 leading-relaxed text-sm md:text-base">
//                 We encourage awareness, informed choices, and self-care without hesitation or 
//                 stigma. Because when hygiene becomes effortless, confidence follows naturally.
//               </p>
//             </div>

//             <div className="pt-4">
//               <Button className="rounded-full bg-gradient-to-r from-[#168BA0] to-[#AFE7F1] px-10 py-6 text-sm font-semibold text-white shadow-lg hover:scale-105 transition-all">
//                 Read Our Full Story
//               </Button>
//             </div>
//           </div>
//           <div className="relative order-2">
//             <div className="relative z-10 w-full aspect-[4/5] md:aspect-square overflow-hidden rounded-[2rem] md:rounded-[3rem] ">
//               <Image
//                 src="/thestory.png" 
//                 alt="Woman holding product"
//                 fill
//                 className="object-cover"
//                 priority
//               />
//             </div>
//             <div className="absolute -bottom-6 -right-6 -z-10 w-full h-full bg-[#E6F4F6] rounded-[3rem]" />
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default StoryTruth;

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
};

const StoryTruth = ({
  badgeText,
  title,
  highlight,
  paragraphs,
  image,
  primaryColor,
  gradientFrom,
  gradientTo,
  bgAccent,
}: Props) => {
  return (
    <section className="w-full py-12 md:py-16 px-4 md:px-16 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20">

          {/* LEFT */}
          <div className="flex flex-col space-y-4">

            <Badge
              variant="outline"
              className="w-fit rounded-full px-4 py-1.5"
              style={{
                borderColor: primaryColor,
                color: primaryColor,
                backgroundColor: `${primaryColor}20`,
              }}
            >
              {badgeText}
            </Badge>

            <h2 className="md:text-4xl text-3xl font-serif font-bold">
              {title}{" "}
              <span style={{ color: primaryColor }}>
                {highlight}
              </span>
               {" "}Truth
            </h2>

            <div className="space-y-2 max-w-xl">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`leading-relaxed text-sm md:text-base ${
                    i === 0 ? "text-black/70 font-medium" : "text-black/50 hidden md:block"
                  }`}
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="pt-4">
              <Button
                className="rounded-full px-10 py-6 text-sm font-semibold text-white shadow-lg hover:scale-105 transition-all"
                style={{
                  background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
                }}
              >
                Read Our Full Story
              </Button>
            </div>

          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="relative z-10 w-full aspect-[4/5] md:aspect-square overflow-hidden rounded-[2rem] md:rounded-[3rem]">
              <Image
                src={image}
                alt="story"
                fill
                className="object-cover"
              />
            </div>

            <div
              className="absolute -bottom-6 -right-6 -z-10 w-full h-full rounded-[3rem]"
              style={{ backgroundColor: bgAccent }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default StoryTruth;