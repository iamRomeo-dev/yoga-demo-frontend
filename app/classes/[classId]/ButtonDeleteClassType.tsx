"use client";
import { useRouter } from "next/navigation";
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
import { useDeleteClassType } from "@/hooks/useClassTypeApi";
import { Trash } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface ButtonDeleteClasseTypeProps {
  classId: string;
}

export const ButtonDeleteClassType = ({
  classId,
}: ButtonDeleteClasseTypeProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { mutate } = useDeleteClassType();

  const onDelete = () => {
    mutate(classId, {
      onSuccess: () => {
        router.push(`/classes`);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash
          onClick={() => setOpen(true)}
          className="h-4 text-gray-700 cursor-pointer"
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
            <Button variant="outline">{t("cancel")}</Button>
          </DialogClose>
          <Button type="button" onClick={onDelete}>
            {t("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
