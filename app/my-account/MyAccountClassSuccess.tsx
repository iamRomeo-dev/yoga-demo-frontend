import { ContentContainer, PageContainer } from "@/components/layout";
import { TitleComponent } from "@/components/titles";
import { ClassType } from "@/hooks/useClassApi";
import { ClientType } from "@/hooks/useClientsApi";
import { CardClassSelected } from "./CardClassSelected";
import { CardInProgressModal } from "./CardInProgressModal";
import { SettingsList } from "./settings/SettingsList";
import { ReservationsToComeModal } from "./ReservationsToComeModal";
import { useTranslation } from "react-i18next";

interface StatCardProps {
  value: string | number;
  label: string;
  highlight?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  highlight,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white shadow-md px-6 py-4 w-28">
      <span
        className={`text-lg font-bold ${
          highlight ? "text-yellow-600" : "text-gray-900"
        }`}
      >
        {value}
      </span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
};

interface MyAccountClassSuccessProps {
  client: ClientType;
  classSelected?: ClassType;
}

const MyAccountClassSuccess = ({
  client,
  classSelected,
}: MyAccountClassSuccessProps) => {
  const { t } = useTranslation();
  return (
    <PageContainer>
      <TitleComponent
        big={t("myAccount")}
        small={`${t("welcome")} ${client.email}`}
      />
      <ContentContainer>
        {classSelected && <CardClassSelected classSelected={classSelected} />}
        <div className="flex justify-center gap-4">
          <ReservationsToComeModal client={client} />
          <CardInProgressModal client={client} />
          <StatCard
            value={`${client.hasToPay ? client.hasToPay : "0"} €`}
            label={t("toBePaid")}
            highlight={client.hasToPay > 0 ? true : false}
          />
        </div>
        <SettingsList client={client} />
      </ContentContainer>
    </PageContainer>
  );
};

export default MyAccountClassSuccess;
