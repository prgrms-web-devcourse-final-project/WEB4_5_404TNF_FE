'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import dashboard from '@/assets/images/landing-dashboard.svg';
import schedule from '@/assets/images/landing-schedule.svg';
import mungnote from '@/assets/images/landing-mungnote.svg';
import board from '@/assets/images/landing-board.svg';
import guide from '@/assets/images/landing-guide.svg';

const imageData = [
  { src: dashboard, alt: '대시보드' },
  { src: schedule, alt: '일정' },
  { src: mungnote, alt: '멍멍일지' },
  { src: board, alt: '게시판' },
  { src: guide, alt: '멍초보가이드' },
];

// image animation
const FeatureImage = ({
  src,
  alt,
  delay,
}: {
  src: string;
  alt: string;
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3, once: false });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 15,
          delay,
        },
      });
    } else {
      controls.start({
        opacity: 0,
        y: 40,
        transition: { duration: 0.3 },
      });
    }
  }, [isInView, controls, delay]);

  return (
    <motion.div
      className="h-auto w-[220px] sm:w-[380px]"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
    >
      <Image className="h-auto w-full" src={src} alt={alt} priority />
    </motion.div>
  );
};

// text animation
const AnimatedText = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
      });
    } else {
      controls.start({
        opacity: 0,
        y: 40,
        transition: { duration: 0.3 },
      });
    }
  }, [isInView, controls]);

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
      className="pb-24 text-center text-lg"
    >
      하루하루의 기록이 모이면
      <br />내 강아지를 위한 맞춤 조언이 시작됩니다
      <br />
      지금,{' '}
      <strong className="text-[var(--color-primary-500)]">멍멍일지</strong>와
      함께 즐거운 반려생활을 시작해보세요!
    </motion.p>
  );
};

export default function LandingFeature() {
  return (
    <section className="h-auto w-full bg-[var(--color-background)] py-28">
      <AnimatedText />

      <div className="mx-auto flex max-w-[1240px] flex-wrap justify-center gap-x-11 gap-y-16">
        {imageData.map((img, i) => (
          <FeatureImage
            key={img.alt}
            src={img.src}
            alt={img.alt}
            delay={i * 0.1}
          />
        ))}
      </div>
    </section>
  );
}
