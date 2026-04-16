/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signUp } from "@/helper";
import { toast } from "sonner";

const Page = () => {
  const params = useSearchParams();
  const ref = params.get("ref");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    ref: ref || ""
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone required";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password required";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (loading) return;

    setLoading(true);

    const toastId = toast.loading("Creating your account...");

    try {
      const res = await signUp({
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        name: formData.fullName,
      });

      toast.success(res.message || "OTP sent!", {
        id: toastId,
      });

      router.push(`/email-verification?email=${formData.email}`);
    } catch (error: any) {
      toast.error(error.message || "Signup failed ❌", {
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

          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border-b border-gray-400 bg-transparent px-1 py-2 text-sm outline-none focus:border-gray-600"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b border-gray-400 bg-transparent px-1 py-2 text-sm outline-none focus:border-gray-600"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border-b border-gray-400 bg-transparent px-1 py-2 text-sm outline-none focus:border-gray-600"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border-b border-gray-400 bg-transparent px-1 py-2 pr-8 text-sm outline-none focus:border-gray-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <IconEyeOff size={18} />
                ) : (
                  <IconEye size={18} />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border-b border-gray-400 bg-transparent px-1 py-2 pr-8 text-sm outline-none focus:border-gray-600"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? (
                  <IconEyeOff size={18} />
                ) : (
                  <IconEye size={18} />
                )}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <input
              type="text"
              name="ref"
              placeholder="Referal Code"
              value={formData.ref}
              onChange={handleChange}
              className="w-full border-b border-gray-400 bg-transparent px-1 py-2 text-sm outline-none focus:border-gray-600"
            />

            <button
              type="submit"
              className="w-full bg-cyan-700 text-white py-2 text-sm rounded-full mt-3 font-medium"
            >
              Create Account
            </button>
          </form>

          <button className="w-full border border-cyan-700 text-cyan-700 py-2 text-sm rounded-full mt-2 font-medium flex items-center justify-center gap-2 bg-white">
            <Image src="/google.svg" alt="google" width={15} height={15} />
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
