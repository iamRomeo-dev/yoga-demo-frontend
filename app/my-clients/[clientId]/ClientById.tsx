"use client";
import { ContentContainer } from "@/components/layout";
import { useClientTypeByIdQuery } from "@/hooks/useClientsApi";
import { Loader } from "@/components/Loader";
import { Error404Page } from "@/components/Error404Page";
import { TitleComponent } from "@/components/titles";
import { CardInProgressModal } from "@app/my-account/CardInProgressModal";
import { SettingsList } from "@app/my-account/settings/SettingsList";
import { ReservationsToComeModal } from "@app/my-account/ReservationsToComeModal";
import { ModifyHasToPayModal } from "./ModifyHasToPayModal";
import { useTranslation } from "react-i18next";

export interface CourseByIdProps {
  clientId: string;
}

export const ClientById = ({ clientId }: CourseByIdProps) => {
  const { t } = useTranslation();
  const { status, data: client } = useClientTypeByIdQuery(clientId);

  if (status === "pending") {
    return <Loader />;
  }
  if (status === "error" || !client) {
    return <Error404Page />;
  }

  return (
    <div>
      <TitleComponent
        big="Compte client"
        small={`${t("welcome")} ${client.email}`}
      />
      <ContentContainer>
        <div className="flex justify-center gap-4">
          <ReservationsToComeModal client={client} />
          <CardInProgressModal client={client} />
          <ModifyHasToPayModal client={client} />
        </div>
        <SettingsList client={client} />
      </ContentContainer>
    </div>
  );
};
