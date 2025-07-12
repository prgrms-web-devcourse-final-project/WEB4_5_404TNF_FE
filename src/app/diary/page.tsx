'use client';
import Icon from '@/components/common/Icon';
import SelectBox from '@/components/common/SelectBox';
import LogCard from '@/components/diary/LogCard';
import Link from 'next/link';

export default function Diary() {
  const options = [
    { value: 'all', label: '모든 강아지' },
    { value: '이마음', label: '이마음' },
    { value: '이구름', label: '이구름' },
    { value: '이솜', label: '이솜' },
  ];

  return (
    <main className="flex h-full flex-col items-center p-6 sm:block sm:p-0 sm:px-12 sm:py-7">
      <div className="mb-3 flex w-full justify-between">
        <div className="flex w-full justify-between gap-6 sm:justify-start sm:pl-3">
          <div className="flex w-[137px] items-center justify-between rounded-xl border-1 border-[var(--color-primary-500)] px-4 sm:w-[160px]">
            2025. 7. 3
            <Icon width="20px" height="20px" left="-188px" top="-123px" />
          </div>
          <SelectBox
            options={options}
            width="178px"
            borderColor="var(--color-primary-500)"
            footstep
            hasBorder
          />
        </div>
        <Link
          className="hidden items-center gap-2 sm:flex"
          href={'/diary/create'}
        >
          <Icon width="20px" height="20px" left="-266px" top="-75px" />
          <span className="inline-block w-20 font-medium">기록하기</span>
        </Link>
      </div>
      <ul className="scrollbar-hidden flex flex-col gap-5 pt-2 pb-4 sm:h-[700px] sm:flex-row sm:flex-wrap sm:gap-[53px] sm:overflow-y-scroll sm:px-3 sm:pt-10">
        {Array(9)
          .fill(0)
          .map((item, i) => (
            <li key={i} className="basis-[calc(33%-31px)]">
              <LogCard />
            </li>
          ))}
      </ul>
      <div className="fixed right-4 bottom-4 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[var(--color-primary-300)] sm:hidden">
        <Icon width="20px" height="20px" left="-266px" top="-75px" />
      </div>
    </main>
  );
}
