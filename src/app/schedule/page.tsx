import AddScheduleButton from '@/components/schedule/AddScheduleButton';
import CustomCalendar from '@/components/schedule/CustomCalendar';
import MobileCalendar from '@/components/schedule/MobileCalendar';
import TodoList from '@/components/schedule/TodoList';

export default function Schedule() {
  return (
    <main
      className="relative h-full w-screen bg-[var(--color-background)] px-6 py-8 sm:w-full sm:px-45 sm:pt-9 sm:pb-12"
      id="schedule-container"
    >
      <CustomCalendar />
      <MobileCalendar />
      <TodoList type="card" />
      <AddScheduleButton />
    </main>
  );
}
