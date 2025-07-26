import {
  getDashboardChecklist,
  getDashboardFeeding,
  getDashboardNote,
  getDashboardProfile,
  getDashboardRecommend,
  getDashboardSleep,
  getDashboardWalking,
  getDashboardWeight,
} from '@/api/dashboard';
import { useQuery } from '@tanstack/react-query';

export const useDashboardData = (petId: number) => {
  const { data: profile, isPending: isProfilePending } =
    useQuery<DashboardProfile>({
      queryKey: ['dashboard', 'profile', petId],
      queryFn: () => getDashboardProfile(petId),
      enabled: !!petId,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    });

  const { data: weightList, isPending: isWeightPending } =
    useQuery<DashboardWeight>({
      queryKey: ['dashboard', 'weight', petId],
      queryFn: () => getDashboardWeight(petId),
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: !!petId,
      retry: 1,
    });

  const { data: sleepList, isPending: isSleepPending } =
    useQuery<DashboardSleep>({
      queryKey: ['dashboard', 'sleep', petId],
      queryFn: () => getDashboardSleep(petId),
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: !!petId,
      retry: 1,
    });

  const { data: note, isPending: isNotePending } = useQuery<DashboardNote>({
    queryKey: ['dashboard', 'note', petId],
    queryFn: () => getDashboardNote(petId),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!petId,
    retry: 1,
  });

  const { data: recommend, isPending: isRecommendPending } = useQuery({
    queryKey: ['dashboard', 'recommend', petId],
    queryFn: () => getDashboardRecommend(petId),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!petId,
    retry: 1,
  });

  const { data: feeding, isPending: isFeedingPending } =
    useQuery<DashboardFeeding>({
      queryKey: ['dashboard', 'feeding', petId],
      queryFn: () => getDashboardFeeding(petId),
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: !!petId,
      retry: 1,
    });

  const { data: walking, isPending: isWalkingPending } =
    useQuery<DashboardWalking>({
      queryKey: ['dashboard', 'walking', petId],
      queryFn: () => getDashboardWalking(petId),
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: !!petId,
      retry: 1,
    });

  const { data: checklist, isPending: isChecklistPending } =
    useQuery<DashboardChecklist>({
      queryKey: ['dashboard', 'checklist', petId],
      queryFn: () => getDashboardChecklist(petId),
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: !!petId,
      retry: 1,
    });

  const isPending =
    isChecklistPending &&
    isFeedingPending &&
    isNotePending &&
    isProfilePending &&
    isRecommendPending &&
    isSleepPending &&
    isWalkingPending &&
    isWeightPending;

  return {
    profile,
    weightList,
    sleepList,
    note,
    recommend,
    feeding,
    walking,
    checklist,
    isPending,
  };
};
