import { inject, Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { UserModel } from '../models/user.model';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  auth = inject(Auth);
  user: UserModel | null = null;

  constructor(private firestore: Firestore) {}

  async createUser(user: UserModel): Promise<void> {
    try {
      const userRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userRef, {
        ...user,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('User creation error:', error);
      throw error;
    }
  }

  getUser() {
    this.getUserById(this.auth.currentUser!.uid).then((user) => {
      this.user = user;
    });
  }

  async getUserById(uid: string): Promise<UserModel | null> {
    try {
      const userRef = doc(this.firestore, `users/${uid}`);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        return userSnapshot.data() as UserModel;
      }
      return null;
    } catch (error) {
      console.error('User retrieval error:', error);
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<UserModel | null> {
    try {
      const userRef = collection(this.firestore, 'users');
      const q = query(userRef, where('email', '==', email));
      const userSnapshot = await getDocs(q);
      if (userSnapshot.docs.length > 0) {
        return userSnapshot.docs[0].data() as UserModel;
      }
      return null;
    } catch (error) {
      console.error('User retrieval error:', error);
      throw error;
    }
  }
}
