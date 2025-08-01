import Card from '@/components/common/Card';
import Icon from '@/components/common/Icon';

export default function RegistCard({ openModal }: { openModal: () => void }) {
  return (
    <div className="pr-10" onClick={openModal}>
      <Card className="card__hover my-7 ml-4 flex h-20 max-w-150 items-center justify-center p-0 sm:h-[308px] dark:bg-[#343434]">
        <Icon
          className="hidden sm:block"
          width="47px"
          height="47px"
          left="-26px"
          top="-242px"
        />
        <Icon
          className="block sm:hidden"
          width="20px"
          height="20px"
          left="-266px"
          top="-75px"
        />
      </Card>
    </div>
  );
}
