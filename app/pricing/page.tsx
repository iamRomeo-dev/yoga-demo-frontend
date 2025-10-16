"use client";
import { ContentContainer, PageContainer } from "@/components/layout";
import { TitleComponent } from "@/components/titles";
import Pricing from "./Pricing";
import { useTranslation } from "react-i18next";

const Page = () => {
  const { t } = useTranslation();
  return (
    <PageContainer>
      <TitleComponent big={t("prices")} small={t("pricesSmall")} />
      <ContentContainer>
        <Pricing />
      </ContentContainer>
    </PageContainer>
  );
};

export default Page;
