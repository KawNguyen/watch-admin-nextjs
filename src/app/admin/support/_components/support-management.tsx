'use client';
import { RefreshCwIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FilterControls } from './filter-controls';
import { SupportTable } from './support-table';
import { RequestDetails } from './request-details';
import { useState } from 'react';
export const mockSupportRequests = [
  {
    id: 1001,
    customerName: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    subject: 'Cannot access my account after password reset',
    description:
      "I tried to reset my password yesterday but now I can't log in to my account. I've tried multiple times with the new password but keep getting an 'invalid credentials' error. Please help me regain access as soon as possible.",
    category: 'Account Access',
    dateSubmitted: '2023-11-05T14:32:00',
    priority: 'high',
    status: 'open',
    attachments: [{ name: 'error_screenshot.png', type: 'image' }],
  },
  {
    id: 1002,
    customerName: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 987-6543',
    subject: "Billing discrepancy on last month's invoice",
    description:
      "I noticed that my last invoice (October 2023) shows a charge for a premium feature that I didn't sign up for. The extra charge is $29.99 and is labeled as 'Premium Analytics Package'. Please review and correct this billing error.",
    category: 'Billing',
    dateSubmitted: '2023-11-04T09:15:00',
    priority: 'medium',
    status: 'in-progress',
    attachments: [{ name: 'october_invoice.pdf', type: 'document' }],
  },
  {
    id: 1003,
    customerName: 'Robert Chen',
    email: 'robert.chen@example.com',
    phone: '+1 (555) 234-5678',
    subject: 'Feature request: Dark mode for dashboard',
    description:
      'I spend a lot of time on the dashboard and would really appreciate if you could add a dark mode option. This would help reduce eye strain during night-time usage. Many competing products already offer this feature.',
    category: 'Feature Request',
    dateSubmitted: '2023-11-03T16:45:00',
    priority: 'low',
    status: 'open',
    attachments: [],
  },
  {
    id: 1004,
    customerName: 'Emma Williams',
    email: 'emma.w@example.com',
    phone: '+1 (555) 876-5432',
    subject: 'Export functionality not working',
    description:
      "When I try to export my data to CSV format, the download starts but the file is empty (0 KB). I've tried multiple times on different browsers (Chrome and Firefox) but have the same issue. This is urgent as I need this data for a presentation tomorrow.",
    category: 'Technical Issue',
    dateSubmitted: '2023-11-05T11:20:00',
    priority: 'high',
    status: 'in-progress',
    attachments: [{ name: 'console_errors.png', type: 'image' }],
  },
  {
    id: 1005,
    customerName: 'Michael Brown',
    email: 'michael.b@example.com',
    phone: '+1 (555) 345-6789',
    subject: 'Thank you for the recent updates',
    description:
      "I just wanted to send a quick note to say how much I'm enjoying the new dashboard layout. The reorganized navigation and improved charts have made my workflow much more efficient. Great job to your team!",
    category: 'Feedback',
    dateSubmitted: '2023-11-02T13:10:00',
    priority: 'low',
    status: 'closed',
    attachments: [],
  },
  {
    id: 1006,
    customerName: 'Jennifer Lopez',
    email: 'jennifer.l@example.com',
    phone: '+1 (555) 456-7890',
    subject: 'Integration with Salesforce not syncing data',
    description:
      "We set up the Salesforce integration last week, but it doesn't seem to be syncing data properly. Our customer records aren't showing up in your system even though they're visible in Salesforce. We've verified that the API keys are correct.",
    category: 'Integration',
    dateSubmitted: '2023-11-04T14:05:00',
    priority: 'medium',
    status: 'open',
    attachments: [{ name: 'integration_logs.txt', type: 'document' }],
  },
  {
    id: 1007,
    customerName: 'David Wilson',
    email: 'david.w@example.com',
    phone: '+1 (555) 567-8901',
    subject: 'How do I set up team permissions?',
    description:
      "I recently upgraded to the Business plan and want to add my team members with different permission levels. I can't find clear documentation on how to restrict certain team members from accessing billing information while allowing them to view analytics.",
    category: 'Account Management',
    dateSubmitted: '2023-11-03T10:30:00',
    priority: 'medium',
    status: 'resolved',
    attachments: [],
  },
  {
    id: 1008,
    customerName: 'Lisa Thompson',
    email: 'lisa.t@example.com',
    phone: '+1 (555) 678-9012',
    subject: 'Mobile app crashes when uploading images',
    description:
      "Every time I try to upload an image through the mobile app (iOS, latest version), the app crashes immediately. This started happening after the most recent app update. I've tried reinstalling the app but the issue persists.",
    category: 'Mobile App',
    dateSubmitted: '2023-11-05T09:45:00',
    priority: 'high',
    status: 'open',
    attachments: [{ name: 'crash_report.txt', type: 'document' }],
  },
  {
    id: 1009,
    customerName: 'James Anderson',
    email: 'james.a@example.com',
    phone: '+1 (555) 789-0123',
    subject: 'Request for extended trial period',
    description:
      'Our team is currently evaluating your software but we need more time to fully test all the features relevant to our workflow. Our current trial expires in 3 days. Would it be possible to extend it by another 2 weeks?',
    category: 'Sales',
    dateSubmitted: '2023-11-04T16:20:00',
    priority: 'medium',
    status: 'pending',
    attachments: [],
  },
  {
    id: 1010,
    customerName: 'Patricia Martinez',
    email: 'patricia.m@example.com',
    phone: '+1 (555) 890-1234',
    subject: 'Data visualization showing incorrect totals',
    description:
      "The summary charts on our analytics dashboard seem to be displaying incorrect totals. The numbers don't match the detailed reports when we drill down. This is causing confusion when we're presenting these metrics to our management team.",
    category: 'Data & Reports',
    dateSubmitted: '2023-11-03T15:50:00',
    priority: 'high',
    status: 'in-progress',
    attachments: [
      { name: 'dashboard_screenshot.png', type: 'image' },
      { name: 'expected_values.xlsx', type: 'document' },
    ],
  },
];
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
