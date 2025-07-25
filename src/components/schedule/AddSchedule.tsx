import { twMerge } from 'tailwind-merge';
import Button from '../common/Button';
import Icon from '../common/Icon';
import SelectBox from '../common/SelectBox';
import DateInput from '../common/DateInput';
import { useState } from 'react';

export default function AddSchedule({
  closeModal,
  isStart,
  isEdit,
  fullDate,
  // schedule,
}: {
  closeModal?: () => void;
  isStart?: boolean;
  isEdit?: boolean;
  fullDate?: Date | undefined;
  schedule?: Schedule;
}) {
  if (isEdit) {
    // 수정이면 기존 데이터 불러오기(sId)
  }

  // api - 강아지 리스트 불러오기
  const options = [
    { value: '0', label: '이마음' },
    { value: '1', label: '이구름' },
    { value: '2', label: '이솜' },
  ];

  const cycles = [
    { value: 'NONE', label: '없음' },
    { value: 'WEEK', label: '매주' },
    { value: 'ONE_MONTH', label: '매달' },
    { value: 'THREE_MONTH', label: '매분기' },
    { value: 'SIX_MONTH', label: '반년' },
    { value: 'YEAR', label: '매년' },
  ];

  // const [name, setName] = useState('');
  const [date, setDate] = useState<Date | undefined>(fullDate);

  const [petId, setPetId] = useState('0');
  const [cycle, setCycle] = useState('NONE');
  const [cycleEnd, setCycleEnd] = useState<Date | undefined>(fullDate);

  console.log('petId: ', petId);
  console.log('cycle: ', cycle);

  return (
    <>
      <div
        className={twMerge(
          `absolute inset-0 z-500 bg-[var(--color-black)] opacity-50 ${isStart ? '' : 'sm:hidden'}`,
        )}
        onClick={closeModal}
      />
      <div className="absolute top-1/2 left-1/2 z-501 h-[348px] w-4/5 max-w-250 -translate-x-1/2 -translate-y-1/2 rounded-[30px] border-4 border-[var(--color-primary-200)] bg-[var(--color-background)] p-5 sm:h-[472px] sm:w-[570px] sm:p-8">
        <form className="relative flex h-full flex-col gap-4 text-sm leading-[1.2] sm:gap-7 sm:text-base">
          <div className="mb-1 flex w-full items-center justify-between">
            <h2 className="text-base font-extrabold">
              {isEdit ? '일정 수정' : '일정 추가'}
            </h2>
            <Icon
              className="mr-2 cursor-pointer"
              onClick={closeModal}
              width="16px"
              height="16px"
              left="-302px"
              top="-202px"
            />
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
            <DateInput
              selected={date}
              setSelected={setDate}
              className="w-33 p-0"
            />
            {/* <span>2025. 7. 6</span>
            <Icon
              className="ml-[14px] scale-80"
              width="20px"
              height="20px"
              left="-188px"
              top="-123px"
            /> */}
          </div>
          <div className="flex items-center">
            <span className="inline-block w-[57px] sm:w-20">강아지</span>
            <SelectBox
              options={options}
              width="90px"
              footstep
              value={petId}
              setValue={setPetId}
            />
          </div>
          <div className="flex items-center">
            <span className="inline-block w-[57px] sm:w-20">반복</span>
            <SelectBox
              options={cycles}
              width="80px"
              isCenter
              value={cycle}
              setValue={setCycle}
            />
          </div>
          {}
          <div className="flex items-center">
            <span className="mr-4">반복 종료일</span>
            <DateInput
              selected={cycleEnd}
              setSelected={setCycleEnd}
              className="w-33 p-0"
            />
            {/* <span>2025. 7. 6</span>
            <Icon
              className="ml-[14px] scale-80"
              width="20px"
              height="20px"
              left="-188px"
              top="-123px"
            /> */}
          </div>

          {isEdit && (
            <div className="flex gap-4">
              <label className="flex items-center justify-center gap-2">
                <input type="radio" name="cycleLink" value="false" />이 일정에만
                적용
              </label>

              <label className="flex items-center justify-center gap-2">
                <input type="radio" name="cycleLink" value="true" />
                반복되는 모든 일정에 적용
              </label>
            </div>
          )}

          <Button className="absolute bottom-0 h-10 w-25 self-center text-sm">
            {isEdit ? '수정하기' : '저장하기'}
          </Button>
        </form>
      </div>
    </>
  );
}
