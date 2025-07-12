'use client';
import SelectBox from '@/components/common/SelectBox';
import Calendar from '@/components/diary/Calendar';
import FeedInput from '@/components/diary/create/FeedInput';
import Note from '@/components/diary/create/Note';
import SingleInput from '@/components/diary/create/SingleInput';
import WalkingInput from '@/components/diary/create/WalkingInput';

import diary from '@/assets/images/diary.svg';
import MobileTitle from '@/components/common/MobileTitle';
import DiaryCard from '@/components/diary/DiaryCard';
import DiaryProfile from '@/components/diary/DiaryProfile';
import Image from 'next/image';
import { useState } from 'react';

export default function DiaryCreate() {
  const [selected, setSelected] = useState<Date | undefined>();
  console.log(selected);

  const options = [
    { value: '이마음', label: '이마음' },
    { value: '이구름', label: '이구름' },
    { value: '이솜', label: '이솜' },
  ];

  return (
    <main className="flex h-full flex-col pt-6 pb-5 text-sm sm:m-0 sm:block sm:pt-9 sm:pb-0">
      <MobileTitle title="멍멍일지" closePage={() => {}} onClick={() => {}} />
      <div className="relative flex w-full flex-col gap-6 px-4 sm:px-19">
        <div className="flex w-full justify-between gap-6 sm:hidden sm:justify-start sm:pl-3">
          <div className="flex grow-2 items-center justify-center rounded-xl border-1 border-[var(--color-primary-500)] px-4 py-[11px] leading-[1.2] sm:w-[160px]">
            2025. 7. 3
          </div>
          <div className="flex grow-5 items-center justify-center rounded-xl border-1 border-[var(--color-primary-500)] px-4 py-[11px] leading-[1.2] sm:w-[160px]">
            이마음
          </div>
        </div>
        <div className="absolute -top-2 right-[65px] hidden self-end text-base sm:block">
          <SelectBox options={options} width="105px" footstep />
        </div>
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-14 sm:pt-15">
          <div className="flex w-full flex-col items-center gap-6 sm:w-105 sm:gap-7">
            <div className="hidden w-full justify-between sm:flex">
              <Image src={diary} alt="오늘의 멍멍일지를 적어보아요!" />
              <Calendar selected={selected} setSelected={setSelected} />
            </div>
            <DiaryProfile />
            <DiaryCard
              className="w-full sm:h-[205px]"
              title="오늘의 건강기록"
              hasAddBtn
            >
              <SingleInput title="몸무게" id="weight" />
              <SingleInput title="수면시간" id="sleep" />
            </DiaryCard>
          </div>
          <div className="flex grow flex-col gap-6 sm:gap-12">
            <div className="flex w-full flex-col justify-between gap-6 sm:flex-row sm:gap-14">
              <FeedInput />
              <WalkingInput />
            </div>
            <Note />
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col sm:hidden">
        <span className="cursor-pointer self-end pr-4 text-xs text-[var(--color-grey)] sm:hidden">
          댕댕일지 삭제하기
        </span>
        <div className="h-15" />
      </div>
    </main>
  );
}
