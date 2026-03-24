"use client";

import React from "react";
import { logout } from "@/helper/auth/action";
import { toast } from "sonner";

export const LogoutButton: React.FC = () => {

  const handleLogout = () => {
   logout()
   toast.success("Logout SuccessFully")
   window.location.href = "/login"; 
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
    >
      Logout
    </button>
  );
};
