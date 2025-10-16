"use client";
import { ClassTypeType } from "@/hooks/useClassTypeApi";
import { useEffect, useState } from "react";
import { CalendarClasses } from "./CalendarClasses";
import { ClassDataProps, ClassType } from "@/hooks/useClassApi";

interface ClassesSuccessProps {
  classType: ClassTypeType;
  visibleMonth: Date;
  setVisibleMonth: React.Dispatch<React.SetStateAction<Date>>;
  classesData: ClassDataProps;
}

export const ClassesSuccess = ({
  classType,
  visibleMonth,
  setVisibleMonth,
  classesData,
}: ClassesSuccessProps) => {
  const [classTypeData, setClassTypeData] = useState<ClassTypeType>({
    _id: classType._id,
    name: "",
    description: "",
    color: "",
  });

  useEffect(() => {
    if (classType) setClassTypeData(classType);
  }, [classType]);

  const [selectedClasses, setSelectedClasses] = useState<ClassType[]>(
    classesData?.list ?? []
  );

  useEffect(() => {
    if (classesData?.list) {
      setSelectedClasses(classesData.list);
    }
  }, [classesData]);

  const [handleModify, setHandleModify] = useState(false);

  return (
    <CalendarClasses
      classId={classType._id ?? ""}
      selectedClasses={selectedClasses}
      setSelectedClasses={setSelectedClasses}
      visibleMonth={visibleMonth}
      setVisibleMonth={setVisibleMonth}
      classTypeData={classTypeData}
      setClassTypeData={setClassTypeData}
      handleModify={handleModify}
      setHandleModify={setHandleModify}
    />
  );
};
