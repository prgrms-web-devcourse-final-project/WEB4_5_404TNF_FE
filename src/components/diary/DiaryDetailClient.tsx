'use client';

import diary from '@/assets/images/diary.svg';
import Image from 'next/image';
import { useState } from 'react';
import MobileTitle from '../common/MobileTitle';
import SelectBox from '../common/SelectBox';
import Calendar from './Calendar';
import DiaryCard from './DiaryCard';
import DiaryProfile from './DiaryProfile';

export default function DiaryDetailClient({ logId }: { logId: string }) {
  const [selected, setSelected] = useState<Date | undefined>();
  console.log(selected, logId);

  const options = [
    { value: '이마음', label: '이마음' },
    { value: '이구름', label: '이구름' },
    { value: '이솜', label: '이솜' },
  ];

  return (
    <main className="flex-colpt-6 flex pt-6 pb-5 text-sm sm:m-0 sm:block sm:w-full sm:pt-9 sm:pb-0">
      <MobileTitle title="멍멍일지" closePage={() => {}} />
      <div className="relative flex h-full w-full flex-col gap-6 px-4 sm:px-19">
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
            <DiaryCard className="w-full sm:h-[205px]" title="오늘의 건강기록">
              <div className="mb-2 text-sm sm:mb-6 sm:text-base">
                <span className="inline-block w-[110px] text-[var(--color-primary-500)]">
                  몸무게
                </span>
                <span>36.4 kg</span>
              </div>
              <div className="text-sm sm:text-base">
                <span className="inline-block w-[110px] text-[var(--color-primary-500)]">
                  수면시간
                </span>
                <span>17시간</span>
              </div>
            </DiaryCard>
          </div>
          <div className="flex grow flex-col gap-6 sm:gap-12">
            <div className="flex w-full flex-col justify-between gap-6 sm:flex-row sm:gap-14">
              <DiaryCard className="min-h-50 grow sm:h-71" title="식사량">
                <ul className="-mt-3 px-2">
                  <li className="flex border-b border-[var(--color-primary-300)] py-[9px]">
                    <span className="basis-27">8시 00분</span>
                    <span>1.5컵</span>
                  </li>
                  <li className="flex border-b border-[var(--color-primary-300)] py-[9px]">
                    <span className="basis-27">19시 30분</span>
                    <span>1.5컵</span>
                  </li>
                </ul>
              </DiaryCard>
              <DiaryCard className="min-h-50 grow sm:h-71" title="산책">
                <ul className="-mt-3 px-2">
                  <li className="border-b border-[var(--color-primary-300)] py-[9px]">
                    <span>8시 00분 ~ 8시 20분</span>
                  </li>
                  <li className="border-b border-[var(--color-primary-300)] py-[9px]">
                    <span>17시 00분 ~ 18시 30분</span>
                  </li>
                  <li className="border-b border-[var(--color-primary-300)] py-[9px]">
                    <span>23시 00분 ~ 23시 30분</span>
                  </li>
                </ul>
              </DiaryCard>
            </div>
            <DiaryCard className="mb-7 h-full max-w-[912px]" title="관찰노트">
              <p>
                날씨가 더워서 산책할 때 엄청 힘들어 함, 계속 귀를 긁음 ( 귀 세정
                당분간 매일 하기 ), 간식 좀 많이 먹어서 그런가 저녁밥 남김
              </p>
            </DiaryCard>
          </div>
        </div>
      </div>
    </main>
  );
}
