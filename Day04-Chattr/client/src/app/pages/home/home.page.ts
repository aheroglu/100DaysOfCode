import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonIcon,
  IonButton,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  searchOutline,
  personOutline,
  chatbubbleOutline,
  closeOutline,
  personAddOutline,
  peopleOutline,
  notifications,
} from 'ionicons/icons';
import { ChatService } from 'src/app/services/chat.service';
import { Chat } from 'src/app/models/chat.model';
import { Auth } from '@angular/fire/auth';
import { Friend } from 'src/app/models/friend.model';
import { FriendService } from 'src/app/services/friend.service';
import { CommonModule } from '@angular/common';
import { FirebaseDatePipe } from 'src/app/pipes/firebase-date.pipe';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonFabButton,
    IonFab,
    IonButton,
    IonIcon,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    RouterLink,
    CommonModule,
    FirebaseDatePipe,
    TimeagoModule,
  ],
})
export class HomePage implements OnInit {
  auth = inject(Auth);
  chats: Chat[] = [];
  friends: Friend[] = [];
  pendingFriends: Friend[] = [];

  isLoading: boolean = false;
  isModalOpen: boolean = false;

  constructor(
    private chatService: ChatService,
    private friendService: FriendService,
    private router: Router
  ) {
    addIcons({
      searchOutline,
      personOutline,
      chatbubbleOutline,
      closeOutline,
      personAddOutline,
      peopleOutline,
      notifications,
    });
  }
  ngOnInit(): void {
    this.getFriends();
    this.getUserChats();
    this.checkPendingFriends();
  }

  ionViewWillEnter() {
    this.getUserChats();
    this.getFriends();
    this.checkPendingFriends();
  }

  ionViewWillLeave() {
    this.chats = [];
    this.friends = [];
    this.pendingFriends = [];
    this.isLoading = false;
    this.isModalOpen = false;
  }

  setModalOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;

    if (isOpen) {
      this.getFriends();
    }
  }

  getUserChats() {
    this.isLoading = true;

    this.chatService.getUserChats(this.auth.currentUser!.uid).subscribe({
      next: (chats) => {
        console.log(chats);
        
        this.chats = chats;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      },
    });
  }

  getFriends() {
    this.isLoading = true;

    this.friendService.getFriends(this.auth.currentUser!.uid).subscribe({
      next: (friends) => {
        this.friends = friends;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      },
    });
  }

  checkPendingFriends() {
    this.isLoading = true;

    this.friendService.getPendingFriends(this.auth.currentUser!.uid).subscribe({
      next: (friends) => {
        this.pendingFriends = friends;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      },
    });
  }

  navigate(page: string, friendId?: string) {
    this.isModalOpen = false;

    switch (page) {
      case 'pending-friends':
        this.router.navigate(['/pending-friends']);
        break;
      case 'chat':
        if (friendId) {
          // Lazy chat creation approach - sending friendId as query parameter instead of chat ID
          // Chat record will only be created when a message is sent
          this.router.navigate(['/chat', 'new'], {
            queryParams: { friendId: friendId }
          });
        }
        break;
      default:
        break;
    }
  }
  
  // Get initials from user's display name
  getInitials(displayName: string): string {
    if (!displayName) return 'U';
    
    const names = displayName.split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    } else {
      return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    }
  }
}
