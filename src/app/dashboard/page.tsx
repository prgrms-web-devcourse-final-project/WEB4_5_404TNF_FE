import FeedCard from '@/components/dashboard/FeedCard';
import NoteCard from '@/components/dashboard/NoteCard';
import ProfileCard from '@/components/dashboard/ProfileCard';
import TodoCard from '@/components/dashboard/TodoCard';
import WalkCard from '@/components/dashboard/WalkCard';
import LineGraphCard from '@/components/dashboard/graph/LineGraphCard';

import speechBubbleMobile from '@/assets/images/speech-bubble-mobile.svg';
import speechBubble from '@/assets/images/speech-bubble.png';
import SelectBox from '@/components/common/SelectBox';
import Image from 'next/image';

export default async function Dashboard() {
  const weightDataset = [
    { date: '2025-07-01', value: 10.5 },
    { date: '2025-07-02', value: 10.8 },
    { date: '2025-07-03', value: 11.2 },
    { date: '2025-07-04', value: 12.0 },
    { date: '2025-07-05', value: 11.9 },
    { date: '2025-07-06', value: 11.2 },
    { date: '2025-07-07', value: 11.0 },
  ];

  const sleepDataset = [
    { date: '2025-07-01', value: 1.5 },
    { date: '2025-07-02', value: 0.8 },
    { date: '2025-07-03', value: 1.2 },
    { date: '2025-07-04', value: 2.0 },
    { date: '2025-07-05', value: 0.9 },
    { date: '2025-07-06', value: 1.2 },
    { date: '2025-07-07', value: 1.0 },
  ];

  const options = [
    { value: '이마음', label: '이마음' },
    { value: '이구름', label: '이구름' },
    { value: '이솜', label: '이솜' },
  ];

  return (
    <main className="relative h-full px-[26px] py-6 sm:px-12 sm:py-7">
      <div className="flex items-center justify-between sm:mb-7">
        <h2 className="hidden text-xl font-bold sm:block">
          마음이는 평균보다 3kg 무거워요! 다이어트가 필요하니 간식을 줄여보는 건
          어떨까요?
        </h2>
      </div>
      <div className="absolute top-7 right-[65px] hidden self-end text-base sm:block">
        <SelectBox options={options} width="105px" footstep />
      </div>
      <div className="flex flex-wrap gap-5 pb-7 sm:gap-8 sm:pb-0">
        <div className="relative w-full text-sm font-medium sm:hidden sm:text-xl">
          <Image
            className="h-auto w-full max-w-[558px]"
            src={speechBubbleMobile}
            alt="말풍선"
            width={558}
            height={98}
          />
          <div className="absolute top-[20%] left-1/2 w-full max-w-105 -translate-x-1/2 px-14 min-[500px]:text-lg">
            요즘은 시원해서 산책할 때 기분이 아주아주 좋아요!
          </div>
        </div>
        <div className="flex w-full flex-col gap-5 sm:w-[520px] sm:gap-8">
          <ProfileCard />
          <LineGraphCard title="몸무게" dataset={weightDataset} />
          <LineGraphCard title="수면시간" dataset={sleepDataset} />
        </div>
        <div className="flex w-full flex-col gap-5 sm:w-[558px] sm:gap-8">
          <div className="relative hidden text-xl font-medium sm:block">
            <Image
              className="h-auto w-full max-w-[558px]"
              src={speechBubble}
              alt="말풍선"
              width={558}
              height={98}
            />
            <div className="absolute top-1/2 left-1/2 w-full max-w-105 -translate-x-1/2 -translate-y-1/2">
              요즘은 시원해서 산책할 때 기분이 아주아주 좋아요!
            </div>
          </div>
          <div className="flex items-center justify-between gap-5 sm:gap-8">
            <FeedCard />
            <TodoCard />
          </div>
          <NoteCard />
        </div>
        <WalkCard />
      </div>
    </main>
  );
}
