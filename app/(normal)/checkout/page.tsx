/* eslint-disable @typescript-eslint/no-explicit-any */


import { getAddresses } from "@/helper";
import CheckoutClient from "./checkoutClient";

export default async function CheckoutPage() {
  const address: any[] = await getAddresses();

  return (
    <div className="min-h-screen bg-[#FDFCF9]">
      <main className="container mx-auto px-4 py-10 md:px-16 lg:px-24">
        
        {/* ✅ Client wrapper handles state */}
        <CheckoutClient address={address} />

      </main>
    </div>
  );
}