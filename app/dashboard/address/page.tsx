/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddressCard } from "@/app/components/common/dashboard-address/AddressCard";
import { AddressHeader } from "@/app/components/common/dashboard-address/AddressHeader";
import { getAddresses } from "@/helper/";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic"; 

export default async function AddressPage() {
  let addresses: any[] = [];

  try {
    const data = await getAddresses();
    addresses = data || [];
  } catch (error) {
    console.error("Failed to fetch addresses:", error);
    addresses = [];
  }


  if (addresses.length === 0) {
    return (
      <div className="p-6 text-center space-y-4">
        <p>No addresses found 📭</p>

        <Link href="/dashboard/new-address">
          <Button className="bg-[#168BA0] text-white">
            + Add Address
          </Button>
        </Link>
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