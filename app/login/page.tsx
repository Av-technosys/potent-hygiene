import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
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
<div className="bg-white shadow-lg rounded-2xl w-full max-w-sm md:max-w-lg lg:max-w-md p-4">

        <div className="flex justify-center mb-4 mt-5">
  <Image
    src="/logo.svg"   
    alt="Potent logo"
    width={90}
    height={50}
    className="object-contain"
  />
</div>
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

          <h2 className="text-center text-2xl font-semibold text-[#168ba0] mb-2">
            Login
          </h2>

          <p className="text-center text-sm font-semibold text-[#168ba0] mt-1 mb-3">
            Enter your details below
          </p>

          <div className="space-y-2">
  <input
    type="email"
    placeholder="Email"
    className="w-full border-b border-gray-400 bg-transparent px-1 py-2 text-sm outline-none focus:border-gray-600"
  />

  <input
    type="password"
    placeholder="Password"
    className="w-full border-b border-gray-400 bg-transparent px-1 py-2 text-sm outline-none focus:border-gray-600"
  />
</div>

          <div className="text-right text-xs mt-2">
          <Link href="/reset-password-email"><button className="text-black font-semibold mb-5">Forgot Password?</button></Link>
          </div>

          <Link href="/">
          <button className="w-full bg-cyan-700 text-white py-2 text-sm rounded-lg mt-2 mb-2 font-medium">
            Login
          </button></Link>

         <button className="w-full border border-cyan-700 text-cyan-700 py-2 text-sm rounded-full mt-1 font-medium flex items-center justify-center gap-2 bg-white ">
  
  <Image
    src="/google.svg"   
    alt="google"
    width={15}
    height={15}
  />

  <span>Sign up with Google</span>
</button>

          <p className="text-center text-xs mt-4 mb-6">
            Don’t have an account?{" "}
<Link href="/signup" className="underline cursor-pointer">
  Register
</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;