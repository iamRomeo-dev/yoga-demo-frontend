"use client";
import { ClassTypeType } from "@/hooks/useClassTypeApi";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import qs from "qs";
import { FilterMobileClassModal } from "./FilterMobileClassModal";
import { FilterDesktopClassModal } from "./FilterDesktopClassMadal";

interface ClassTypeSelectorProps {
  classesType: ClassTypeType[];
  selectedClassType: string;
  setSelectedClassType: React.Dispatch<React.SetStateAction<string>>;
}

export const ClassTypeSelector = ({
  classesType,
  selectedClassType,
  setSelectedClassType,
}: ClassTypeSelectorProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = (id: string) => {
    setSelectedClassType(id);

    const currentParams = Object.fromEntries(searchParams.entries());
    const queryString = qs.stringify(
      { ...currentParams, classType: id },
      { addQueryPrefix: true }
    );

    router.replace(pathname + queryString);
  };

  return (
    <div>
      {/* Selector desktop */}
      <FilterDesktopClassModal
        classesType={classesType}
        handleClick={handleClick}
        selectedClassType={selectedClassType}
      />
      {/* Selector mobile */}
      <div className="flex justify-center lg:hidden w-full">
        <FilterMobileClassModal
          classesType={classesType}
          handleClick={handleClick}
          selectedClassType={selectedClassType}
        />
      </div>
    </div>
  );
};
