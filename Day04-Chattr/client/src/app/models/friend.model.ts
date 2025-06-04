import { Timestamp } from 'firebase/firestore';
import { UserModel } from './user.model';

export interface Friend {
  id?: string;
  userId: string;
  friendId: string;
  friend?: UserModel; // Friend's user data
  status: 'pending' | 'accepted' | 'rejected' | 'blocked';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
