// import { queryClient } from "@/components/provider/provider";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { StockAPI } from "@/services/stock";
// import { useMutation } from "@tanstack/react-query";
// import { ColumnDef } from "@tanstack/react-table";
// import { Eye } from "lucide-react";
// import { useState } from "react";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { toast } from "sonner";
// export type Stock = {
//   stockId: string;
//   totalPrice: number;
//   createdAt: string;
//   stockDetail: StockDetail[];
// };
// export type StockDetail = {
//   productId: string;
//   quantity: number;
//   price: number;
// };

// export const columns: ColumnDef<Stock>[] = [
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
//     accessorKey: "stockId",
//     header: "ID",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("stockId")}</div>
//     ),
//   },
//   {
//     accessorKey: "totalPrice",
//     header: "Total Price",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("totalPrice")}</div>
//     ),
//   },
//   {
//     accessorKey: "createdAt",
//     header: "Created At",
//     cell: ({ row }) => (
//       <div className="text-left">{row.getValue("createdAt")}</div>
//     ),
//   },
//   {
//     // id: "actions",
//     header: "Actions",
//     cell: ({ row }) => {
//       const [stockData] = useState<Stock | null>(null);
//       const [stockDetailData] = useState<StockDetail | null>(null);

//       const mutation = useMutation({
//         mutationFn: (id: string) => StockAPI.getStockById(id),
//         onSuccess: () => {
//           toast.success("User deleted successfully");
//           queryClient.invalidateQueries({ queryKey: ["users"] });
//         },
//         onError: (error) => {
//           toast.error(error.message);
//         },
//       });

//       return (
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => mutation.mutate(row.original.stockId)}
//             >
//               <Eye className="h-4 w-4" />
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[425px]">
//             <DialogHeader>
//               <DialogTitle>Stock Details</DialogTitle>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="stockId" className="text-right">
//                   ID
//                 </Label>
//                 <Input
//                   id="stockId"
//                   value={stockData?.stockId || row.original.stockId}
//                   className="col-span-3"
//                   readOnly
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="totalPrice" className="text-right">
//                   Total Price
//                 </Label>
//                 <Input
//                   id="totalPrice"
//                   value={stockData?.totalPrice || row.original.totalPrice}
//                   className="col-span-3"
//                   readOnly
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="createdAt" className="text-right">
//                   Created At
//                 </Label>
//                 <Input
//                   id="createdAt"
//                   value={stockData?.createdAt || row.original.createdAt}
//                   className="col-span-3"
//                   readOnly
//                 />
//               </div>
//             </div>
//             <DialogHeader>
//               <DialogTitle>Products</DialogTitle>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="productId" className="text-right">
//                   Product Id
//                 </Label>
//                 <Input
//                   id="productId"
//                   value={stockDetailData?.productId || "row.original.productId"}
//                   className="col-span-3"
//                   readOnly
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="quantity" className="text-right">
//                   quantity
//                 </Label>
//                 <Input
//                   id="quantity"
//                   value={stockDetailData?.quantity || "row.original.quantity"}
//                   className="col-span-3"
//                   readOnly
//                 />
//               </div>
//             </div>
//           </DialogContent>
//         </Dialog>
//       );
//     },
//   },
// ];
