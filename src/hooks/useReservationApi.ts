import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "@/hooks/useApi";
import { toast } from "sonner";
import { ClassType } from "./useClassApi";
import { HTTPError } from "ky";

export interface ReservationType {
  _id?: string;
  classId: ClassType;
  date: Date;
  email: string;
  isPresent: boolean;
  isPaid: boolean;
}

export interface ReservationDataProps {
  totalCount: number;
  list: ReservationType[];
}

export const API_PATH = "v1/reservation";

// OKKK
export const useCreateAReservationMutation = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (classId: string) => {
      try {
        const res = await api.post(`${API_PATH}/class/${classId}`);

        return await res.json<ReservationType>();
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error("An unexpected error occurred", err);
        }
        throw err;
      }
    },
    onSuccess: async (_data, classId) => {
      await queryClient.invalidateQueries({ queryKey: [API_PATH] });
      await queryClient.invalidateQueries({ queryKey: ["v1/class", classId] });
      await queryClient.invalidateQueries({
        queryKey: ["v1/client", "client"],
      });
      await queryClient.invalidateQueries({ queryKey: ["classTypes"] });
      await queryClient.invalidateQueries({ queryKey: ["class"] });
      toast.success("Cours réservé avec succès !");
    },
    onError: (error: unknown) => {
      if (error instanceof HTTPError) {
        error.response.json().then((data: { message?: string }) => {
          toast.error(
            data.message ||
              "Une erreur est survenue lors de l'annulation du cours."
          );
        });
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Une erreur est survenue lors de l'annulation du cours.");
      }
    },
  });
};

// OKKK
export const useCancelAReservationMutation = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (uuid: string) => {
      try {
        const res = await api.delete(`${API_PATH}/${uuid}`);
        return await res.json();
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error("An unexpected error occurred", err);
        }
        throw err;
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [API_PATH] });
      await queryClient.invalidateQueries({
        queryKey: ["v1/client", "client"],
      });
      await queryClient.invalidateQueries({ queryKey: ["classTypes"] });
      await queryClient.invalidateQueries({ queryKey: ["class"] });
      toast.success("Cours annulé avec succès !");
    },
    onError: (error: unknown) => {
      if (error instanceof HTTPError) {
        error.response.json().then((data: { message?: string }) => {
          toast.error(
            data.message ||
              "Une erreur est survenue lors de l'annulation du cours."
          );
        });
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Une erreur est survenue lors de l'annulation du cours.");
      }
    },
  });

  return mutation;
};

interface UpdateReservationProps {
  uuid: string;
  json: ReservationType;
}
// OKKK
export const useUpdateReservation = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ uuid, json }: UpdateReservationProps) => {
      return api
        .patch(`${API_PATH}/${uuid}`, {
          json,
        })
        .json();
    },
    onSuccess: async () => {
      // invalidate reservations
      await queryClient.invalidateQueries({ queryKey: [API_PATH] });

      // invalidate all classes
      await queryClient.invalidateQueries({ queryKey: ["v1/class"] });

      // ✅ invalidate *all* classAuthenticated queries (no matter the params)
      await queryClient.invalidateQueries({
        queryKey: ["classAuthenticated"],
        exact: false,
      });

      toast.success(`Réservation modifiée`);
    },
    onError: async () => {
      // @ts-expect-error API_PATH
      await queryClient.invalidateQueries(API_PATH);
      toast.error(
        "Une erreur est survenue. Veuillez vérifier que les disponibilités sélectionnées ont toutes des heures de début et de fin"
      );
    },
  });
};

interface UpdateReservationIsPaidProps {
  uuid: string;
  json: boolean;
}
export const useUpdateReservationIsPaid = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ uuid, json }: UpdateReservationIsPaidProps) => {
      return api
        .patch(`${API_PATH}/${uuid}/is-paid`, {
          json: { json },
        })
        .json();
    },
    onSuccess: async () => {
      // @ts-expect-error API_PATH
      await queryClient.invalidateQueries(API_PATH);
      toast.success(`Modification prise en compte`);
    },
    onError: async () => {
      // @ts-expect-error API_PATH
      await queryClient.invalidateQueries(API_PATH);
      toast.error("Une erreur est survenue.");
    },
  });
};
