"use client";

import Modal from "@/components/Modal";
import { ClientType } from "@/hooks/useClientsApi";
import { ChevronDown, ChevronRight, Ticket } from "lucide-react";
import { useState } from "react";
import { CardMyReservation } from "../CardMyReservation";
import { NoContent } from "@/components/typography";
import { getUpcomingReservations } from "../service";
import { ReservationType } from "@/hooks/useReservationApi";
import { useTranslation } from "react-i18next";

export interface UpcomingReservationsContentProps {
  upcomingReservations: ReservationType[];
}

export const UpcomingReservationsContent = ({
  upcomingReservations,
}: UpcomingReservationsContentProps) => {
  const { t } = useTranslation();
  return (
    <div>
      {upcomingReservations.length > 0 ? (
        <div className="flex flex-col gap-2">
          {upcomingReservations.map((reservation) => (
            <CardMyReservation
              reservation={reservation}
              isDelete={true}
              key={reservation._id}
            />
          ))}
        </div>
      ) : (
        <NoContent title={t("noCoursesPending")} />
      )}
    </div>
  );
};
export interface ReservationsToComeSettingsModalProps {
  client: ClientType;
}

export const ReservationsToComeSettingsModal = ({
  client,
}: ReservationsToComeSettingsModalProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingReservations = getUpcomingReservations(client);

  return (
    <div>
      {/* Trigger */}
      <div
        onClick={() => setOpen(true)}
        className="flex items-center justify-between px-4 py-3 border-t border-gray-100 first:border-t-0 hover:bg-gray-50 cursor-pointer"
      >
        <div className="flex items-center gap-3 text-gray-900">
          <Ticket className="w-3 h-3" />
          <span className="text-sm font-semibold">
            {t("myUpcomingBookings")}
          </span>
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
        title="Mes réservations à venir"
      >
        <UpcomingReservationsContent
          upcomingReservations={upcomingReservations}
        />
      </Modal>
    </div>
  );
};
