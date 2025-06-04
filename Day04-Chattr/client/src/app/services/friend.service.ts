import { inject, Injectable } from '@angular/core';
import { Friend } from '../models/friend.model';
import { DocumentReference, Timestamp } from 'firebase/firestore';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  getDoc,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, combineLatest, from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  private firestore = inject(Firestore);

  addFriend(friend: Friend): Promise<DocumentReference<Friend>> {
    const friendsRef = collection(this.firestore, 'friends');
    return addDoc(friendsRef, {
      ...friend,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    }) as Promise<DocumentReference<Friend>>;
  }

  getFriends(userId: string): Observable<Friend[]> {
    const friendsRef = collection(this.firestore, 'friends');

    // Query for both cases: when user is the requester (userId) or the receiver (friendId)
    const q1 = query(
      friendsRef,
      where('userId', '==', userId),
      where('status', '==', 'accepted')
    );

    const q2 = query(
      friendsRef,
      where('friendId', '==', userId),
      where('status', '==', 'accepted')
    );

    // Combine both queries
    return combineLatest([
      collectionData(q1, { idField: 'id' }) as Observable<Friend[]>,
      collectionData(q2, { idField: 'id' }) as Observable<Friend[]>,
    ]).pipe(
      // Sorgu sonuçlarını birleştir
      map(([friends1, friends2]) => {
        // Combine and process both result sets
        const allFriends = [
          ...friends1,
          // For friends2, swap userId and friendId for consistency
          ...friends2.map((f) => ({
            ...f,
            userId: f.friendId,
            friendId: f.userId,
          })),
        ];

        return allFriends;
      }),
      // Boş liste kontrolü
      switchMap((allFriends) => {
        if (allFriends.length === 0) {
          return of([]);
        }

        // Her bir arkadaş için kullanıcı bilgilerini getir
        const friendsWithUserData$ = allFriends.map((friend: Friend) =>
          from(this.getUserData(friend.friendId)).pipe(
            map((userData: any) => ({
              ...friend,
              friend: userData,
            }))
          )
        );

        // Tüm arkadaşların kullanıcı bilgilerini birleştir
        return combineLatest(friendsWithUserData$);
      })
    );
  }

  getPendingFriends(userId: string): Observable<Friend[]> {
    const friendsRef = collection(this.firestore, 'friends');
    const q = query(
      friendsRef,
      where('friendId', '==', userId),
      where('status', '==', 'pending')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Friend[]>;
  }

  public async getUserData(userId: string): Promise<any> {
    const userDoc = doc(this.firestore, `users/${userId}`);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      return { ...userSnapshot.data(), uid: userSnapshot.id };
    }
    return null;
  }

  getFriendById(id: string): Observable<Friend> {
    const friendDoc = doc(this.firestore, `friends/${id}`);
    return docData(friendDoc, { idField: 'id' }) as Observable<Friend>;
  }

  updateFriend(id: string, data: Partial<Friend>): Promise<void> {
    const friendDoc = doc(this.firestore, `friends/${id}`);
    return updateDoc(friendDoc, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  }

  deleteFriend(id: string): Promise<void> {
    const friendDoc = doc(this.firestore, `friends/${id}`);
    return deleteDoc(friendDoc);
  }
}
