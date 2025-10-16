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
import { PrimaryButton } from "@/components/buttons";
import { ClassType } from "@/hooks/useClassApi";
import { Clock2Icon } from "lucide-react";
import Image from "next/image";
import { useCreateAReservationMutation } from "@/hooks/useReservationApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "qs";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ButtonDeleteSelectedClassProps {
  handleRemoveClassSelected: () => void;
}

const ButtonDeleteSelectedClass = ({
  handleRemoveClassSelected,
}: ButtonDeleteSelectedClassProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash className="h-3 text-gray-600 cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Supprimer</DialogTitle>
          <DialogDescription>
            {" "}
            Confirmer la suppression de ce cours ici.
          </DialogDescription>
        </DialogHeader>

        {/* Actions */}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Button
            onClick={() => {
              handleRemoveClassSelected();
              setOpen(false);
            }}
          >
            Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface CardClassSelectedProps {
  classSelected: ClassType;
}

export const CardClassSelected = ({
  classSelected,
}: CardClassSelectedProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { mutate: createReservation } = useCreateAReservationMutation();

  const handleReserve = () => {
    createReservation(classSelected?._id ?? "", {
      onSuccess: () => {
        handleRemoveClassSelected();
      },
    });
  };

  const handleRemoveClassSelected = () => {
    const currentParams = Object.fromEntries(searchParams.entries());
    delete currentParams.c;
    const queryString = qs.stringify(currentParams, { addQueryPrefix: true });
    router.replace(pathname + queryString);
  };
  return (
    <div className="relative flex flex-wrap gap-4 bg-white rounded-md p-1.5">
      <Image
        src="/images/partOne.jpg"
        alt="Description"
        width={1000}
        height={200}
        className={`w-28 h-28 object-cover rounded-md`}
      />
      <div className="flex-1">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: classSelected.classType.color }}
        />
        <div className="flex flex-wrap gap-4">
          <p className="text-xl font-extrabold text-gray-700">
            {classSelected.classType.name}
          </p>
          <span className="inline-flex items-center px-2 py-0.5 rounded-md font-medium flex-shrink-0 whitespace-nowrap text-sm bg-amber-100 text-amber-700">
            {classSelected.reservations.length} / {classSelected.maxPeople}
          </span>
        </div>

        <p className="font-thin text-xs text-gray-700">
          {classSelected.classType.description}
        </p>

        <div className="flex font-bold text-gray-700">
          <p className="text-sm">{`${classSelected.from} - ${classSelected.to}`}</p>

          <Clock2Icon className="h-4" />
        </div>

        <PrimaryButton
          className="mt-2 flex justify-end"
          onClick={() => handleReserve()}
        >
          {t("confirmThisCourse")}
        </PrimaryButton>
      </div>
      <div className="absolute top-2.5 right-2.5 flex items-center gap-2 mb-4">
        <ButtonDeleteSelectedClass
          handleRemoveClassSelected={handleRemoveClassSelected}
        />
      </div>
    </div>
  );
};
