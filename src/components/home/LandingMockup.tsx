import Image from 'next/image';
import pc from '@/assets/images/landing-pc.svg';
import phone from '@/assets/images/landing-phone.svg';
import Icon from '../common/Icon';

export default function LandingMockup() {
  return (
    <>
      <section className="h-auto bg-[var(--color-background)] px-20 py-10">
        <div className="flex flex-col items-end gap-9 pb-[100px]">
          <h2 className="text-3xl">
            웹과 모바일 모두에 최적화된{' '}
            <strong className="text-[var(--color-primary-500)]">
              멍멍일지
            </strong>
          </h2>
          <p className="text-end text-2xl">
            넓은 화면에서도, 손안에서도
            <br />내 강아지의 하루를 기록할 수 있어요
          </p>
        </div>
        <div className="mx-[100px] flex items-end gap-14 pb-[160px]">
          <Image
            className="h-auto w-[700px]"
            src={pc}
            alt="pc목업"
            priority
          ></Image>
          <Image
            className="h-auto w-[180px]"
            src={phone}
            alt="휴대폰목업"
            priority
          ></Image>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon width="30px" height="26px" left="-373px" top="-115px" />
          <p className="text-center text-xl">
            <span className="font-bold text-[var(--color-primary-500)]">
              멍멍일지
            </span>
            와 함께하는 <br />
            즐거운{' '}
            <span className="font-bold text-[var(--color-primary-500)]">
              반려생활
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
