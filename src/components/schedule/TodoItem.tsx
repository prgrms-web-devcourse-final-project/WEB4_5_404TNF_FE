'use client';
import { useDeleteSchedule } from '@/lib/hooks/schedule/useDeleteSchedule';
import { useRef, useState } from 'react';
import Icon from '../common/Icon';
import PopupMenu from '../common/PopupMenu';
import PopupMenuPortal from '../common/PopupMenuPortal';
import Confirm from '../common/Confirm';
import AddSchedule from './AddSchedule';

export default function TodoItem({
  name,
  schedule,
  type,
}: {
  name?: string;
  schedule?: Schedule;
  type?: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmOptions, setConfirmOptions] = useState<{
    description: string;
    confirmText: string;
    onConfirm: () => void;
  } | null>(null);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const { mutate: deleteSchedule } = useDeleteSchedule();

  const buttonRef = useRef<HTMLDivElement>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const openMenu = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPopupPosition({
        top: rect.top + window.scrollY + 15,
        left: rect.left + window.scrollX - 125,
      });
    }

    setIsMenuOpen((prev) => !prev);
  };

  const openConfirm = (
    description: string,
    confirmText: string,
    onConfirm: () => void,
  ) => {
    setConfirmOptions({ description, confirmText, onConfirm });
    setShowConfirm(true);
  };

  const handleSelect = (label: string) => {
    if (label === '기본일정') {
      openConfirm('일정을 삭제하시겠습니까?', '확인', () => deleteTodo(true));
      // const res = confirm('일정을 삭제하시겠습니까?');

      // if (res) {
      //   deleteTodo(true);
      // }
    } else if (label === '이 일정만 삭제') {
      openConfirm('일정을 삭제하시겠습니까?', '확인', () => deleteTodo(false));

      // const res = confirm('일정을 삭제하시겠습니까?');

      // if (res) {
      //   deleteTodo(false);
      // }
    } else {
      openConfirm('모든 반복 일정을 삭제하시겠습니까?', '확인', () =>
        deleteTodo(true),
      );

      // const res = confirm('모든 반복 일정을 삭제하시겠습니까?');

      // if (res) {
      //   deleteTodo(true);
      // }
    }

    setIsMenuOpen(false);
  };

  // 일정 삭제
  const deleteTodo = (cycleLink: boolean) => {
    if (schedule?.scheduleId) {
      deleteSchedule({
        scheduleId: schedule?.scheduleId,
        cycleLink: cycleLink,
      });
    } else {
      return;
    }
  };

  return (
    <>
      <li className="flex w-full cursor-default items-center justify-between border-b border-[var(--color-primary-300)] p-3">
        <div className="flex items-center justify-center">
          <div className="mr-2 max-w-[80px] truncate rounded-[8px] bg-[var(--color-primary-300)] px-2 py-1 text-sm dark:text-[var(--color-black)]">
            {schedule?.petName}
          </div>

          <span className="max-w-[340px] truncate">
            {name ? name : schedule?.name}
          </span>
        </div>
        <div className="relative flex gap-4">
          <Icon
            className="cursor-pointer"
            onClick={() => setIsModalOpen(true)}
            width="14px"
            height="14px"
            left="-225px"
            top="-168px"
          />
          <div
            ref={buttonRef}
            onClick={(e) => {
              e.stopPropagation();

              if (schedule?.cycle === 'NONE') {
                handleSelect('기본일정');
              } else {
                if (type === 'mobile') {
                  openMenu();
                } else {
                  setIsMenuOpen((prev) => !prev);
                }
              }
            }}
            className="cursor-pointer"
          >
            <Icon width="14px" height="14px" left="-266px" top="-167px" />
          </div>

          {/* {isMenuOpen && (
            <div className="absolute top-3 left-13 z-50">
              <PopupMenu
                options={[
                  { id: '0', label: '이 일정만 삭제', type: 'delete' },
                  { id: '1', label: '반복 일정 전체 삭제', type: 'delete' },
                ]}
                onSelect={handleSelect}
                onClose={() => setIsMenuOpen(false)}
                className={'text-[var(--color-black)]'}
              />
            </div>
          )} */}

          {isMenuOpen &&
            (type === 'mobile' ? (
              <PopupMenuPortal
                options={[
                  { id: '0', label: '이 일정만 삭제' },
                  { id: '1', label: '반복 일정 전체 삭제' },
                ]}
                onSelect={handleSelect}
                onClose={() => setIsMenuOpen(false)}
                position={popupPosition}
                triggerRef={buttonRef}
              />
            ) : (
              <div className="absolute top-3 left-13 z-50">
                <PopupMenu
                  options={[
                    { id: '0', label: '이 일정만 삭제', type: 'delete' },
                    { id: '1', label: '반복 일정 전체 삭제', type: 'delete' },
                  ]}
                  onSelect={handleSelect}
                  onClose={() => setIsMenuOpen(false)}
                  className={'text-[var(--color-black)]'}
                />
              </div>
            ))}
        </div>
      </li>

      {isModalOpen && (
        <AddSchedule
          closeModal={closeModal}
          isStart={false}
          isEdit={true}
          schedule={schedule}
        />
      )}

      {confirmOptions && showConfirm && (
        <Confirm
          description={confirmOptions.description}
          confirmText="확인"
          onClose={() => setShowConfirm(false)}
          onConfirm={() => {
            confirmOptions.onConfirm();
            setShowConfirm(false);
          }}
          className="sm:-top-1 sm:-left-1 sm:h-[472px] sm:w-[570px] sm:rounded-[30px]"
        />
      )}
    </>
  );
}
