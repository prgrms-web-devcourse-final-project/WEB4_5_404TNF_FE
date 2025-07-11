import Image from 'next/image';
import Icon from '../common/Icon';

export default function LandingFooter() {
  return (
    <>
      <footer className="h-auto w-full flex-col bg-[#FFE1C0] px-[70px] py-4">
        <div className="flex flex-col border-b border-b-[var(--color-input-border)] px-6 py-4">
          <div className="flex">
            <div className="inline-flex flex-col">
              <Image
                className="mt-3"
                src="/images/mobile-logo.svg"
                alt="멍멍일지 로고"
                width={183}
                height={31}
                priority
              />
              <p>즐거운 반려견 케어의 시작</p>
            </div>
            <div className="ml-10 border-l border-l-[var(--color-input-border)] pl-10">
              <h3 className="pb-1 font-bold">404 Team Not Found</h3>
              <div className="flex pb-[2px] text-sm">
                <p className="mr-4 w-20">Frontend</p>
                <p>박정수 권유정 김태연 이민지</p>
              </div>
              <div className="flex text-sm">
                <p className="mr-4 w-20">Backend</p>
                <p>강대겸 김예원 박종욱 박현도 안세희</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-1">
            <Icon width="20px" height="20px" left="-343px" top="-164px" />
            <p>GitHub 바로가기</p>
          </div>
        </div>
        <p className="mt-4 text-center text-xs">
          ⓒ 2025 ~ Team. All rights reserved.{' '}
        </p>
      </footer>
    </>
  );
}
