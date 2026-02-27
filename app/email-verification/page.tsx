import Image from "next/image";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

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
          <h2 className="text-center text-2xl font-semibold text-[#3399ac]">
            Email Verification
          </h2>

          <p className="text-center text-sm text-[#168ba0] mt-2">
            OTP sent to your mail id xyz@gmail.com
          </p>

          
          <div className="mt-6">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border-b border-gray-400 bg-transparent px-1 py-2 text-sm outline-none focus:border-gray-600"
            />
          </div>

          
          <div className="flex justify-between text-xs mt-2">
            <span className="text-black font-semibold">Resend OTP in 00:24</span>
            <button className="font-medium">Resend</button>
          </div>

          
          <Dialog>
            <DialogTrigger asChild>
             <button className="w-full bg-[#168ba0] text-white py-2 text-sm rounded-full mt-6 font-medium">
                Confirm
              </button>
            </DialogTrigger>

           <DialogContent className="max-w-xs min-h-80 rounded-2xl p-0 border-none shadow-xl">
              <div className="bg-white rounded-2xl p-6 text-center flex flex-col justify-center h-full">

                
                <DialogTitle className="sr-only">
                  Email Verification Success
                </DialogTitle>

               
                <div className="flex justify-center mb-4">
                  <Image
                    src="/tick.svg"
                    alt="verified"
                    width={90}
                    height={90}
                  />
                </div>

                <h3 className="text-[#168ba0] text-xl font-semibold">
                  Email Verified Successfully
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  Your email verification is successfully completed.
                </p>

                <Link href="/">
                <button className="w-full bg-[#168ba0] text-white py-2 rounded-full mt-6 font-medium">
                  Login
                </button></Link>

              </div>
            </DialogContent>
          </Dialog>

          <p className="text-center text-xs mt-4">
            Already have an account?{" "}
            <Link href="/login"><span className="underline cursor-pointer">Login</span></Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Page;