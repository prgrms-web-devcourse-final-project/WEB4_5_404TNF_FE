import { useEffect } from 'react';

type Props = {
  diaryData: DiaryCheckResponse | undefined;
  hasDiary: boolean;
  setNote: (note: string) => void;
  setWeight: (weight: string) => void;
  setSleepTime: (sleepTime: string) => void;
  setFeedingList: (list: FeedEntry[]) => void;
  setWalkingList: (list: WalkEntry[]) => void;
  setSelectedUnit: (unit: string) => void;
  selectedUnit: string;
};

export function useInitDiaryForm({
  diaryData,
  hasDiary,
  setNote,
  setWeight,
  setSleepTime,
  setFeedingList,
  setWalkingList,
  selectedUnit,
}: Props) {
  useEffect(() => {
    console.log('diaryData', diaryData);
    if (hasDiary && diaryData) {
      setNote(diaryData.content || '');
      setWeight(diaryData.weight?.toString() || '');
      setSleepTime(diaryData.sleepTime?.toString() || '');

      setFeedingList(
        diaryData.feedingList.map((f): FeedEntry => {
          const time = new Date(f.mealtime);
          return {
            hour: time.getHours().toString().padStart(2, '0'),
            minute: time.getMinutes().toString().padStart(2, '0'),
            amount: f.amount.toString(),
            unit: f.unit,
          };
        }),
      );

      setWalkingList(
        diaryData.walkingList.map((w): WalkEntry => {
          const start = new Date(w.startTime);
          const end = new Date(w.endTime);
          return {
            startHour: start.getHours().toString().padStart(2, '0'),
            startMinute: start.getMinutes().toString().padStart(2, '0'),
            endHour: end.getHours().toString().padStart(2, '0'),
            endMinute: end.getMinutes().toString().padStart(2, '0'),
            pace: w.pace.toString(),
          };
        }),
      );
    } else {
      setNote('');
      setWeight('');
      setSleepTime('');
      setFeedingList([
        { hour: '', minute: '', amount: '', unit: selectedUnit || 'GRAM' },
      ]);
      setWalkingList([
        {
          startHour: '',
          startMinute: '',
          endHour: '',
          endMinute: '',
          pace: '1',
        },
      ]);
    }
  }, [
    diaryData,
    hasDiary,
    setNote,
    setWeight,
    setSleepTime,
    setFeedingList,
    setWalkingList,
    selectedUnit,
  ]);
}
