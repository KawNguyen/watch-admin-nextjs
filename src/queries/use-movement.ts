import { movementApi } from "@/services/movement";
import { useQuery } from "@tanstack/react-query";

export const useMovements = () => {
  return useQuery({
    queryKey: ["movements"],
    queryFn: movementApi.getAllMovements,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
