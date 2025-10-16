import qs from "qs";
import { useQuery } from "@tanstack/react-query";
import { useApiNotAuthenticated } from "@/hooks/useApi";
import { ClassDataProps, ClassType, UseClassQueryProps } from "./useClassApi";

export const API_PATH = "v1/classUnauthenticated";

// Get all
// OKKK
export const useClassesQuery = ({
  limit = 0,
  skip = 0,
  sort = "-createdAt",
  ...query
}: UseClassQueryProps) => {
  const api = useApiNotAuthenticated();

  return useQuery<ClassDataProps>({
    queryKey: ["class", { limit, skip, sort, ...query }],
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
