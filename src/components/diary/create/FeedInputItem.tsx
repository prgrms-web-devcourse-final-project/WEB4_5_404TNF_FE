import SelectBox from '@/components/common/SelectBox';
import Icon from '@/components/common/Icon';

type Props = FeedEntry & {
  onChange: (field: keyof FeedEntry, value: string) => void;
  onDelete: () => void;
  feedUnitOptions: { label: string; value: string }[];
};

export default function FeedInputItem({
  hour,
  minute,
  amount,
  unit,
  onChange,
  onDelete,
  feedUnitOptions,
}: Props) {
  return (
    <div className="flex h-9 w-full shrink-0 items-center justify-between text-xs sm:text-sm">
      <div className="flex w-full items-center">
        <input
          className="input-style mr-1 w-11 py-1 text-center leading-[1.2] focus:outline-[var(--color-primary-500)]"
          type="text"
          placeholder="시"
          maxLength={2}
          value={hour}
          onChange={(e) => onChange('hour', e.target.value)}
        />
        <span className="mr-2">시</span>
        {/* <span className="mx-1">:</span> */}
        <input
          className="input-style mr-1 w-11 py-1 text-center leading-[1.2] focus:outline-[var(--color-primary-500)]"
          type="text"
          placeholder="분"
          maxLength={2}
          value={minute}
          onChange={(e) => onChange('minute', e.target.value)}
        />
        <span className="mr-3">분</span>
        <div className="flex items-center gap-2">
          <input
            className="input-style w-14 py-1 text-center leading-[1.2] focus:outline-[var(--color-primary-500)]"
            type="text"
            placeholder="급여량"
            maxLength={3}
            value={amount}
            onChange={(e) => onChange('amount', e.target.value)}
          />
          <SelectBox
            value={unit}
            setValue={(val) => onChange('unit', val)}
            options={feedUnitOptions}
            width="65px"
            borderColor="var(--color-primary-500)"
            isCenter
          />
        </div>
      </div>
      <div className="ml-2 flex min-w-[20px] items-center justify-center">
        <Icon
          className="cursor-pointer"
          width="20px"
          height="20px"
          left="-340px"
          top="-256px"
          onClick={onDelete}
        />
      </div>
    </div>
  );
}
