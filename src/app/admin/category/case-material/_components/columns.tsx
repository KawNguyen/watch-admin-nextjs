import { useMutation } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import { Loader2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { queryClient } from '@/components/provider/provider';
import { AlertDialogFooter } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { materialApi } from '@/services/material';
import type { Material } from '@/types/material';
import CaseMaterialForm from './case-material-form';
export const columns: ColumnDef<Material>[] = [
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
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }: { row: any }) => {
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const mutationDelete = useMutation({
        mutationFn: (materialId: string) =>
          materialApi.deleteMaterial(materialId),
        onSuccess: () => {
          toast.success('Case material deleted successfully');
          queryClient.invalidateQueries({ queryKey: ['materials'] });
        },
        onError: () => {
          toast.error('Failed to delete case material');
        },
      });
      const handleDelete = () => {
        mutationDelete.mutate(row.original.id);
        setIsDialogOpen(false);
      };

      return (
        <div className="flex items-center gap-2">
          <CaseMaterialForm caseMaterialData={row.original} mode="view" />
          <CaseMaterialForm caseMaterialData={row.original} mode="edit" />
          <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
            <DialogTrigger asChild>
              {mutationDelete.isPending ? (
                <Loader2 className="size-4 animate-spin text-red-500" />
              ) : (
                <Trash2
                  className="size-4 cursor-pointer text-red-500"
                  onClick={() => setIsDialogOpen(true)}
                />
              )}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <h3 className="font-semibold text-lg">Confirm Deletion</h3>
              </DialogHeader>
              <p>
                Are you sure you want to delete
                <span className=" mx-2 text-red-500 underline">
                  {row.original.name}
                </span>
                ?
              </p>
              <AlertDialogFooter>
                <Button
                  onClick={() => setIsDialogOpen(false)}
                  variant="secondary"
                >
                  Cancel
                </Button>
                <Button onClick={handleDelete} variant="destructive">
                  Confirm Delete
                </Button>
              </AlertDialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
