import Image from 'next/image';
import Card from '../common/Card';
import defaultProfile from '@/assets/images/default-dog-profile.svg';

type Props = {
  petName: string;
  recordAt: string;
  weight: number | null;
  walkingTime: number;
  content: string;
  imageUrl?: string | null;
};

export default function LogCard({
  petName,
  recordAt,
  weight,
  walkingTime,
  content,
  imageUrl,
}: Props) {
  const profileImg = imageUrl || defaultProfile;
  return (
    <Card className="card__hover flex flex-col gap-3 border-1 border-[var(--color-primary-500)]">
      <div className="mb-2 flex items-center justify-between border-b border-[var(--color-primary-500)] pb-3">
        <div className="flex items-center gap-4">
          <Image
            src={profileImg}
            alt="프로필 이미지"
            width={32}
            height={32}
            style={{
              width: '32px',
              height: '32px',
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
          <span className="text-sm sm:text-base">{petName}</span>
        </div>
        <span className="text-xs sm:text-sm">
          {recordAt.replace(/-/g, '. ')}
        </span>
      </div>
      <div>
        <span className="inline-block w-[78px] text-sm text-[var(--color-primary-500)] sm:text-base">
          몸무게
        </span>
        <span className="text-sm sm:text-base">
          {weight !== null ? `${weight} kg` : '-'}
        </span>
      </div>
      <div>
        <span className="inline-block w-[78px] text-sm text-[var(--color-primary-500)] sm:text-base">
          산책시간
        </span>
        <span className="text-sm sm:text-base">
          {(() => {
            if (typeof walkingTime !== 'number' || walkingTime === 0)
              return '-';

            const adjustedTime =
              walkingTime < 0 ? walkingTime + 1440 : walkingTime;
            const hours = Math.floor(adjustedTime / 60);
            const minutes = adjustedTime % 60;
            return `${hours}시간 ${minutes}분`;
          })()}
        </span>
      </div>
      <div>
        <span className="text-sm text-[var(--color-primary-500)] sm:text-base">
          관찰노트
        </span>
        <p className="mt-2 line-clamp-2 h-12 overflow-hidden text-sm leading-[1.5rem] text-ellipsis sm:text-base">
          {content !== '' ? content : '-'}
        </p>
      </div>
    </Card>
  );
}
