import Image from 'next/image';
import Card from '../common/Card';
import defaultProfile from '@/assets/images/default-dog-profile.svg';

type Props = {
  name: string;
  age: number;
  days: number;
  breedLabel: string;
  sizeLabel: string;
  formatAge: (age: number) => string;
  imageUrl?: string | null;
};

export default function DiaryProfile({
  name,
  age,
  days,
  breedLabel,
  sizeLabel,
  formatAge,
  imageUrl,
}: Props) {
  const profileImg = imageUrl || defaultProfile;
  return (
    <Card className="m-0 w-full p-0 sm:p-0">
      <h3 className="cursor-default rounded-t-[12px] bg-[var(--color-primary-300)] py-2 text-center text-base sm:text-lg">
        {name}
      </h3>
      <div className="flex gap-8 px-6 py-4">
        <Image
          className="h-30 w-30 rounded-[12px]"
          src={profileImg}
          alt="강아지 프로필"
          width={120}
          height={120}
          priority
        />
        <div className="flex cursor-default flex-col justify-around text-sm sm:text-base">
          <span>
            {breedLabel} ({sizeLabel})
          </span>
          <span>{formatAge(age)}</span>
          <span>
            가족이 된지{' '}
            <strong className="font-medium text-[var(--color-primary-500)]">
              {days}
            </strong>
            일
          </span>
        </div>
      </div>
    </Card>
  );
}
