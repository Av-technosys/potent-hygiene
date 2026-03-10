"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export const AddressNewForm = ({ onCancel }: { onCancel: () => void }) => {

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    locality: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    isDefault: false
  });

  const handleChange = (e:any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const saveAddress = async () => {

    await fetch("/api/add-address", {
      method: "POST",
      body: JSON.stringify(form)
    });

    window.location.href="/dashboard/address"
  };

  return (

<Card className="p-8 border-gray-200 shadow-sm bg-white rounded-[20px]">

<h3 className="text-[14px] font-bold text-[#2D3748] mb-8 uppercase tracking-widest">
Add Address
</h3>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

<div className="space-y-2">
<Label className="text-[12px] font-bold text-gray-400 uppercase">
Full Name
</Label>
<Input name="fullName" onChange={handleChange} className="border-gray-200 rounded-xl h-12"/>
</div>

<div className="space-y-2">
<Label className="text-[12px] font-bold text-gray-400 uppercase">
Phone
</Label>
<Input name="phone" onChange={handleChange} className="border-gray-200 rounded-xl h-12"/>
</div>

<div className="md:col-span-2 space-y-2">
<Label className="text-[12px] font-bold text-gray-400 uppercase">
Address / Street
</Label>
<Input name="street" onChange={handleChange} className="border-gray-200 rounded-xl h-12"/>
</div>

<div className="md:col-span-2 space-y-2">
<Label className="text-[12px] font-bold text-gray-400 uppercase">
Locality
</Label>
<Input name="locality" onChange={handleChange} className="border-gray-200 rounded-xl h-12"/>
</div>

<div className="space-y-2">
<Label className="text-[12px] font-bold text-gray-400 uppercase">
City
</Label>
<Input name="city" onChange={handleChange} className="border-gray-200 rounded-xl h-12"/>
</div>

<div className="grid grid-cols-2 gap-4">

<div className="space-y-2">
<Label className="text-[12px] font-bold text-gray-400 uppercase">
State
</Label>
<Input name="state" onChange={handleChange} className="border-gray-200 rounded-xl h-12"/>
</div>

<div className="space-y-2">
<Label className="text-[12px] font-bold text-gray-400 uppercase">
Pincode
</Label>
<Input name="pincode" onChange={handleChange} className="border-gray-200 rounded-xl h-12"/>
</div>

</div>

<div className="md:col-span-2 space-y-2">
<Label className="text-[12px] font-bold text-gray-400 uppercase">
Country
</Label>
<Input name="country" onChange={handleChange} className="border-gray-200 rounded-xl h-12"/>
</div>

</div>

<div className="flex items-center space-x-2 mb-8">

<Checkbox
onCheckedChange={(v)=>setForm({...form,isDefault:Boolean(v)})}
/>

<label className="text-[13px] text-gray-500 font-medium">
Set as default shipping address
</label>

</div>

<div className="flex gap-4">

<Button
onClick={saveAddress}
className="flex-1 bg-[#168BA0] hover:bg-[#168BA0] h-14 rounded-xl font-bold text-lg"
>
Save Address
</Button>

<Button
variant="outline"
onClick={onCancel}
className="flex-1 border-[#168BA0] text-[#168BA0] h-14 rounded-xl font-bold text-lg"
>
Cancel
</Button>

</div>

</Card>

  );
};