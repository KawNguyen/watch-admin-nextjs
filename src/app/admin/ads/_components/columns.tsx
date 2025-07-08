import { useMutation } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import { Loader2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { queryClient } from '@/components/provider/provider';
import { AlertDialogFooter } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { advertisementApi } from '@/services/ads';
import type { Advertisment } from '@/types/advertisement';
import AdvertisementForm from './ads-form';

const ActionCell = ({ row }: { row: any }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const mutationDelete = useMutation({
    mutationFn: (adsId: string) => advertisementApi.deleteAds(adsId),
    onSuccess: () => {
      toast.success('Advertisement deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['advertisements'] });
    },
    onError: () => {
      toast.error('Failed to delete advertisement');
    },
  });
  const handleDelete = () => {
    mutationDelete.mutate(row.original.id);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <AdvertisementForm adsData={row.original} mode="view" />
      <AdvertisementForm adsData={row.original} mode="edit" />
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
              {row.original.title}
            </span>
            ?
          </p>
          <AlertDialogFooter>
            <Button onClick={() => setIsDialogOpen(false)} variant="secondary">
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
};

export const columns: ColumnDef<Advertisment>[] = [
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => {
      const imageUrl = row.original.imageUrl;
      return (
        <div className="relative h-16 w-16">
          {imageUrl ? (
            <Image
              alt={row.getValue('title')}
              className="rounded-md object-cover"
              fill
              priority
              sizes="(max-width: 64px) 100vw, 64px"
              src={imageUrl}
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-md bg-muted">
              <span className="text-muted-foreground text-xs">No image</span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'link',
    header: 'Link',
  },
  {
    accessorKey: 'isActive',
    header: 'Active',
  },
  {
    accessorKey: 'startDate',
    header: 'From',
  },
  {
    accessorKey: 'endDate',
    header: 'To',
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
