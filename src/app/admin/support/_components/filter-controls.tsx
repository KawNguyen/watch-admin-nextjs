'use client';

import { FilterIcon, SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';

export const FilterControls = ({ filters, setFilters }) => {
  return (
    <Card className="mb-6 space-y-4 p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-64">
            <SearchIcon className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search by customer or subject"
              value={filters.searchQuery}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  searchQuery: e.target.value,
                })
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <FilterIcon className="h-4 w-4 text-muted-foreground" />
            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  status: value,
                })
              }
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Label htmlFor="sort-by" className="text-muted-foreground text-sm">
              Sort by:
            </Label>
            <Select
              value={filters.sortBy}
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  sortBy: value,
                })
              }
            >
              <SelectTrigger id="sort-by" className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Label
              htmlFor="sort-direction"
              className="text-muted-foreground text-sm"
            >
              Order:
            </Label>
            <Select
              value={filters.sortDirection}
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  sortDirection: value,
                })
              }
            >
              <SelectTrigger id="sort-direction" className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Newest first</SelectItem>
                <SelectItem value="asc">Oldest first</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
};
