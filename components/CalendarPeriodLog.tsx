"use client"

import * as React from "react"

import { CalendarPL } from "@/components/ui/calendarPL"

export function CalendarPeriodLog({ dateArray }: any) {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const range1 = { from: new Date(2026, 4, 5), to: new Date(2026, 4, 9) }
    const range2 = { from: new Date(2026, 4, 11), to: new Date(2026, 4, 15) }
    return (
        <CalendarPL
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border"
            // captionLayout="dropdown"
            dateArray={{
                pmsRange: {
                    from: new Date(2026, 3, 8),
                    to: new Date(2026, 3, 10),
                },
                periodRange: {
                    from: new Date(2026, 3, 11),
                    to: new Date(2026, 3, 15),
                },
            }}
        />
    )
}
