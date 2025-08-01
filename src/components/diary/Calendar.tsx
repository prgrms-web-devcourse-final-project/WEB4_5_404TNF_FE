import { ko } from 'date-fns/locale';
import { Dispatch, SetStateAction } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import CalendarNav from './CalendarNav';
import { twMerge } from 'tailwind-merge';
import { isSameDay } from 'date-fns';

export default function Calendar({
  selected,
  setSelected,
  readOnly = false,
}: {
  selected: Date | undefined;
  setSelected: Dispatch<SetStateAction<Date | undefined>>;
  readOnly?: boolean;
}) {
  return (
    <div className="h-55 w-55 rounded-xl bg-[var(--color-background)] px-2 shadow-[0_3px_8px_rgba(0,0,0,0.24)] dark:bg-[var(--color-black)]">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={readOnly ? undefined : setSelected}
        locale={ko}
        showOutsideDays
        captionLayout={readOnly ? undefined : 'dropdown-years'}
        // diary detail
        disabled={
          readOnly
            ? (date) => !(selected && isSameDay(date, selected))
            : { after: new Date() }
        }
        disableNavigation={readOnly ? true : false}
        classNames={{
          month_caption:
            'font-medium mb-2 bg-[var(--color-primary-500)] -mx-2 rounded-t-xl py-2 dark:text-[var(--color-black)]',
          months: 'w-full relative',
          month_grid: 'w-full',
          weekday: 'h-6 font-medium',
          root: 'h-full text-xs text-center',
          day: 'w-1/7 h-6',
          day_button: twMerge(
            'w-full h-full',
            readOnly ? 'cursor-default' : 'cursor-pointer',
          ),
          outside: 'text-[var(--color-grey)]',
          selected:
            'calendar-circle text-[var(--color-black)] dark:text-[var(--color-background)]',
          disabled: 'text-[var(--color-grey)] pointer-events-none',
        }}
        components={{
          Nav: CalendarNav,
        }}
      />
    </div>
  );
}
