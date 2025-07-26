type DiarydPayload = {
  petId: number;
  recordAt: string;
  content: string;
  sleepTime?: number;
  weight?: number;
  walkingList: {
    startTime: string;
    endTime: string;
    pace: number;
  }[];
  feedingList: {
    amount: number;
    mealtime: string;
    unit: string;
  }[];
};

type WalkEntry = {
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
  pace: string;
};

type FeedEntry = {
  amount: string;
  hour: string;
  minute: string;
  unit: string;
};

type DiaryCheckResponse = {
  lifeRecordId: number;
  content: string;
  sleepTime: number;
  weight: number;
  feedingList: {
    amount: number;
    mealtime: string;
    unit: string;
  }[];
  walkingList: {
    startTime: string;
    endTime: string;
    pace: number;
  }[];
};

type DiaryCheckCreateResult = {
  result: string;
  unit: string;
};

type DiaryCheckResult =
  | { mode: 'edit'; data: DiaryCheckResponse }
  | { mode: 'create'; data: DiaryCheckCreateResult }
  | null;

// diary detail
type Feeding = {
  amount: number;
  mealtime: string;
  unit: string;
};

type Walking = {
  startTime: string;
  endTime: string;
  pace: number;
};
