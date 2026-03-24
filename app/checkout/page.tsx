/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Navbar } from "@/app/components/common/Navbar";
import { CheckoutSummary } from "../components/common/checkout/CheckoutSummary";
import CheckoutForm from "../components/common/checkout/CheckoutForm";
import { useEffect, useState } from "react";
import { getAddresses } from "@/helper";
// import Footer from "../components/common/Footer";
export default function CheckoutPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [address, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

      const fetchAddresses = async () => {
        const addresses: any = await getAddresses();
        setAddresses(addresses);
        setLoading(false);
      };

    

      fetchAddresses();
    }, []);

  return (
    <div className="min-h-screen bg-[#FDFCF9]">
      <Navbar />

      <main className="container mx-auto px-4 py-10 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-8">
            <CheckoutForm
              selected={selected}
              setSelected={setSelected}
              address={address}
              loading={loading}
            />
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <CheckoutSummary selected={selected} address={address}  />
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
