'use client';
import Icon from '@/components/common/Icon';
import LogCard from '@/components/diary/LogCard';
import DateInput from '@/components/common/DateInput';
import SelectBox from '@/components/common/SelectBox';
import DiaryPagination from '@/components/diary/DiaryPagination';
import symbol from '@/assets/images/alternative-image.svg';
import Link from 'next/link';
import Image from 'next/image';
import { getDiaryList, getPetsByUserId } from '@/api/diary';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Option = { value: string; label: string };
type DiaryItem = {
  lifeRecordId: number;
  pet: { name: string; url: string | null };
  recordAt: string;
  weight: number | null;
  walkingTime: number;
  content: string;
};

export default function Diary() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [pets, setPets] = useState<PetProfile[]>([]);
  const [selectedPetId, setSelectedPetId] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await getPetsByUserId(
          Number(sessionStorage.getItem('userId')),
        );
        setPets(res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPets();
  }, []);

  const petOptions: Option[] = [
    { value: 'all', label: '모든 강아지' },
    ...pets.map((pet) => ({
      value: pet.petId.toString(),
      label: pet.name,
    })),
  ];

  const [diaryList, setDiaryList] = useState<DiaryItem[]>([]);
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const fetchDiaryList = useCallback(async () => {
    try {
      setIsLoading(true);
      const recordAt = selectedDate ? formatDate(selectedDate) : undefined;
      const petId = selectedPetId !== 'all' ? Number(selectedPetId) : undefined;

      const res = await getDiaryList({
        petId,
        recordAt,
        page: currentPage,
      });

      setDiaryList(res.data || []);
      setTotalPages(res.pageInfo.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate, selectedPetId, currentPage]);

  useEffect(() => {
    fetchDiaryList();
  }, [fetchDiaryList]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  return (
    <main className="flex h-full flex-col items-center p-6 sm:block sm:p-0 sm:px-12 sm:py-7">
      <div className="mb-3 flex w-full justify-between">
        <div className="flex w-full justify-between gap-5 sm:justify-start sm:gap-6 sm:pl-3">
          <div className="flex-1 sm:w-[220px] sm:flex-none">
            <DateInput
              selected={selectedDate}
              setSelected={setSelectedDate}
              showAllDate
              disableFuture={true}
              className="rounded-xl border-1 border-[var(--color-primary-500)] text-sm sm:text-base"
              align="left"
            />
          </div>
          <div className="flex-1 text-sm sm:w-[178px] sm:flex-none sm:text-base">
            <SelectBox
              value={selectedPetId}
              setValue={setSelectedPetId}
              options={petOptions}
              width="100%"
              borderColor="var(--color-primary-500)"
              footstep={!isMobile}
              hasBorder
            />
          </div>
          {selectedDate && (
            <button
              className="ml-2 shrink-0 cursor-pointer text-xs text-[var(--color-primary-500)] underline sm:text-sm"
              onClick={() => setSelectedDate(undefined)}
            >
              전체 날짜
            </button>
          )}
        </div>
        <button
          className="hidden cursor-pointer items-center gap-1 sm:flex"
          onClick={() => {
            if (pets.length === 0) {
              alert(
                '아직 등록된 강아지가 없어요. 먼저 강아지를 등록해 주세요!',
              );
              router.push(`/profile/${sessionStorage.getItem('userId')}`);
            } else {
              router.push('/diary/write');
            }
          }}
        >
          <Icon width="14px" height="14px" left="-231px" top="-79px" />
          <span className="inline-block w-16 font-medium">기록하기</span>
        </button>
      </div>
      <div className="w-full">
        <ul className="scrollbar-hidden mb-10 flex flex-col gap-5 pt-2 pb-4 sm:mb-0 sm:h-[625px] sm:flex-row sm:flex-wrap sm:gap-[53px] sm:overflow-y-scroll sm:px-3 sm:pt-5">
          {isLoading ? (
            // temporary loading spinner
            <div className="flex w-full flex-col items-center justify-center gap-1 py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--color-primary-500)] border-t-transparent" />
              <span className="text-sm text-[var(--color-grey)]">
                불러오는 중...
              </span>
            </div>
          ) : diaryList.length === 0 ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 py-64 text-[var(--color-grey)] sm:gap-3 sm:py-0">
              <Image
                src={symbol}
                alt="작성된 멍멍일지가 없습니다"
                className="h-auto w-16 sm:w-24"
              />
              <p className="w-full text-center text-sm sm:text-base">
                작성된 멍멍일지가 없습니다
              </p>
            </div>
          ) : (
            diaryList.map((item) => (
              <li
                key={item.lifeRecordId}
                className="w-full sm:basis-[calc(33%-31px)]"
              >
                <Link href={`/diary/${item.lifeRecordId}`}>
                  <LogCard
                    petName={item.pet.name}
                    recordAt={item.recordAt}
                    weight={item.weight}
                    walkingTime={item.walkingTime}
                    content={item.content}
                    imageUrl={item.pet.url ?? null}
                  />
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>

      {diaryList.length > 0 && (
        <DiaryPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      {/* mobile: post button */}
      <div
        className="fixed right-4 bottom-4 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[var(--color-primary-300)] sm:hidden"
        onClick={() => {
          if (pets.length === 0) {
            alert('등록된 강아지가 없습니다. 강아지를 먼저 등록해주세요');
            router.push(`/profile/${sessionStorage.getItem('userId')}`);
          } else {
            router.push('/diary/write');
          }
        }}
      >
        <Icon width="20px" height="20px" left="-266px" top="-75px" />
      </div>
    </main>
  );
}
