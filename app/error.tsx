"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCw, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "./components/common/Navbar";
import Footer from "./components/common/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-[#E6F4F6]">
        <section className="container flex min-h-[70vh] items-center py-16">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_420px]">
            <div className="space-y-6 text-center lg:text-left">
              <div className="mx-auto w-fit rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#1A8D91] shadow-sm lg:mx-0">
                Something went wrong
              </div>

              <div className="space-y-4">
                <p className="font-serif text-7xl font-bold leading-none text-[#2C5F63] sm:text-8xl">
                  500
                </p>
                <h1 className="text-3xl font-semibold text-[#2C5F63] sm:text-4xl">
                  We hit a temporary snag.
                </h1>
                <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-600 lg:mx-0">
                  Please try loading this page again. If it keeps happening, you
                  can return home and continue browsing.
                </p>
              </div>

              <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Button
                  type="button"
                  onClick={reset}
                  className="rounded-full bg-[#168BA0] px-7 py-6 text-white hover:bg-[#146e71]"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-[#168BA0] px-7 py-6 text-[#168BA0] hover:bg-white"
                >
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    Go Home
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-[360px]">
              <div className="absolute inset-0 rounded-full bg-white/70" />
              <div className="absolute inset-8 rounded-full bg-[#AFE7F1]/80" />
              <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#168BA0] shadow-lg">
                <ShieldAlert className="h-16 w-16" />
              </div>
              <div className="absolute bottom-8 left-1/2 w-[220px] -translate-x-1/2 rounded-xl border border-white/70 bg-white/95 p-4 text-center shadow-sm">
                <p className="text-sm font-semibold text-gray-800">
                  Your session is safe
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  A quick retry usually fixes this.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
