import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RefresherCustomEvent } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonList,
  IonItem,
  IonAvatar,
  IonButton,
  IonIcon,
  IonSpinner,
  IonBackButton,
  IonButtons,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  checkmarkOutline,
  closeOutline,
  arrowBackOutline,
} from 'ionicons/icons';
import { FriendService } from '../../services/friend.service';
import { Auth } from '@angular/fire/auth';
import { Friend } from '../../models/friend.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-friends',
  templateUrl: './pending-friends.page.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonAvatar,
    IonButton,
    IonIcon,
    IonSpinner,
    IonBackButton,
    IonButtons,
    IonRefresher,
    IonRefresherContent,
  ],
})
export class PendingFriendsPage {
  auth = inject(Auth);
  friendService = inject(FriendService);
  router = inject(Router);

  pendingFriends: Friend[] = [];
  isLoading: boolean = true;

  constructor() {
    addIcons({
      checkmarkOutline,
      closeOutline,
      arrowBackOutline,
    });
    this.loadPendingFriends();
  }

  ionViewWillLeave() {
    this.pendingFriends = [];
    this.isLoading = false;
  }

  loadPendingFriends() {
    this.isLoading = true;

    if (!this.auth.currentUser) {
      this.isLoading = false;
      return;
    }

    this.friendService.getPendingFriends(this.auth.currentUser.uid).subscribe({
      next: async (friends: Friend[]) => {
        const enrichedFriends = await Promise.all(
          friends.map(async (friend: Friend) => {
            try {
              const userData = await this.friendService.getUserData(
                friend.userId
              );
              return { ...friend, friend: userData };
            } catch (error: any) {
              console.error(error);
              return friend;
            }
          })
        );

        this.pendingFriends = enrichedFriends;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error(error);
        this.isLoading = false;
      },
    });
  }

  acceptFriendRequest(friendId: string) {
    this.friendService
      .updateFriend(friendId, { status: 'accepted' })
      .then(() => {
        this.loadPendingFriends();
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  rejectFriendRequest(friendId: string) {
    this.friendService
      .deleteFriend(friendId)
      .then(() => {
        this.loadPendingFriends();
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  handleRefresh(event: RefresherCustomEvent) {
    this.loadPendingFriends();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
