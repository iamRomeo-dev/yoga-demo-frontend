import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "@/hooks/useApi";
import { toast } from "sonner";
import { ClassTypeType } from "./useClassTypeApi";
import { ClientType } from "./useClientsApi";
import { ReservationType } from "./useReservationApi";
import qs from "qs";

export const API_PATH = "v1/class";

export interface ClassType {
  _id?: string;
  classType: ClassTypeType;
  date: Date;
  from: string;
  to: string;
  location: string;
  maxPeople: number;
  clients: ClientType[];
  reservations: ReservationType[];
}

export interface ClassDataProps {
  totalCount: number;
  list: ClassType[];
}

export interface UseClassQueryProps {
  limit?: number;
  skip?: number;
  sort?: string;
  [key: string]: unknown;
}

// export const useCreateAClassMutation = () => {
//   const api = useApi();
//   const queryClient = useQueryClient();

//   return useMutation<ClassType, Error>({
//     mutationFn: async (json) => {
//       return api
//         .post(`${API_PATH}`, {
//           json,
//         })
//         .json<ClassType>();
//     },
//     onSuccess: async () => {
//       await queryClient.invalidateQueries({ queryKey: [API_PATH] });
//     },
//   });
// };

// OKKK
export const useSaveManyClassesMutation = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (classes: ClassType[]) => {
      const toCreate = classes.filter((c) => !c._id);
      const toUpdate = classes.filter((c) => c._id);
      const results: ClassType[] = [];

      if (toCreate.length > 0) {
        const created = await api
          .post(`${API_PATH}/bulk`, { json: toCreate })
          .json<ClassType[]>();
        results.push(...created);
      }

      if (toUpdate.length > 0) {
        const updated = await api
          .patch(`${API_PATH}/bulk`, { json: toUpdate })
          .json<ClassType[]>();
        results.push(...updated);
      }

      return results;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_PATH] });
      queryClient.invalidateQueries({ queryKey: ["class"] });
      toast.success("Cours enregistrés");
    },
  });
};

// OKKK
export const useDeleteManyClassType = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (classes: ClassType[]) => {
      // ✅ must use patch, not post
      return await api
        .patch(`${API_PATH}/deleteMany`, { json: classes })
        .json<ClassType[]>();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_PATH] });
    },
  });
};

interface UpdateClassProps {
  uuid: string;
  json: ClassType;
}

// OKKK
export const useUpdateClassType = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ uuid, json }: UpdateClassProps) => {
      return api
        .patch(`${API_PATH}/${uuid}`, {
          json,
        })
        .json();
    },
    onSuccess: async () => {
      // @ts-expect-error API_PATH
      await queryClient.invalidateQueries(API_PATH);
      toast.success(`Cours enregistré`);
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

// OKKK
export const useDeleteClass = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (uuid: string) => {
      await api.delete(`${API_PATH}/${uuid}`);
    },
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      queryClient.invalidateQueries([API_PATH]);
    },
  });

  return mutation;
};

// Get one by id
// OKKK
export const useClassByIdQuery = (itemId: string) => {
  const api = useApi();

  return useQuery<ClassType>({
    queryKey: [API_PATH, itemId],
    queryFn: async () => {
      const response = await api.get(`${API_PATH}/${itemId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch the class");
      }
      return response.json<ClassType>();
    },
    enabled: !!itemId,
  });
};

// OKKK
export const useClassesQueryAuthenticated = ({
  limit = 0,
  skip = 0,
  sort = "-createdAt",
  ...query
}: UseClassQueryProps) => {
  const api = useApi();

  return useQuery<ClassDataProps>({
    queryKey: ["classAuthenticated", { limit, skip, sort, ...query }],
    queryFn: async () => {
      const searchParams = qs.stringify({
        limit,
        skip,
        sort,
        ...query,
      });
      const response = await api.get(API_PATH, { searchParams });

      const totalCount = Number(response.headers.get("X-Total-Count"));
      const list = await response.json<ClassType[]>();

      return { totalCount, list };
    },
  });
};
