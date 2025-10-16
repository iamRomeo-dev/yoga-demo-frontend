"use client";
import { ClassTypeType } from "@/hooks/useClassTypeApi";
import { useState } from "react";
import {
  Apple,
  Banana,
  Carrot,
  Cherry,
  Citrus,
  Grape,
  Vegan,
} from "lucide-react";
import Modal from "@/components/Modal";
import { useTranslation } from "react-i18next";

interface FilterMobileClassModalProps {
  classesType: ClassTypeType[];
  handleClick: (item: string) => void;
  selectedClassType: string;
}

export const FilterMobileClassModal = ({
  classesType,
  handleClick,
  selectedClassType,
}: FilterMobileClassModalProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleMobileClick = (item: (typeof classesType)[0] | null) => {
    handleClick(item?._id ?? "");
    setOpen(false);
  };

  const selectedClass =
    classesType.find((c) => c._id === selectedClassType) || null;

  const icons = [Grape, Apple, Banana, Cherry, Citrus, Vegan];

  return (
    <div className="flex justify-center items-center w-full">
      {/* Trigger */}
      <div
        style={{ fontFamily: "Genty, sans-serif" }}
        className="w-1/2 rounded-full px-3 py-1 text-sm cursor-pointer text-gray-600 font-extrabold bg-gray-100 text-center"
        onClick={() => setOpen(true)}
      >
        {selectedClass ? selectedClass.name : t("all")}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={t("filters")}>
        <div className="flex justify-center mb-4">
          <div
            onClick={() => handleMobileClick(null)}
            className="w-1/3 bg-white shadow-md rounded-lg p-4 cursor-pointer flex flex-col items-center justify-center hover:scale-105 transition-transform duration-150"
          >
            <Carrot className="h-16 w-16 mb-4 text-gray-600" />
            <div className="text-center">
              <p className="font-semibold text-gray-500">{t("all")}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {classesType.map((classType, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <div
                key={classType._id}
                onClick={() => handleMobileClick(classType)}
                className="flex-1 bg-white shadow-md rounded-lg p-4 cursor-pointer flex flex-col items-center justify-center hover:scale-105 transition-transform duration-150"
              >
                <IconComponent className="h-16 w-16 mb-4 text-gray-600" />
                <div className="text-center">
                  <p className="font-semibold text-gray-500">
                    {classType.name?.length > 9
                      ? classType.name.slice(0, 9) + "…"
                      : classType.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};
