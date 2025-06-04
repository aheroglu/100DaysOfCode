import { Timestamp } from '@angular/fire/firestore';
import { UserModel } from './user.model';

export interface Chat {
  id?: string;
  users: string[];
  createdAt: Timestamp;
  lastMessage: string;
  lastMessageAt: Timestamp;
  // UI için kullanılacak ek alanlar (veritabanında saklanmaz)
  otherUser?: UserModel | null;
}

export interface Message {
  id?: string;
  senderId: string;
  content: string;
  sentAt: Timestamp;
  seen: boolean;
}
