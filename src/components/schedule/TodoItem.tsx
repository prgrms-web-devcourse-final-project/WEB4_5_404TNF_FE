import Icon from '../common/Icon';

export default function TodoItem({ name }: { name: string }) {
  return (
    <li className="flex w-full items-center justify-between border-b border-[var(--color-primary-300)] p-3">
      <span>{name}</span>
      <div className="flex gap-5">
        <Icon
          className="cursor-pointer"
          width="14px"
          height="14px"
          left="-225px"
          top="-168px"
        />
        <Icon
          className="cursor-pointer"
          width="14px"
          height="14px"
          left="-266px"
          top="-167px"
        />
      </div>
    </li>
  );
}
