"use client"
 
import * as React from "react"
import { addDays, format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns"
import { vi } from "date-fns/locale"
import { DateRange } from "react-day-picker"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"

type DateRangeType = 'day' | 'week' | 'month' | 'custom'

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
	onDateChange?: (date: DateRange | undefined, type: DateRangeType) => void
	defaultType?: DateRangeType
}
 
export function DatePickerWithRange({
	className,
	onDateChange,
	defaultType = 'custom',
	...props
}: DatePickerWithRangeProps) {
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: new Date(),
		to: addDays(new Date(), 20),
	})
	const [rangeType, setRangeType] = React.useState<DateRangeType>(defaultType)
	const [selectedMonth, setSelectedMonth] = React.useState<number>(new Date().getMonth())
	const [selectedYear, setSelectedYear] = React.useState<number>(new Date().getFullYear())
	
	const currentYear = new Date().getFullYear()
	const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i)
	const months = [
		'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
		'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
	]

	/**
	 * Handles date selection based on the current range type
	 */
	const handleDateSelect = React.useCallback((selectedDate: DateRange | undefined) => {
		if (!selectedDate) return

		let newDateRange: DateRange | undefined

		switch (rangeType) {
			case 'day':
				newDateRange = {
					from: selectedDate.from,
					to: selectedDate.from,
				}
				break
			case 'week':
				if (selectedDate.from) {
					newDateRange = {
						from: startOfWeek(selectedDate.from, { weekStartsOn: 1 }),
						to: endOfWeek(selectedDate.from, { weekStartsOn: 1 }),
					}
				}
				break
			case 'month':
				if (selectedDate.from) {
					newDateRange = {
						from: startOfMonth(selectedDate.from),
						to: endOfMonth(selectedDate.from),
					}
				}
				break
			case 'custom':
			default:
				newDateRange = selectedDate
				break
		}

		setDate(newDateRange)
		onDateChange?.(newDateRange, rangeType)
	}, [rangeType, onDateChange])

	/**
	 * Handles month selection for month range type
	 */
	const handleMonthSelect = React.useCallback((monthIndex: number) => {
		setSelectedMonth(monthIndex)
		const monthStart = startOfMonth(new Date(selectedYear, monthIndex))
		const monthEnd = endOfMonth(new Date(selectedYear, monthIndex))
		
		const newDateRange = {
			from: monthStart,
			to: monthEnd,
		}
		
		setDate(newDateRange)
		onDateChange?.(newDateRange, 'month')
	}, [selectedYear, onDateChange])

	/**
	 * Handles year selection for month range type
	 */
	const handleYearSelect = React.useCallback((year: number) => {
		setSelectedYear(year)
		const monthStart = startOfMonth(new Date(year, selectedMonth))
		const monthEnd = endOfMonth(new Date(year, selectedMonth))
		
		const newDateRange = {
			from: monthStart,
			to: monthEnd,
		}
		
		setDate(newDateRange)
		onDateChange?.(newDateRange, 'month')
	}, [selectedMonth, onDateChange])

	/**
	 * Handles range type change
	 */
	const handleRangeTypeChange = React.useCallback((newType: DateRangeType) => {
		setRangeType(newType)
		
		// Auto-adjust date based on new type
		const today = new Date()
		let newDateRange: DateRange | undefined

		switch (newType) {
			case 'day':
				newDateRange = { from: today, to: today }
				break
			case 'week':
				newDateRange = {
					from: startOfWeek(today, { weekStartsOn: 1 }),
					to: endOfWeek(today, { weekStartsOn: 1 }),
				}
				break
			case 'month':
				newDateRange = {
					from: startOfMonth(today),
					to: endOfMonth(today),
				}
				break
			case 'custom':
			default:
				newDateRange = {
					from: today,
					to: addDays(today, 7),
				}
				break
		}

		setDate(newDateRange)
		onDateChange?.(newDateRange, newType)
	}, [onDateChange])

	/**
	 * Formats the display text for the selected date range
	 */
	const getDisplayText = React.useCallback(() => {
		if (!date?.from) return 'Chọn ngày'

		switch (rangeType) {
			case 'day':
				return format(date.from, "dd/MM/yyyy", { locale: vi })
			case 'week':
				if (date.to) {
					return `Tuần: ${format(date.from, "dd/MM")} - ${format(date.to, "dd/MM/yyyy")}`
				}
				return format(date.from, "dd/MM/yyyy")
			case 'month':
				return format(date.from, "MMMM yyyy", { locale: vi })
			case 'custom':
			default:
				if (date.to) {
					return `${format(date.from, "dd/MM/yyyy")} - ${format(date.to, "dd/MM/yyyy")}`
				}
				return format(date.from, "dd/MM/yyyy")
		}
	}, [date, rangeType])

	/**
	 * Renders the appropriate calendar based on range type
	 */
	const renderCalendarContent = React.useCallback(() => {
		switch (rangeType) {
			case 'day':
				return (
					<Calendar
						initialFocus
						mode="single"
						selected={date?.from}
						onSelect={(selectedDate) => {
							if (selectedDate) {
								handleDateSelect({ from: selectedDate, to: selectedDate })
							}
						}}
						defaultMonth={date?.from}
					/>
				)
			case 'week':
				return (
					<Calendar
						initialFocus
						mode="single"
						selected={date?.from}
						onSelect={(selectedDate) => {
							if (selectedDate) {
								handleDateSelect({ from: selectedDate, to: selectedDate })
							}
						}}
						defaultMonth={date?.from}
						modifiers={{
							selected: (day) => {
								if (!date?.from || !date?.to) return false
								return day >= date.from && day <= date.to
							}
						}}
						modifiersStyles={{
							selected: { backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }
						}}
					/>
				)
			case 'month':
				return (
					<div className="p-4 space-y-4">
						<div className="flex gap-2">
							<Select value={selectedYear.toString()} onValueChange={(value) => handleYearSelect(parseInt(value))}>
								<SelectTrigger className="w-full">
									<SelectValue />
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
				)
			case 'custom':
			default:
				return (
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={handleDateSelect}
						numberOfMonths={2}
					/>
				)
		}
	}, [rangeType, date, selectedMonth, selectedYear, years, months, handleDateSelect, handleMonthSelect, handleYearSelect])

	return (
		<div className={cn("grid gap-2", className)} {...props}>
			<div className="flex gap-2">
				<Select value={rangeType} onValueChange={handleRangeTypeChange}>
					<SelectTrigger className="w-32">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="day">Ngày</SelectItem>
						<SelectItem value="week">Tuần</SelectItem>
						<SelectItem value="month">Tháng</SelectItem>
						<SelectItem value="custom">Tùy chỉnh</SelectItem>
					</SelectContent>
				</Select>
				
				<Popover>
					<PopoverTrigger asChild>
						<Button
							id="date"
							variant="outline"
							className={cn(
								"flex-1 justify-start text-left font-normal",
								!date && "text-muted-foreground"
							)}
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{getDisplayText()}
						</Button>
					</PopoverTrigger>
					<PopoverContent 
						className={cn(
							"w-auto p-0",
							rangeType === 'custom' && "w-auto"
						)} 
						align="start"
					>
						{renderCalendarContent()}
					</PopoverContent>
				</Popover>
			</div>
		</div>
	)
}