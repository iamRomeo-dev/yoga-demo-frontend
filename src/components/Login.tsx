import { useAuth0 } from "@auth0/auth0-react";
import { Avatar } from "./Avatar";
import { useTranslation } from "react-i18next";

export const Login = () => {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const { t } = useTranslation();

  return (
    <div className="flex items-center">
      <div tw="relative inline-block">
        {isAuthenticated && <Avatar name={user?.email ? user?.email : ""} />}
      </div>
      <div className="ml-3">
        <div
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
          className="text-base font-medium text-[#FF751F]"
        >
          {!isAuthenticated ? t("logIn") : t("logOut")}
        </div>
        <div className="text-sm font-medium text-gray-800">{user?.email}</div>
      </div>
    </div>
  );
};
