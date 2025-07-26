import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { useGetPets } from '../api/useGetPets';
import { petBreedData, petSizeData } from '@/assets/data/pet';
import { useCheckDiary } from '../api/useCheckDiary';
import { useDiaryState } from './useDiaryState';
import { useInitDiaryForm } from '../logic/useInitDiaryForm';
import { useDiarySubmit } from '../logic/useDiarySubmit';

export function useDiaryForm(initPetId?: string, initRecordAt?: string) {
  const {
    selected,
    setSelected,
    selectedPetId,
    setSelectedPetId,
    selectedUnit,
    setSelectedUnit,
    weight,
    setWeight,
    sleepTime,
    setSleepTime,
    note,
    setNote,
    walkingList,
    setWalkingList,
    feedingList,
    setFeedingList,
  } = useDiaryState(initPetId, initRecordAt);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // get pets by userId
  const userId = Number(sessionStorage.getItem('userId')) || null;
  const { data: pets = [] } = useGetPets(userId);

  // set default pet
  useEffect(() => {
    if (!initPetId && pets.length > 0 && !selectedPetId) {
      setSelectedPetId(pets[0].petId.toString());
    }
  }, [pets, initPetId, selectedPetId, setSelectedPetId]);

  const recordAt = selected ? format(selected, 'yyyy-MM-dd') : '';
  const numericPetId = Number(selectedPetId);

  // check diary
  const { data: checkResult } = useCheckDiary(
    numericPetId,
    recordAt,
    !!(numericPetId && recordAt),
  );

  console.log('check result: ', checkResult);

  const hasDiary = checkResult?.mode === 'edit';
  const diaryData = hasDiary
    ? (checkResult.data as DiaryCheckResponse)
    : undefined;

  useEffect(() => {
    if (checkResult?.mode === 'create') {
      const unit = checkResult.data.unit;
      if (unit) setSelectedUnit(unit);
    }
  }, [checkResult, setSelectedUnit]);

  // get selected pet info
  const selectedPet = useMemo(
    () => pets.find((p) => p.petId.toString() === selectedPetId),
    [pets, selectedPetId],
  );
  const breedLabel =
    petBreedData.find((b) => b.value === selectedPet?.breed)?.label || '';
  const sizeLabel =
    petSizeData.find((s) => s.value === selectedPet?.size)?.label || '';
  const selectedPetName = selectedPet?.name || '';
  const selectedPetAge = selectedPet?.age ? Number(selectedPet.age) : 0;
  const selectedPetDays = selectedPet?.days ?? 0;

  const formatAge = (age: number) => {
    const years = Math.floor(age / 12);
    const months = age % 12;
    return `${years}년 ${months}개월`;
  };

  useInitDiaryForm({
    diaryData,
    hasDiary,
    setNote,
    setWeight,
    setSleepTime,
    setFeedingList,
    setWalkingList,
    selectedUnit,
    setSelectedUnit,
  });

  const { handleSubmit } = useDiarySubmit({
    feedingList,
    walkingList,
    weight,
    sleepTime,
    note,
    recordAt,
    petId: numericPetId,
    hasDiary,
    diaryData,
    onSubmitting: setIsSubmitting,
  });

  return {
    selected,
    setSelected,
    selectedPetId,
    setSelectedPetId,
    selectedUnit,
    setSelectedUnit,
    weight,
    setWeight,
    sleepTime,
    setSleepTime,
    note,
    setNote,
    walkingList,
    setWalkingList,
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
    isSubmitting,
    selectedPet,
  };
}
