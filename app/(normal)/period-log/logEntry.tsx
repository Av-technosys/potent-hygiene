"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Droplet } from "lucide-react";
import { CalendarPeriodLog } from "@/components/CalendarPeriodLog";

export default function LogEntry() {
  const [cycle, setCycle] = useState(28);
  const [periodTime, setPeriodTime] = useState(5);

  function getNextDaysArray(startDate: Date, count: number) {
    const result = [];
    const date = new Date(startDate);

    for (let i = 0; i < count; i++) {
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + i);
      result.push(nextDate);
    }

    return result;
  }

  const dateArray = getNextDaysArray(new Date(), 5);

  return (
    <section className="bg-[#f5f3f0]">
      <div className=" container py-12!">
        <div className="  w-full grid lg:grid-cols-2 gap-10 items-center">

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
                  How long is your cycle? (Days)
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
              <div className="space-y-2 w-full flex flex-col items-start">
                <label className="text-sm text-gray-500">
                  How long does a period last? (Days)
                </label>

                <div className="w-full flex items-center justify-between bg-gray-100 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer"
                    onClick={() => setPeriodTime((prev) => Math.max(1, prev - 1))}
                  >
                    <Minus />
                  </Button>

                  <span className="font-medium  text-lg">
                    {periodTime}
                  </span>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer"
                    onClick={() => setPeriodTime((prev) => prev + 1)}
                  >
                    <Plus />
                  </Button>
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
        <div className=" mt-12">
          <CalendarPeriodLog dateArray={dateArray} />
        </div>
      </div>
    </section>
  );
}