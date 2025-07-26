import Icon from '@/components/common/Icon';
import SelectBox from '@/components/common/SelectBox';

type Props = WalkEntry & {
  onChange: (field: keyof WalkEntry, value: string) => void;
  onDelete: () => void;
};

export default function WalkingInputItem({
  startHour,
  startMinute,
  endHour,
  endMinute,
  pace,
  onChange,
  onDelete,
}: Props) {
  const paceOptions = [
    { value: '1', label: '가볍게' },
    { value: '2', label: '적당히' },
    { value: '3', label: '힘차게' },
  ];

  return (
    <div className="flex h-9 w-full shrink-0 items-center gap-1 text-xs sm:justify-between sm:text-sm">
      {/* start time */}
      <div className="flex flex-nowrap items-center gap-1 sm:gap-0">
        <input
          className="input-style mr-0 w-11 py-1 text-center leading-[1.2] focus:outline-[var(--color-primary-500)] sm:mr-1"
          type="text"
          placeholder="시"
          maxLength={2}
          value={startHour}
          onChange={(e) => onChange('startHour', e.target.value)}
        />
        <span className="hidden sm:mr-2 sm:block">시</span>
        <span className="mx-[2px] block sm:mx-1 sm:hidden">:</span>
        <input
          className="input-style mr-0 w-11 py-1 text-center leading-[1.2] focus:outline-[var(--color-primary-500)] sm:mr-1"
          type="text"
          placeholder="분"
          maxLength={2}
          value={startMinute}
          onChange={(e) => onChange('startMinute', e.target.value)}
        />
        <span className="hidden sm:block">분</span>
      </div>

      <span className="mx-1 sm:mx-2">~</span>

      {/* end time */}
      <div className="flex items-center gap-1 sm:gap-0">
        <input
          className="input-style mr-0 w-11 py-1 text-center leading-[1.2] focus:outline-[var(--color-primary-500)] sm:mr-1"
          type="text"
          placeholder="시"
          maxLength={2}
          value={endHour}
          onChange={(e) => onChange('endHour', e.target.value)}
        />
        <span className="hidden sm:mr-2 sm:block">시</span>
        <span className="mx-[2px] block sm:mx-1 sm:hidden">:</span>
        <input
          className="input-style mr-1 w-11 py-1 text-center leading-[1.2] focus:outline-[var(--color-primary-500)]"
          type="text"
          placeholder="분"
          maxLength={2}
          value={endMinute}
          onChange={(e) => onChange('endMinute', e.target.value)}
        />
        <span className="mr-2 hidden sm:mr-3 sm:block">분</span>
      </div>

      {/* walking pace */}
      <SelectBox
        value={pace}
        setValue={(val) => onChange('pace', val)}
        options={paceOptions}
        width="70px"
        borderColor="var(--color-primary-500)"
        isCenter
      />

      {/* input item delete button */}
      <Icon
        className="cursor-pointer"
        width="20px"
        height="20px"
        left="-340px"
        top="-256px"
        onClick={onDelete}
      />
    </div>
  );
}
