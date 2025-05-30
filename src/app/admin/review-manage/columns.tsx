// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { reviewAPI } from "@/services/review";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { useMutation } from "@tanstack/react-query";
// import { ColumnDef } from "@tanstack/react-table";
// import { Input } from "@/components/ui/input";
// import { toast } from "sonner";
// import { Eye } from "lucide-react";
// import { useState } from "react";
// import { User } from "../user/columns";

// export type Review = {
//   id: string;
//   name: string;
//   totalComment: number;
// };
// export type DetailsReview = {
//   user: User;
//   userId: string;
//   idDetailsReview: string;
//   rating: number;
//   comment: string;
//   createdAt: string;
// };
// export const columns: ColumnDef<Review>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "id",
//     header: "ID",
//     cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
//   },
//   {
//     accessorKey: "name",
//     header: "Name",
//     cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
//   },
//   {
//     accessorKey: "totalComment",
//     header: "Total Comment",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("totalComment")}</div>
//     ),
//   },
//   {
//     header: "Actions",
//     cell: ({ row }) => {
//       const [reviewData, setReviewData] = useState<Review | null>(null);

//       const mutation = useMutation({
//         mutationFn: (id: string) => reviewAPI.getReviewById(id),
//         onSuccess: (data) => {
//           setReviewData(data);
//         },
//         onError: (error) => {
//           toast.error("Không thể lấy thông tin review");
//         },
//       });

//       return (
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => mutation.mutate(row.original.id)}
//             >
//               <Eye className="h-4 w-4" />
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[800px]">
//             <DialogHeader>
//               <DialogTitle>Details Review</DialogTitle>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               {/* <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="id" className="text-right">ID</Label>
//                 <Input
//                   id="id"
//                   value={row.original.id}
//                   className="col-span-3"
//                   readOnly
//                 />
//               </div> */}
//               <div className="grid grid-cols-12 items-center gap-4">
//                 <div className="col-span-8">
//                   <Label htmlFor="name" className="text-right">
//                     Name
//                   </Label>
//                   <Input
//                     id="name"
//                     value={row.original.name}
//                     className="col-span-3"
//                     readOnly
//                   />
//                 </div>
//                 <div className="col-span-4">
//                   <Label htmlFor="totalComment" className="text-right">
//                     Comments
//                   </Label>
//                   <Input
//                     id="totalComment"
//                     value={row.original.totalComment}
//                     className="col-span-3"
//                     readOnly
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4"></div>
//             </div>
//           </DialogContent>
//         </Dialog>
//       );
//     },
//   },
// ];
