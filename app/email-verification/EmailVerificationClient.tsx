/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { resendOtp, verifyOtp } from "@/helper";

export const EmailVerificationClient = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  React.useEffect(() => {
    if (!email) {
      router.push("/sign-up");
    }
  }, [email, router]);

  React.useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      toast.error("Please enter OTP ❌");
      return;
    }

    if (loading) return;

    setLoading(true);

    const toastId = toast.loading("Verifying OTP...");

    try {
      await verifyOtp({
        email: email!,
        code: otp,
      });

      toast.success("Email verified successfully 🎉", {
        id: toastId,
      });

      setIsVerified(true);
    } catch (error: any) {
      console.error("OTP verification error:", error);

      toast.error(error.message || "Verification failed ❌", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleResend = async () => {
    if (!canResend || loading) return;
    setLoading(true);

    const toastId = toast.loading("Resending OTP...");

    try {
      await resendOtp(email!);

      toast.success("OTP resent successfully 📩", {
        id: toastId,
      });

      setTimer(30);
      setCanResend(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to resend OTP ❌", {
        id: toastId,
      });
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
          <h2 className="text-center text-2xl font-semibold text-[#3399ac]">
            Email Verification
          </h2>

          <p className="text-center text-sm text-[#168ba0] mt-2">
            OTP sent to your mail id {email}
          </p>

          <div className="mt-6">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border-b border-gray-400 bg-transparent px-1 py-2 text-sm outline-none focus:border-gray-600"
            />

            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full bg-[#168ba0] text-white py-2 text-sm rounded-full mt-6 font-medium"
            >
              {loading ? "Verifying..." : "Confirm"}
            </button>
            {/* {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )} */}
          </div>

          <div className="flex items-center justify-between text-xs mt-4 w-full">
            {!canResend ? (
              <span className="text-black font-semibold">
                Resend OTP in 00:{timer.toString().padStart(2, "0")}
              </span>
            ) : (
              <span className="text-green-600 font-semibold">
                You can resend OTP
              </span>
            )}

            <button
              onClick={handleResend}
              disabled={!canResend}
              className={`font-medium ${
                canResend ? "text-blue-600" : "text-gray-400 cursor-not-allowed"
              }`}
            >
              Resend
            </button>
          </div>

          <Dialog open={isVerified} onOpenChange={setIsVerified}>
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

                <Link href="/login">
                  <button className="w-full bg-[#168ba0] text-white py-2 rounded-full mt-6 font-medium">
                    Login
                  </button>
                </Link>
              </div>
            </DialogContent>
          </Dialog>

          <p className="text-center text-xs mt-4">
            Already have an account?{" "}
            <Link href="/login">
              <span className="underline cursor-pointer">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
