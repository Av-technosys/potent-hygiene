"use client";

import { useState, useEffect } from "react";
import CheckoutForm from "../../components/common/checkout/CheckoutForm";
import { CheckoutSummary } from "../../components/common/checkout/CheckoutSummary";

export default function CheckoutClient({ address }: any) {
  const [selected, setSelected] = useState<string>("");

  // ✅ Auto select default / first address
  useEffect(() => {
    if (address?.length > 0) {
      const defaultAddress =
        address.find((a: any) => a.isDefault) || address[0];

      if (defaultAddress) {
        setSelected(defaultAddress.id);
      }
    }
  }, [address]);

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
      
      <div className="lg:col-span-8">
        <CheckoutForm
          address={address}
          selected={selected}
          setSelected={setSelected}
        />
      </div>

      <div className="lg:col-span-4 lg:sticky lg:top-24">
        <CheckoutSummary
          address={address}
          selected={selected}
        />
      </div>

    </div>
  );
}