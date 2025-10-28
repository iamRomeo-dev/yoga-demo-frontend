import { HeroDesktop, HeroMobile } from "./Hero";
import { Metadata } from "next";
import { HomePlans } from "@/components/home/HomePlans";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { MariePresentation } from "@/components/home/MariePresentation";
import { XpBanner } from "@/components/XpBanner";
import { DemoModal } from "@/components/home/DemoModal";

export const metadata: Metadata = {
  title: "Marie yoga",
  description: "Cours de yoga",
};
export default function Home() {
  return (
    <div>
      <HeroDesktop className="hidden lg:relative lg:flex lg:h-screen lg:max-h-[600px] lg:overflow-hidden" />
      <div className="text-center">
        <HeroMobile className="relative flex h-[500px] overflow-hidden lg:hidden" />
      </div>
      <XpBanner />
      <div className="mx-auto max-w-7xl pb-16 px-4 xl:px-0">
        <HomePlans />
        <HomeTestimonials />
        <MariePresentation />
      </div>
      <DemoModal />
    </div>
  );
}
