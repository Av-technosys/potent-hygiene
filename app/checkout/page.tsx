"use client";
import { Navbar } from "@/app/components/common/Navbar";
//
// import { CheckoutForm } from "../components/common/checkout/CheckoutForm";

import Footer from "../components/common/Footer";
// import { OrderSummary } from "../components/common/cart/OrderSummary";
import { CheckoutSummary } from "../components/common/checkout/CheckoutSummary";
import CheckoutForm from "../components/common/checkout/CheckoutForm";
import { useEffect, useState } from "react";
import { getAddresses, getUserId } from "@/helper";
// import Footer from "../components/common/Footer";
export default function CheckoutPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [address, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<any>("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    if (email) {
      const fetchAddresses = async () => {
        const addresses: any = await getAddresses(email);
        setAddresses(addresses);
        setLoading(false);
      };

      const fetchUserId = async () => {
        const userid = await getUserId(email);
        setUserId(userid);
      };

      fetchAddresses();
      fetchUserId();
    } else {
      setLoading(false);
    }
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
            <CheckoutSummary selected={selected} address={address} userId={userId} />
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
