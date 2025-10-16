import { PageLayout } from "@/components/layout";
import { PropsWithChildren } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifs",
  description: "Les tarifs à sélectionner",
  // SEO
};
const Layout = (props: PropsWithChildren) => {
  return <PageLayout>{props.children}</PageLayout>;
};

export default Layout;
