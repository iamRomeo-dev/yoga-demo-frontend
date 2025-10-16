/* eslint-disable @typescript-eslint/ban-ts-comment */
import qs from "qs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "@/hooks/useApi";
import { ReservationType } from "./useReservationApi";
import { toast } from "sonner";

export interface CardBoughtType {
  _id?: string;
  name: string;
  totalSessions: number;
  remainingSessions: number;
  pricePaid: number;
  purchaseDate: Date;
  expirationDate?: Date;
}

export interface ClientType {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  hasToPay: number;
  cardsBought: CardBoughtType[];
  reservations: ReservationType[];
}

export interface ClientDataProps {
  totalCount: number;
  list: ClientType[];
}

interface UseClientQueryProps {
  limit?: number;
  skip?: number;
  sort?: string;
  [key: string]: unknown;
}

export const API_PATH = "v1/client";
// Get all
export const useClientsQuery = ({
  limit = 0,
  skip = 0,
  sort = "-createdAt",
  ...query
}: UseClientQueryProps) => {
  const api = useApi();

  return useQuery<ClientDataProps>({
    queryKey: ["clients", { limit, skip, sort, ...query }],
    queryFn: async () => {
      const searchParams = qs.stringify({
        limit,
        skip,
        sort,

        ...query,
      });
      const response = await api.get(API_PATH, { searchParams });

      const totalCount = Number(response.headers.get("X-Total-Count"));
      const list = await response.json<ClientType[]>();

      return { totalCount, list };
    },
  });
};

// Get one by id
// OKKK
export const useClientTypeByIdQuery = (itemId: string) => {
  const api = useApi();

  return useQuery<ClientType>({
    queryKey: [API_PATH, itemId],
    queryFn: async () => {
      const response = await api.get(`${API_PATH}/${itemId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch the client");
      }
      return response.json<ClientType>();
    },
    enabled: !!itemId,
  });
};

// Get one by email
// OKKK
export const useClientByEmailQuery = (email: string) => {
  const api = useApi();

  return useQuery<ClientType>({
    queryKey: [API_PATH, "byEmail"],
    queryFn: async () => {
      const response = await api.get(
        `${API_PATH}/by-email/${encodeURIComponent(email)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch the client by email");
      }
      return response.json<ClientType>();
    },
    enabled: !!email,
  });
};

// Get one from backend
// OKKK
export const useClientQuery = () => {
  const api = useApi();

  return useQuery<ClientType>({
    queryKey: [API_PATH, "client"],
    queryFn: async () => {
      const response = await api.get(`${API_PATH}/client`);
      if (!response.ok) {
        throw new Error("Failed to fetch client by email");
      }
      return response.json<ClientType>();
    },
  });
};

interface UpdateClientProps {
  uuid: string;
  json: ClientType;
}

// OKKK
export const useUpdateClient = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ uuid, json }: UpdateClientProps) => {
      return api
        .patch(`${API_PATH}/${uuid}`, {
          json,
        })
        .json();
    },
    onSuccess: async () => {
      // @ts-expect-error API_PATH
      await queryClient.invalidateQueries(API_PATH);
      await queryClient.invalidateQueries({
        queryKey: [API_PATH, "byEmail"],
      });
      toast.success(`Client modifié`);
    },
    onError: async () => {
      // @ts-expect-error API_PATH
      await queryClient.invalidateQueries(API_PATH);
      toast.error("Une erreur est survenue.");
    },
  });
};

interface UpdateAddSessionsBoughtProps {
  uuid: string;
  json: number;
}

export const useUpdateAddSessionsBought = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ uuid, json }: UpdateAddSessionsBoughtProps) => {
      return api
        .patch(`${API_PATH}/${uuid}/add-sessions-bought`, {
          json: { sessionsBought: Number(json) },
        })
        .json();
    },
    onSuccess: async () => {
      // @ts-expect-error
      await queryClient.invalidateQueries(API_PATH);
      toast.success("Client updated");
    },
    onError: async () => {
      // @ts-expect-error
      await queryClient.invalidateQueries(API_PATH);
      toast.error("Erreur lors de la mise à jour des sessions");
    },
  });
};

// OKKK
export const useBuyCardMutation = (clientId: string) => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (card: {
      name: string;
      totalSessions: number;
      pricePaid: number;
    }) => {
      return api.post(`${API_PATH}/${clientId}/cards`, { json: card }).json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [API_PATH, clientId] });
      await queryClient.invalidateQueries({ queryKey: [API_PATH, "client"] });

      toast.success("Carte achetée avec succès !");
    },
    onError: () => {
      toast.error("Erreur lors de l'achat de la carte");
    },
  });
};

export const useDeleteCardBought = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      clientId,
      cardId,
    }: {
      clientId: string;
      cardId: string;
    }) => {
      await api.delete(`${API_PATH}/${clientId}/cards/${cardId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_PATH] });
      toast.success("Carte supprimée avec succès");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      if (error.response?.status === 403) {
        toast.error("Cannot delete this card: some sessions have been used");
      } else {
        toast.error("Error deleting card");
      }
    },
  });

  return mutation;
};
