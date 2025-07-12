import { useState } from 'react';
import Icon from '../common/Icon';

export default function Pagenation() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGroup, setCurrentGroup] = useState(1);

  const postsPerPage = 10;
  const pagesPerGroup = 5;
  const totalPosts = 100;

  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const totalGroups = Math.ceil(totalPages / pagesPerGroup);

  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(currentGroup * pagesPerGroup, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="mt-8 flex items-center justify-center gap-6">
        {/* 이전 버튼 */}
        <button
          onClick={() => setCurrentGroup((prev) => Math.max(prev - 1, 1))}
          disabled={currentGroup === 1}
          className="flex h-4 cursor-pointer items-center justify-center disabled:cursor-auto"
        >
          <Icon width="11px" height="14px" left="-383px" top="-199px" />
        </button>

        {/* 페이지 number */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`flex h-4 items-center justify-center align-middle ${currentPage === page ? 'font-bold text-[var(--color-primary-500)]' : ''} cursor-pointer`}
          >
            {page}
          </button>
        ))}

        {/* 다음 버튼 */}
        <button
          onClick={() =>
            setCurrentGroup((prev) => Math.min(prev + 1, totalGroups))
          }
          disabled={currentGroup === totalGroups}
          className="cursor-pointer disabled:cursor-auto"
        >
          <Icon width="11px" height="14px" left="-407px" top="-199px" />
        </button>
      </div>
    </>
  );
}
