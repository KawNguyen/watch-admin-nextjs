"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Eye, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import type { Support } from "@/types/support";
import { useSupportResponse } from "@/queries/use-support";

type Props = {
  support: Support;
};

export default function SupportDetailDialog({ support }: Props) {
  const [open, setOpen] = useState(false);
  const [responseText, setResponseText] = useState(support.response ?? "");
  const { mutate } = useSupportResponse();

  const statusMap: Record<string, string> = {
    UN_CHECKED: "Chưa kiểm tra",
    CHECKED: "Đã kiểm tra",
    RESPONDED: "Đã phản hồi",
  };

  const statusColorMap: Record<string, string> = {
    UN_CHECKED: "bg-yellow-100 text-yellow-800",
    CHECKED: "bg-blue-100 text-blue-800",
    RESPONDED: "bg-green-100 text-green-800",
  };

  const handleSubmit = () => {
    if (!responseText.trim()) {
      toast.error("Vui lòng nhập nội dung phản hồi.");
      return;
    }

    mutate(
      { id: support.id, response: responseText },
      {
        onSuccess: () => {
          toast.success("Đã phản hồi thành công.");
          setOpen(false);
        },
        onError: () => {
          toast.error("Gửi phản hồi thất bại.");
        },
      }
    );
  };

  return (
    <>
      <Button size="icon" variant="outline" onClick={() => setOpen(true)}>
        <Eye className="w-4 h-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Chi tiết yêu cầu hỗ trợ</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-sm">
            <div>
              <span className="font-semibold">Email:</span> {support.email}
            </div>
            <div>
              <span className="font-semibold">Tiêu đề:</span> {support.subject}
            </div>
            <div>
              <span className="font-semibold">Nội dung:</span>
              <p className="mt-1 whitespace-pre-line">{support.message}</p>
            </div>
            <div>
              <span className="font-semibold">Trạng thái:</span>{" "}
              <Badge className={statusColorMap[support.status]}>
                {statusMap[support.status]}
              </Badge>
            </div>
            <div>
              <span className="font-semibold">Ngày gửi:</span>{" "}
              {new Date(support.createdAt).toLocaleString("vi-VN")}
            </div>
            <div>
              <span className="font-semibold">Phản hồi:</span>
              <Textarea
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                placeholder="Nhập nội dung phản hồi tại đây..."
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Đóng
            </Button>
            <Button onClick={handleSubmit}>Gửi phản hồi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
