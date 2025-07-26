type DashboardProfile = {
  name: string;
  breed: PetBreed;
  metDay: string;
  aiAnalysis: string | null;
};

type DashboardWeight = { date: string; weight: number }[];

type DashboardSleep = { date: string; sleep: number }[];

type DashboardNote = {
  date: string;
  content: string;
};

type DashboardFeeding = {
  date: string;
  amount: number;
  average: number;
  unit: stirng;
};

type DashboardWalking = {
  date: string;
  time: number;
  pace: number;
}[];

type DashboardChecklist = {
  name: string;
  scheduleId: number;
  isDone: boolean;
}[];
