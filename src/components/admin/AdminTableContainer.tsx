'use client';

import { useState } from 'react';
import AdminTable from './AdminTable';
import Pagenation from './Pagination';
import SearchBar from '../common/SearchBar';

export default function AdminTableContainer() {
  const [active, setActive] = useState('user');

  return (
    <>
      {/* List 메뉴 */}
      <div className="mt-15 flex justify-center gap-20 text-2xl">
        <h1
          onClick={() => setActive('user')}
          className={`cursor-pointer ${
            active === 'user'
              ? `text-[var(--color-primary-500)] underline underline-offset-[12px]`
              : ''
          }`}
        >
          회원관리
        </h1>
        <h1
          onClick={() => setActive('report')}
          className={`cursor-pointer ${
            active === 'report'
              ? `text-[var(--color-primary-500)] underline underline-offset-[12px]`
              : ''
          }`}
        >
          신고내역
        </h1>
      </div>

      <div className="mt-10 flex justify-center">
        <div>
          {/* List 검색 */}
          <div className="mb-6 w-76">
            <SearchBar />
          </div>

          {/* 목록(List) */}
          <AdminTable type={active} />
        </div>
      </div>

      {/* 페이지네이션 */}
      <Pagenation />
    </>
  );
}
