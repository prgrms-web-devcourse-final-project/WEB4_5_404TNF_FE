'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import pc from '@/assets/images/landing-pc.svg';
import phone from '@/assets/images/landing-phone.svg';
import Icon from '../common/Icon';

export default function LandingMockup() {
  return (
    <section className="h-auto bg-[var(--color-background)] px-20 py-20">
      <motion.div
        className="flex flex-col items-end gap-9 pb-40"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-3xl">
          웹과 모바일 모두에 최적화된{' '}
          <strong className="text-[var(--color-primary-500)]">멍멍일지</strong>
        </h2>
        <p className="text-end text-2xl">
          넓은 화면에서도, 손안에서도
          <br />내 강아지의 하루를 기록할 수 있어요
        </p>
      </motion.div>

      <div className="mx-[100px] flex items-end gap-14 pb-64">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.3, ease: [0, 0.71, 0.2, 1.01] }}
        >
          <Image className="h-auto w-[700px]" src={pc} alt="pc목업" priority />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
        >
          <Image
            className="h-auto w-[180px]"
            src={phone}
            alt="휴대폰목업"
            priority
          />
        </motion.div>
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
  );
}
