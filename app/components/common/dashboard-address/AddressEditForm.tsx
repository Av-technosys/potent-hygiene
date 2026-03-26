/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { updateUserAddress } from "@/helper";

export const AddressEditForm = ({ address }: any) => {
  const router = useRouter();

  const [form, setForm] = useState(address);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateAddress = async () => {
    try {
      setIsSaving(true);

      await updateUserAddress(form);

      router.push("/dashboard/address");
      router.refresh();
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="p-8 border-gray-200 shadow-sm bg-white rounded-[20px]">
      <h3 className="text-[14px] font-bold text-[#2D3748] mb-8 uppercase tracking-widest">
        Edit Address
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <Label className="text-[12px] font-bold text-gray-400 uppercase">
            Full Name
          </Label>
          <Input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="border-gray-200 rounded-xl h-12"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[12px] font-bold text-gray-400 uppercase">
            Phone
          </Label>
          <Input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="border-gray-200 rounded-xl h-12"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label className="text-[12px] font-bold text-gray-400 uppercase">
            Address / Street
          </Label>
          <Input
            name="street"
            value={form.street}
            onChange={handleChange}
            className="border-gray-200 rounded-xl h-12"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label className="text-[12px] font-bold text-gray-400 uppercase">
            Locality
          </Label>
          <Input
            name="locality"
            value={form.locality}
            onChange={handleChange}
            className="border-gray-200 rounded-xl h-12"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[12px] font-bold text-gray-400 uppercase">
            City
          </Label>
          <Input
            name="city"
            value={form.city}
            onChange={handleChange}
            className="border-gray-200 rounded-xl h-12"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-[12px] font-bold text-gray-400 uppercase">
              State
            </Label>
            <Input
              name="state"
              value={form.state}
              onChange={handleChange}
              className="border-gray-200 rounded-xl h-12"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[12px] font-bold text-gray-400 uppercase">
              Pincode
            </Label>
            <Input
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              className="border-gray-200 rounded-xl h-12"
            />
          </div>
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label className="text-[12px] font-bold text-gray-400 uppercase">
            Country
          </Label>
          <Input
            name="country"
            value={form.country}
            onChange={handleChange}
            className="border-gray-200 rounded-xl h-12"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-8">
        <Checkbox
          checked={form.isDefault}
          onCheckedChange={(v) => setForm({ ...form, isDefault: Boolean(v) })}
        />

        {/* <label className="text-[13px] text-gray-500 font-medium">
Set as default shipping address
</label> */}
      </div>

      <div className="flex gap-4">
        <Button
          onClick={updateAddress}
          disabled={isSaving}
          className="flex-1 bg-[#168BA0] h-14 rounded-xl font-bold text-lg"
        >
          {isSaving ? "Updating..." : "Update Address"}
        </Button>

        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/address")}
          className="flex-1 border-[#168BA0] text-[#168BA0] h-14 rounded-xl font-bold text-lg"
        >
          Cancel
        </Button>
      </div>
    </Card>
  );
};
