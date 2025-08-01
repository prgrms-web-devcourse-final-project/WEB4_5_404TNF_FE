'use client';
import alternativeImage from '@/assets/images/alternative-image.svg';
import Card from '@/components/common/Card';
import { usePetProfiles } from '@/lib/hooks/profile/useProfiles';
import { useAuthStore } from '@/stores/authStoe';
import { useProfileStore } from '@/stores/profileStore';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { twMerge } from 'tailwind-merge';
import Icon from '../../common/Icon';
import DogProfileCard from './DogProfileCard';
import DogProfileEdit from './DogProfileEdit';
import RegistCard from './RegistCard';

export default function DogProfileList() {
  const params = useParams();
  const userId = params?.userId as string;
  const userInfo = useAuthStore((state) => state.userInfo);
  const isMyProfile = userInfo?.userId === Number(userId);

  const { data: petProfiles = [] } = usePetProfiles(userId);

  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const sortedProfiles = petProfiles.sort((a, b) => a.petId - b.petId);

  const togglePage = useProfileStore((state) => state.toggleEditingPetProfile);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const toggleProfileModal = () => {
    setIsProfileModalOpen((state) => !state);
  };

  useEffect(() => {
    if (
      swiperRef.current &&
      prevRef.current &&
      nextRef.current &&
      typeof swiperRef.current.params.navigation === 'object' &&
      swiperRef.current.params.navigation !== null
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
    }
  }, [petProfiles.length]);

  return (
    <div className="mb-20 w-full">
      <h2 className="text-sm text-[var(--color-primary-500)] sm:text-xl">
        댕댕이 프로필
      </h2>
      {isMobile ? (
        <div className="mt-6 flex flex-col gap-6">
          {petProfiles &&
            sortedProfiles.map((profile, index) => (
              <DogProfileCard
                key={index}
                togglePage={togglePage}
                profile={profile}
              />
            ))}
          {isMyProfile && (
            <div onClick={togglePage}>
              <Card className="card__hover flex h-[188px] w-full max-w-150 items-center justify-center p-0 sm:h-[316px] dark:bg-[#343434]">
                <Icon
                  className="hidden sm:block"
                  width="47px"
                  height="47px"
                  left="-26px"
                  top="-242px"
                />
                <Icon
                  className="block sm:hidden"
                  width="20px"
                  height="20px"
                  left="-266px"
                  top="-75px"
                />
              </Card>
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <button
            ref={prevRef}
            className={twMerge(
              'absolute top-1/2 -left-6 z-50 -translate-y-1/2',
              currentPage === 0 ? 'hidden' : '',
            )}
          >
            <Icon
              width="12px"
              height="20px"
              left="-107px"
              top="-164px"
              className="cursor-pointer"
            />
          </button>

          <div className="relative w-full max-w-[calc(598px*2+80px)]">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              className="w-full"
              modules={[Navigation, Pagination]}
              slidesPerView="auto"
              spaceBetween={50}
              onSlideChange={(swiper) => setCurrentPage(swiper.realIndex)}
            >
              {petProfiles.length === 0 && (
                <SwiperSlide className="!w-[590px]">
                  <Card className="my-7 ml-4 flex h-20 w-full max-w-150 flex-col items-center justify-center p-0 sm:h-[308px] dark:bg-[#343434]">
                    <Image
                      src={alternativeImage}
                      alt="등록된 강아지가 없어요"
                    />
                    <span className="mt-4 text-[var(--color-grey)]">
                      등록된 강아지가 없어요
                    </span>
                  </Card>
                </SwiperSlide>
              )}
              {petProfiles &&
                sortedProfiles.map((profile, index) => (
                  <SwiperSlide key={index} className="!w-[590px]">
                    <DogProfileCard profile={profile} />
                  </SwiperSlide>
                ))}
              {isMyProfile && (
                <SwiperSlide className="!w-[590px]">
                  <RegistCard openModal={toggleProfileModal} />
                </SwiperSlide>
              )}
              <SwiperSlide></SwiperSlide>
            </Swiper>
            <button
              ref={nextRef}
              className={twMerge(
                'absolute top-1/2 right-0 z-50 -translate-y-1/2',
                petProfiles.length <= 1 ||
                  currentPage === petProfiles.length - 1
                  ? 'hidden'
                  : '',
              )}
            >
              <Icon
                width="12px"
                height="20px"
                left="-152px"
                top="-164px"
                className="cursor-pointer"
              />
            </button>
          </div>
          {isProfileModalOpen &&
            isMyProfile &&
            createPortal(
              <DogProfileEdit closeModal={toggleProfileModal} petId={0} />,
              document.body,
            )}
        </div>
      )}
    </div>
  );
}
