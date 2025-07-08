import type { ColumnDef } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import type { User } from '@/types/user';
import UserForm from './user-form';
export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }: { row: any }) => {
      return (
        <div className="flex items-center gap-2">
          <UserForm mode="view" userData={row.original} />
          <UserForm mode="edit" userData={row.original} />
          <Trash2 className="size-4 cursor-pointer text-gray-500 duration-300 hover:text-black" />
        </div>
      );
    },
  },
];
