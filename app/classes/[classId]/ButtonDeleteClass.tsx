"use client";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { ClassType } from "@/hooks/useClassApi";
import { useTranslation } from "react-i18next";

export interface ButtonDeleteClassProps {
  classItem: ClassType;
  setSelectedClasses: React.Dispatch<React.SetStateAction<ClassType[]>>;
  setRemoveClasses: React.Dispatch<React.SetStateAction<ClassType[]>>;
}

export const ButtonDeleteClass = ({
  classItem,
  setRemoveClasses,
  setSelectedClasses,
}: ButtonDeleteClassProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const onDelete = () => {
    setRemoveClasses((prevRemoved) => [...prevRemoved, classItem]);
    setSelectedClasses((prev) => prev.filter((c) => c !== classItem));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash
          onClick={() => setOpen(true)}
          className="h-3 text-gray-400 cursor-pointer"
        />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("delete")}</DialogTitle>
          <DialogDescription>
            {t("confirmTheDeletionOfThisCourseHere")}
          </DialogDescription>
        </DialogHeader>

        {/* Actions */}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline"> {t("cancel")}</Button>
          </DialogClose>
          <Button type="button" onClick={onDelete}>
            {t("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
