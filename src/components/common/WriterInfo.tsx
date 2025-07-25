'use client';

import { useState, useRef } from 'react';
import PopupMenu from './PopupMenu';
import { usePathname } from 'next/navigation';
import ReportModal from '../post/ReportModal';

interface WriterInfoProps {
  name: string;
  postedAt: string;
  size?: 'small' | 'big';
}

export default function WriterInfo({
  name,
  postedAt,
  size = 'small',
}: WriterInfoProps) {
  const isBig = size === 'big';
  const avatarSize = isBig
    ? 'sm:w-[52px] sm:h-[52px]'
    : 'sm:w-[42px] sm:h-[42px]';
  const textSize = isBig ? 'sm:text-[16px]' : 'sm:text-[14px]';
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (label: string) => {
    if (label === '신고하기') {
      console.log('qwe');
      setIsReportModalOpen(true);
    }
    setIsMenuOpen(false);
  };

  const isPostPage =
    pathname?.startsWith('/post/') &&
    (pathname.endsWith('/question') || pathname.endsWith('/free'));

  return (
    <div className="relative" ref={containerRef}>
      <div
        className="flex w-fit cursor-pointer items-center gap-4"
        onClick={() => {
          if (isPostPage) setIsMenuOpen((prev) => !prev);
        }}
      >
        <div className={`h-9 w-9 rounded-full bg-gray-500 ${avatarSize}`}></div>
        <div className={`font-medium sm:space-y-1`}>
          <p className={`text-[12px] ${textSize}`}>{name}</p>
          <p className={`text-[10px] text-[#909090] ${textSize}`}>{postedAt}</p>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 z-50 mt-2">
          <PopupMenu
            options={[
              { id: '1', label: '프로필 이동', type: 'link' },
              { id: '3', label: '신고하기', type: 'post', report: 'profile' },
            ]}
            onSelect={handleSelect}
            onClose={() => setIsMenuOpen(false)}
            isProfile={true}
          />
        </div>
      )}

      {isReportModalOpen && (
        <div
          className="fixed inset-0 z-[250] flex items-center justify-center bg-[#2B2926]/50"
          onClick={() => setIsReportModalOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ReportModal onClose={() => setIsReportModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
