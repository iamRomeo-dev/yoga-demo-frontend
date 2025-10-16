"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Loader } from "@/components/Loader";
import { ClientType, useClientQuery } from "@/hooks/useClientsApi";
import { Error404Page } from "@/components/Error404Page";
import { useClassByIdQuery } from "@/hooks/useClassApi";
import { useSearchParams } from "next/navigation";
import MyAccountClassSuccess from "./MyAccountClassSuccess";

interface MyAccountClassSelectedSuccessProps {
  client: ClientType;
  classUrl: string | null;
}

const MyAccountClassSelectedSuccess = ({
  client,
  classUrl,
}: MyAccountClassSelectedSuccessProps) => {
  const { status, data: classSelected } = useClassByIdQuery(classUrl ?? "");

  if (!classUrl) return <MyAccountClassSuccess client={client} />;

  if (status === "pending") {
    return <Loader />;
  }

  if (status === "error" || !classSelected) {
    return <Error404Page />;
  }

  return (
    <MyAccountClassSuccess client={client} classSelected={classSelected} />
  );
};

interface MyAccountClientSuccessProps {
  client: ClientType;
}

const MyAccountClientSuccess = ({ client }: MyAccountClientSuccessProps) => {
  const searchParams = useSearchParams();
  const classUrl = searchParams.get("c");

  return (
    <div>
      <MyAccountClassSelectedSuccess client={client} classUrl={classUrl} />
    </div>
  );
};

const MyAccountAuthenticated = () => {
  const { data: client, isLoading, error } = useClientQuery();

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Error404Page />;
  }

  return (
    <div>
      {client ? <MyAccountClientSuccess client={client} /> : <Error404Page />}
    </div>
  );
};

const Page = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: "/my-account" },
      });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading || !isAuthenticated) {
    return <Loader />;
  }
  return <MyAccountAuthenticated />;
};

export default Page;
