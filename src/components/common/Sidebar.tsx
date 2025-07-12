'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';
{
  /* 156,122 */
}
export default function Sidebar() {
  const pathname = usePathname();
  return (
    <>
      <div className="fixed z-200 hidden h-full w-60 flex-col items-center overflow-x-hidden overflow-y-auto bg-[var(--color-primary-100)] p-8 text-[#2B2926] sm:relative sm:my-[5.2vh] sm:ml-14 sm:flex sm:h-[calc(89.4vh)] sm:w-[220px] sm:rounded-[50px] sm:bg-[#FFFDF7]">
        {/* <div className="relative h-[13.2vh] w-[8.17vw]">
          <Image
            className="hidden object-contain sm:block"
            src="/images/logo.png"
            alt="멍멍일지 로고"
            fill
            priority
          />
        </div> */}

        <Image
          className="hidden sm:block"
          src="/images/logo.png"
          alt="멍멍일지 로고"
          width={156}
          height={122}
          priority
        />

        <Image
          className="block sm:hidden"
          src="/images/logo.png"
          alt="멍멍일지 로고"
          width={100}
          height={78}
          priority
        />

        <div className="flex flex-col justify-between sm:h-[calc(89.4vh-122.5px)]">
          <div className="mt-12 text-sm font-medium sm:text-[16px]">
            {/* 대시보드 */}
            <Link
              href={'/dashboard'}
              className={`sidebar__content group relative ${pathname === '/dashboard' && 'sidebar__content-active'}`}
            >
              <div
                className={`absolute ${pathname === '/dashboard' && 'opacity-0'}`}
              >
                <Icon width="24px" height="24px" left="-26px" top="-23px" />
              </div>

              <div
                className={`absolute opacity-0 ${pathname === '/dashboard' && 'opacity-100'} `}
              >
                <Icon width="24px" height="24px" left="-28px" top="-310px" />
              </div>
              <p className="pl-10">대시보드</p>
            </Link>
            {/* 일정 */}

            <Link
              href={'/schedule'}
              className={`sidebar__content group relative ${pathname === '/schedule' && 'sidebar__content-active'}`}
            >
              <div
                className={`absolute ${pathname === '/schedule' && 'opacity-0'}`}
              >
                <Icon width="24px" height="24px" left="-66px" top="-21px" />
              </div>

              <div
                className={`absolute opacity-0 ${pathname === '/schedule' && 'opacity-100'} `}
              >
                <Icon width="24px" height="24px" left="-68px" top="-308px" />
              </div>
              <p className="pl-10">일정</p>
            </Link>
            {/* 댕댕일지 */}
            <Link
              href={'/diary'}
              className={`sidebar__content group relative ${pathname === '/diary' && 'sidebar__content-active'}`}
            >
              <div
                className={`absolute ${pathname === '/diary' && 'opacity-0'}`}
              >
                <Icon width="20px" height="24px" left="-108px" top="-19px" />
              </div>

              <div
                className={`absolute opacity-0 ${pathname === '/diary' && 'opacity-100'} `}
              >
                <Icon width="20px" height="24px" left="-110px" top="-306px" />
              </div>
              <p className="pl-10">댕댕일지</p>
            </Link>
            {/* 게시판 */}
            <Link
              href={'/post/question'}
              className={`sidebar__content group relative ${pathname.includes('/post') && 'sidebar__content-active'}`}
            >
              <div
                className={`absolute ${pathname.includes('/post') && 'opacity-0'}`}
              >
                <Icon width="28px" height="16px" left="-144px" top="-25px" />
              </div>

              <div
                className={`absolute opacity-0 ${pathname.includes('/post') && 'opacity-100'} `}
              >
                <Icon width="28px" height="16px" left="-146px" top="-312px" />
              </div>
              <p className="pl-10">게시판</p>
            </Link>
            {/* 가이드 */}
            <Link
              href={'/guide'}
              className={`sidebar__content group relative ${pathname === '/guide' && 'sidebar__content-active'}`}
            >
              <div
                className={`absolute ${pathname === '/guide' && 'opacity-0'}`}
              >
                <Icon width="25px" height="26px" left="-186px" top="-20px" />
              </div>

              <div
                className={`absolute opacity-0 ${pathname === '/guide' && 'opacity-100'} `}
              >
                <Icon width="25px" height="26px" left="-197px" top="-309px" />
              </div>
              <p className="pl-10">멍초보가이드</p>
            </Link>

            {/* 관리자 */}
            <Link
              href={'/admin'}
              className={`sidebar__content group relative ${pathname.startsWith('/admin') && 'sidebar__content-active'}`}
            >
              <div
                className={`absolute ${pathname === '/admin' && 'opacity-0'}`}
              >
                <Icon width="24px" height="26px" left="-342px" top="-20px" />
              </div>

              <div
                className={`absolute opacity-0 ${pathname.startsWith('/admin') && 'opacity-100'} `}
              >
                <Icon width="24px" height="26px" left="-382px" top="-20px" />
              </div>
              <p className="pl-10">관리자페이지</p>
            </Link>
          </div>
          <div className="text-sm font-medium sm:text-[16px]">
            <div className="flex h-[52px] w-[220px] cursor-pointer items-center gap-3 py-3 pl-6">
              <Icon width="24px" height="26px" left="-297px" top="-252px" />
              <p>설정</p>
            </div>
            <div className="flex h-[52px] w-[220px] cursor-pointer items-center gap-3 py-3 pl-6">
              <Icon width="28px" height="28px" left="-264px" top="-18px" />
              <p>로그아웃</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
