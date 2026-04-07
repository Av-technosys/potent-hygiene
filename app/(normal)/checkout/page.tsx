/* eslint-disable @typescript-eslint/no-explicit-any */

import { CheckoutSummary } from "../../components/common/checkout/CheckoutSummary";
import CheckoutForm from "../../components/common/checkout/CheckoutForm";
import { getAddresses } from "@/helper";

export default async function CheckoutPage() {
  const address: any[] = await getAddresses();

  return (
    <div className="min-h-screen bg-[#FDFCF9]">
      <main className="container mx-auto px-4 py-10 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          
          <div className="lg:col-span-8">
            <CheckoutForm
              address={address}
            />
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <CheckoutSummary address={address} />
          </div>

        </div>
      </main>
    </div>
  );
}