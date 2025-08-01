type ActionObject = {
  keyword: string;
  petName?: string;
  date?: string;
  value?: string;
};

type ChatbotMessage = {
  id: number;
  sender: string;
  message: string;
};

type ChatbotResponse = {
  message: string;
  pet?: string;
};
