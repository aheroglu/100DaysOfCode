import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  logoGoogle,
  chatbubbles,
  mailOutline,
  lockClosedOutline,
  closeOutline
} from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonIcon, IonButton, CommonModule, FormsModule, RouterLink],
})
export class LoginPage {
  model: Login = new Login();
  isResetPasswordModalOpen = false;
  resetEmail = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {
    addIcons({ logoGoogle, chatbubbles, mailOutline, lockClosedOutline, closeOutline });
  }

  ionViewWillLeave() {
    this.model = new Login();
    this.resetEmail = '';
    this.isResetPasswordModalOpen = false;
  }
  
  setResetPasswordModal(isOpen: boolean) {
    this.isResetPasswordModalOpen = isOpen;
    if (!isOpen) {
      this.resetEmail = '';
    }
  }
  
  async resetPassword() {
    if (!this.resetEmail || !this.resetEmail.trim()) {
      await this.alertService.showWarning('Please enter your email address.');
      return;
    }
    
    try {
      await this.authService.resetPassword(this.resetEmail);
      this.setResetPasswordModal(false);
    } catch (error) {
      console.error('Reset password error:', error);
    }
  }

  async onLogin(form: NgForm) {
    if (!form.valid) {
      await this.alertService.showWarning(
        'Lütfen e-posta ve şifre alanlarını doldurun.'
      );
      return;
    }

    try {
      await this.authService.login(this.model);
      this.router.navigate(['/home']);
      await this.alertService.showSuccess('Successfully logged in!');
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  async onSignupWithGoogle() {
    try {
      const result = await this.authService.loginWithGoogle();
      if (result.user) {
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
