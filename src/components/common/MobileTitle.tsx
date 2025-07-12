'use client';
import Card from './Card';
import Icon from './Icon';

export default function MobileTitle({
  title,
  onClick,
  closePage,
}: {
  title: string;
  onClick?: () => void;
  closePage: () => void;
}) {
  return (
    <>
      <Card className="fixed top-0 right-0 left-0 z-100 h-18 w-screen rounded-none bg-[var(--color-background)] px-4 text-base sm:hidden">
        <div className="relative flex h-full items-center justify-center">
          <Icon
            className="absolute left-0"
            onClick={closePage}
            width="12px"
            height="20px"
            left="-107px"
            top="-164px"
          />
          <h1 className="leading-[1.2]">{title}</h1>
          {onClick && (
            <span
              onClick={onClick}
              className="absolute right-0 leading-[1.2] text-[var(--color-primary-500)]"
            >
              저장
            </span>
          )}
        </div>
      </Card>
    </>
  );
}
