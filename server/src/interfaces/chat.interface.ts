export interface Message {
  message: string;
  sender: string;
  date: Date;
}

export type NewMessageBody = Omit<Message, 'date'>;
