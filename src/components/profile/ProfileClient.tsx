'use client';
import {
  usePetProfiles,
  useUserProfile,
} from '@/lib/hooks/profile/useProfiles';
import { useAuthStore } from '@/stores/authStoe';
import { useProfileStore } from '@/stores/profileStore';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { twMerge } from 'tailwind-merge';
import Button from '../common/Button';
import DogProfileEditMobile from './dog/DogProfileEditMobile';
import DogProfileList from './dog/DogProfileList';
import PostWrapper from './post/PostWrapper';
import UserProfile from './user/UserProfile';
import UserProfileEditMobile from './user/UserProfileEditMobile';

export default function ProfileClient({
  petProfiles,
  userProfile,
}: {
  petProfiles: PetProfile[];
  userProfile: UserProfile;
}) {
  const params = useParams();
  const userId = params?.userId as string;
  const userInfo = useAuthStore((state) => state.userInfo);
  const isMyProfile = userInfo?.userId === Number(userId);

  usePetProfiles(userId, petProfiles);
  const queryClient = useQueryClient();

  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const [isProfile, setIsProfile] = useState(true);
  const isEditingPet = useProfileStore((state) => state.isEditingPet);
  const isEditingUser = useProfileStore((state) => state.isEditingUser);

  const { data } = useUserProfile(userId, isMyProfile);

  useEffect(() => {
    if (!isMyProfile) return;
    petProfiles.forEach((profile) => {
      queryClient.prefetchQuery({ queryKey: ['pet', profile.petId] });
      queryClient.prefetchQuery({ queryKey: ['vaccine', profile.petId] });
    });
  }, [petProfiles, queryClient, isMyProfile]);

  if (isMobile) {
    if (isEditingPet) return <DogProfileEditMobile />;
    if (isEditingUser) return <UserProfileEditMobile />;
  }
  return (
    <main className="scrollbar-hidden relative h-full w-screen overflow-y-scroll bg-[var(--color-background)] p-6 sm:h-[calc(100vh-156px)] sm:w-full sm:px-30 sm:py-17 dark:bg-[var(--color-black)]">
      <h1 className="mb-15 hidden text-center text-3xl sm:block">
        <strong>{data?.nickname || userProfile.nickname}</strong>
        님의 페이지
      </h1>
      <div className="mb-8 flex justify-center gap-4 sm:hidden">
        <Button
          className={twMerge(
            'w-[87px] bg-[var(--color-pink-100)] py-3 text-xs',
            isProfile && 'bg-[var(--color-pink-300)]',
          )}
          onClick={() => setIsProfile(true)}
        >
          프로필
        </Button>
        <Button
          className={twMerge(
            'w-[87px] bg-[var(--color-pink-100)] py-3 text-xs',
            !isProfile && 'bg-[var(--color-pink-300)]',
          )}
          onClick={() => setIsProfile(false)}
        >
          활동내역
        </Button>
      </div>
      <div className={isProfile ? '' : 'hidden sm:block'}>
        <UserProfile userProfile={userProfile} />
        <DogProfileList />
      </div>
      <div className={isProfile ? 'hidden sm:block' : ''}>
        <PostWrapper />
      </div>
    </main>
  );
}
