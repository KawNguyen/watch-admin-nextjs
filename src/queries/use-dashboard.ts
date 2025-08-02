"use client";
import { dashboardApi } from "@/services/dashboard";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

interface UseDashboardParams {
  startDate?: string;
  endDate?: string;
}

export const useDashboard = ({
  startDate,
  endDate,
}: UseDashboardParams = {}) => {
  return useQuery({
    queryKey: ["dashboard", startDate, endDate],
    queryFn: () => dashboardApi.getDashboard(startDate, endDate),
    refetchOnWindowFocus: false,
    retry: 1,
    placeholderData: keepPreviousData,
  });
};
