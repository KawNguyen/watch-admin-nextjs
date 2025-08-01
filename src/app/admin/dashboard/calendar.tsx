"use client";

import { CalendarIcon } from "lucide-react";
import {
  addDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subDays,
} from "date-fns";
import { vi } from "date-fns/locale";
import { DateRange, rangeIncludesDate } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useState, useCallback } from "react";

type DateRangeType = "day" | "week" | "month" | "custom";

interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onDateChange?: (date: DateRange | undefined, type: DateRangeType) => void;
  defaultType?: DateRangeType;
}

export function DatePickerWithRange({
  className,
  onDateChange,
  defaultType = "custom",
  ...props
}: DatePickerWithRangeProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: subDays(new Date(), 1),
  });
  const [rangeType, setRangeType] = useState<DateRangeType>(defaultType);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
  const months = useMemo(
    () => [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    []
  );

  /**
   * Handles preset date selection (7 days, 28 days)
   */
  const handlePresetSelect = useCallback(
    (days: number) => {
      const today = new Date();
      const newDateRange = {
        from: subDays(today, days - 1),
        to: today,
      };

      setDate(newDateRange);
      setRangeType("custom");
      onDateChange?.(newDateRange, "custom");
    },
    [onDateChange]
  );

  /**
   * Handles date selection based on the current range type
   */
  const handleDateSelect = useCallback(
    (selectedDate: DateRange | undefined) => {
      if (!selectedDate) return;

      let newDateRange: DateRange | undefined;

      switch (rangeType) {
        case "day":
          newDateRange = {
            from: selectedDate.from,
            to: selectedDate.from,
          };
          break;
        case "week":
          if (selectedDate.from) {
            newDateRange = {
              from: startOfWeek(selectedDate.from, { weekStartsOn: 1 }),
              to: endOfWeek(selectedDate.from, { weekStartsOn: 1 }),
            };
          }
          break;
        case "month":
          if (selectedDate.from) {
            newDateRange = {
              from: startOfMonth(selectedDate.from),
              to: endOfMonth(selectedDate.from),
            };
          }
          break;
        case "custom":
        default:
          newDateRange = selectedDate;
          break;
      }

      setDate(newDateRange);
      onDateChange?.(newDateRange, rangeType);
    },
    [rangeType, onDateChange]
  );

  /**
   * Handles month selection for month range type
   */
  const handleMonthSelect = useCallback(
    (monthIndex: number) => {
      setSelectedMonth(monthIndex);
      const monthStart = startOfMonth(new Date(selectedYear, monthIndex));
      const monthEnd = endOfMonth(new Date(selectedYear, monthIndex));

      const newDateRange = {
        from: monthStart,
        to: monthEnd,
      };

      setDate(newDateRange);
      onDateChange?.(newDateRange, "month");
    },
    [selectedYear, onDateChange]
  );

  /**
   * Handles year selection for month range type
   */
  const handleYearSelect = useCallback(
    (year: number) => {
      setSelectedYear(year);
      const monthStart = startOfMonth(new Date(year, selectedMonth));
      const monthEnd = endOfMonth(new Date(year, selectedMonth));

      const newDateRange = {
        from: monthStart,
        to: monthEnd,
      };

      setDate(newDateRange);
      onDateChange?.(newDateRange, "month");
    },
    [selectedMonth, onDateChange]
  );

  /**
   * Handles range type change
   */
  const handleRangeTypeChange = useCallback(
    (newType: DateRangeType) => {
      setRangeType(newType);

      // Auto-adjust date based on new type
      const today = new Date();
      let newDateRange: DateRange | undefined;

      switch (newType) {
        case "day":
          newDateRange = { from: today, to: today };
          break;
        case "week":
          newDateRange = {
            from: startOfWeek(today, { weekStartsOn: 1 }),
            to: endOfWeek(today, { weekStartsOn: 1 }),
          };
          break;
        case "month":
          newDateRange = {
            from: startOfMonth(today),
            to: endOfMonth(today),
          };
          break;
        case "custom":
        default:
          newDateRange = {
            from: today,
            to: addDays(today, 7),
          };
          break;
      }

      setDate(newDateRange);
      onDateChange?.(newDateRange, newType);
    },
    [onDateChange]
  );

  /**
   * Formats date to Vietnamese format: Th01 01, 2025
   */
  const formatDateToVietnamese = useCallback((date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `Th${month} ${day}, ${year}`;
  }, []);

  /**
   * Formats the display text for the selected date range
   */
  const getDisplayText = useCallback(() => {
    if (!date?.from) return "Chọn ngày";

    switch (rangeType) {
      case "day":
        return `${formatDateToVietnamese(date.from)} - ${formatDateToVietnamese(
          date.from
        )}`;

      case "week":
        if (date.to) {
          return `${formatDateToVietnamese(
            date.from
          )} - ${formatDateToVietnamese(date.to)}`;
        }
        return formatDateToVietnamese(date.from);
      case "month":
        if (date.to) {
          return `${formatDateToVietnamese(
            date.from
          )} - ${formatDateToVietnamese(date.to)}`;
        }
        return formatDateToVietnamese(date.from);
      case "custom":
      default:
        if (date.to) {
          return `${formatDateToVietnamese(
            date.from
          )} - ${formatDateToVietnamese(date.to)}`;
        }
        return formatDateToVietnamese(date.from);
    }
  }, [date, rangeType, formatDateToVietnamese]);

  /**
   * Renders the appropriate calendar based on range type
   */
  const renderCalendarContent = useCallback(() => {
    switch (rangeType) {
      case "day":
        return (
          <Calendar
            autoFocus
            mode="single"
            selected={date?.from}
            onSelect={(selectedDate) => {
              if (selectedDate) {
                handleDateSelect({
                  from: selectedDate,
                  to: selectedDate,
                });
              }
            }}
            defaultMonth={date?.from}
            weekStartsOn={1}
            locale={vi}
          />
        );
      case "week": {
        return (
          <Calendar
            // showWeekNumber
            weekStartsOn={1}
            modifiers={{
              selected: date,
              range_start: date?.from,
              range_end: date?.to,
              range_middle: (dateM: Date) =>
                date ? rangeIncludesDate(date, dateM) : false,
            }}
            onDayClick={(day, modifiers) => {
              if (modifiers.selected) {
                setDate(undefined); // Clear the selection if the day is already selected
                return;
              }
              setDate({
                from: startOfWeek(day, { weekStartsOn: 1 }),
                to: endOfWeek(day, { weekStartsOn: 1 }),
              });
            }}
          />
        );
      }
      case "month":
        return (
          <div className="space-y-4 p-4">
            <div className="flex gap-2">
              <Select
                value={selectedYear.toString()}
                onValueChange={(e) => handleYearSelect(parseInt(e))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {months.map((month, index) => (
                <Button
                  key={index}
                  variant={selectedMonth === index ? "default" : "outline"}
                  size="sm"
                  className="h-10"
                  onClick={() => handleMonthSelect(index)}
                >
                  {month}
                </Button>
              ))}
            </div>
          </div>
        );
      case "custom":
      default:
        return (
          <Calendar
            autoFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            weekStartsOn={1}
            locale={vi}
          />
        );
    }
  }, [
    rangeType,
    date,
    selectedMonth,
    selectedYear,
    years,
    months,
    handleDateSelect,
    handleMonthSelect,
    handleYearSelect,
  ]);

  return (
    <div className={cn("grid gap-2", className)} {...props}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {getDisplayText()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex">
            {/* Left sidebar with preset options */}
            <div className="bg-muted/10 w-32 space-y-1 border-r p-2">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-primary/10 hover:text-primary h-8 w-full justify-start text-sm font-normal"
                onClick={() => handlePresetSelect(7)}
              >
                7 ngày qua
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-primary/10 hover:text-primary h-8 w-full justify-start text-sm font-normal"
                onClick={() => handlePresetSelect(28)}
              >
                28 ngày qua
              </Button>
            </div>

            {/* Main content area */}
            <div className="flex-1">
              {/* Mode selector tabs */}
              <div className="border-b p-2">
                <div className="bg-muted flex rounded-md p-1">
                  {[
                    { value: "day", label: "Ngày" },
                    { value: "week", label: "Tuần" },
                    { value: "month", label: "Tháng" },
                    { value: "custom", label: "Tùy chỉnh" },
                  ].map((mode) => (
                    <Button
                      key={mode.value}
                      variant={rangeType === mode.value ? "default" : "ghost"}
                      size="sm"
                      className="h-7 flex-1 text-xs"
                      onClick={() =>
                        handleRangeTypeChange(mode.value as DateRangeType)
                      }
                    >
                      {mode.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Calendar content */}
              <div className="p-2">{renderCalendarContent()}</div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
