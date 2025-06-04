import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  AuthErrorCodes
} from '@angular/fire/auth';
import { FirebaseError } from '@firebase/util';
import { Login } from '../models/login.model';
import { Register } from '../models/register.model';
import { UserModel } from '../models/user.model';
import { UserService } from './user.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);

  constructor(private userService: UserService, private alertService: AlertService) {}

  async login(model: Login): Promise<any> {
    try {
      const result = await signInWithEmailAndPassword(
        this.firebaseAuth,
        model.email,
        model.password
      );
      return result;
    } catch (error) {
      console.error('Login error:', error);
      await this.handleAuthError(error as FirebaseError);
      throw error;
    }
  }

  async signup(model: Register): Promise<any> {
    try {
      const result = await createUserWithEmailAndPassword(
        this.firebaseAuth,
        model.email,
        model.password
      );

      if (result.user) {
        await updateProfile(result.user, {
          displayName: model.firstName + ' ' + model.lastName,
        });

        const user: UserModel = {
          uid: result.user.uid,
          displayName: model.firstName + ' ' + model.lastName,
          email: model.email,
          firstName: model.firstName,
          lastName: model.lastName,
          photoURL: result.user.photoURL || '',
        };

        await this.userService.createUser(user);
        await this.alertService.showSuccess('Hesabınız başarıyla oluşturuldu!');
      }

      return result;
    } catch (error) {
      console.error('Signup error:', error);
      await this.handleAuthError(error as FirebaseError);
      throw error;
    }
  }

  async loginWithGoogle(): Promise<any> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.firebaseAuth, provider);

      if (result.user) {
        const userExists = await this.userService.getUserById(result.user.uid);

        if (!userExists) {
          const user: UserModel = {
            uid: result.user.uid,
            displayName: result.user.displayName || 'User',
            email: result.user.email || '',
            firstName: result.user.displayName?.split(' ')[0] || 'User',
            lastName: result.user.displayName?.split(' ')[1] || 'User',
            photoURL: result.user.photoURL || '',
          };

          await this.userService.createUser(user);
        }
      }

      return result;
    } catch (error) {
      console.error('Login with Google error:', error);
      await this.handleAuthError(error as FirebaseError);
      throw error;
    }
  }

  async resetPassword(email: string): Promise<any> {
    try {
      await sendPasswordResetEmail(this.firebaseAuth, email);
      await this.alertService.showSuccess('Password reset link sent to your email address.');
    } catch (error) {
      console.error('Reset password error:', error);
      await this.handleAuthError(error as FirebaseError);
      throw error;
    }
  }

  async logout() {
    try {
      await signOut(this.firebaseAuth);
    } catch (error) {
      console.error('Logout error:', error);
      await this.alertService.showError('An error occurred while logging out.');
      throw error;
    }
  }
  
  /**
   * Handles Firebase authentication errors and shows appropriate error messages to the user.
   */
  private async handleAuthError(error: FirebaseError): Promise<void> {
    let errorMessage = 'An error occurred. Please try again.';
    
    switch (error.code) {
      case AuthErrorCodes.INVALID_EMAIL:
        errorMessage = 'Invalid email address.';
        break;
      case AuthErrorCodes.INVALID_PASSWORD:
        errorMessage = 'Invalid password.';
        break;
      case AuthErrorCodes.EMAIL_EXISTS:
        errorMessage = 'Email already exists.';
        break;
      case AuthErrorCodes.USER_DELETED:
        errorMessage = 'User not found.';
        break;
      case AuthErrorCodes.WEAK_PASSWORD:
        errorMessage = 'Password is too weak. Use at least 6 characters.';
        break;
      case AuthErrorCodes.NETWORK_REQUEST_FAILED:
        errorMessage = 'Network request failed. Check your internet connection.';
        break;
      case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
        errorMessage = 'Too many attempts. Try again later.';
        break;
      case AuthErrorCodes.POPUP_CLOSED_BY_USER:
        errorMessage = 'Popup closed by user.';
        break;
    }
    
    await this.alertService.showError(errorMessage);
  }
}
