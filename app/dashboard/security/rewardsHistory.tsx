import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, UserPlus } from "lucide-react";

const rewardsData = [
  {
    type: "purchase",
    title: "Purchase",
    desc: "Order ORD-2024-1234",
    date: "3/15/2024",
    coins: "+68 Coins",
  },
  {
    type: "referral",
    title: "Friend Emma Joined",
    desc: "",
    date: "3/15/2024",
    coins: "+68 Coins",
  },
  {
    type: "purchase",
    title: "Purchase",
    desc: "Order ORD-2024-1234",
    date: "3/15/2024",
    coins: "+68 Coins",
  },
  {
    type: "purchase",
    title: "Purchase",
    desc: "Order ORD-2024-1234",
    date: "3/15/2024",
    coins: "+68 Coins",
  },
];

export default function RewardsHistory() {
  return (
    <Card className="w-full max-w-4xl mx-auto rounded-2xl shadow-sm">
      {/* HEADER */}
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Rewards History</CardTitle>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="space-y-4">
        {rewardsData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 rounded-xl border p-4 hover:shadow-sm transition"
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              {/* ICON */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  item.type === "purchase"
                    ? "bg-red-100 text-red-500"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {item.type === "purchase" ? (
                  <ShoppingCart className="w-5 h-5" />
                ) : (
                  <UserPlus className="w-5 h-5" />
                )}
              </div>

              {/* TEXT */}
              <div>
                <p className="font-medium text-gray-800">{item.title}</p>
                {item.desc && (
                  <p className="text-sm text-gray-500">{item.desc}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">{item.date}</p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="text-orange-500 font-semibold text-sm sm:text-base whitespace-nowrap">
              {item.coins}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
