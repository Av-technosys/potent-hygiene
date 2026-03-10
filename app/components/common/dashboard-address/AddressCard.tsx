"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IconTrash } from "@tabler/icons-react";

export const AddressCard = ({ address }: { address: any }) => {

  const router = useRouter();

  const setDefault = async () => {
    await fetch("/api/address/default", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: address.id })
    });

    router.refresh();
  };

  const deleteAddress = async () => {
    await fetch("/api/address/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: address.id })
    });

    router.refresh();
  };

  return (
    <Card className="p-6 shadow-sm bg-white rounded-md border border-transparent hover:border-pink-100 transition-all">

      {/* Default Badge only */}
      {address.isDefault && (
        <Badge className="mb-4 bg-[#168BA0] text-white">
          Default Address
        </Badge>
      )}

      <div className="space-y-1 mb-6">
        <h3 className="text-[18px] font-bold text-[#2D3748]">
          {address.fullName}
        </h3>

        <p className="text-[14px] text-gray-400 font-medium">
          {address.phone}
        </p>

        <p className="text-[14px] text-gray-400">
          {address.street}, {address.locality}, {address.city}, {address.state}, {address.pincode}
        </p>
      </div>

      <div className="flex gap-3">

        <Button
          variant="outline"
          onClick={() => router.push(`/dashboard/edit-address/${address.id}`)}
          className="flex-1"
        >
          Edit
        </Button>

        {!address.isDefault && (
          <>
            <Button
              variant="outline"
              onClick={setDefault}
              className="flex-1 border-[#168BA0] text-[#168BA0]"
            >
              Set Default
            </Button>

            <Button
              variant="outline"
              onClick={deleteAddress}
              className="border-red-100 text-red-500 hover:bg-red-50"
            >
              <IconTrash size={20}/>
            </Button>
          </>
        )}

      </div>

    </Card>
  );
};