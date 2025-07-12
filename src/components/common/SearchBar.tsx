import Icon from './Icon';
import SelectBox from './SelectBox';

export default function SearchBar({
  options,
}: {
  options?: {
    value: string;
    label: string;
  }[];
}) {
  return (
    <>
      <div className="bg-opacity-100 relative hidden h-[40px] items-center rounded-[10px] border-[3px] border-[#FFDBAB] sm:flex">
        <div className="pl-4">
          {options && <SelectBox width={'125px'} options={options} />}
        </div>
        <input
          className="h-[40px] w-[250px] focus:outline-none"
          placeholder="검색어를 입력해주세요"
        />
        <Icon
          width="18px"
          height="18px"
          left="-263px"
          top="-124px"
          className="absolute right-3 cursor-pointer"
        />
      </div>
    </>
  );
}
