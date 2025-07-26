type DiaryPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

import Icon from '../common/Icon';

export default function DiaryPagination({
  currentPage,
  totalPages,
  onPageChange,
}: DiaryPaginationProps) {
  const pagesPerGroup = 5;
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(currentGroup * pagesPerGroup, totalPages);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <div className="fixed bottom-0 left-0 z-50 mt-6 flex w-full items-center justify-center gap-5 bg-[var(--color-background)] py-3 pb-5 sm:static sm:mt-5 sm:gap-6 sm:pb-0">
      {/* prev group */}
      {totalPages > pagesPerGroup && (
        <button
          onClick={() => onPageChange(startPage - 1)}
          disabled={currentGroup === 1}
          className="flex h-4 items-center justify-center disabled:cursor-auto"
        >
          <Icon
            width="11px"
            height="14px"
            left="-383px"
            top="-199px"
            className="hidden sm:block"
          />
          <Icon
            width="8px"
            height="10px"
            left="-436px"
            top="-202px"
            className="block sm:hidden"
          />
        </button>
      )}
      {/* page numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex h-4 cursor-pointer items-center justify-center text-xs sm:text-sm ${
            currentPage === page
              ? 'font-bold text-[var(--color-primary-500)]'
              : ''
          }`}
        >
          {page}
        </button>
      ))}

      {/* next group */}
      {totalPages > pagesPerGroup && (
        <button
          onClick={() => onPageChange(endPage + 1)}
          disabled={endPage >= totalPages}
          className="flex h-4 items-center justify-center disabled:cursor-auto"
        >
          <Icon
            width="11px"
            height="14px"
            left="-407px"
            top="-199px"
            className="hidden sm:block"
          />
          <Icon
            width="8px"
            height="10px"
            left="-456px"
            top="-202px"
            className="block sm:hidden"
          />
        </button>
      )}
    </div>
  );
}
