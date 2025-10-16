"use client";
import { PrimaryButton } from "@/components/buttons";
import { useCreateAClassTypeMutation } from "@/hooks/useClassTypeApi";
import { useTranslation } from "react-i18next";

export const ButtonCreateClass = () => {
  const { t } = useTranslation();
  const { mutate } = useCreateAClassTypeMutation();

  const onCreate = () => {
    mutate();
  };

  return (
    <PrimaryButton onClick={onCreate} className="w-full md:w-auto">
      {t("addACourseType")}
    </PrimaryButton>
  );
};
