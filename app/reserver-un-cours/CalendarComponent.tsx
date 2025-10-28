"use client";
import { useMemo, useState } from "react";
import { ClassType } from "@/hooks/useClassApi";
import { Calendar } from "@/components/ui/calendar";

interface CalendarComponentProps {
  allClasses: ClassType[];
  setSelectedDay: (day: string) => void;
}

export const CalendarComponent = ({
  allClasses,
  setSelectedDay,
}: CalendarComponentProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const today = new Date();

  const futureClasses = useMemo(
    () =>
      allClasses.filter(
        (c) =>
          new Date(c.date) >= new Date(today.getFullYear(), today.getMonth())
      ),
    [allClasses, today]
  );

  const futureDates = useMemo(
    () => new Set(futureClasses.map((c) => new Date(c.date).toDateString())),
    [futureClasses]
  );

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);

    if (!date) {
      setSelectedDay("");
      return;
    }

    setSelectedDay(date.toDateString());
  };

  const startMonth = new Date(today.getFullYear(), today.getMonth());
  const endMonth = new Date(2030, 11);

  return (
    <Calendar
      mode="single"
      allClasses={allClasses}
      selected={selectedDate}
      onSelect={handleSelect}
      startMonth={startMonth}
      endMonth={endMonth}
      captionLayout="dropdown"
      className="bg-transparent w-full md:w-[30rem] mx-right"
      modifiers={{
        event: (date: Date) => futureDates.has(date.toDateString()),
      }}
      modifiersClassNames={{
        event: "bg-amber-200 text-gray-800 font-bold rounded-md",
      }}
    />
  );
};
