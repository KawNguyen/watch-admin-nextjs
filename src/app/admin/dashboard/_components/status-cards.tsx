"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, CircleX, Clock } from "lucide-react";
import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface OrderStatusCount {
  status: "COMPLETED" | "CANCELED" | "PENDING";
  _count: {
    _all: number;
  };
}

interface StatusPieChartData {
  orderStatusCounts: OrderStatusCount[];
  totalOrders: number;
}

interface StatusPieChartProps {
  data?: StatusPieChartData;
}

const PLACEHOLDER_DATA: StatusPieChartData = {
  orderStatusCounts: [
    {
      status: "COMPLETED",
      _count: { _all: 0 },
    },
    {
      status: "PENDING",
      _count: { _all: 0 },
    },
    {
      status: "CANCELED",
      _count: { _all: 0 },
    },
  ],
  totalOrders: 0,
};

const STATUS_CONFIG = {
  COMPLETED: {
    title: "Hoàn Thành",
    icon: CircleCheck,
    color: "#16a34a",
    bgColor: "bg-green-100",
    textColor: "text-green-600",
    borderColor: "border-green-500",
  },
  PENDING: {
    title: "Đang Xử Lí",
    icon: Clock,
    color: "#ca8a04",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-600",
    borderColor: "border-yellow-500",
  },
  CANCELED: {
    title: "Hủy",
    icon: CircleX,
    color: "#dc2626",
    bgColor: "bg-red-100",
    textColor: "text-red-600",
    borderColor: "border-red-500",
  },
};

export function StatusPieChart({ data }: StatusPieChartProps) {
  const displayData = data || PLACEHOLDER_DATA;

  const chartData = useMemo(() => {
    return displayData.orderStatusCounts
      .filter((item) => item._count._all > 0)
      .map((item) => ({
        name: STATUS_CONFIG[item.status].title,
        value: item._count._all,
        status: item.status,
        percentage:
          displayData.totalOrders > 0
            ? ((item._count._all / displayData.totalOrders) * 100).toFixed(1)
            : "0.0",
        color: STATUS_CONFIG[item.status].color,
      }));
  }, [displayData]);

  const hasData = chartData.length > 0 && displayData.totalOrders > 0;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2 flex-shrink-0">
        <CardTitle className="text-lg font-semibold text-center">
          Thống Kê Trạng Thái Đơn Hàng
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Tổng số đơn hàng: {displayData.totalOrders}
        </p>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 p-4">
        {hasData ? (
          <div className="w-full h-full  ">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="45%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke={entry.color}
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border rounded-lg shadow-lg">
                          <p className="font-medium">{data.name}</p>
                          <p className="text-sm text-gray-600">
                            Số lượng: {data.value}
                          </p>
                          <p className="text-sm text-gray-600">
                            Tỉ lệ: {data.percentage}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  content={({ payload }) => (
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                      {payload?.map((entry: any, index: number) => {
                        const status = entry.payload.status;
                        const config =
                          STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];
                        const IconComponent = config.icon;

                        return (
                          <div key={index} className="flex items-center gap-2">
                            <IconComponent
                              className={cn("size-4", config.textColor)}
                            />
                            <span className="text-sm font-medium">
                              {entry.value}
                            </span>
                            <Badge
                              className={cn(
                                "text-xs",
                                config.bgColor,
                                config.textColor,
                                config.borderColor
                              )}
                            >
                              {entry.payload.percentage}%
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full min-h-[350px]">
            <p className="text-muted-foreground">
              Không có dữ liệu để hiển thị
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
