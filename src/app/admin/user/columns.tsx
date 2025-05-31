import { queryClient } from "@/components/provider/provider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Eye } from "lucide-react";
import { useState } from "react";

export type User = {
  userId: string;
  email: string;
  role: string;
  password: string;
  createdAt: string;
  profile: Profile;
};
export type Profile = {
  profileId: string;
  avatar: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  gender: string;
  user: User;
};
export enum Role {
  Admin = "Admin",
  User = "User",
}
export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div className="text-left">{row.getValue("role")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("createdAt")}</div>
    ),
  },
  {
    // id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const [userData, setUserData] = useState<User | null>(null);
      
      const mutation = useMutation({
        mutationFn: (id: string) => userAPI.getUserById(id),
        onSuccess: () => {
          toast.success("User deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => mutation.mutate(row.original.userId)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input
                  id="email"
                  value={userData?.email || row.original.email}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  value={row.original.password}
                  className="col-span-3"
                  type="text"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  User Id
                </Label>
                <Input
                  id="email"
                  value={row.original.userId}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Profile Id
                </Label>
                <Input
                  id="email"
                  value={row.original.profile?.profileId}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Role
                </Label>
                <Input
                  id="email"
                  value={row.original.role}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Avatar
                </Label>
                <Input
                  id="email"
                  value={row.original.profile?.avatar}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  First Name
                </Label>
                <Input
                  id="email"
                  value={row.original.profile?.firstName}
                  className="col-span-3"
                />
              </div>{" "}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Last Name
                </Label>
                <Input
                  id="email"
                  value={row.original.profile?.lastName}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Phone
                </Label>
                <Input
                  id="email"
                  value={row.original.profile?.phone}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Gender
                </Label>
                <Input
                  id="email"
                  value={row.original.profile?.gender}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Address
                </Label>
                <Input
                  id="email"
                  value={row.original.profile?.address}
                  className="col-span-3"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
