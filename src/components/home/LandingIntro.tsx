import mainImage from '@/assets/images/landing-main.png';
import Image from 'next/image';

export default function LandingIntro() {
  return (
    <>
      <section className="h-auto w-full bg-[#ffd091] px-20 pt-20">
        <div className="flex flex-col gap-9 pt-14 pb-[158px]">
          <h2 className="text-center text-5xl font-bold">
            매일의 기록이 모여,
            <br />내 강아지를 더 잘 알게 돼요
          </h2>

          <p className="text-center text-2xl">
            <span className="font-bold text-[var(--color-primary-500)]">
              멍멍일지
            </span>
            가 내 강아지에게 딱 맞는 정보를 알려드립니다
          </p>
        </div>
        <Image
          className="h-auto w-full"
          src={mainImage}
          alt="메인"
          priority
        ></Image>
      </section>
    </>
  );
}
