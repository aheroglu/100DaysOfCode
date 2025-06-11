import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string = '';
  user: User = new User();

  private authStatusSubject = new BehaviorSubject<boolean>(false);
  public authStatus$: Observable<boolean> =
    this.authStatusSubject.asObservable();

  constructor(private toast: ToastService, private router: Router) {
    this.checkAuthStatus();
  }

  checkAuthStatus(): boolean {
    this.token = localStorage.getItem('access-token') ?? '';
    if (this.token === '') {
      this.authStatusSubject.next(false);
      return false;
    }

    try {
      const decode: JwtPayload | any = jwtDecode(this.token);
      const exp = decode.exp;
      const now = new Date().getTime() / 1000;

      if (now > exp) {
        localStorage.removeItem('access-token');
        this.authStatusSubject.next(false);
        return false;
      }

      this.user.id = decode['Id'];
      this.user.userName = decode['UserName'];
      this.user.email = decode['Email'];

      this.authStatusSubject.next(true);
      return true;
    } catch (error) {
      localStorage.removeItem('access-token');
      this.authStatusSubject.next(false);
      return false;
    }
  }

  isAuthenticated(): boolean {
    return this.checkAuthStatus();
  }

  logout() {
    this.toast.showSwal(
      'Logout',
      'Are you sure you want to logout?',
      'Yes',
      'No',
      () => {
        localStorage.removeItem('access-token');
        this.authStatusSubject.next(false);
        this.router.navigateByUrl('/login');
        this.toast.showToast(
          'Successfully logged out',
          'You are now logged out',
          'info'
        );
      }
    );
  }
}
