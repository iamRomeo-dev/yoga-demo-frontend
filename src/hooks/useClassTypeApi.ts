import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "@/hooks/useApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export interface ClassTypeType {
  _id?: string;
  name: string;
  description: string;
  color: string;
}

export interface ClassTypeDataProps {
  totalCount: number;
  list: ClassTypeType[];
}

export interface UseClassTypeQueryProps {
  limit?: number;
  skip?: number;
  sort?: string;
  [key: string]: unknown;
}

export const API_PATH = "v1/classType";
// OKKK
export const useCreateAClassTypeMutation = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<ClassTypeType, Error>({
    mutationFn: async () => {
      return api.post(`${API_PATH}`).json<ClassTypeType>();
    },
    onSuccess: async (req) => {
      await queryClient.invalidateQueries({ queryKey: [API_PATH] });
      router.push(`/classes/${req._id}`);
    },
  });
};

// Get one
// OKKK
export const useClassTypeByIdQuery = (itemId: string) => {
  const api = useApi();

  return useQuery<ClassTypeType>({
    queryKey: [API_PATH, itemId],
    queryFn: async () => {
      const response = await api.get(`${API_PATH}/${itemId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch the course");
      }
      return response.json<ClassTypeType>();
    },
    enabled: !!itemId,
  });
};

interface UpdateClassTypeProps {
  uuid: string;
  json: ClassTypeType;
}

// OKKK
export const useUpdateClassType = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ uuid, json }: UpdateClassTypeProps) => {
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
export const useDeleteClassType = () => {
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
