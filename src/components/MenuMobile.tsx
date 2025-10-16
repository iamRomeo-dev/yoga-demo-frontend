import { Calendar, Euro, Settings, SquarePlus, UsersRound } from "lucide-react";
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { LogoIcon } from "./Icons";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import LanguageMenu from "./LanguageMenu";
import { Error404Page } from "./Error404Page";
import { Login } from "./Login";

interface MenuMobileProps {
  roles: string[];
}
export function AppSidebar({ roles }: MenuMobileProps) {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth0();
  const [mounted, setMounted] = useState(false);

  const items = roles.includes("Admin")
    ? [
        {
          title: "classCreation",
          url: "/classes",
          icon: SquarePlus,
        },
        {
          title: "marieSchedule",
          url: "/m-schedule",
          icon: Calendar,
        },
        {
          title: "myClients",
          url: "/my-clients",
          icon: UsersRound,
        },
        {
          title: "my-account",
          url: "/my-account",
          icon: Settings,
        },
      ]
    : !roles.includes("Admin") && isAuthenticated
    ? [
        {
          title: "pricing",
          url: "/pricing",
          icon: Euro,
        },
        {
          title: "my-account",
          url: "/my-account",
          icon: Settings,
        },
      ]
    : !roles.includes("Admin") && !isAuthenticated
    ? [
        {
          title: "pricing",
          url: "/pricing",
          icon: Euro,
        },
      ]
    : [];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    <Error404Page />;
    return null;
  }

  return (
    <Sidebar>
      <SidebarContent>
        <div className="flex flex-col justify-between h-full">
          <SidebarGroup>
            <SidebarGroupLabel>
              <Link href="/">
                <LogoIcon className="text-[#FF751F] w-14" />
              </Link>
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-6">
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    style={{ fontFamily: "Genty, sans-serif" }}
                  >
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span className="text-lg text-gray-708">
                          {t(`${item.title}`)}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
        <div className="flex flex-col gap-4 p-2">
          <LanguageMenu />
          <Login />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

const MenuMobile = ({ roles }: MenuMobileProps) => {
  return (
    <SidebarProvider>
      <AppSidebar roles={roles} />

      <div className="flex justify-end w-full">
        <Link
          href="/"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <span className="sr-only">Marie yoga</span>
          <LogoIcon className="h-10 text-white" />
        </Link>

        <SidebarTrigger className="text-white" />
      </div>
    </SidebarProvider>
  );
};

export default MenuMobile;
