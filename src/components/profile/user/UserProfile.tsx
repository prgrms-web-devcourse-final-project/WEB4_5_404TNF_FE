import { getMyUserInfo } from '@/api/user';
import d_defaultProfile from '@/assets/images/dark-default-profile.svg';
import defaultProfile from '@/assets/images/default-profile.svg';
import Icon from '@/components/common/Icon';
import { useAuthStore } from '@/stores/authStoe';
import { useProfileStore } from '@/stores/profileStore';
import { useThemeStore } from '@/stores/themeStore';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import UserProfileEdit from './UserProfileEdit';

export default function UserProfile({
  userProfile,
}: {
  userProfile: UserProfile;
}) {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const theme = useThemeStore((state) => state.theme);
  const userInfo = useAuthStore((state) => state.userInfo);
  const setImage = useAuthStore((state) => state.setImage);
  const togglePage = useProfileStore((state) => state.toggleEditingUserProfile);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(false);

  const isMyProfile = userInfo?.userId === userProfile.userId;

  const { data: profile } = useQuery<UserProfile>({
    queryFn: () => getMyUserInfo(),
    queryKey: ['user', String(userProfile.userId)],
    enabled: isMyProfile,
    staleTime: 300000,
  });

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fallbackImage = theme === 'dark' ? d_defaultProfile : defaultProfile;

  const getImageSrc = () => {
    if (error) return fallbackImage;
    if (profile?.imgUrl) return profile?.imgUrl;
    if (userProfile.imgUrl) return userProfile.imgUrl;
    return fallbackImage;
  };

  useEffect(() => {
    if (profile && profile.imgUrl) {
      setImage(profile.imgUrl);
    }
  }, [setImage, profile]);

  return (
    <div className="mb-18 sm:mb-20">
      <h2 className="mr-7 inline text-sm text-[var(--color-primary-500)] sm:text-xl">
        {isMyProfile ? '마이' : '유저'} 프로필
      </h2>
      {isMyProfile && (
        <button
          onClick={() => (isMobile ? togglePage() : setIsModalOpen(true))}
          className="inline-flex h-[26px] w-[66px] cursor-pointer items-center justify-center gap-2 rounded-[30px] border-1 border-[var(--color-grey)] text-[10px] sm:h-7 sm:w-20 sm:text-sm"
        >
          <Icon
            className="hidden sm:block"
            width="14px"
            height="14px"
            left="-225px"
            top="-168px"
          />
          <Icon
            className="block sm:hidden"
            width="9px"
            height="9px"
            left="-31px"
            top="-127px"
          />
          <span className="text-[var(--color-grey)]">수정</span>
        </button>
      )}
      <div className="mt-7 flex items-center gap-4 sm:gap-7">
        <Image
          className="h-20 w-20 rounded-full object-cover sm:h-40 sm:w-40"
          src={getImageSrc()}
          alt="프로필 이미지"
          width={160}
          height={160}
          onError={() => setError(true)}
        />
        <div className="flex flex-col gap-3 text-xs sm:text-base">
          <div>
            <span className="inline-block w-[59px] text-[var(--color-grey)] sm:w-[93px]">
              이메일
            </span>
            {userProfile.email}
          </div>
          {isMyProfile && (
            <div>
              <span className="inline-block w-[59px] text-[var(--color-grey)] sm:w-[93px]">
                이름
              </span>
              {userProfile.name}
            </div>
          )}
          <div>
            <span className="inline-block w-[59px] text-[var(--color-grey)] sm:w-[93px]">
              닉네임
            </span>
            {profile?.nickname || userProfile?.nickname}
          </div>
          {isMyProfile && (
            <div>
              <span className="inline-block w-[59px] text-[var(--color-grey)] sm:w-[93px]">
                가입유형
              </span>
              {userProfile.provider}
            </div>
          )}
        </div>
      </div>
      {isModalOpen &&
        profile &&
        createPortal(
          <UserProfileEdit closeModal={closeModal} profile={profile} />,
          document.body,
        )}
    </div>
  );
}
