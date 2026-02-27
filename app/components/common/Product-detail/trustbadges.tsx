"use client";

import { ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default function TrustBadges() {
    return (
        <div className="w-full ">
            <div className="container mx-auto px-6 py-6 flex justify-end">
                <div className="flex items-center gap-16 text-center">

                    {/* Secure Payment */}
                    <div className="flex flex-col items-center text-gray-600">
                        <ShieldCheck className="w-6 h-6 text-teal-600 mb-2" />
                        <p className="text-xs font-medium">100% Secure</p>
                        <p className="text-xs text-gray-500">Payment</p>
                    </div>

                    {/* Free Shipping */}
                    <div className="flex flex-col items-center text-gray-600">
                        <Truck className="w-6 h-6 text-teal-600 mb-2" />
                        <p className="text-xs font-medium">Free shipping above</p>
                        <p className="text-xs text-gray-500">₹499</p>
                    </div>

                    {/* Easy Returns */}
                    <div className="flex flex-col items-center text-gray-600">
                        <RotateCcw className="w-6 h-6 text-teal-600 mb-2" />
                        <p className="text-xs font-medium">Easy Returns</p>
                        <p className="text-xs text-gray-500">7 Days</p>
                    </div>

                </div>
            </div>
        </div>
    );
}