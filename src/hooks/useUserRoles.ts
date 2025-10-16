import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const useUserRoles = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      if (!isAuthenticated) {
        setRoles([]);
        setLoading(false);
        return;
      }

      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
          },
        });

        const decoded: never = jwtDecode(token);
        const userRoles =
          decoded[`${process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}/roles`] || [];
        setRoles(userRoles);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [isAuthenticated, getAccessTokenSilently]);

  return { roles, loading };
};
