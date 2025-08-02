import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { formatMoney } from "@/lib";
import { cn } from "@/lib/utils";
import { useStatisticToday } from "@/queries/use-statistic";

export function TodayStatisticCard() {
  const { data } = useStatisticToday();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dữ liệu hôm nay</CardTitle>
        <CardDescription>{data?.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Doanh thu</span>
            <span className="text-2xl font-bold">
              {formatMoney(data?.totalRevenue || 0)}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Số món bán ra</span>
            <span className="text-2xl font-bold">
              {data?.totalItemsSold || 0}
            </span>
          </div>

          {data?.orderStatusCounts?.map((p: any) => (
            <div key={p.status}>
              {p.status === "COMPLETED" ? "Hoàn Thành" : "Hủy"}: {p._count._all}
            </div>
          ))}

          {data?.orderStatusCounts.length > 0 ? (
            data?.orderStatusCounts?.map((p: any, idx: number) => (
              <div className="flex flex-col gap-2" key={idx}>
                <span
                  className={cn(
                    "text-sm font-medium",
                    p.status === "COMPLETED" ? "text-green-500" : "text-red-500"
                  )}
                >
                  {p.status === "COMPLETED" ? "Hoàn Thành" : "Hủy"}
                </span>
                <span
                  className={cn(
                    "text-2xl font-bold",
                    p.status === "COMPLETED" ? "text-green-600" : "text-red-600"
                  )}
                >
                  {p._count._all}
                </span>
              </div>
            ))
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-green-500">
                  Hoàn thành
                </span>
                <span className="text-2xl font-bold text-green-600">0</span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-red-500">Huỷ</span>
                <span className="text-2xl font-bold text-red-600">0</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
