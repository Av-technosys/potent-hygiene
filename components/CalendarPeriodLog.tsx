// "use client"

// import * as React from "react"

// import { CalendarPL } from "@/components/ui/calendarPL"

// export function CalendarPeriodLog({ dateArray }: any) {
//     const [date, setDate] = React.useState<Date | undefined>(new Date())
//     const range1 = { from: new Date(2026, 4, 5), to: new Date(2026, 4, 9) }
//     const range2 = { from: new Date(2026, 4, 11), to: new Date(2026, 4, 15) }
//     return (
//         <CalendarPL
//             mode="single"
//             selected={date}
//             onSelect={setDate}
//             className="rounded-lg border"
//             // captionLayout="dropdown"
//             dateArray={{
//                 pmsRange: {
//                     from: new Date(2026, 3, 8),
//                     to: new Date(2026, 3, 10),
//                 },
//                 periodRange: {
//                     from: new Date(2026, 3, 11),
//                     to: new Date(2026, 3, 15),
//                 },
//             }}
//         />
//     )
// }



"use client";

import {
  addDays,
  addMonths,
  startOfMonth,
  endOfMonth,
  getDay,
} from "date-fns";

// helpers
function getDatesBetween(start: Date, end: Date) {
  const dates: Date[] = [];
  let current = new Date(start);

  while (current <= end) {
    dates.push(new Date(current));
    current = addDays(current, 1);
  }

  return dates;
}

function isSameDay(d1: Date, d2: Date) {
  return d1.toDateString() === d2.toDateString();
}

// 🔥 CORE LOGIC
// function calculateData(startDate: Date, cycle: number, periodLength: number) {
//   const periodDates: Date[] = [];
//   const fertileDates: Date[] = [];

//   const shift = 30 - cycle;

//   const startMonth = startDate.getMonth();
//   const startYear = startDate.getFullYear();

//   for (let i = 0; i < 6; i++) {
//     const base = addDays(startDate, i * cycle);

//     const currentMonth = base.getMonth();
//     const currentYear = base.getFullYear();

//     // 🔴 FIRST MONTH
//     if (currentMonth === startMonth && currentYear === startYear) {
//       const monthStart = new Date(startYear, startMonth, 1);

//       const periodStart = addDays(startDate, 1);
//       const periodEnd = addDays(periodStart, periodLength - 1);

//       periodDates.push(...getDatesBetween(monthStart, periodEnd));
//       continue;
//     }

//     // 🟣 NEXT MONTHS
//     const periodStart = addDays(startDate, i * cycle + 1 - shift);
//     const periodEnd = addDays(periodStart, periodLength - 1);

//     const fertileStart = addDays(periodStart, -6);
//     const fertileEnd = addDays(periodStart, -2);

//     periodDates.push(...getDatesBetween(periodStart, periodEnd));
//     fertileDates.push(...getDatesBetween(fertileStart, fertileEnd));
//   }

//   return { periodDates, fertileDates };
// }

function calculateData(
  startDate: Date,
  cycle: number,
  periodLength: number
) {
  const periodDates: Date[] = [];
  const fertileDates: Date[] = [];

  const shift = 30 - cycle;

  const startMonth = startDate.getMonth();
  const startYear = startDate.getFullYear();

  for (let i = 0; i < 6; i++) {
    // ✅ FIX: adjust base date FIRST
    const adjustedBase = addDays(startDate, i * cycle - shift);

    const currentMonth = adjustedBase.getMonth();
    const currentYear = adjustedBase.getFullYear();

    // 🔴 FIRST MONTH
    if (currentMonth === startMonth && currentYear === startYear) {
      const monthStart = new Date(startYear, startMonth, 1);

      const periodStart = addDays(adjustedBase, 1);
      const periodEnd = addDays(periodStart, periodLength - 1);

      periodDates.push(...getDatesBetween(monthStart, periodEnd));
      continue;
    }

    // 🟣 NEXT MONTHS
    const periodStart = addDays(adjustedBase, 1);
    const periodEnd = addDays(periodStart, periodLength - 1);

//    const fertileStart = addDays(periodStart, -6 - shift);
// const fertileEnd   = addDays(periodStart, -2 - shift);

const fertileWindowSize = 5;

const fertileEnd = addDays(periodStart, -1 - shift);
const fertileStart = addDays(fertileEnd, -(fertileWindowSize - 1));
    periodDates.push(...getDatesBetween(periodStart, periodEnd));
    fertileDates.push(...getDatesBetween(fertileStart, fertileEnd));
  }

  return { periodDates, fertileDates };
}

// UI components
function Day({ date, periodDates, fertileDates }: any) {
  const isPeriod = periodDates.some((d: Date) => isSameDay(d, date));
  const isFertile =
    !isPeriod && fertileDates.some((d: Date) => isSameDay(d, date));

  return (
    <div
      className={`w-9 h-9 flex items-center justify-center rounded-full text-sm
        ${isPeriod ? "bg-[#E57373] text-white" : ""}
        ${isFertile ? "bg-[#B39DDB] text-white" : ""}
      `}
    >
      {date.getDate()}
    </div>
  );
}

function Month({ month, periodDates, fertileDates }: any) {
  const start = startOfMonth(month);
  const end = endOfMonth(month);

  const days = getDatesBetween(start, end);
  const blanks = Array(getDay(start)).fill(null);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-center font-semibold mb-4">
        {month.toLocaleString("default", { month: "long" })}{" "}
        {month.getFullYear()}
      </h3>

      <div className="grid grid-cols-7 text-xs text-gray-400 mb-2 text-center">
        {["S","M","T","W","T","F","S"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 justify-items-center">
        {blanks.map((_, i) => (
          <div key={i} className="w-9 h-9" />
        ))}
        {days.map((date) => (
          <Day
            key={date.toISOString()}
            date={date}
            periodDates={periodDates}
            fertileDates={fertileDates}
          />
        ))}
      </div>
    </div>
  );
}

// MAIN
export function CalendarPeriodLog({
  startDate,
  cycle,
  periodTime,
}: any) {
  const { periodDates, fertileDates } = calculateData(
    startDate,
    cycle,
    periodTime
  );

  const baseMonth = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    1
  );

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {[0, 1, 2].map((i) => (
        <Month
          key={i}
          month={addMonths(baseMonth, i)}
          periodDates={periodDates}
          fertileDates={fertileDates}
        />
      ))}
    </div>
  );
}