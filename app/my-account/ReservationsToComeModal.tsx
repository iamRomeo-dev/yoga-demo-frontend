"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import { StatCard } from "./MyAccountClassSuccess";
import { ClientType } from "@/hooks/useClientsApi";
import { getUpcomingReservations } from "./service";
import { UpcomingReservationsContent } from "./settings/ReservationsToComeSettingsModal";
import { useTranslation } from "react-i18next";

export interface ReservationsToComeModalProps {
  client: ClientType;
}

export const ReservationsToComeModal = ({
  client,
}: ReservationsToComeModalProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const upcomingReservations = getUpcomingReservations(client);
  return (
    <div>
      {/* Trigger */}
      <div
        onClick={() => setOpen(true)}
        className={`cursor-pointer transform transition-transform duration-300 hover:scale-105 ${
          open ? "scale-105" : ""
        }`}
      >
        <StatCard value={upcomingReservations.length} label={t("upcoming")} />
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={t("myCurrentCards")}
      >
        <UpcomingReservationsContent
          upcomingReservations={upcomingReservations}
        />
      </Modal>
    </div>
  );
};
