import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { ToastService } from '../../services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../../models/employee.model';
import { Department } from '../../models/department.model';
import { DashboardStats } from '../../models/dashboard-stats.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  isLoading: boolean = false;
  recentEmployees: Employee[] = [];
  dashboardStats: DashboardStats = new DashboardStats();

  constructor(private http: HttpService, private toast: ToastService) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadRecentEmployees();
  }

  loadDashboardData(): void {
    this.isLoading = true;

    this.http.get<DashboardStats>('Dashboard/GetDashboardStats').subscribe({
      next: (response) => {
        if (response.data) {
          this.dashboardStats = response.data;
          this.isLoading = false;
        } else if (response.errorMessages) {
          response.errorMessages.forEach((error) => {
            this.toast.showToast('Error', error, 'error');
          });
          this.isLoading = false;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.toast.showToast('Error', error.error, 'error');
      },
    });
  }

  loadRecentEmployees(): void {
    this.isLoading = true;

    this.http.get<Employee[]>('Employees/GetAll').subscribe({
      next: (response) => {
        if (response.data) {
          this.recentEmployees = response.data.slice(0, 5);
          this.isLoading = false;
        } else if (response.errorMessages) {
          response.errorMessages.forEach((error) => {
            this.toast.showToast('Error', error, 'error');
          });
          this.isLoading = false;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.toast.showToast('Error', error.error, 'error');
      },
    });
  }

  calculateAverageAge(): string {
    return (new Date().getFullYear() - this.dashboardStats.averageAge).toFixed(
      0
    );
  }
}
