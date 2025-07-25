type DiaryPet = {
  petId: number;
  name: string;
  breed: string;
  age: number;
};

type LifeRecordPayload = {
  petId: number;
  recordAt: string;
  content: string;
  sleepTime: number;
  weight: number;
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
