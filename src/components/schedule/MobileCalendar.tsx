'use client';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import CalendarNav from '../diary/CalendarNav';

export default function MobileCalendar() {
  const [selected, setSelected] = useState<Date | undefined>();
  return (
    <div className="aspect-square w-full rounded-xl bg-[var(--color-background)] px-2 shadow-[0_3px_8px_rgba(0,0,0,0.24)] sm:hidden">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        locale={ko}
        showOutsideDays
        modifiers={{
          hasSchedule: [
            new Date(2025, 6, 1),
            new Date(2025, 6, 4),
            new Date(2025, 6, 5),
            new Date(2025, 6, 8),
            new Date(2025, 6, 10),
            new Date(2025, 6, 13),
            new Date(2025, 6, 14),
            new Date(2025, 6, 17),
          ],
        }}
        modifiersClassNames={{
          hasSchedule: 'sm:hidden has-schedule relative',
        }}
        classNames={{
          month_caption:
            'font-medium mb-2 bg-[var(--color-primary-500)] -mx-2 rounded-t-xl py-2',
          months: 'w-full relative',
          month_grid: 'w-full',
          weekday: 'h-6 font-medium',
          root: 'h-full text-xs text-center',
          day: 'w-1/7 sm:h-6 h-[45px] ',
          day_button: 'w-full h-full cursor-pointer calendar-day',
          outside: 'text-[var(--color-grey)]',
          selected: 'calendar-circle',
        }}
        components={{
          Nav: CalendarNav,
        }}
      />
    </div>
  );
}
