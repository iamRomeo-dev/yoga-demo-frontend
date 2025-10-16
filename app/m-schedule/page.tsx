"use client";
import { ContentContainer, PageContainer } from "@/components/layout";
import { useAuth0 } from "@auth0/auth0-react";
import { TitleComponent } from "@/components/titles";
import { Loader } from "@/components/Loader";
import { useUserRoles } from "@/hooks/useUserRoles";
import { CalendarView } from "./CalendarView";
import { useTranslation } from "react-i18next";

const Page = () => {
  const { t } = useTranslation();
  const { isAuthenticated, isLoading } = useAuth0();
  const { roles, loading: rolesLoading } = useUserRoles();

  if (isLoading || rolesLoading) {
    return <Loader />;
  }

  if (!isAuthenticated || !roles.includes("Admin")) {
    return <Loader />;
  }

  return (
    <PageContainer>
      <TitleComponent
        big={t("whatAmIGoingToDo")}
        small={t("whatAmIGoingToDoSmall")}
      />
      <ContentContainer>
        <CalendarView />
      </ContentContainer>
    </PageContainer>
  );
};

export default Page;
