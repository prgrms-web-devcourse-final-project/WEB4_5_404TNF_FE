import Button from '../common/Button';
import Icon from '../common/Icon';
import SelectBox from '../common/SelectBox';

export default function AddSchedule() {
  const options = [
    { value: '이마음', label: '이마음' },
    { value: '이구름', label: '이구름' },
    { value: '이솜', label: '이솜' },
  ];

  const cycles = [
    { value: 'WEEK', label: '매주' },
    { value: 'ONE_MONTH', label: '매달' },
    { value: 'THREE_MONTH', label: '매분기' },
    { value: 'SIX_MONTH', label: '반년' },
    { value: 'YEAR', label: '매년' },
  ];
  return (
    <>
      <div className="absolute inset-0 z-101 bg-[var(--color-black)] opacity-50" />
      <div className="absolute top-1/2 left-1/2 z-102 h-[348px] w-4/5 max-w-250 -translate-x-1/2 -translate-y-1/2 rounded-[30px] border-4 border-[var(--color-primary-200)] bg-[var(--color-background)] p-5 sm:h-[472px] sm:w-[570px] sm:p-8">
        <form className="relative flex h-full flex-col gap-4 text-sm leading-[1.2] sm:gap-7 sm:text-lg">
          <div className="mb-1 flex w-full items-center justify-between">
            <h2 className="text-base font-extrabold">일정추가</h2>
            <Icon width="12px" height="12px" left="-72px" top="-126px" />
          </div>
          <div className="flex items-center justify-between">
            <label className="block w-13 sm:w-20" htmlFor="todo">
              할 일
            </label>
            <input
              className="input-style w-full px-3 py-[11px]"
              type="text"
              placeholder="할 일을 입력하세요"
            />
          </div>
          <div className="flex">
            <span className="inline-block w-[57px] sm:w-20">날짜</span>
            <span>2025. 7. 6</span>
            <Icon
              className="ml-[14px] scale-80"
              width="20px"
              height="20px"
              left="-188px"
              top="-123px"
            />
          </div>
          <div className="flex items-center">
            <span className="inline-block w-[57px] sm:w-20">강아지</span>
            <SelectBox options={options} width="90px" footstep />
          </div>
          <div className="flex items-center">
            <span className="inline-block w-[57px] sm:w-20">반복</span>
            <SelectBox options={cycles} width="80px" isCenter />
          </div>
          <div className="flex items-center">
            <span className="mr-4">반복 종료일</span>
            <span>2025. 7. 6</span>
            <Icon
              className="ml-[14px] scale-80"
              width="20px"
              height="20px"
              left="-188px"
              top="-123px"
            />
          </div>
          <Button className="absolute bottom-0 h-10 w-25 self-center text-sm">
            저장하기
          </Button>
        </form>
      </div>
    </>
  );
}
