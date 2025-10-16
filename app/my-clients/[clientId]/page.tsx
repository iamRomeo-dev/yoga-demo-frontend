import { PageContainer } from "@/components/layout";
import { ClientById } from "./ClientById";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon client",
  description: "Visualisez les informations d'un client",
  // SEO
};

type PageProps = {
  params: Promise<{ clientId: string }>;
};

const Page = async (props: PageProps) => {
  const params = await props.params;
  return (
    <PageContainer>
      <ClientById clientId={params.clientId} />
    </PageContainer>
  );
};

export default Page;
