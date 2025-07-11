'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { XIcon, UserIcon, CalendarIcon, MessageSquareIcon } from 'lucide-react';
import { StatusBadge } from './status-badge';

export const RequestDetails = ({ request, onClose, onStatusChange }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-hidden p-0">
        <DialogHeader className="border-b p-6">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-semibold text-gray-900 text-lg">
              Support Request Details
            </DialogTitle>  
          </div>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-64px)] overflow-y-auto px-6 py-4">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="mb-1 font-bold text-gray-900 text-xl">
                {request.subject}
              </h2>
              <p className="text-muted-foreground text-sm">
                Request ID: #{request.id.toString().padStart(5, '0')}
              </p>
            </div>
            <StatusBadge status={request.status} />
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Customer Info */}
            <div className="rounded-lg bg-muted p-4">
              <h4 className="mb-2 font-medium text-muted-foreground text-sm">
                Customer Information
              </h4>
              <div className="flex gap-2">
                <UserIcon className="mt-0.5 h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {request.customerName}
                  </p>
                  <p className="text-gray-600 text-sm">{request.email}</p>
                  <p className="text-gray-600 text-sm">
                    {request.phone || 'No phone provided'}
                  </p>
                </div>
              </div>
            </div>

            {/* Request Info */}
            <div className="rounded-lg bg-muted p-4">
              <h4 className="mb-2 font-medium text-muted-foreground text-sm">
                Request Information
              </h4>
              <div className="space-y-2 text-gray-600 text-sm">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                  Submitted on{' '}
                  {new Date(request.dateSubmitted).toLocaleDateString()} at{' '}
                  {new Date(request.dateSubmitted).toLocaleTimeString()}
                </div>
                <div className="flex items-center">
                  <div
                    className="mr-2 h-3 w-3 rounded-full"
                    style={{
                      backgroundColor:
                        request.priority === 'high'
                          ? '#ef4444'
                          : request.priority === 'medium'
                            ? '#facc15'
                            : '#22c55e',
                    }}
                  />
                  <span>
                    {request.priority.charAt(0).toUpperCase() +
                      request.priority.slice(1)}{' '}
                    Priority
                  </span>
                </div>
                <div className="flex items-center">
                  <MessageSquareIcon className="mr-2 h-4 w-4 text-gray-400" />
                  {request.category}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="mb-2 font-medium text-muted-foreground text-sm">
              Description
            </h4>
            <div className="whitespace-pre-wrap rounded-md bg-muted p-4 text-gray-800 text-sm">
              {request.description}
            </div>
          </div>

          {/* Attachments */}
          {request.attachments?.length > 0 && (
            <div className="mb-6">
              <h4 className="mb-2 font-medium text-muted-foreground text-sm">
                Attachments
              </h4>
              <div className="rounded-md bg-muted p-4">
                <ul className="space-y-2 text-sm">
                  {request.attachments.map((attachment, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex h-6 w-6 items-center justify-center p-0 text-xs"
                      >
                        {attachment.type[0].toUpperCase()}
                      </Badge>
                      <span className="cursor-pointer text-indigo-600 hover:underline">
                        {attachment.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <Separator className="my-6" />

          {/* Update Status */}
          <div>
            <h4 className="mb-4 font-medium text-muted-foreground text-sm">
              Update Status
            </h4>
            <div className="flex flex-wrap gap-2">
              {['open', 'in-progress', 'resolved', 'closed'].map((status) => (
                <Button
                  key={status}
                  variant={request.status === status ? 'default' : 'outline'}
                  onClick={() => onStatusChange(status)}
                >
                  {status
                    .split('-')
                    .map((word) => word[0].toUpperCase() + word.slice(1))
                    .join(' ')}
                </Button>
              ))}
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="flex justify-end border-t p-4">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
