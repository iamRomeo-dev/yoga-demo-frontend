import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { ClientType, useUpdateClient } from "@/hooks/useClientsApi";
import { Euro } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ConfirmHasToPayModalProps {
  clientData: ClientType;
}

export const ConfirmHasToPayModal = ({
  clientData,
}: ConfirmHasToPayModalProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { mutate: clientMutation } = useUpdateClient();

  const handleClientHasPaid = () => {
    clientMutation(
      {
        uuid: clientData._id?.toString() || "xxx",
        json: { ...clientData, hasToPay: 0 },
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#FF751F] text-white text-xs font-semibold cursor-pointer hover:shadow-xl transform transition-transform duration-300 hover:scale-105">
          <Euro className="w-5" />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("confirmation")}</DialogTitle>
          <DialogDescription>
            {t("doYouConfirmThisPayment")} ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{t("cancel")}</Button>
          </DialogClose>
          <Button onClick={handleClientHasPaid}>{t("confirm")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
