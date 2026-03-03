"use client";
import { AddressCard } from "@/app/components/common/dashboard-address/AddressCard";
import { AddressEditForm } from "@/app/components/common/dashboard-address/AddressEditForm";
import { AddressHeader } from "@/app/components/common/dashboard-address/AddressHeader";
import { useState } from "react";

export default function AddressPage() {
  const [view, setView] = useState<"list" | "edit">("list");
  const addresses = [
    { id: 1, name: "Sarah Johnson", phone: "+91 XXXXXX6958", street: "123 Downtown Street", locality: "apt 4B", city: "Jaipur", state: "Rajasthan", pincode: "302019", isDefault: true },
    { id: 2, name: "Sarah Johnson", phone: "+91 XXXXXX6958", street: "123 Downtown Street", locality: "apt 4B", city: "Jaipur", state: "Rajasthan", pincode: "302019", isDefault: false }
  ];

  return (
    <div className="space-y-6">
      <AddressHeader onAdd={() => setView("edit")} />
      
      {view === "list" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <AddressCard
             key={addr.id} address={addr} onEdit={() => setView("edit")} />
          ))}
        </div>
      ) : (
        <AddressEditForm onCancel={() => setView("list")} />
      )}
    </div>
  );
}