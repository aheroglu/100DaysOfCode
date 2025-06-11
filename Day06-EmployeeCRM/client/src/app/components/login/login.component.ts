import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userNameOrEmail: string = '';
  password: string = '';

  isLoading: boolean = false;
  showPassword: boolean = false;

  constructor(
    private http: HttpService,
    private router: Router,
    private toast: ToastService
  ) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.isLoading = true;

      const data = {
        userNameOrEmail: this.userNameOrEmail,
        password: this.password,
      };

      this.http.post<any>('Auth/SignIn', null, data).subscribe({
        next: (response) => {
          if (response.successMessage) {
            localStorage.setItem('access-token', response.successMessage);
            this.toast.showToast('Login successful', 'You have successfully logged in', 'success');
            this.router.navigateByUrl('/');
          } else if (response.errorMessages) {
            response.errorMessages.forEach((error) => {
              this.toast.showToast('Login failed', error, 'error');
            });
            this.isLoading = false;
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.toast.showToast('Login failed', error.error, 'error');
          console.error(error);
        },
      });
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
