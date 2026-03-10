"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
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

  const handleVerify = async () => {
    setError("");
    if (!otp.trim()) {
      setError("Please enter OTP");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/reset-password-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/reset-password-confirm");
      } else {
        setError(data.error || "Invalid OTP");
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
            <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={36}
            />
          </div>

          <h2 className="text-center text-2xl font-semibold text-[#168ba0]">
           Reset Password
          </h2>

          <p className="text-center text-sm text-[#168ba0] mt-1 mb-3">
            Enter the OTP sent to your email
          </p>

       
<div className="mt-2">
  <input
    type="text"
    placeholder="Enter OTP"
    value={otp}
    onChange={(e) => setOtp(e.target.value)}
    className="w-full border-b border-gray-400 bg-transparent px-1 py-2 text-sm outline-none focus:border-gray-600"
  />
  {error && (
    <p className="text-red-500 text-xs mt-1">{error}</p>
  )}
</div>

          <div className="flex items-center justify-between text-xs mt-2">
  <p className="text-black font-semibold">
    Resend OTP in 00:24
  </p>

  <button className="text-black font-medium">
    Resend
  </button>
</div>

<button
  type="button"
  onClick={handleVerify}
  disabled={loading}
  className="w-full bg-cyan-700 text-white py-2 text-sm rounded-lg mt-5 font-medium disabled:opacity-50"
>
  {loading ? "Verifying..." : "Confirm"}
</button>

          <p className="text-center text-xs mt-2">
            Back to{" "}
           <Link href="/login"> <span className="underline cursor-pointer">Login</span></Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Page;