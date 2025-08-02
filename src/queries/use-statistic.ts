import { statisticApi } from "@/services/statistic";
import { useQuery } from "@tanstack/react-query";

export const useStatistics = () =>
  useQuery({
    queryKey: ["statistic"],
    queryFn: statisticApi.getStatistics,
    refetchOnWindowFocus: false,
    retry: 1,
  });

export const useStatisticToday = () =>
  useQuery({
    queryKey: ["statistic-today"],
    queryFn: statisticApi.getTodayStatistic,
    refetchOnWindowFocus: false,
    retry: 1,
  });
