'use client';
import Image from 'next/image';
import SelectBox from '../common/SelectBox';
import FeedCard from './FeedCard';
import LineGraphCard from './graph/LineGraphCard';
import NoteCard from './NoteCard';
import ProfileCard from './ProfileCard';
import TodoCard from './TodoCard';
import WalkCard from './WalkCard';

import {
  getDashboardChecklist,
  getDashboardFeeding,
  getDashboardNote,
  getDashboardProfile,
  getDashboardRecommend,
  getDashboardSleep,
  getDashboardWalking,
  getDashboardWeight,
  getPetList,
} from '@/api/dashboard';

import loadingSpinner from '@/assets/images/loading-footprint.json';
import speechBubbleMobile from '@/assets/images/speech-bubble-mobile.svg';
import speechBubble from '@/assets/images/speech-bubble.png';
import { useDashboardData } from '@/lib/hooks/useDashboard';
import { useQueryClient } from '@tanstack/react-query';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import NoPets from '../schedule/NoPets';

export default function DashboardClient() {
  const [petList, setPetList] = useState<PetProfile[]>([]);
  const [selectedPet, setSelectedPet] = useState(0);

  const {
    isPending,
    checklist,
    feeding,
    note,
    profile,
    recommend,
    sleepList,
    walking,
    weightList,
  } = useDashboardData(selectedPet);
  const queryClient = useQueryClient();
  const petOptions = petList.map((pet) => ({
    value: String(pet.petId),
    label: pet.name,
  }));

  useEffect(() => {
    petList.forEach((pet) => {
      const petId = pet.petId;

      queryClient.prefetchQuery({
        queryKey: ['dashboard', 'profile', petId],
        queryFn: () => getDashboardProfile(petId),
        staleTime: 30000,
      });
      queryClient.prefetchQuery({
        queryKey: ['dashboard', 'weight', petId],
        queryFn: () => getDashboardWeight(petId),
        staleTime: 30000,
      });
      queryClient.prefetchQuery({
        queryKey: ['dashboard', 'sleep', petId],
        queryFn: () => getDashboardSleep(petId),
        staleTime: 30000,
      });
      queryClient.prefetchQuery({
        queryKey: ['dashboard', 'recommend', petId],
        queryFn: () => getDashboardRecommend(petId),
        staleTime: 30000,
      });
      queryClient.prefetchQuery({
        queryKey: ['dashboard', 'feeding', petId],
        queryFn: () => getDashboardFeeding(petId),
        staleTime: 30000,
      });
      queryClient.prefetchQuery({
        queryKey: ['dashboard', 'note', petId],
        queryFn: () => getDashboardNote(petId),
        staleTime: 30000,
      });
      queryClient.prefetchQuery({
        queryKey: ['dashboard', 'checklist', petId],
        queryFn: () => getDashboardChecklist(petId),
        staleTime: 30000,
      });
      queryClient.prefetchQuery({
        queryKey: ['dashboard', 'walking', petId],
        queryFn: () => getDashboardWalking(petId),
        staleTime: 30000,
      });
    });
  }, [selectedPet, queryClient, petList]);

  useEffect(() => {
    const getPets = async () => {
      const data: PetProfile[] = await getPetList();
      setPetList(data);
      setSelectedPet(data[0].petId);
    };
    getPets();
  }, []);
  if (isPending)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Lottie className="h-50 w-50" animationData={loadingSpinner} />
      </div>
    );
  if (!selectedPet) return <NoPets content="대시보드를 확인하려면" />;
  return (
    <main className="relative h-full px-[26px] py-6 sm:px-12 sm:py-7">
      <div className="flex items-center justify-between sm:mb-7">
        <h2 className="hidden text-xl font-bold sm:block">
          {recommend ?? '맞춤형 데이터가 없습니다'}
        </h2>
      </div>
      <div className="absolute top-7 right-[65px] hidden self-end text-base sm:block">
        <SelectBox
          value={String(selectedPet)}
          setValue={(value) => setSelectedPet(Number(value))}
          options={petOptions}
          width="105px"
          footstep
        />
      </div>
      <div className="flex flex-wrap gap-5 pb-7 sm:gap-8 sm:pb-0">
        <div className="relative w-full text-sm font-medium sm:hidden sm:text-xl">
          <Image
            className="h-auto w-full max-w-[558px]"
            src={speechBubbleMobile}
            alt="말풍선"
            width={558}
            height={98}
            priority
          />
          <div className="absolute top-[20%] left-1/2 w-full max-w-105 -translate-x-1/2 px-14 min-[500px]:text-lg">
            {profile?.aiAnalysis ?? 'AI 분석 결과가 없습니다'}
          </div>
        </div>
        <div className="flex w-full flex-col gap-5 sm:w-[520px] sm:gap-8">
          <ProfileCard profile={profile} />
          {weightList && <LineGraphCard title="몸무게" dataset={weightList} />}
          {sleepList && <LineGraphCard title="수면시간" dataset={sleepList} />}
        </div>
        <div className="flex w-full flex-col gap-5 sm:w-[558px] sm:gap-8">
          <div className="relative hidden text-xl font-medium sm:block">
            <Image
              className="h-auto w-full max-w-[558px]"
              src={speechBubble}
              alt="말풍선"
              width={558}
              height={98}
              priority
            />
            <div className="absolute top-1/2 left-1/2 w-full max-w-105 -translate-x-1/2 -translate-y-1/2">
              {profile?.aiAnalysis ?? 'AI 분석 결과가 없습니다...'}
            </div>
          </div>
          <div className="flex items-center justify-between gap-5 sm:gap-8">
            <FeedCard feeding={feeding} />
            <TodoCard checklist={checklist} petId={selectedPet} />
          </div>
          {note && <NoteCard note={note} />}
        </div>
        <WalkCard walking={walking} />
      </div>
    </main>
  );
}
