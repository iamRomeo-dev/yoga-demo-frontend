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
import {
  ReservationType,
  useCancelAReservationMutation,
} from "@/hooks/useReservationApi";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ButtonConfirmCancelReservationProps {
  handleCancelReservation: () => void;
}

const ButtonConfirmCancelReservation = ({
  handleCancelReservation,
}: ButtonConfirmCancelReservationProps) => {
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
              handleCancelReservation();
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

interface CardMyReservationProps {
  reservation: ReservationType;
  isDelete?: boolean;
}

export const CardMyReservation = ({
  reservation,
  isDelete,
}: CardMyReservationProps) => {
  const { mutate: cancelReservation } = useCancelAReservationMutation();

  const handleCancelReservation = () => {
    cancelReservation(reservation._id ?? "");
  };
  return (
    <div className="relative flex overflow-hidden rounded-xl shadow-md w-full">
      {/* Left side */}
      <div
        className={`flex flex-col items-center justify-center px-4 py-3 w-1/3 ${
          isDelete ? "bg-[#FF99D8] text-white" : "bg-[#FF99D8]/50 text-pink-600"
        }`}
      >
        <span className="text-xs uppercase">{`${reservation?.classId?.from} - ${reservation?.classId?.to}`}</span>
        <span className="text-xs">
          {new Date(reservation?.classId?.date).toLocaleDateString("fr-FR")}
        </span>
      </div>

      {/* Right side */}
      <div
        className={`flex-1 px-4 py-3 text-gray-800 ${
          isDelete ? "bg-[#FFBD59]" : "bg-[#FFBD59]/50"
        }`}
      >
        <div className="flex items-center gap-2">
          <p className="font-semibold">
            {reservation?.classId?.classType.name}
          </p>
          <span
            className="w-3 h-3 rounded-full outline-1 outline-white"
            style={{
              backgroundColor: reservation?.classId?.classType.color,
            }}
          />
        </div>
        <p className="text-xs font-bold text-gray-600">
          {reservation?.classId?.location}
        </p>
      </div>
      {isDelete && (
        <div className="absolute top-2.5 right-2.5 flex items-center gap-2 mb-4">
          <ButtonConfirmCancelReservation
            handleCancelReservation={handleCancelReservation}
          />
        </div>
      )}
    </div>
  );
};
