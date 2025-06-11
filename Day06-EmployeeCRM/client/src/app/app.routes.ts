import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [() => inject(AuthService).isAuthenticated()],
  },
  {
    path: 'employees',
    loadComponent: () =>
      import('./components/employees/employees.component').then(
        (m) => m.EmployeesComponent
      ),
    canActivate: [() => inject(AuthService).isAuthenticated()],
  },
  {
    path: 'departments',
    loadComponent: () =>
      import('./components/departments/departments.component').then(
        (m) => m.DepartmentsComponent
      ),
    canActivate: [() => inject(AuthService).isAuthenticated()],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
];
