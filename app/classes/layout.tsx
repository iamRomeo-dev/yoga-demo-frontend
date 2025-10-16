import { PageLayout } from "@/components/layout";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Liste des type de cours",
  description: "Visualiser la iste des types de cours",
  // SEO
};
const Layout = (props: PropsWithChildren) => {
  return <PageLayout>{props.children}</PageLayout>;
};

export default Layout;
