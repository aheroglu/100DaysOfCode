import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonAvatar,
  IonSpinner,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  searchOutline,
  search,
  peopleOutline,
  personAddOutline,
  checkmarkOutline,
  personOutline,
} from 'ionicons/icons';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { FriendService } from 'src/app/services/friend.service';
import { Timestamp } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.page.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonSpinner,
    IonAvatar,
    IonIcon,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class AddFriendPage {
  auth = inject(Auth);

  searchQuery: string = '';
  user: UserModel | null = null;
  isUserSearched: boolean = false;
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private friendService: FriendService,
    private alertService: AlertService
  ) {
    addIcons({
      searchOutline,
      search,
      peopleOutline,
      personAddOutline,
      checkmarkOutline,
      personOutline,
    });
  }

  ionViewWillLeave() {
    this.user = null;
    this.isUserSearched = false;
    this.isLoading = false;
    this.searchQuery = '';
  }

  searchUser(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.isUserSearched = true;

      this.userService
        .getUserByEmail(this.searchQuery)
        .then((user) => {
          this.user = user;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.alertService.showError(error.message);
        });
    }
  }

  sendRequest(user: UserModel) {
    this.isLoading = true;

    this.friendService
      .addFriend({
        userId: this.auth.currentUser!.uid,
        friendId: user.uid,
        status: 'pending',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      })
      .then(() => {
        this.isLoading = false;
        this.alertService.showSuccess('Friend request sent successfully!');
      })
      .catch((error) => {
        this.isLoading = false;
        this.alertService.showError(error.message);
      });
  }
}
