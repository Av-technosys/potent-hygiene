import { Card, CardContent } from "@/components/ui/card";
import { Coins } from "lucide-react";

const RewardReferrelOverview = ({
  tittle,
  amount,
  description,
  cards,
}: any) => {
  return (
    <>
      <div className="w-full  rounded-2xl overflow-hidden border-0 shadow-md">
        <div className="p-0">
          <div className="bg-gradient-to-r from-[#1f8a9e] to-[#9ccbd3] p-6 sm:p-8 flex flex-col gap-6">
            {/* TOP SECTION */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/80">{tittle}</p>
                <h2 className="text-4xl sm:text-5xl font-bold text-white mt-1">
                  ₹{amount}
                </h2>
                <p className="text-white/80 text-sm mt-1">{description}</p>
              </div>

              {/* ICON */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 flex items-center justify-center">
                <Coins className="text-white w-6 h-6 sm:w-7 sm:h-7" />
              </div>
            </div>

            {/* BOTTOM SECTION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* PER PURCHASE */}
              {cards.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="bg-white/20 rounded-xl p-4 backdrop-blur-md"
                  >
                    <p className="text-white/80 text-sm">{item.title}</p>
                    <p className="text-white font-semibold mt-1">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RewardReferrelOverview;
