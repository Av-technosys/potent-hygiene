"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Droplet } from "lucide-react";

export default function LogEntry() {
  const [cycle, setCycle] = useState(28);
  const [selectedFlow, setSelectedFlow] = useState("Medium");

  const flowOptions = ["Light", "Medium", "Heavy", "Spotting"];

  return (
    <section className="w-full  bg-[#f5f3f0] flex items-center justify-center px-4 py-10">
      <div className="container mx-auto w-full grid lg:grid-cols-2 gap-10 items-center">
        
        {/* LEFT FORM */}
        <Card className="p-6 rounded-2xl shadow-md">
          <CardContent className="space-y-6">
            
            <h2 className="text-xl font-semibold">Log Entry</h2>

            {/* Date */}
            <div className="space-y-2 flex flex-col items-start ">
              <label className="text-sm text-gray-500">
                Last Period Start
              </label>
              <Input type="date" className="bg-gray-100 " />
            </div>

            {/* Cycle Length */}
            <div className="space-y-2 w-full flex flex-col items-start">
              <label className="text-sm text-gray-500">
                Cycle Length (Days)
              </label>

              <div className="w-full flex items-center justify-between bg-gray-100 rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer"
                  onClick={() => setCycle((prev) => Math.max(1, prev - 1))}
                >
                  <Minus />
                </Button>

                <span className="font-medium  text-lg">
                  {cycle}
                </span>

                <Button
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer"
                  onClick={() => setCycle((prev) => prev + 1)}
                >
                  <Plus />
                </Button>
              </div>
            </div>

            {/* Flow Intensity */}
            <div className="space-y-2 w-full flex flex-col items-start">
              <label className="text-sm text-gray-500">
                Flow Intensity
              </label>

              <div className="w-full grid grid-cols-2 gap-3">
                {flowOptions.map((flow) => (
                  <button
                    key={flow}
                    onClick={() => setSelectedFlow(flow)}
                    className={`flex flex-col items-center justify-center gap-1 rounded-xl border p-4 text-sm transition ${
                      selectedFlow === flow
                        ? "border-2 border-[#188B9E] bg-white text-[#188B9E]"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Droplet size={18} />
                    {flow}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-5">
              Update Log
            </Button>
          </CardContent>
        </Card>

        {/* RIGHT IMAGE */}
        <div className="hidden lg:flex justify-center">
          <img
            src="/logentry.png" 
            alt="illustration"
            className="max-w-md w-full"
          />
        </div>
      </div>
    </section>
  );
}