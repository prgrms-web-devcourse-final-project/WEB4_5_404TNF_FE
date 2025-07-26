import { feedUnit } from '@/assets/data/pet';
import { useRouter } from 'next/navigation';
import Card from '../common/Card';
import DonutGraph from './graph/DonutGraph';

export default function FeedCard({ feeding }: { feeding?: DashboardFeeding }) {
  const router = useRouter();
  if (!feeding?.amount && !feeding?.date) {
    return (
      <Card className="flex h-[301px] w-full max-w-[255px] flex-col items-center justify-center gap-6 bg-[#fafafa] text-sm font-medium sm:text-base">
        <span>등록된 식사량 기록이 없어요</span>
        <button
          className="cursor-pointer rounded-full bg-[var(--color-primary-200)] px-4 py-2 transition-all hover:bg-[var(--color-primary-300)]"
          onClick={() => router.push('/diary/write')}
        >
          지금 기록하기
        </button>
      </Card>
    );
  }

  const unitLabel = feedUnit
    .filter((unit) => unit.value === feeding.unit)
    .map((unit) => unit.label);

  return (
    <Card className="flex w-full max-w-[255px] flex-col text-sm font-medium sm:text-base">
      <div className="mb-5 flex flex-col gap-2">
        <span className="text-xs sm:text-base">지난주 평균 식사량 (일)</span>
        <span>
          {Math.floor(feeding.average)} {unitLabel}
        </span>
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <span className="text-xs sm:text-base">오늘의 식사기록</span>
        <div className="h-6">
          {Math.floor(feeding.amount) ?? 0} {unitLabel}
        </div>
      </div>
      <DonutGraph feeding={feeding} />
    </Card>
  );
}
