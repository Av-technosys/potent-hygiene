"use client";

import React from "react";
import { useRouter } from "next/navigation";

export const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear stored authentication data
    localStorage.removeItem("userEmail");
    localStorage.removeItem("resetEmail");
    // any other tokens/cookies can be cleared here
    router.push("/login");
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
