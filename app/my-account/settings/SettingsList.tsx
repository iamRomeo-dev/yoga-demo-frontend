import { BuyNewCardModal } from "./BuyNewCardModal";
import { ClientType } from "@/hooks/useClientsApi";
import { ReservationsToComeSettingsModal } from "./ReservationsToComeSettingsModal";
import { ReservationsFromPastModal } from "./ReservationsFromPastModal";
import { CardInProgressSettingsModal } from "./CardInProgressSettingsModal";

interface SettingsListProps {
  client: ClientType;
}

export const SettingsList = ({ client }: SettingsListProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <ul>
        <BuyNewCardModal client={client} />
        <CardInProgressSettingsModal client={client} />
        <ReservationsToComeSettingsModal client={client} />
        <ReservationsFromPastModal client={client} />
      </ul>
    </div>
  );
};
