'use client';

import FeedInput from '@/components/diary/create/FeedInput';
import WalkingInput from '@/components/diary/create/WalkingInput';
import diary from '@/assets/images/diary.svg';
import Note from '@/components/diary/create/Note';
import SingleInput from '@/components/diary/create/SingleInput';
import Calendar from '@/components/diary/Calendar';
import SelectBox from '@/components/common/SelectBox';
import DiaryProfile from '@/components/diary/DiaryProfile';
import MobileTitle from '@/components/common/MobileTitle';
import Image from 'next/image';
import DiaryCard from '@/components/diary/DiaryCard';
import { useDiaryForm } from '@/lib/hooks/diary/state/useDiaryForm';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import DateInput from '@/components/common/DateInput';
import Icon from '@/components/common/Icon';

const feedUnitOptions = [
  { label: 'g', value: 'GRAM' },
  { label: '스푼', value: 'SPOON' },
  { label: '스쿱', value: 'SCOOP' },
  { label: '컵', value: 'CUP' },
];

export default function DiaryWrite() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const petId = searchParams.get('petId') || undefined;
  const recordAt = searchParams.get('recordAt') || undefined;

  const {
    selected,
    setSelected,
    selectedPetId,
    setSelectedPetId,
    weight,
    setWeight,
    sleepTime,
    setSleepTime,
    note,
    setNote,
    feedingList,
    setFeedingList,
    pets,
    selectedPetName,
    selectedPetAge,
    selectedPetDays,
    breedLabel,
    sizeLabel,
    formatAge,
    handleSubmit,
    walkingList,
    setWalkingList,
    isSubmitting,
    selectedPet,
  } = useDiaryForm(petId, recordAt);

  const petOptions = pets.map((pet) => ({
    value: pet.petId.toString(),
    label: pet.name,
  }));

  const onClickSave = async () => {
    try {
      const lifeRecordId = await handleSubmit();
      router.push(`/diary/${lifeRecordId}`);
    } catch (err) {
      console.error('등록 실패:', err);
    }
  };
  return (
    <main className="flex h-full flex-col pt-6 pb-5 text-sm sm:m-0 sm:block sm:w-full sm:pt-4 sm:pb-0">
      <MobileTitle
        title="멍멍일지"
        closePage={() => router.back()}
        onClick={onClickSave}
      />
      <div className="relative flex w-full flex-col gap-3 px-4 sm:gap-6 sm:px-19">
        {/* mobile */}
        <div className="flex w-full justify-between gap-5 sm:hidden sm:justify-start sm:pl-3">
          <div className="flex-1 sm:w-[220px]">
            <DateInput
              selected={selected}
              setSelected={setSelected}
              disableFuture={true}
              className="rounded-xl border-1 border-[var(--color-primary-500)]"
              align="left"
            />
          </div>
          <div className="flex-1 sm:w-[160px]">
            <SelectBox
              value={selectedPetId}
              setValue={setSelectedPetId}
              options={petOptions}
              width="100%"
              borderColor="var(--color-primary-500)"
              footstep
              hasBorder
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="hidden sm:block">
            <button
              className="flex cursor-pointer items-center gap-2 text-base"
              onClick={() => router.back()}
            >
              <Icon width="8px" height="13px" left="-425px" top="-320px" />
              <p>뒤로가기</p>
            </button>
          </div>
          <div className="flex justify-end gap-3">
            <div className="hidden text-base sm:block">
              <SelectBox
                value={selectedPetId}
                setValue={setSelectedPetId}
                options={petOptions}
                width="116px"
                borderColor="var(--color-primary-500)"
                footstep
                hasBorder
              />
            </div>
            <button
              className={twMerge(
                'hidden w-[115px] rounded-xl bg-[var(--color-primary-200)] text-base sm:block',
                !isSubmitting &&
                  'cursor-pointer hover:bg-[var(--color-primary-500)]',
              )}
              onClick={onClickSave}
              disabled={isSubmitting}
            >
              {isSubmitting ? '저장 중...' : '저장하기'}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-14 sm:pt-1">
          <div className="flex flex-col items-center gap-6 sm:min-w-105 sm:gap-7">
            <div className="hidden w-full justify-between sm:flex">
              <Image src={diary} alt="오늘의 멍멍일지를 적어보아요!" />
              <Calendar selected={selected} setSelected={setSelected} />
            </div>
            <DiaryProfile
              name={selectedPetName}
              age={selectedPetAge}
              days={selectedPetDays}
              breedLabel={breedLabel}
              sizeLabel={sizeLabel}
              formatAge={formatAge}
              imageUrl={selectedPet?.imgUrl ?? null}
            />
            <DiaryCard className="w-full sm:h-[205px]" title="오늘의 건강기록">
              <SingleInput
                title="몸무게"
                id="weight"
                value={weight}
                onChange={setWeight}
              />
              <SingleInput
                title="수면시간"
                id="sleep"
                value={sleepTime}
                onChange={setSleepTime}
              />
            </DiaryCard>
          </div>
          <div className="flex grow flex-col gap-6 pb-8 sm:gap-12 sm:pb-0">
            <div className="flex w-full flex-col justify-between gap-6 sm:flex-row sm:gap-4">
              <div className="flex w-full flex-col sm:flex-1">
                <FeedInput
                  feedingList={feedingList}
                  setFeedingList={setFeedingList}
                  feedUnitOptions={feedUnitOptions}
                />
              </div>
              <div className="flex w-full flex-col sm:flex-1">
                <WalkingInput
                  walkingList={walkingList}
                  setWalkingList={setWalkingList}
                />
              </div>
            </div>
            <Note value={note} onChange={setNote} />
          </div>
        </div>
      </div>
    </main>
  );
}
