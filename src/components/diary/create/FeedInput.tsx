import DiaryCard from '../DiaryCard';
import FeedInputItem from './FeedInputItem';

type Props = {
  feedingList: FeedEntry[];
  setFeedingList: (list: FeedEntry[]) => void;
  feedUnitOptions: { label: string; value: string }[];
};

export default function FeedInput({
  feedingList,
  setFeedingList,
  feedUnitOptions,
}: Props) {
  const updateField = (
    index: number,
    field: keyof FeedEntry,
    value: string,
  ) => {
    const newList = [...feedingList];
    newList[index][field] = value;
    setFeedingList(newList);
  };

  const handleAddRow = () => {
    const lastUnit = feedingList[feedingList.length - 1]?.unit || 'GRAM';
    setFeedingList([
      ...feedingList,
      { hour: '', minute: '', amount: '', unit: lastUnit },
    ]);
  };

  const handleDeleteRow = (index: number) => {
    const newList = [...feedingList];
    newList.splice(index, 1);
    setFeedingList(newList);
  };
  return (
    <DiaryCard
      className="min-h-50 sm:h-71"
      title="식사량"
      hasAddBtn
      onAddBtnClick={handleAddRow}
    >
      <div className="scrollbar-hidden flex h-full w-full flex-col gap-2 overflow-y-auto">
        {feedingList.map((entry, i) => (
          <FeedInputItem
            key={i}
            hour={entry.hour}
            minute={entry.minute}
            amount={entry.amount}
            unit={entry.unit}
            onChange={(field, value) => updateField(i, field, value)}
            onDelete={() => handleDeleteRow(i)}
            feedUnitOptions={feedUnitOptions}
          />
        ))}
      </div>
    </DiaryCard>
  );
}
