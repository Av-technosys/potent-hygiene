"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("resetEmail", email);
        router.push("/reset-password-otp");
      } else {
        setError(data.error || "Failed to send OTP");
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
        src="/loginbg.png"
        alt="background"
        fill
        priority
        className="object-cover -z-10"
      />

    
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-sm md:max-w-lg lg:max-w-sm p-6">

       
          <div className="flex justify-center mb-2">
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
          </div>

          {/* LOGO */}
<div className="flex justify-center mb-4">
  <Image
    src="/logo.svg"
    alt="Potent logo"
    width={90}
    height={50}
    className="object-contain"
  />
</div>

        
          <h2 className="text-center text-2xl font-semibold text-[#168ba0]">
            Reset Password
          </h2>

          <p className="text-center text-sm text-[#168ba0] mt-2 mb-5">
            Enter your Email ID
          </p>

        
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-gray-400 bg-transparent px-1 py-2 text-sm outline-none focus:border-gray-600"
              />
              {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-700 text-white py-2 text-sm rounded-full mt-6 font-medium disabled:opacity-50"
            >
              {loading ? "Sending..." : "Confirm"}
            </button>
          </form>

       
          <p className="text-center text-xs mt-4 text-gray-600">
            Already have an account?{" "}
           <Link href="/login"> <span className="underline cursor-pointer text-black">Login</span></Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Page;