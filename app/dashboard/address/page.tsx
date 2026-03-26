/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { AddressCard } from "@/app/components/common/dashboard-address/AddressCard";
import { AddressHeader } from "@/app/components/common/dashboard-address/AddressHeader";
import { getAddresses } from "@/helper/";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AddressPage() {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await getAddresses();
        setAddresses(data || []);
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
        setAddresses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading addresses...</div>
    );
  }

  if (addresses.length === 0) {
    return (
      <div className="p-6 text-center space-y-4">
        <p>No addresses found 📭</p>

        <Button
          onClick={() => router.push("/dashboard/new-address")}
          className="bg-[#168BA0] text-white"
        >
          + Add Address
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <AddressHeader />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {addresses.map((item: any) => (
          <AddressCard key={item.id} address={item} />
        ))}
      </div>
    </div>
  );
}
