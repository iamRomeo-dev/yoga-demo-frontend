"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import { StatCard } from "./MyAccountClassSuccess";
import {
  CardBoughtType,
  ClientType,
  useDeleteCardBought,
} from "@/hooks/useClientsApi";
import { getRemainingSessionsTotal } from "./service";
import { RemainingSessionsContent } from "./settings/CardInProgressSettingsModal";
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
import { useTranslation } from "react-i18next";

export interface ButtonDeleteCardInProgressProps {
  card: CardBoughtType;
  clientId: string;
}

export const ButtonDeleteCardInProgress = ({
  card,
  clientId,
}: ButtonDeleteCardInProgressProps) => {
  const [open, setOpen] = useState(false);
  const { mutate: deleteCard } = useDeleteCardBought();

  const onCancelCardBought = () => {
    deleteCard({ clientId, cardId: card._id ?? "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash
          onClick={() => setOpen(true)}
          className="absolute top-3 right-2 h-3 text-gray-400 cursor-pointer"
        />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Supprimer</DialogTitle>
          <DialogDescription>
            Confirmer la suppression de cette carte achetée.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Button type="button" onClick={onCancelCardBought}>
            Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface TicketCardProps {
  card: CardBoughtType;
  clientId: string;
}

export const TicketCard = ({ card, clientId }: TicketCardProps) => {
  const { t } = useTranslation();
  return (
    <div className="w-full mx-auto flex rounded-xl overflow-hidden">
      {/* Left side */}
      <div className="relative flex-1 py-2 bg-white">
        <div className="px-2 space-y-1">
          <p className="text-gray-800 font-bold bg-[#fdf7e0] mb-2 rounded-tl-xl pl-4">
            {t("card")} {card.name}
          </p>
          <p className="text-gray-600 text-sm font-semibold pl-4">
            {card.pricePaid} €
          </p>
          <p className="text-gray-400 text-xs font-semibold pl-4">
            {t("purchasedOn")} :{" "}
            {new Date(card.purchaseDate).toLocaleDateString("fr-FR")}
          </p>
        </div>
        {card.totalSessions === card.remainingSessions && (
          <ButtonDeleteCardInProgress card={card} clientId={clientId} />
        )}
      </div>

      {/* Divider with half-round cuts + dashed line */}
      <div className="relative w-6 bg-white flex flex-col items-center">
        {/* Top half-round */}
        <div className="absolute -top-3 w-6 h-6 bg-[#fdf7e0] rounded-full"></div>
        {/* Dashed line */}
        <div className="w-px h-full border-r-2 border-dashed border-[#fdf7e0]"></div>
        {/* Bottom half-round */}
        <div className="absolute -bottom-3 w-6 h-6 bg-[#fdf7e0] rounded-full"></div>
      </div>

      {/* Right side*/}
      <div className="w-24 bg-gray-100 flex flex-col items-center justify-center">
        <p className="text-gray-800 text-2xl font-bold text-center">
          {card.remainingSessions}
        </p>
        <span className="text-xs font-light text-gray-400">
          {t("remaining")}
        </span>
      </div>
    </div>
  );
};

export interface CardInProgressModalProps {
  client: ClientType;
}

export const CardInProgressModal = ({ client }: CardInProgressModalProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const remainingSessionsTotalNumber = getRemainingSessionsTotal(client);

  return (
    <div>
      {/* Trigger */}
      <div
        onClick={() => setOpen(true)}
        className={`cursor-pointer transform transition-transform duration-300 hover:scale-105 ${
          open ? "scale-105" : ""
        }`}
      >
        <StatCard value={remainingSessionsTotalNumber} label={t("forUse")} />
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={t("myCurrentCards")}
      >
        <RemainingSessionsContent client={client} />
      </Modal>
    </div>
  );
};
