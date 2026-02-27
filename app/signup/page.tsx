"use client";

import Image from "next/image";
import React, { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import Link from "next/link";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-md md:max-w-lg lg:max-w-md p-5">

       
          <div className="flex justify-center mb-1">
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
            Create an account
          </h2>

          <p className="text-center text-sm text-[#168ba0] mt-1 mb-3">
            Enter your details below
          </p>

          
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border-b border-gray-400 bg-transparent px-1 py-2 text-sm outline-none focus:border-gray-600"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border-b border-gray-400 bg-transparent px-1 py-2 text-sm outline-none focus:border-gray-600"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border-b border-gray-400 bg-transparent px-1 py-2 text-sm outline-none focus:border-gray-600"
            />

         
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border-b border-gray-400 bg-transparent px-1 py-2 pr-8 text-sm outline-none focus:border-gray-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
              </button>
            </div>

          
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full border-b border-gray-400 bg-transparent px-1 py-2 pr-8 text-sm outline-none focus:border-gray-600"
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? (
                  <IconEyeOff size={18} />
                ) : (
                  <IconEye size={18} />
                )}
              </button>
            </div>
          </div>

        
           <Link href="/email-verification">
          <button className="w-full bg-cyan-700 text-white py-2 text-sm rounded-full mt-3 font-medium">
            Create Account
          </button>
</Link>
          
          <button className="w-full border border-cyan-700 text-cyan-700 py-2 text-sm rounded-full mt-2 font-medium flex items-center justify-center gap-2 bg-white">
            <Image
              src="/google.svg"
              alt="google"
              width={15}
              height={15}
            />
            <span>Sign up with Google</span>
          </button>

       
          <p className="text-center text-xs mt-2">
            Already have an account?{" "}
            <Link href="/login" className="underline cursor-pointer">
  Login
</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Page;