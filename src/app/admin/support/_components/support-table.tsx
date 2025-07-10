'use client';

import { EyeIcon } from 'lucide-react';
import { StatusBadge } from './status-badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const SupportTable = ({ requests, onViewDetails }) => {
  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <ScrollArea className="w-full overflow-auto rounded-t-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-6 text-center text-muted-foreground"
                >
                  No support requests found.
                </TableCell>
              </TableRow>
            ) : (
              requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium text-muted-foreground">
                    #{request.id.toString().padStart(5, '0')}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-900">
                      {request.customerName}
                    </div>
                    <div className="text-gray-500 text-sm">{request.email}</div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(request.dateSubmitted).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        request.priority === 'high'
                          ? 'bg-red-100 text-red-800 border-none'
                          : request.priority === 'medium'
                            ? 'border-none bg-yellow-100 text-yellow-800'
                            : 'border-none bg-green-100 text-green-800'
                      }
                    >
                      {request.priority.charAt(0).toUpperCase() +
                        request.priority.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={request.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      onClick={() => onViewDetails(request)}
                      className="gap-1"
                    >
                      <EyeIcon className="h-4 w-4" />
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      {/* Pagination summary + controls */}
      <div className="flex items-center justify-between border-t bg-white p-4 text-muted-foreground text-sm">
        <div>
          Showing <span className="font-medium">1</span> to{' '}
          <span className="font-medium">{requests.length}</span> of{' '}
          <span className="font-medium">{requests.length}</span> results
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            &larr; Previous
          </Button>
          <Button variant="outline" size="sm">
            Next &rarr;
          </Button>
        </div>
      </div>
    </div>
  );
};
