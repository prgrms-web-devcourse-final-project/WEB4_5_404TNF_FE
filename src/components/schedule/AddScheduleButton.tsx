'use client';
import Icon from '../common/Icon';

export default function AddScheduleButton() {
  // const [portalElement, setPortalElement] = useState<Element | null>(null);

  // useEffect(() => {
  //   setPortalElement(document.querySelector('#schedule-container'));
  // }, []);
  return (
    <>
      <div className="fixed right-4 bottom-4 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[var(--color-primary-300)] sm:hidden">
        <Icon width="20px" height="20px" left="-266px" top="-75px" />
      </div>
      {/* {portalElement && createPortal(<AddSchedule />, portalElement)} */}
    </>
  );
}
