import Icon from '../common/Icon';

export default function SortArrow({
  active,
  order,
}: {
  active: boolean;
  order: 'asc' | 'desc';
}) {
  return (
    <>
      {active ? (
        order === 'asc' ? (
          <Icon width="10px" height="8px" left="-337px" top="-206px" />
        ) : (
          <Icon width="10px" height="8px" left="-361px" top="-206px" />
        )
      ) : (
        <Icon width="10px" height="8px" left="-337px" top="-206px" />
      )}
    </>
  );
}
