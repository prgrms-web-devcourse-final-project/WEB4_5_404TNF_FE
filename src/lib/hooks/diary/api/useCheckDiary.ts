import { useQuery } from '@tanstack/react-query';
import { checkDiary } from '@/api/diary';

export const useCheckDiary = (
  petId: number,
  date: string,
  enabled: boolean,
) => {
  return useQuery<DiaryCheckResult>({
    queryKey: ['diary', petId, date],
    queryFn: () => checkDiary(petId, date),
    enabled,
    staleTime: 1000,
  });
};
