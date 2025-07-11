import Image from 'next/image';
import dashboard from '@/assets/images/landing-dashboard.svg';
import schedule from '@/assets/images/landing-schedule.svg';
import mungnote from '@/assets/images/landing-mungnote.svg';
import board from '@/assets/images/landing-board.svg';
import guide from '@/assets/images/landing-guide.svg';

export default function LandingFeature() {
  return (
    <>
      <section className="h-auto w-full bg-[var(--color-background)] py-28">
        <p className="pb-24 text-center">
          하루하루의 기록이 모이면
          <br />내 강아지를 위한 맞춤 조언이 시작됩니다
          <br />
          지금,{' '}
          <strong className="text-[var(--color-primary-500)]">멍멍일지</strong>
          와 함께 즐거운 반려생활을 시작해보세요!
        </p>

        <div className="mx-auto flex max-w-[1240px] flex-wrap justify-center gap-x-11 gap-y-16">
          <Image
            className="h-auto w-[220px] sm:w-[380px]"
            src={dashboard}
            alt="대시보드"
            priority
          ></Image>
          <Image
            className="h-auto w-[220px] sm:w-[380px]"
            src={schedule}
            alt="일정"
            priority
          ></Image>
          <Image
            className="h-auto w-[220px] sm:w-[380px]"
            src={mungnote}
            alt="멍멍일지"
            priority
          ></Image>
          <Image
            className="h-auto w-[220px] sm:w-[380px]"
            src={board}
            alt="게시판"
            priority
          ></Image>
          <Image
            className="h-auto w-[220px] sm:w-[380px]"
            src={guide}
            alt="멍초보가이드"
            priority
          ></Image>
        </div>
      </section>
    </>
  );
}
