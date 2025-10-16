"use client";

import { useState, useEffect } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [redirectUri, setRedirectUri] = useState("");

  useEffect(() => {
    // This runs only on the client
    setRedirectUri(window.location.origin + "/");
  }, []);

  // Wait until redirectUri is set
  if (!redirectUri) return null;

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_URL!}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENTID!}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={(appState) => {
        if (appState?.classId) {
          router.replace(`/my-account?c=${appState.classId}`);
        } else {
          router.replace(appState?.returnTo || "/my-account");
        }
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
