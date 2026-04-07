import RewardReferrelOverview from "@/app/components/common/reward&ReferrelOverview";
import RewardsReferrelHeader from "@/app/components/common/rewards&ReferrelHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Copy, Gift, Mail, Share2, ShoppingCart } from "lucide-react";

const cards = [
  {
    title: "Available Credit",
    description: "₹1600",
  },
  {
    title: "Used Credit",
    description: "₹800",
  },
];

const referralHistory = [
  {
    name: "Priya Sharma",
    referred: "Dec 18, 2024",
    purchased: "Dec 20, 2024",
    reward: "+₹200",
  },
  {
    name: "Priya Sharma",
    referred: "Dec 18, 2024",
    purchased: "Dec 20, 2024",
    reward: "+₹200",
  },
];

const programTerms = [
  "Your friend must be a new customer to Potent Hygiene",
  "Minimum order value of ₹500 required for referral to be valid",
  "You earn ₹200 credit once your friend completes their first purchase",
  "Your friend gets ₹100 off on their first order",
  "Maximum ₹500 referral credit can be used per order",
  "Referral credits have no expiry date",
];

const page = () => {
  return (
    <div className="flex flex-col gap-6">
      <RewardsReferrelHeader
        tittle="Referral Program"
        description="Manage your rewards and account security"
      />
      <RewardReferrelOverview
        tittle="Total Earnings"
        amount="1600"
        description="From 8 successful referrals"
        cards={cards}
      />
      <div className="w-full space-y-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>How it Work</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {/* STEP 1 */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center">
                  <Share2 className="text-red-500" />
                </div>
                <p className="font-medium">1. Share Your Code</p>
                <p className="text-sm text-gray-500">
                  Share your unique referral code or link with friends
                </p>
              </div>

              {/* STEP 2 */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-yellow-100 flex items-center justify-center">
                  <ShoppingCart className="text-yellow-600" />
                </div>
                <p className="font-medium">2. Friend Makes Purchase</p>
                <p className="text-sm text-gray-500">
                  They get ₹100 off on orders above ₹500
                </p>
              </div>

              {/* STEP 3 */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-teal-100 flex items-center justify-center">
                  <Gift className="text-teal-600" />
                </div>
                <p className="font-medium">3. You Both Earn</p>
                <p className="text-sm text-gray-500">
                  You get ₹200 credit for each successful referral
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Share Your Referral</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* REFERRAL CODE */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Your Referral Code</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input value="SARAH100" readOnly className="flex-1 border border-[#168BA0] text-[#168BA0] font-semibold" />
                <Button className="flex items-center bg-[#168BA0] hover:bg-[#168BA0]/80  gap-2">
                  <Copy size={16} />
                  Copy Code
                </Button>
              </div>
            </div>

            {/* REFERRAL LINK */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Your Referral Link</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  value="https://potenthygiene.com/ref/SARAH2024"
                  readOnly
                  className="flex-1 border border-[#168BA0] text-[#168BA0] font-semibold"
                />
                <Button className="flex items-center bg-[#168BA0] hover:bg-[#168BA0]/80 gap-2">
                  <Copy size={16} />
                  Copy Link
                </Button>
              </div>
            </div>

            {/* SHARE BUTTONS */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Share Via</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2">
                  {/* whatsapp icon manually */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.52 3.48A11.82 11.82 0 0 0 12.05 0C5.42 0 .05 5.37.05 12c0 2.11.55 4.17 1.6 5.98L0 24l6.2-1.62A11.9 11.9 0 0 0 12.05 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.2-3.53-8.52zM12.05 22c-1.9 0-3.75-.5-5.36-1.44l-.38-.22-3.68.96.98-3.6-.24-.37A9.9 9.9 0 0 1 2.05 12c0-5.52 4.48-10 10-10 2.67 0 5.18 1.04 7.07 2.93A9.93 9.93 0 0 1 22.05 12c0 5.52-4.48 10-10 10zm5.5-7.5c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.5-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.52s1.07 2.93 1.22 3.13c.15.2 2.1 3.2 5.1 4.48.71.3 1.27.48 1.7.61.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
                  </svg>
                  Whatsapp
                </Button>

                <Button className="bg-gray-600 hover:bg-gray-700 text-white flex items-center gap-2">
                  <Mail size={16} />
                  Email
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full space-y-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Referral History</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {referralHistory.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 rounded-xl border p-4"
              >
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  {/* ICON */}
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <Check className="text-green-600 w-5 h-5" />
                  </div>

                  {/* TEXT */}
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Referred on {item.referred}
                    </p>
                    <p className="text-sm text-gray-500">
                      Purchased on {item.purchased}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="text-green-600 font-semibold whitespace-nowrap">
                  {item.reward}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Program Terms</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {programTerms.map((term, index) => (
              <div key={index} className="flex items-start gap-3">
                {/* ICON */}
                <div className="mt-1 w-6 h-6 rounded-full bg-[#C9E6EA] flex items-center justify-center">
                  <Check className="text-teal-600 w-4 h-4" />
                </div>

               
                <p className="text-sm text-gray-700">{term}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
