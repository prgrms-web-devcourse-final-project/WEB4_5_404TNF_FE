'use client';
import Roadmap from '@/components/guide/Roadmap';

export default function Guide() {
  return (
    <main className="relative h-full pt-6 text-center sm:w-full sm:pt-0 md:text-sm lg:text-base xl:text-lg 2xl:text-xl">
      <h2 className="mb-4 rounded-t-[12px] font-bold sm:mb-6 sm:bg-[var(--color-primary-200)] sm:py-5 sm:text-2xl">
        멍초보 가이드
      </h2>
      <p className="mb-4 text-xs sm:text-lg">
        아기 강아지를 어떻게 돌봐야 할지 막막할 땐? <br />
        <strong className="leading-[3] font-bold text-[var(--color-primary-500)] sm:leading-1">
          댕댕일지
        </strong>
        의{' '}
        <strong className="text-[var(--color-primary-500)]">
          멍초보 가이드
        </strong>
        가
        <br className="sm:hidden" /> 성장 주차별 맞춤 정보를 안내해 드려요
      </p>
      <span className="text-[10px] text-[var(--color-grey)] sm:text-base">
        ※ 카드를 클릭 시, 멍냥보감의 케어가이드 블로그로 이동합니다
      </span>
      <Roadmap />
      {/* <GuideList /> */}
    </main>
  );
}
