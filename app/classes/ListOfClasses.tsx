"use client";
import { NoContent } from "@/components/typography";
import { useClassesTypeQuery } from "@/hooks/useClassTypeUnauthenticatedApi";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const ListOfClasses = () => {
  const { t } = useTranslation();
  const { status, data } = useClassesTypeQuery({});

  return (
    <div className="flex flex-col gap-2">
      {status === "success" && data.totalCount > 0 ? (
        data?.list.map((course) => (
          <Link
            href={`/classes/${course._id}`}
            key={course._id}
            className="flex flex-col gap-1 border-2 border-white rounded-md p-2 cursor-pointer hover:shadow-xl transform transition-transform duration-300 hover:scale-105"
          >
            <p className="text-lg font-bold text-gray-700">
              {course.name ? course.name : t("toDefine")}
            </p>
            <p className="font-thin text-xs text-gray-700">
              {course.description ? course.description : t("toDefine")}
            </p>
          </Link>
        ))
      ) : (
        <NoContent title={t("noCoursesCreated")} />
      )}
    </div>
  );
};
