import { PageLayout } from "@/components/layout";
import { PropsWithChildren } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cours collectifs",
  description: "Réserver un cours de yoga",
  // SEO
};
const Layout = (props: PropsWithChildren) => {
  return <PageLayout>{props.children}</PageLayout>;
};

export default Layout;
