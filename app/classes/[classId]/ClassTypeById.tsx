"use client";
import { ClassTypeType, useClassTypeByIdQuery } from "@/hooks/useClassTypeApi";
import { useState } from "react";
import { Loader } from "@/components/Loader";
import { ClassesSuccess } from "./ClassesSuccess";
import { Filter } from "@/hooks/QueryHelper";
import { useClassesQuery } from "@/hooks/useClassUnauthenticatedApi";
import { Error404Page } from "@/components/Error404Page";
import { TitleComponent } from "@/components/titles";
import { ContentContainer } from "@/components/layout";
import { useTranslation } from "react-i18next";

interface ClassTypeByIdSuccessProps {
  classType: ClassTypeType;
  visibleMonth: Date;
  setVisibleMonth: React.Dispatch<React.SetStateAction<Date>>;
}
const ClassTypeByIdSuccess = ({
  classType,
  visibleMonth,
  setVisibleMonth,
}: ClassTypeByIdSuccessProps) => {
  const month = visibleMonth.getMonth() + 1;
  const year = visibleMonth.getFullYear();

  const startOfMonth = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));

  const endOfMonth = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

  const { status: classesStatus, data: classesData } = useClassesQuery({
    ...Filter.from({
      $and: [
        { classType: classType._id },
        {
          date: {
            $gte: startOfMonth.toISOString(),
            $lte: endOfMonth.toISOString(),
          },
        },
      ],
    }),
    sort: "date",
  });

  if (classesStatus === "pending") {
    return <Loader />;
  }
  if (classesStatus === "error") {
    return <Error404Page />;
  }

  return (
    <ClassesSuccess
      classType={classType}
      visibleMonth={visibleMonth}
      setVisibleMonth={setVisibleMonth}
      classesData={classesData}
    />
  );
};

export interface CourseByIdProps {
  classId: string;
}

export const ClassTypeById = ({ classId }: CourseByIdProps) => {
  const { t } = useTranslation();
  const [visibleMonth, setVisibleMonth] = useState(new Date());
  const { status: classTypeStatus, data: classType } =
    useClassTypeByIdQuery(classId);

  if (classTypeStatus === "pending") {
    return <Loader />;
  }
  if (classTypeStatus === "error") {
    return <Error404Page />;
  }

  return (
    <div>
      <TitleComponent big={t("edit")} small={t("changeTheCourseType")} />
      <ContentContainer>
        <ClassTypeByIdSuccess
          classType={classType}
          visibleMonth={visibleMonth}
          setVisibleMonth={setVisibleMonth}
        />
      </ContentContainer>
    </div>
  );
};
