'use client';
import {
  addMonths,
  getDay,
  getMonth,
  getWeeksInMonth,
  getYear,
  isSameDay,
  subMonths,
} from 'date-fns';
import Icon from '../common/Icon';
import DateItem from './DateItem';
import { useState } from 'react';
import { useSchedules } from '@/lib/hooks/useSchedules';

export default function CustomCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentYear = getYear(currentDate);
  const currentMonth = getMonth(currentDate);
  const firstDay = getDay(new Date(currentYear, currentMonth, 1));

  const today = new Date();

  const weeksOfMonth = getWeeksInMonth(currentDate);
  const dateArray = Array.from(
    { length: weeksOfMonth * 7 },
    (_, i) => i - firstDay + 1,
  );

  // month 이동
  const goToNextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };
  const goToPrevMonth = () => {
    setCurrentDate((prev) => subMonths(prev, 1));
  };

  // 월 바뀔 때마다 api 호출
  const { data: schedules } = useSchedules('10002', currentDate);

  return (
    <div className="hidden w-full flex-col items-center sm:flex">
      <div className="mb-8 flex items-center gap-14">
        <Icon
          onClick={goToPrevMonth}
          className="cursor-pointer"
          width="14px"
          height="22px"
          left="-108px"
          top="-122px"
        />
        <span className="text-[24px] leading-[1.2]">{currentMonth + 1}월</span>
        <Icon
          onClick={goToNextMonth}
          className="cursor-pointer"
          width="14px"
          height="22px"
          left="-155px"
          top="-122px"
        />
      </div>
      <div className="flex w-full">
        {['일', '월', '화', '수', '목', '금', '토'].map((week) => (
          <div
            key={week}
            className="basis-1/7 border-b-3 border-[var(--color-primary-300)] pb-4 text-center text-lg"
          >
            {week}
          </div>
        ))}
      </div>
      <div className="flex h-full w-full flex-wrap">
        {dateArray.map((date) => {
          const thisDate = new Date(currentYear, currentMonth, date);
          const isToday = isSameDay(thisDate, today);
          const daySchedules = schedules?.filter((schedule) =>
            isSameDay(new Date(schedule.date), thisDate),
          );

          return (
            // 날짜 별 일정 전달
            <DateItem
              key={date}
              date={date}
              targetMonth={currentDate}
              schedules={daySchedules}
              isToday={isToday}
            />
          );
        })}
      </div>
    </div>
  );
}
