"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function ShareReferralClient({ userDetail }: any) {


    return [
        <div key={1} className="space-y-2">
            <p className="text-sm font-medium">Your Referral Code</p>
            <div className="flex flex-col sm:flex-row gap-3">
                <Input value={userDetail.id} readOnly className="flex-1 border border-[#168BA0] text-[#168BA0] font-semibold" />
                <Button onClick={() => { toast.success("Referral code copied to clipboard"); navigator.clipboard.writeText(userDetail.id) }} className="flex items-center bg-[#168BA0] hover:bg-[#168BA0]/80  gap-2">
                    <Copy size={16} />
                    Copy Code
                </Button>
            </div>
        </div>
        ,
        <div key={2} className="space-y-2">
            <p className="text-sm font-medium">Your Referral Link</p>
            <div className="flex flex-col sm:flex-row gap-3">
                <Input
                    value={`https://potenthygiene.com/signup?ref=${userDetail.id}`}
                    readOnly
                    className="flex-1 border border-[#168BA0] text-[#168BA0] font-semibold"
                />
                <Button onClick={() => { toast.success("Referral Link copied to clipboard"); navigator.clipboard.writeText(`https://potenthygiene.com/signup?ref=${userDetail.id}`) }} className="flex items-center bg-[#168BA0] hover:bg-[#168BA0]/80 gap-2">
                    <Copy size={16} />
                    Copy Link
                </Button>
            </div>
        </div>
    ]
}