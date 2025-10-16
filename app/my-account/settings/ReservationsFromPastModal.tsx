"use client";

import Modal from "@/components/Modal";
import { ClientType } from "@/hooks/useClientsApi";
import { ChevronDown, ChevronRight, Ticket } from "lucide-react";
import { useState } from "react";
import { CardMyReservation } from "../CardMyReservation";
import { NoContent } from "@/components/typography";
import { useTranslation } from "react-i18next";

export interface ReservationsToComeProps {
  client: ClientType;
}

export const ReservationsFromPastModal = ({
  client,
}: ReservationsToComeProps) => {
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
          <span className="text-sm font-semibold">Mes réservations passés</span>
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
        title={t("MyPastBookings")}
      >
        {client.reservations.length > 0 ? (
          <div className="flex flex-col gap-2">
            {client.reservations.map((reservation) => (
              <CardMyReservation
                reservation={reservation}
                key={reservation._id}
              />
            ))}
          </div>
        ) : (
          <NoContent title={t("noClasses")} />
        )}
      </Modal>
    </div>
  );
};
