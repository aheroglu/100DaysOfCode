import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chatbubbles,
  mailOutline,
  lockClosedOutline,
  logoGoogle,
} from 'ionicons/icons';
import { Register } from 'src/app/models/register.model';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonIcon, CommonModule, FormsModule, RouterLink],
})
export class SignupPage {
  registerModel: Register = new Register();

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {
    addIcons({ chatbubbles, mailOutline, lockClosedOutline, logoGoogle });
  }

  ionViewWillLeave() {
    this.registerModel = new Register();
  }

  async onSignup(form: NgForm) {
    if (form.valid) {
      try {
        if (
          this.registerModel.password !== this.registerModel.confirmPassword
        ) {
          await this.alertService.showError(
            'Şifreler eşleşmiyor. Lütfen tekrar deneyin.'
          );
          return;
        }

        const result = await this.authService.signup(this.registerModel);

        if (result.user) {
          form.resetForm();
          this.router.navigate(['/home']);
          await this.alertService.showSuccess(
            'Hesabınız başarıyla oluşturuldu!'
          );
        }
      } catch (error) {
        console.error(error);
        // Hata mesajları AuthService'de gösteriliyor
      }
    } else {
      await this.alertService.showWarning(
        'Lütfen tüm alanları doğru şekilde doldurun.'
      );
    }
  }

  async onSignupWithGoogle() {
    try {
      const result = await this.authService.loginWithGoogle();
      if (result.user) {
        this.router.navigate(['/home']);
        await this.alertService.showSuccess(
          'Google hesabınızla başarıyla kayıt oldunuz!'
        );
      }
    } catch (error) {
      console.error(error);
      // Hata mesajları AuthService'de gösteriliyor
    }
  }
}
