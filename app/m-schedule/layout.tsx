import { PageLayout } from "@/components/layout";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Planning de Marie",
  description: "Visualiser la liste des mes cours",
  // SEO
};
const Layout = (props: PropsWithChildren) => {
  return <PageLayout>{props.children}</PageLayout>;
};

export default Layout;
