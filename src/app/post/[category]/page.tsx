import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import SearchBar from '@/components/common/SearchBar';
import SelectBox from '@/components/common/SelectBox';
import PostCard from '@/components/post/PostCard';
import SearchButton from '@/components/post/SearchButton';

const SORT = [
  { value: '최신순', label: '최신순' },
  { value: '좋아요순', label: '좋아요순' },
  { value: '조회수순', label: '조회수순' },
];

const SEARCH_LIST = [
  { value: '제목 + 내용', label: '제목 + 내용' },
  { value: '제목', label: '제목' },
  { value: '내용', label: '내용' },
  { value: '작성자', label: '작성자' },
];

export default async function Board() {
  return (
    <>
      <div className="flex h-screen w-full max-w-[1548px] flex-col overflow-hidden rounded-[50px] bg-[var(--color-background)] px-5 sm:h-[800px]">
        {/* 상단 버튼 영역 */}
        <div className="flex flex-none justify-center gap-3 pt-6 sm:gap-9 sm:pt-5">
          <Button className="board__btn">
            <Icon
              width="20px"
              height="20px"
              left="-27px"
              top="-165px"
              className="scale-60 sm:scale-100"
            />
            <p className="text-[10px] sm:text-[18px]">질문게시판</p>
          </Button>
          <Button className="board__btn">
            <Icon
              width="20px"
              height="20px"
              left="-67px"
              top="-166px"
              className="scale-60 sm:scale-100"
            />
            <p className="text-[10px] sm:text-[18px]">자유게시판</p>
          </Button>
        </div>

        {/* 검색 및 정렬 영역 */}
        <div className="mt-[31px] flex flex-none items-center justify-between sm:pl-[120px]">
          <SearchBar options={SEARCH_LIST} />
          <div className="flex items-center gap-8 pr-[70px]">
            <SelectBox width={'110px'} options={SORT} />

            <SearchButton />
            <div className="fixed right-4 bottom-4 z-10 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-[var(--color-primary-300)] sm:static sm:right-auto sm:bottom-auto sm:z-auto">
              <Icon width="20px" height="20px" left="-266px" top="-75px" />
            </div>
          </div>
        </div>

        {/* 내부 스크롤 영역 */}
        <div className="scrollbar-hidden mt-[25px] flex-1 space-y-5 overflow-y-auto pr-2 pb-[20px] sm:space-y-10 sm:pl-[120px]">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
    </>
  );
}
