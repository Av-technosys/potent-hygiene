/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { confirmForgotPassword } from "@/helper";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ get from previous step
  const email = searchParams.get("email");
  const code = searchParams.get("code");

  React.useEffect(() => {
    if (!email || !code) {
      router.push("/reset-password-email");
    }
  }, [email, code, router]);

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      toast.error("Both fields are required ❌");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters ❌");
      return;
    }

    try {
      setLoading(true);

      const toastId = toast.loading("Resetting password...");

      // 🔥 MAIN API CALL
      await confirmForgotPassword({
        email: email!,
        code: code!,
        newPassword: password,
      });

      toast.success("Password reset successful 🎉", { id: toastId });

      setOpenPopup(true);

    } catch (err: any) {
      console.error("Error:", err);
      toast.error(err.message || "Failed to reset password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center lg:justify-end">

      {/* Background */}
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
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-sm p-4">

          {/* LOGO */}
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

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-gray-400 px-1 py-2 text-sm outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-2 text-gray-500"
              >
                {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border-b border-gray-400 px-1 py-2 text-sm outline-none"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-1 top-2 text-gray-500"
              >
                {showConfirm ? <IconEyeOff size={18} /> : <IconEye size={18} />}
              </button>
            </div>

          </div>

          {/* Submit */}
          <button
            onClick={handleReset}
            disabled={loading}
            className="w-full bg-cyan-700 text-white py-2 text-sm rounded-full mt-4 font-medium disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset"}
          </button>
        </div>
      </div>

      {/* SUCCESS POPUP */}
      <Dialog open={openPopup} onOpenChange={setOpenPopup}>
        <DialogContent className="max-w-xs w-full rounded-2xl text-center px-4 py-6">

          <DialogTitle className="sr-only">
            Password Reset Successfully
          </DialogTitle>

          <div className="flex justify-center mb-2">
            <Image src="/tick.svg" alt="success" width={80} height={80} />
          </div>

          <h3 className="text-cyan-700 font-semibold text-xl">
            Password Reset Successfully
          </h3>

          <p className="text-sm text-gray-500 mt-2 text-center">
            Your password has been updated, you can now login.
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