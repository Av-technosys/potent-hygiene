/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AddressEditForm } from "@/app/components/common/dashboard-address/AddressEditForm";
import { getUserAddressById } from "@/helper";

export default function EditAddressPage() {
  const params = useParams();
  const addressId = Number(params.id);

  const [address, setAddress] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const data = await getUserAddressById(addressId);
        setAddress(data);
      } catch (error) {
        console.error("Failed to fetch address:", error);
        setAddress(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (addressId) fetchAddress();
  }, [addressId]);

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading address...
      </div>
    );
  }

  if (!address) {
    return <div className="p-6">Address Not Found 🚫</div>;
  }

  return (
    <div className="p-6">
      <AddressEditForm address={address} />
    </div>
  );
}