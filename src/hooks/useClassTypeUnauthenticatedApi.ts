import qs from "qs";
import { useQuery } from "@tanstack/react-query";
import { useApi, useApiNotAuthenticated } from "@/hooks/useApi";
import {
  ClassTypeDataProps,
  ClassTypeType,
  UseClassTypeQueryProps,
} from "./useClassTypeApi";

export const API_PATH = "v1/classTypeUnauthenticated";

// Get all
// OKKK
export const useClassesTypeQuery = ({
  limit = 0,
  skip = 0,
  sort = "-createdAt",
  ...query
}: UseClassTypeQueryProps) => {
  const api = useApiNotAuthenticated();

  return useQuery<ClassTypeDataProps>({
    queryKey: ["classTypes", { limit, skip, sort, ...query }],
    queryFn: async () => {
      const searchParams = qs.stringify({
        limit,
        skip,
        sort,

        ...query,
      });
      const response = await api.get(API_PATH, { searchParams });

      const totalCount = Number(response.headers.get("X-Total-Count"));
      const list = await response.json<ClassTypeType[]>();

      return { totalCount, list };
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
