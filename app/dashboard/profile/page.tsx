// app/dashboard/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AccountInfo } from "@/app/components/common/dashboard-profile/AccountInfo";
import { EditAddressForm } from "@/app/components/common/dashboard-profile/EditAddress";
import { ProfileHeader } from "@/app/components/common/dashboard-profile/ProfileHeader";
import { getProfile, updateProfile } from "@/helper";

interface User {
  fullName: string;
  phone: string;
  email: string;
  emailVerified?: boolean | null;
  createdAt?: Date | string | null;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser({
          fullName: data.fullName,
          phone: data.phone,
          email: data.email,
          emailVerified: data.emailVerified,
          createdAt: data.createdAt,
        });
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (field: keyof User, value: string) => {
    setUser((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSubmit = async () => {
    if (!user) return;

    setIsSaving(true);

    try {
      await updateProfile({
        fullName: user.fullName,
        phone: user.phone,
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="space-y-6">
        <div className="text-center py-10 text-gray-500">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProfileHeader isEditing={isEditing} onEdit={() => setIsEditing(true)} />

      <EditAddressForm
        isEditing={isEditing}
        isSaving={isSaving}
        user={user}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => setIsEditing(false)}
      />

      <AccountInfo user={user} />
    </div>
  );
}
