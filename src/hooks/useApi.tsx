import { useMemo } from "react";
import ky from "ky";
import { useAuth0 } from "@auth0/auth0-react";

export const useApi = () => {
  const { getAccessTokenSilently } = useAuth0();
  return useMemo(() => {
    return ky.extend({
      retry: 0,
      timeout: false,
      prefixUrl: process.env.NEXT_PUBLIC_URL,
      hooks: {
        beforeRequest: [
          async (request) => {
            const accessToken = await getAccessTokenSilently({
              authorizationParams: {
                audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
                scope: "openid profile email",
              },
            });
            request.headers.set("Authorization", `Bearer ${accessToken}`);
          },
        ],
      },
    });
  }, [getAccessTokenSilently]);
};

export const useApiNotAuthenticated = () => {
  return useMemo(() => {
    return ky.extend({
      retry: 0,
      timeout: false,
      prefixUrl: process.env.NEXT_PUBLIC_URL,
      hooks: {
        beforeRequest: [],
      },
    });
  }, []);
};
