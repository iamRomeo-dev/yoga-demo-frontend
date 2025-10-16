import { useState } from "react";
import { ClientType, useUpdateClient } from "@/hooks/useClientsApi";
import Modal from "@/components/Modal";
import { StatCard } from "@app/my-account/MyAccountClassSuccess";
import { Input } from "@/components/ui/input";
import { PrimaryButton } from "@/components/buttons";
import { useTranslation } from "react-i18next";

interface ModalConfirmHasToPayProps {
  client: ClientType;
}

export const ModifyHasToPayModal = ({ client }: ModalConfirmHasToPayProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [hasToPay, setHasToPay] = useState<number>(client.hasToPay || 0);
  const { mutate: clientMutation } = useUpdateClient();

  const handleClientHasPaid = () => {
    clientMutation(
      {
        uuid: client._id?.toString() || "xxx",
        json: { ...client, hasToPay },
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <div>
      {/* Trigger */}
      <div
        onClick={() => setOpen(true)}
        className={`cursor-pointer transform transition-transform duration-300 hover:scale-105 ${
          open ? "scale-105" : ""
        }`}
      >
        <StatCard
          value={`${client.hasToPay ? client.hasToPay : "0"} €`}
          label={t("toBePaid")}
          highlight={client.hasToPay > 0 ? true : false}
        />
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="À payer">
        <div className="flex flex-col gap-4">
          <p className="text-gray-600 text-sm font-semibold pl-4">
            {t("RemainingAmountToBePaid")}
          </p>
          <Input
            id="hasToPay"
            type="number"
            value={hasToPay}
            onChange={(e) => setHasToPay(Number(e.target.value))}
            className="w-20"
          />

          <PrimaryButton onClick={handleClientHasPaid}>
            {t("confirm")}
          </PrimaryButton>
        </div>
      </Modal>
    </div>
  );
};
