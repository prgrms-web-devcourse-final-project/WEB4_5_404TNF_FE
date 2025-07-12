'use client';
import { getDaysInMonth } from 'date-fns';

export default function DateItem({
  date,
  targetMonth,
  schedules,
}: {
  date: number;
  targetMonth: Date;
  schedules: {
    scheduleId: number;
    date: string;
    name: string;
    isDone: boolean;
  }[];
}) {
  // const [portalElement, setPortalElement] = useState<Element | null>(null);

  // useEffect(() => {
  //   setPortalElement(document.querySelector('#schedule-container'));
  // }, []);
  const endOfMonth = getDaysInMonth(targetMonth);
  return (
    <div
      key={date}
      className="h-24 basis-1/7 border-b border-[var(--color-primary-200)] p-3"
    >
      {date > 0 && date <= endOfMonth && (
        <>
          <div className="flex justify-between">
            <span>{date}</span>
            {schedules.length > 2 && (
              <span className="text-sm text-[var(--color-grey)]">+ more</span>
            )}
          </div>
          <ul className="">
            {schedules &&
              schedules.slice(0, 2).map((schedule) => (
                <li
                  key={schedule.scheduleId}
                  className="w-30 overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {schedule.name}
                </li>
              ))}
          </ul>
        </>
      )}
      {/* {portalElement && createPortal(<TodoList type="modal" />, portalElement)} */}
    </div>
  );
}
