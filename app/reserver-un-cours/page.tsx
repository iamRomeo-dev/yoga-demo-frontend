"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { ClassType } from "@/hooks/useClassApi";
import { Filter } from "@/hooks/QueryHelper";
import { Error404Page } from "@/components/Error404Page";
import { TitleComponent } from "@/components/titles";
import { ContentContainer, PageContainer } from "@/components/layout";
import { ClassTypeSelector } from "./ClassTypeSelector";
import { CalendarComponent } from "./CalendarComponent";
import { SelectedView } from "./SelectedView";
import { Loader } from "@/components/Loader";
import { useSearchParams } from "next/navigation";
import { useClassesTypeQuery } from "@/hooks/useClassTypeUnauthenticatedApi";
import { useClassesQuery } from "@/hooks/useClassUnauthenticatedApi";
import { useTranslation } from "react-i18next";

const Page = () => {
  const { t } = useTranslation();
  const [currentMonth] = useState<Date>(new Date());
  const [selectedClassType, setSelectedClassType] = useState("");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedDayClasses, setSelectedDayClasses] = useState<ClassType[]>([]);

  const { status: classesTypeStatus, data: classesType } = useClassesTypeQuery(
    {}
  );
  const searchParams = useSearchParams();

  const classTypeUrl = searchParams.get("classType");

  useEffect(() => {
    setSelectedClassType(classTypeUrl ?? "");
  }, [classTypeUrl]);

  const { status: classesStatus, data: classesData } = useClassesQuery({
    ...Filter.from({
      $and: [
        {
          date: {
            $gte: currentMonth.toISOString(),
          },
        },
        selectedClassType ? { classType: selectedClassType } : {},
      ],
    }),
  });

  useEffect(() => {
    if (!classesData?.list || !selectedDay) {
      setSelectedDayClasses([]);
      return;
    }

    const updatedDayClasses = classesData.list.filter(
      (c) =>
        new Date(c.date).toDateString() === new Date(selectedDay).toDateString()
    );
    setSelectedDayClasses(updatedDayClasses);
  }, [classesData?.list, selectedDay]);

  if (classesStatus === "pending" || classesTypeStatus === "pending") {
    return <Loader />;
  }
  if (classesStatus === "error" || classesTypeStatus === "error") {
    return <Error404Page />;
  }
  return (
    <PageContainer>
      <TitleComponent
        big={t("bookAGroupClass")}
        small={t("bookAGroupClassSmall")}
      />
      <ContentContainer>
        <ClassTypeSelector
          classesType={classesType.list}
          selectedClassType={selectedClassType}
          setSelectedClassType={setSelectedClassType}
        />
        <div className="flex flex-col lg:flex-row w-full">
          {/* Left half for Calendar */}
          <div
            className={
              selectedDayClasses.length > 0
                ? "w-full lg:w-2/3 flex justify-end transition-all"
                : "w-full flex justify-center transition-all"
            }
          >
            <CalendarComponent
              allClasses={classesData.list}
              setSelectedDay={(day: string) => setSelectedDay(day)}
            />
          </div>

          {/* Right half for SelectedView */}
          {selectedDayClasses.length > 0 && (
            <div className="w-full lg:w-1/3 flex justify-start transition-all">
              <SelectedView selectedDayClasses={selectedDayClasses} />
            </div>
          )}
        </div>
      </ContentContainer>
    </PageContainer>
  );
};

export default Page;
