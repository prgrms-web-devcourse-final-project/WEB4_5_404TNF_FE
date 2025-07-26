'use client';

import diary from '@/assets/images/diary.svg';
import Image from 'next/image';
import MobileTitle from '../common/MobileTitle';
import Calendar from './Calendar';
import DiaryCard from './DiaryCard';
import DiaryProfile from './DiaryProfile';
import DiaryOptionsMenu from './DiaryOptionsMenu';
import symbol from '@/assets/images/alternative-image.svg';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useGetDiaryDetail } from '@/lib/hooks/diary/api/useGetDiaryDetail';
import { useDeleteDiary } from '@/lib/hooks/diary/api/useDeleteDiary';
import { getPetsByUserId } from '@/api/diary';
import { petBreedData, petSizeData } from '@/assets/data/pet';

const feedUnitOptions = [
  { label: 'g', value: 'GRAM' },
  { label: '스푼', value: 'SPOON' },
  { label: '스쿱', value: 'SCOOP' },
  { label: '컵', value: 'CUP' },
];

const paceOptions = [
  { value: '1', label: '가볍게' },
  { value: '2', label: '적당히' },
  { value: '3', label: '힘차게' },
];

const formatTime = (datetime: string) => {
  const date = new Date(datetime);
  const hour = date.getHours().toString().padStart(1, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  return `${hour}시 ${minute}분`;
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const yyyy = date.getFullYear();
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const dd = date.getDate().toString().padStart(2, '0');
  return `${yyyy}. ${mm}. ${dd}`;
};

export default function DiaryDetailClient({ logId }: { logId: number }) {
  const router = useRouter();

  // diary detail
  const { data, isLoading, error } = useGetDiaryDetail(logId);

  // pet profile
  const [pet, setPet] = useState<PetProfile | null>(null);
  const formatAge = (age: number) => {
    const years = Math.floor(age / 12);
    const months = age % 12;
    return `${years}년 ${months}개월`;
  };
  const getBreedLabel = (breed?: string) =>
    petBreedData.find((b) => b.value === breed)?.label ?? '-';

  const getSizeLabel = (size?: string) =>
    petSizeData.find((s) => s.value === size)?.label ?? '-';
  useEffect(() => {
    const fetchPet = async () => {
      const userId = Number(sessionStorage.getItem('userId')) || null;
      if (!userId || !data?.petId) return;

      const pets: PetProfile[] = await getPetsByUserId(userId);
      const matchedPet = pets.find((p) => p.petId === data.petId);
      setPet(matchedPet || null);
    };

    fetchPet();
  }, [data?.petId]);

  // options menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // delete diary
  const deleteMutation = useDeleteDiary();
  const handleDelete = () => {
    const confirmed = confirm('정말 삭제하시겠습니까?');
    if (!confirmed) return;

    deleteMutation.mutate(data.lifeRecordId, {
      onSuccess: () => {
        alert('멍멍일지 삭제 완료');
        router.push('/diary');
      },
      onError: (err) => {
        console.error(err);
        alert('멍멍일지 삭제 실패');
      },
    });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current || menuRef.current.contains(e.target as Node))
        return;
      setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  if (isLoading)
    // temporary loading spinner
    return (
      <div className="flex h-full flex-col items-center justify-center gap-1">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--color-primary-500)] border-t-transparent" />
        <span className="text-sm text-[var(--color-grey)]">
          잠시만 기다려주세요.
        </span>
      </div>
    );
  if (error || !data) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 py-64 sm:gap-3 sm:py-0">
        <Image
          src={symbol}
          alt="작성된 멍멍일지가 없습니다"
          className="ml-[-8px] h-auto w-16 sm:w-24"
        />
        <p className="w-full text-center text-sm text-[var(--color-grey)] sm:text-base">
          존재하지 않는 멍멍일지 입니다
        </p>
        <button
          className="mt-5 cursor-pointer rounded-full bg-[var(--color-pink-300)] px-8 py-3 hover:bg-[var(--color-pink-500)]"
          onClick={() => router.back()}
        >
          돌아가기
        </button>
      </div>
    );
  }

  const { recordAt, weight, sleepTime, content, feedingList, walkingList } =
    data;

  return (
    <main className="flex h-full flex-col pt-6 pb-5 text-sm sm:m-0 sm:block sm:w-full sm:pt-9 sm:pb-0">
      <MobileTitle
        title="멍멍일지"
        closePage={() => router.back()}
        showOptionsMenu
        onEdit={() =>
          router.push(
            `/diary/write?petId=${data.petId}&recordAt=${encodeURIComponent(data.recordAt)}`,
          )
        }
        onDelete={handleDelete}
      />
      <div className="relative flex h-full w-full flex-col gap-6 px-4 sm:px-19">
        {/* mobile */}
        <div className="flex w-full justify-between gap-6 sm:hidden sm:justify-start sm:pl-3">
          <div className="flex h-[38px] flex-1 items-center justify-center rounded-xl border-1 border-[var(--color-primary-500)] px-4 leading-[1.2] sm:w-[160px]">
            {formatDate(data.recordAt)}
          </div>
          <div className="flex h-[38px] flex-1 items-center justify-center rounded-xl border-1 border-[var(--color-primary-500)] px-4 leading-[1.2] sm:w-[160px]">
            {pet?.name}
          </div>
        </div>

        {/* web */}
        <div className="absolute -top-2 right-[65px] hidden self-end text-base sm:block">
          <DiaryOptionsMenu
            onEdit={() => {
              const petId = data.petId;
              const recordAt = encodeURIComponent(data.recordAt);
              router.push(`/diary/write?petId=${petId}&recordAt=${recordAt}`);
            }}
            onDelete={handleDelete}
          />
        </div>

        {/* content */}
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-14 sm:pt-10">
          <div className="flex flex-col items-center gap-6 sm:min-w-105 sm:gap-7">
            <div className="hidden w-full justify-between sm:flex">
              <Image src={diary} alt="오늘의 멍멍일지를 적어보아요!" />
              <Calendar
                selected={new Date(recordAt)}
                setSelected={() => {}}
                readOnly
              />
            </div>
            <DiaryProfile
              name={pet?.name ?? '-'}
              age={Number(pet?.age)}
              days={pet?.days ?? 0}
              breedLabel={getBreedLabel(pet?.breed)}
              sizeLabel={getSizeLabel(pet?.size)}
              formatAge={formatAge}
              imageUrl={pet?.imgUrl ?? null}
            />
            <DiaryCard className="w-full sm:h-[205px]" title="오늘의 건강기록">
              <div className="mb-4 text-sm sm:mt-2 sm:mb-6 sm:text-base">
                <span className="inline-block w-[110px] cursor-default text-[var(--color-primary-500)]">
                  몸무게
                </span>
                <span>{weight != null ? `${weight} kg` : '-'}</span>
              </div>
              <div className="text-sm sm:text-base">
                <span className="inline-block w-[110px] cursor-default text-[var(--color-primary-500)]">
                  수면시간
                </span>
                <span>{sleepTime != null ? `${sleepTime}시간` : '-'}</span>
              </div>
            </DiaryCard>
          </div>
          <div className="flex grow flex-col gap-6 sm:gap-12">
            <div className="flex w-full flex-col justify-between gap-6 sm:flex-row sm:gap-4">
              <DiaryCard className="min-h-50 sm:h-71 sm:flex-1" title="식사량">
                <ul className="-mt-3 px-2">
                  {(feedingList as Feeding[]).map((item, idx) => {
                    const unitLabel =
                      feedUnitOptions.find((opt) => opt.value === item.unit)
                        ?.label ?? item.unit;
                    return (
                      <li
                        key={idx}
                        className="flex border-b border-[var(--color-primary-300)] py-[9px]"
                      >
                        <span className="basis-27">
                          {formatTime(item.mealtime)}
                        </span>
                        <span>
                          {item.amount}
                          {unitLabel}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </DiaryCard>
              <DiaryCard className="min-h-50 sm:h-71 sm:flex-1" title="산책">
                <ul className="-mt-3 px-2">
                  {(walkingList as Walking[]).map((item, idx) => {
                    const start = formatTime(item.startTime);
                    const end = formatTime(item.endTime);
                    return (
                      <li
                        key={idx}
                        className="border-b border-[var(--color-primary-300)] py-[9px]"
                      >
                        <div className="inline-flex gap-2">
                          <span>
                            {start} ~ {end}
                          </span>
                          <span>
                            {'( 강도: '}
                            {paceOptions.find(
                              (opt) => opt.value === String(item.pace),
                            )?.label ?? `${item.pace}`}
                            {' )'}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </DiaryCard>
            </div>
            <DiaryCard
              className="mb-7 min-h-50 w-full sm:mb-0 sm:h-full"
              title="관찰노트"
            >
              <div className="scrollbar-hidden max-h-40 overflow-y-auto sm:max-h-[250px]">
                <p>{content}</p>
              </div>
            </DiaryCard>
          </div>
        </div>
      </div>
    </main>
  );
}
