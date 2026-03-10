"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const resetEmail = localStorage.getItem("resetEmail");
    if (!resetEmail) {
      router.push("/reset-password-email");
    } else {
      setEmail(resetEmail);
    }
  }, [router]);

  const handleReset = async () => {
    setError("");
    if (!password || !confirmPassword) {
      setError("Both fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, confirmPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.removeItem("resetEmail");
        setOpenPopup(true);
      } else {
        setError(data.error || "Failed to reset password");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="relative min-h-screen w-full flex items-center justify-center lg:justify-end">

      
     <Image
       src="/mobilelogin.png"
       alt="background mobile"
       fill
       priority
       className="object-cover -z-10 md:hidden"
     />
     
     
     <Image
       src="/loginbg.png"
       alt="background desktop"
       fill
       priority
       className="object-cover -z-10 hidden md:block"
     />

      
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-sm md:max-w-lg lg:max-w-sm p-4">

    
          <div className="flex justify-center mb-1">
            <Image src="/logo.png" alt="logo" width={100} height={36} />
          </div>

          <h2 className="text-center text-2xl font-semibold text-[#168ba0]">
            Reset Password
          </h2>

          <p className="text-center text-sm text-[#168ba0] mt-1 mb-3">
            Enter new password below
          </p>

          <div className="space-y-3">

          
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-gray-400 bg-transparent px-1 py-2 text-sm outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-2 text-gray-500"
              >
                {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
              </button>
            </div>

           
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border-b border-gray-400 bg-transparent px-1 py-2 text-sm outline-none"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-1 top-2 text-gray-500"
              >
                {showConfirm ? <IconEyeOff size={18} /> : <IconEye size={18} />}
              </button>
            </div>

           
            {error && (
              <p className="text-red-500 text-xs">
                {error}
              </p>
            )}
          </div>

         
          <button
            onClick={handleReset}
            disabled={loading}
            className="w-full bg-cyan-700 text-white py-2 text-sm rounded-full mt-4 font-medium disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset"}
          </button>
        </div>
      </div>

     
<Dialog open={openPopup} onOpenChange={setOpenPopup}>
  <DialogContent className="max-w-xs w-full rounded-2xl text-center px-4 py-6">

    
    <DialogTitle className="sr-only">
      Password Reset Successfully
    </DialogTitle>

   <div className="flex justify-center mb-2">
  <Image
    src="/tick.svg"   
    alt="success"
    width={80}
    height={80}
  />
</div>

    <h3 className="text-cyan-700 font-semibold text-xl">
      Password Reset Successfully
    </h3>

    <p className="text-sm text-gray-500 mt-2 leading-relaxed text-center">
  Your password has been updated, you can <br />
  now login with your new credentials
</p>

           <Link href="/login">
             <button
      onClick={() => setOpenPopup(false)}
      className="mt-4 w-full bg-cyan-700 text-white py-2 rounded-full text-sm"
    >
      Login
    </button>
    </Link>


  </DialogContent>
</Dialog>
    </div>
  );
};

export default Page;