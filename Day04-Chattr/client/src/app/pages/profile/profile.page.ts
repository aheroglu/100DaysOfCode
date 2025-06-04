import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonBackButton,
  IonButtons,
  IonToggle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  person,
  personOutline,
  createOutline,
  mailOutline,
  callOutline,
  create,
  notificationsOutline,
  moonOutline,
  lockClosedOutline,
  chevronForwardOutline,
  languageOutline,
  logOutOutline,
  closeOutline,
} from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { Auth } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user.service';
import { ThemeService } from 'src/app/services/theme.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonBackButton,
    IonButtons,
    IonToggle,
    CommonModule,
    FormsModule,
  ],
})
export class ProfilePage {
  auth = inject(Auth);
  isDarkMode = this.themeService.getCurrentTheme() === 'dark';

  isChangeNameModalOpen = false;
  isLoading: boolean = false;

  newName: { firstName: string; lastName: string } = {
    firstName: '',
    lastName: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    public userService: UserService,
    private themeService: ThemeService,
    private profileService: ProfileService
  ) {
    addIcons({
      personOutline,
      createOutline,
      mailOutline,
      moonOutline,
      lockClosedOutline,
      chevronForwardOutline,
      logOutOutline,
      closeOutline,
      person,
      callOutline,
      create,
      notificationsOutline,
      languageOutline,
    });

    this.userService.getUser();
  }

  ionViewWillLeave() {
    this.newName = {
      firstName: '',
      lastName: '',
    };
    this.isChangeNameModalOpen = false;
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
      await this.alertService.showSuccess('Successfully logged out!');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async resetPassword() {
    try {
      await this.authService.resetPassword(this.auth.currentUser!.email!);
    } catch (error) {
      console.error('Reset password error:', error);
    }
  }

  async changeName() {
    try {
      this.isLoading = true;
      await this.profileService.changeName(this.newName).then(() => {
        this.isChangeNameModalOpen = false;
        this.alertService.showSuccess('Name changed successfully!');
        this.userService.getUser();
        this.isLoading = false;
      });
    } catch (error) {
      console.error('Change name error:', error);
      this.isLoading = false;
    }
  }

  setChangeNameModal(isOpen: boolean) {
    this.isChangeNameModalOpen = isOpen;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
