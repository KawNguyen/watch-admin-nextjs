'use client';
import { RefreshCwIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FilterControls } from './filter-controls';
import { SupportTable } from './support-table';
import { RequestDetails } from './request-details';
import { useState } from 'react';
import { mockSupportRequests } from '@/constants';

export const SupportManagement = () => {
  const [requests, setRequests] = useState(mockSupportRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    searchQuery: '',
    sortBy: 'date',
    sortDirection: 'desc',
  });
  const handleStatusChange = (requestId, newStatus) => {
    setRequests(
      requests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: newStatus,
            }
          : request
      )
    );
  };
  const handleViewDetails = (request: any) => {
    setSelectedRequest(request);
    setIsDetailsOpen(true);
  };
  const closeDetails = () => {
    setIsDetailsOpen(false);
  };
  const filteredRequests = requests.filter((request) => {
    // Filter by status
    if (filters.status !== 'all' && request.status !== filters.status) {
      return false;
    }
    // Filter by search query
    if (
      filters.searchQuery &&
      !request.customerName
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase()) &&
      !request.subject.toLowerCase().includes(filters.searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });
  // Sort requests
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (filters.sortBy === 'date') {
      return filters.sortDirection === 'desc'
        ? new Date(b.dateSubmitted) - new Date(a.dateSubmitted)
        : new Date(a.dateSubmitted) - new Date(b.dateSubmitted);
    } else if (filters.sortBy === 'priority') {
      const priorityValues = {
        high: 3,
        medium: 2,
        low: 1,
      };
      return filters.sortDirection === 'desc'
        ? priorityValues[b.priority] - priorityValues[a.priority]
        : priorityValues[a.priority] - priorityValues[b.priority];
    }
    return 0;
  });
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col justify-between md:flex-row md:items-center">
        <h1 className="mb-4 font-bold text-2xl text-gray-800 md:mb-0">
          Support Request Management
        </h1>
        <div className="flex items-center space-x-2">
          <Button
            className="flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 font-medium text-gray-700 text-sm hover:bg-gray-50"
            onClick={() => setRequests(mockSupportRequests)}
          >
            <RefreshCwIcon className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
      <FilterControls filters={filters} setFilters={setFilters} />
      <SupportTable
        requests={sortedRequests}
        onStatusChange={handleStatusChange}
        onViewDetails={handleViewDetails}
      />
      {isDetailsOpen && selectedRequest && (
        <RequestDetails
          request={selectedRequest}
          onClose={closeDetails}
          onStatusChange={(newStatus) =>
            handleStatusChange(selectedRequest.id, newStatus)
          }
        />
      )}
    </div>
  );
};
