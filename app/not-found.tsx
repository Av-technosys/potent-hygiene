import Link from "next/link";
import { ArrowRight, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function NotFound() {
  return (
    <>
      <main className="min-h-[70vh] bg-[#E6F4F6]">
        <section className="container flex min-h-[70vh] items-center py-16">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_420px]">
            <div className="space-y-6 text-center lg:text-left">
              <div className="mx-auto w-fit rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#1A8D91] shadow-sm lg:mx-0">
                Page not found
              </div>

              <div className="space-y-4">
                <p className="font-serif text-7xl font-bold leading-none text-[#2C5F63] sm:text-8xl">
                  404
                </p>
                <h1 className="text-3xl font-semibold text-[#2C5F63] sm:text-4xl">
                  This page wandered off.
                </h1>
                <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-600 lg:mx-0">
                  The link may be old, moved, or typed incorrectly. You can head
                  back home or browse products that are ready for you.
                </p>
              </div>

              <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Button
                  asChild
                  className="rounded-full bg-[#168BA0] px-7 py-6 text-white hover:bg-[#146e71]"
                >
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    Go Home
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-[#168BA0] px-7 py-6 text-[#168BA0] hover:bg-white"
                >
                  <Link href="/shop">
                    <Search className="h-4 w-4" />
                    Shop Products
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-[360px]">
              <div className="absolute inset-0 rounded-full bg-white/70" />
              <div className="absolute inset-8 rounded-full bg-[#AFE7F1]/80" />
              <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#168BA0] shadow-lg">
                <ArrowRight className="h-16 w-16 -rotate-45" />
              </div>
              <div className="absolute bottom-8 left-1/2 w-[220px] -translate-x-1/2 rounded-xl border border-white/70 bg-white/95 p-4 text-center shadow-sm">
                <p className="text-sm font-semibold text-gray-800">
                  Let&apos;s get you back on track
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Safe care is still one click away.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
