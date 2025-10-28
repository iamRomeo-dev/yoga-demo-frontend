"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";
import LanguageMenu from "./LanguageMenu";
import { useEffect, useState } from "react";
import { Avatar } from "./Avatar";
import { Error404Page } from "./Error404Page";
import { FlowerIcon } from "lucide-react";

interface MenuDesktopProps {
  roles: string[];
}

const MenuDesktop = ({ roles }: MenuDesktopProps) => {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const { t } = useTranslation();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    <Error404Page />;
    return null;
  }
  return (
    <div className="flex justify-between w-full">
      <div className="flex lg:flex-1">
        <Link href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Marie yoga</span>
          <FlowerIcon className="h-12 text-white" />
        </Link>
      </div>
      <NavigationMenu viewport={false}>
        {roles.includes("Admin") && (
          <NavigationMenuList>
            <NavigationMenuItem className="bg-transparent shadow-none">
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  href="/classes"
                  style={{ fontFamily: "Genty, sans-serif" }}
                  className="text-white text-xl"
                >
                  {t("classCreation")}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="bg-transparent shadow-none">
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  href="/m-schedule"
                  style={{ fontFamily: "Genty, sans-serif" }}
                  className="text-white text-xl"
                >
                  {t("marieSchedule")}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="bg-transparent shadow-none">
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  href="/my-clients"
                  style={{ fontFamily: "Genty, sans-serif" }}
                  className="text-white text-xl"
                >
                  {t("myClients")}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        )}

        {!roles.includes("Admin") && (
          <NavigationMenuList>
            <NavigationMenuItem className="bg-transparent shadow-none">
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  href="/pricing"
                  style={{ fontFamily: "Genty, sans-serif" }}
                  className="text-white text-xl"
                >
                  {t("pricing")}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        )}

        {isAuthenticated && (
          <NavigationMenuList>
            <NavigationMenuItem className="bg-transparent shadow-none">
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  href="/my-account"
                  style={{ fontFamily: "Genty, sans-serif" }}
                  className="text-white text-xl"
                >
                  Mon compte
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        )}
        <NavigationMenuList>
          <div className="flex items-center">
            <NavigationMenuItem className="bg-transparent shadow-none">
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <p
                  style={{ fontFamily: "Genty, sans-serif" }}
                  className="text-white  text-xl cursor-pointer"
                  onClick={() =>
                    !isAuthenticated
                      ? loginWithRedirect({
                          authorizationParams: {
                            audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
                            scope: "openid profile email",
                          },
                        })
                      : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        logout({ returnTo: window.location.origin })
                  }
                >
                  {!isAuthenticated ? t("logIn") : t("logOut")}
                </p>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {isAuthenticated && (
              <Avatar name={user?.email ? user?.email : ""} />
            )}
          </div>
        </NavigationMenuList>
        <div className="w-16 ml-6">
          <LanguageMenu />
        </div>
      </NavigationMenu>
    </div>
  );
};

export default MenuDesktop;
