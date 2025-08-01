'use client';

import {
  getNotifications,
  readNotification,
  removeNotification,
  removeNotifications,
} from '@/api/notification';
import { useAuthStore } from '@/stores/authStoe';
import { useNotificationStore } from '@/stores/Notification';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Icon from '../common/Icon';
import Image from 'next/image';
import alternativeImage from '@/assets/images/alternative-image.svg';

interface NotificationModalProps {
  onClose: () => void;
}

export default function NotificationModal({ onClose }: NotificationModalProps) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const isLogin = useAuthStore((state) => state.isLogin);
  const { isReadNotification, clearNotification, setNotifications } =
    useNotificationStore();

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['notification-list'],
    queryFn: () => getNotifications(),
    enabled: isLogin,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  //전체 삭제
  const removeNotificationsMutation = useMutation({
    mutationFn: removeNotifications,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['notification-list'] });

      const previousData = queryClient.getQueryData<NotificationInfo[]>([
        'notification-list',
      ]);
      queryClient.setQueryData(['notification-list'], []);

      clearNotification();

      return { previousData };
    },
    onError: (_err, _noti, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['notification-list'], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-list'] });
    },
  });

  const removeNotificationMutation = useMutation({
    mutationFn: removeNotification,
    onMutate: async ({ notiId }) => {
      await queryClient.cancelQueries({ queryKey: ['notification-list'] });

      const previousData = queryClient.getQueryData<NotificationInfo[]>([
        'notification-list',
      ]);

      queryClient.setQueryData(
        ['notification-list'],
        (old: NotificationInfo[] | undefined) =>
          old ? old.filter((n) => n.notiId !== notiId) : [],
      );

      return { previousData };
    },
    onError: (_err, _noti, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['notification-list'], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-list'] });
    },
  });

  const readNotificationMutation = useMutation({
    mutationFn: readNotification,
    onMutate: async ({ notiId }) => {
      await queryClient.cancelQueries({ queryKey: ['notification-list'] });

      const previousData = queryClient.getQueryData<NotificationInfo[]>([
        'notification-list',
      ]);

      queryClient.setQueryData(
        ['notification-list'],
        (old: NotificationInfo[] | undefined) =>
          old
            ? old.map((n) => (n.notiId === notiId ? { ...n, isRead: true } : n))
            : [],
      );
      isReadNotification(notiId);

      return { previousData };
    },
    onError: (_err, _noti, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['notification-list'], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-list'] });
    },
  });

  const handleNotificationClick = (notification: NotificationInfo) => {
    readNotificationMutation.mutate({
      notiId: notification.notiId,
      type: notification.type,
    });
    isReadNotification(notification.notiId);

    if (!notification.targetId) return;

    if (!notification.boardType) {
      onClose();
      router.push('/schedule');
      return;
    }
    onClose();
    router.push(
      `/post/${notification.boardType?.toLowerCase()}/${notification.targetId}`,
    );
  };

  useEffect(() => {
    if (data) {
      setNotifications(data);
    }
  }, [data, setNotifications]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="absolute top-full right-0 z-50 mt-2 flex h-[360px] w-[360px] flex-col rounded-lg border border-[var(--color-primary-200)] bg-[var(--color-background)] p-4 shadow-lg dark:border-[3px] dark:bg-[#343434]"
    >
      <div className="flex items-center justify-between p-2">
        <p className="cursor-default text-lg font-bold">Notification</p>
        <p
          className="cursor-pointer text-xs text-[var(--color-grey)] dark:text-[#FFFDF7]/70"
          onClick={async () => {
            removeNotificationsMutation.mutateAsync();
          }}
        >
          전체삭제
        </p>
      </div>
      <ul className="scrollbar-hidden flex-1 space-y-1 overflow-y-auto">
        {data?.length === 0 ? (
          <li className="flex h-full flex-col items-center justify-center gap-5 text-[16px] text-[#909090]">
            <Image
              draggable={false}
              src={alternativeImage}
              alt="등록된 일정이 없습니다"
              width={100}
            />
            알림이 없습니다
          </li>
        ) : (
          data?.map((notification: NotificationInfo) => (
            <li
              key={notification.notiId}
              className="relative w-full rounded-xl text-sm"
            >
              <div className="group flex cursor-pointer items-center rounded-xl p-2 transition-colors duration-300 ease-in-out hover:bg-[color:var(--color-primary-200)] hover:dark:text-[#2B2926]">
                <div
                  className="flex w-full items-center"
                  onClick={() => {
                    handleNotificationClick(notification);
                  }}
                >
                  <Icon
                    width="16px"
                    height="14px"
                    left="-26px"
                    top="-79px"
                    className="group-hover:dark:bg-[url('/images/sprite.svg')]"
                  />
                  <p
                    className={`h-auto w-full truncate overflow-hidden pl-2 leading-[1.4] whitespace-nowrap group-hover:pr-6 ${notification.isRead ? 'text-[#909090] line-through' : ''}`}
                  >
                    {notification.content}
                  </p>
                </div>
                <Icon
                  width="14px"
                  height="14px"
                  left="-151px"
                  top="-79px"
                  className="absolute right-2 hidden group-hover:block dark:bg-[url('/images/sprite.svg')]"
                  onClick={() => {
                    removeNotificationMutation.mutateAsync({
                      notiId: notification.notiId,
                      type: notification.type,
                    });
                  }}
                />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
