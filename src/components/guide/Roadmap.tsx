import roadmapMobile from '@/assets/images/guide-roadmap-mobile.svg';
import roadmap from '@/assets/images/guide-roadmap.svg';
import Image from 'next/image';
import RoadmapPoint from './RoadmapPoint';

export default function Roadmap() {
  return (
    <div className="absolute top-[55%] left-1/2 flex w-full -translate-x-1/2 -translate-y-2/5 justify-center sm:top-1/2 sm:-translate-y-1/3">
      <div className="relative select-none">
        <Image
          className="block sm:hidden"
          src={roadmapMobile}
          alt="로드맵"
          priority
        />

        <Image
          className="hidden sm:block"
          src={roadmap}
          alt="로드맵"
          priority
        />

        <ol className="text-center text-sm sm:text-base">
          <li className="absolute bottom-[95%] left-[27%] sm:bottom-[89%] sm:left-[20%]">
            <span className="relative mb-5 inline-block">1개월</span>
            <RoadmapPoint />
          </li>
          <li className="absolute bottom-[95%] left-[45%] sm:bottom-[89%] sm:left-[34.5%]">
            <div className="relative">
              <span className="relative mb-5 inline-block">2개월</span>
              <RoadmapPoint />
            </div>
          </li>
          <li className="absolute bottom-[95%] left-[63%] sm:bottom-[89%] sm:left-[49%]">
            <span className="relative mb-5 inline-block">3개월</span>
            <RoadmapPoint />
          </li>
          <li className="absolute bottom-[64%] left-[69%] sm:bottom-[89%] sm:left-[63.5%]">
            <span className="relative mb-5 inline-block">4개월</span>
            <RoadmapPoint />
          </li>
          <li className="absolute bottom-[64%] left-[53%] sm:bottom-[89%] sm:left-[78%]">
            <span className="relative mb-5 inline-block">5개월</span>
            <RoadmapPoint />
          </li>
          <li className="absolute bottom-[64%] left-[37%] sm:bottom-[46.6%] sm:left-[71.5%]">
            <span className="relative mb-5 inline-block">6개월</span>
            <RoadmapPoint />
          </li>
          <li className="absolute bottom-[64%] left-[21%] sm:bottom-[46.6%] sm:left-[57%]">
            <span className="relative mb-5 inline-block">7개월</span>
            <RoadmapPoint />
          </li>
          <li className="absolute bottom-[33%] left-[21%] sm:bottom-[46.6%] sm:left-[42.5%]">
            <span className="relative mb-5 inline-block">8개월</span>
            <RoadmapPoint />
          </li>
          <li className="absolute bottom-[33%] left-[37%] sm:bottom-[46.6%] sm:left-[27.5%]">
            <span className="relative mb-5 inline-block">9개월</span>
            <RoadmapPoint />
          </li>
          <li className="absolute bottom-[33%] left-[53%] sm:bottom-[4.2%] sm:left-[19.1%]">
            <span className="relative mb-5 inline-block">10개월</span>
            <RoadmapPoint />
          </li>
          <li className="absolute bottom-[33%] left-[69%] sm:bottom-[4.2%] sm:left-[33.6%]">
            <span className="relative mb-5 inline-block font-extrabold">
              11개월
            </span>
            <RoadmapPoint />
          </li>
          <li className="absolute bottom-[2.5%] left-[63%] sm:bottom-[4.2%] sm:left-[48.1%]">
            <span className="relative mb-5 inline-block">12개월</span>
            <RoadmapPoint />
          </li>
          <li className="absolute bottom-[2.5%] left-[45%] sm:bottom-[4.2%] sm:left-[62.6%]">
            <span className="relative mb-5 inline-block">13개월</span>
            <RoadmapPoint />
          </li>
          <li className="absolute bottom-[2.5%] left-[27%] sm:bottom-[4.2%] sm:left-[77.1%]">
            <span className="relative mb-5 inline-block">14개월</span>
            <RoadmapPoint />
          </li>
        </ol>
      </div>
    </div>
  );
}
