import Card from '../common/Card';
import Icon from '../common/Icon';
import TodoItem from './TodoItem';

export default function TodoList({ type }: { type: 'card' | 'modal' }) {
  if (type === 'card') {
    return (
      <Card className="mt-8 max-h-70 min-h-31 w-full text-sm sm:hidden">
        <div className="mb-3 flex justify-between text-[var(--color-grey)]">
          <span>일정 목록</span>
          <span>2025. 7. 5</span>
        </div>
        <ul className="scrollbar-hidden flex max-h-55 flex-col items-center overflow-y-scroll">
          {/* <Image
                className="mt-5"
                src={alternative}
                alt="대체 이미지"
                width={40}
                height={28}
                priority
                />
                <span className="mt-2 mb-3 text-[var(--color-grey)]">
                등록된 일정이 없습니다
                </span> */}
          <TodoItem name="할 일1" />
          <TodoItem name="할 일2" />
          <TodoItem name="할 일3" />
          <TodoItem name="할 일4" />
        </ul>
      </Card>
    );
  } else if (type === 'modal') {
    return (
      <>
        <div className="absolute inset-0 z-101 bg-[var(--color-black)] opacity-50" />
        <div className="absolute top-1/2 left-1/2 z-102 h-[348px] w-4/5 max-w-250 -translate-x-1/2 -translate-y-1/2 rounded-[30px] border-4 border-[var(--color-primary-200)] bg-[var(--color-background)] p-5 sm:h-[472px] sm:w-[570px] sm:p-8">
          <div className="mb-6 flex w-full items-center justify-between pr-2">
            <h2 className="text-base font-extrabold">2025. 7. 7 일정</h2>
            <div className="flex items-center gap-12">
              <span className="cursor-pointer text-sm text-[var(--color-primary-500)]">
                + 추가하기
              </span>
              <Icon
                className="cursor-pointer"
                width="16px"
                height="16px"
                left="-302px"
                top="-202px"
              />
            </div>
          </div>
          {/* <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
            <Image
              className="mb-5"
              src={alternative}
              alt="대체 이미지"
              width={100}
              height={67}
              priority
            />
            <span className="text-[var(--color-grey)]">
              등록된 일정이 없습니다
            </span>
          </div> */}
          <ul>
            <TodoItem name="아침에 약 먹이기" />
            <TodoItem name="기쁨이 만나서 공원가기" />
            <TodoItem name="사료 주문하기" />
            <TodoItem name="귀 세정" />
          </ul>
        </div>
      </>
    );
  }
}
