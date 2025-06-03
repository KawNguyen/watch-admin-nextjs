import { movementAPI } from "@/services/movement";
import { useQuery } from "@tanstack/react-query";

export const useMovement = () => {
  return useQuery({
    queryKey: ["movement"],
    queryFn: async () => await movementAPI.getAllMovements(),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

