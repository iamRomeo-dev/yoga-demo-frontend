import { Calendar } from "@/components/ui/calendar";
import { ClassType } from "@/hooks/useClassApi";
import { useState } from "react";
import { useClassesQueryAuthenticated } from "@/hooks/useClassApi";
import { Loader } from "@/components/Loader";
import { Error404Page } from "@/components/Error404Page";
import { DetailsViewComponent } from "./DetailsViewComponent";

interface CalendarComponentProps {
  allClasses: ClassType[];
  setSelectedDayClasses: React.Dispatch<React.SetStateAction<ClassType[]>>;
}

const CalendarComponent = ({
  allClasses,
  setSelectedDayClasses,
}: CalendarComponentProps) => {
  const today = new Date();

  const futureClasses = allClasses.filter((c) => {
    const classDate = new Date(c.date);
    return classDate >= new Date(today.getFullYear(), today.getMonth());
  });

  const futureDates = new Set(
    futureClasses.map((c) => new Date(c.date).toDateString())
  );

  const handleSelect = (date: Date | undefined) => {
    if (!date) {
      setSelectedDayClasses([]);
      return;
    }
    const selected = futureClasses.filter(
      (c) => new Date(c.date).toDateString() === date.toDateString()
    );
    setSelectedDayClasses(selected);
  };

  const startMonth = new Date(today.getFullYear(), today.getMonth());
  const endMonth = new Date(2030, 11);

  return (
    <Calendar
      allClasses={allClasses}
      mode="single"
      onSelect={handleSelect}
      startMonth={startMonth}
      endMonth={endMonth}
      className="bg-transparent w-full md:w-[22rem] mx-right dark:bg-white"
      captionLayout="dropdown"
      modifiers={{
        event: (date: Date) => futureDates.has(date.toDateString()),
      }}
      modifiersClassNames={{
        event: "bg-[#FF751F] text-amber-50 font-bold rounded-md",
      }}
    />
  );
};

export const CalendarView = () => {
  const { status: classesStatus, data: classesData } =
    useClassesQueryAuthenticated({});
  const [selectedDayClasses, setSelectedDayClasses] = useState<ClassType[]>([]);

  if (classesStatus === "pending") {
    return <Loader />;
  }
  if (classesStatus === "error") {
    return <Error404Page />;
  }

  return (
    <div className="flex flex-col md:flex-row w-full h-full md:h-[80vh]">
      {/* Left column: Calendar */}
      <div
        className={
          selectedDayClasses.length > 0
            ? "w-full md:w-1/2 flex flex-col items-center justify-start transition-all"
            : "w-full flex flex-col justify-start items-center transition-all"
        }
      >
        {" "}
        <CalendarComponent
          allClasses={classesData.list}
          setSelectedDayClasses={setSelectedDayClasses}
        />
      </div>

      {/* Right column: Details with vertical scroll */}
      {selectedDayClasses.length > 0 && (
        <div className="w-full md:w-1/2 flex justify-start transition-all overflow-y-auto mb-6">
          <DetailsViewComponent
            selectedDayClasses={selectedDayClasses}
            setSelectedDayClasses={setSelectedDayClasses}
          />
        </div>
      )}
    </div>
  );
};
