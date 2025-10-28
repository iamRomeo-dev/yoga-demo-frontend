import { Error404Page } from "@/components/Error404Page";
import { Loader } from "@/components/Loader";
import { NoContent } from "@/components/typography";
import { Filter } from "@/hooks/QueryHelper";
import { ClientType, useClientsQuery } from "@/hooks/useClientsApi";
import { getRemainingSessionsTotal } from "@app/my-account/service";
import { Crown, Euro } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface SingleClientCardProps {
  client: ClientType;
}

const SingleClientCard = ({ client }: SingleClientCardProps) => {
  const remainingSessionsTotalNumber = getRemainingSessionsTotal(client);

  return (
    <Link
      href={`/my-clients/${client._id}`}
      key={client._id}
      className="flex flex-col gap-1 border-2 border-white rounded-md p-2 cursor-pointer hover:shadow-xl transform transition-transform duration-300 hover:scale-105"
    >
      <p className="text-lg font-bold text-gray-700">{client.email}</p>
      <p className="font-thin text-xs text-gray-700">{client.lastname}</p>
      <div className="flex gap-4 items-center">
        <p className="flex items-center font-thin text-xs text-gray-700">
          <Crown className="h-4" />
          {remainingSessionsTotalNumber}
        </p>
        <p className="flex items-center font-thin text-xs text-gray-700">
          <Euro className="h-4" />
          {client.hasToPay}
        </p>
      </div>
    </Link>
  );
};
interface ClientsListProps {
  currentSearch: string;
}

export const ClientsList = ({ currentSearch }: ClientsListProps) => {
  const { t } = useTranslation();
  const { status, data: clientsData } = useClientsQuery({
    ...Filter.from({
      $and: [
        currentSearch
          ? {
              $or: [
                {
                  email: { $regex: currentSearch, $options: "i" },
                },
                {
                  firstname: { $regex: currentSearch, $options: "i" },
                },
                {
                  lastname: { $regex: currentSearch, $options: "i" },
                },
              ],
            }
          : {},
      ],
    }),
  });

  if (status === "pending") {
    return <Loader />;
  }
  if (status === "error") {
    return <Error404Page />;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {clientsData.totalCount > 0 ? (
        clientsData.list.map((client) => (
          <SingleClientCard client={client} key={client._id} />
        ))
      ) : (
        <NoContent title={t("noClient")} />
      )}
    </div>
  );
};
