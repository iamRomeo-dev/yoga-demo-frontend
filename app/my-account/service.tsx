import { ClientType } from "@/hooks/useClientsApi";

export const getRemainingSessionsTotal = (client: ClientType): number => {
  if (!client?.cardsBought || client.cardsBought.length === 0) return 0;

  return client.cardsBought.reduce(
    (acc, card) => acc + (card.remainingSessions || 0),
    0
  );
};

export const getUpcomingReservations = (
  client: ClientType,
  today: Date = new Date()
) => {
  if (!client?.reservations) return [];

  return client.reservations.filter((reservation) => {
    const resDate = new Date(reservation?.classId?.date);
    return resDate > today;
  });
};
