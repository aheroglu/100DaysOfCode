import { inject, Injectable } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import {
  doc,
  DocumentReference,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  auth = inject(Auth);

  constructor(private firestore: Firestore) {}

  async changeName(data: {
    firstName: string;
    lastName: string;
  }): Promise<void> {
    try {
      const user = this.auth.currentUser;
      if (!user) {
        throw new Error('User not found');
      }

      const docRef = doc(
        this.firestore,
        `users/${user.uid}`
      ) as DocumentReference<User>;

      await updateDoc(docRef, {
        firstName: data.firstName,
        lastName: data.lastName,
        displayName: data.firstName + ' ' + data.lastName,
      });
    } catch (error) {
      console.error('Change name error:', error);
      throw error;
    }
  }
}
