import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
    canActivate: [authGuard],
  },
  {
    path: 'chat/:id',
    loadComponent: () =>
      import('./pages/chat/chat.page').then((m) => m.ChatPage),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.page').then((m) => m.ProfilePage),
    canActivate: [authGuard],
  },
  {
    path: 'add-friend',
    loadComponent: () =>
      import('./pages/add-friend/add-friend.page').then((m) => m.AddFriendPage),
    canActivate: [authGuard],
  },
  {
    path: 'pending-friends',
    loadComponent: () =>
      import('./pages/pending-friends/pending-friends.page').then(
        (m) => m.PendingFriendsPage
      ),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup.page').then((m) => m.SignupPage),
  },
];
