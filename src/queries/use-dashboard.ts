"use client";
import { dashboardApi } from "@/services/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: dashboardApi.getDashboard,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
