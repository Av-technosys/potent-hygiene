"use client";

import { AccountInfo } from "@/app/components/common/dashboard-profile/AccountInfo";
import { EditAddressForm } from "@/app/components/common/dashboard-profile/EditAddress";
import { ProfileHeader } from "@/app/components/common/dashboard-profile/ProfileHeader";
import { useState } from "react";


export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header ko state pass kar di taaki button click detect ho sake */}
      <ProfileHeader isEditing={isEditing} onEdit={() => setIsEditing(true)} />
      
      {/* Form component ab isEditing state ke hisab se buttons dikhayega */}
      <EditAddressForm isEditing={isEditing} onCancel={() => setIsEditing(false)} />
      
      <AccountInfo />
    </div>
  );
}