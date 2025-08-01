interface NotificationInfo {
  notiId: number;
  type:
    | 'REPORT_SUCCESS'
    | 'REPORT_FAIL'
    | 'REPORTED'
    | 'LIKE'
    | 'COMMENT'
    | 'SCHEDULE';
  content: string;
  targetId: number;
  isRead: boolean;
  boardType: 'FREE' | 'QUESTION' | null;
  createdAt: string;
}

type NotiType =
  | 'REPORT_SUCCESS'
  | 'REPORT_FAIL'
  | 'REPORTED'
  | 'LIKE'
  | 'COMMENT'
  | 'SCHEDULE';

type NotiTarget = 'ALL' | 'SERVICE' | 'SCHEDULE';
