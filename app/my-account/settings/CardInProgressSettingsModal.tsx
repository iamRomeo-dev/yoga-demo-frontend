"use client";

import Modal from "@/components/Modal";
import { ClientType } from "@/hooks/useClientsApi";
import { ChevronDown, ChevronRight, Ticket } from "lucide-react";
import { useState } from "react";
import { TicketCard } from "../CardInProgressModal";
import { NoContent } from "@/components/typography";
import { useTranslation } from "react-i18next";

export interface RemainingSessionsContentProps {
  client: ClientType;
}

export const RemainingSessionsContent = ({
  client,
}: RemainingSessionsContentProps) => {
  const { t } = useTranslation();
  const activeCards = client.cardsBought.filter(
    (card) => card.remainingSessions > 0
  );

  return (
    <div className="flex flex-col gap-4">
      {activeCards.length > 0 ? (
        activeCards.map((card, index) => (
          <TicketCard card={card} key={index} clientId={client._id ?? ""} />
        ))
      ) : (
        <NoContent title={t("noCardsInProgress")} />
      )}
    </div>
  );
};

export interface CardInProgressSettingsModalProps {
  client: ClientType;
}

export const CardInProgressSettingsModal = ({
  client,
}: CardInProgressSettingsModalProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <div>
      {/* Trigger */}
      <div
        onClick={() => setOpen(true)}
        className="flex items-center justify-between px-4 py-3 border-t border-gray-100 first:border-t-0 hover:bg-gray-50 cursor-pointer"
      >
        <div className="flex items-center gap-3 text-gray-900">
          <Ticket className="w-3 h-3" />
          <span className="text-sm font-semibold">{t("myCurrentCards")}</span>
        </div>
        {open ? (
          <ChevronDown className="w-5 h-5 text-gray-900" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-900" />
        )}
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
