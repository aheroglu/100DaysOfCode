import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';
import { Department } from '../../models/department.model';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css',
})
export class DepartmentsComponent implements OnInit {
  departments: Department[] = [];
  filteredDepartments: Department[] = [];

  searchTerm: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  isLoading: boolean = false;
  isAddModalOpen: boolean = false;
  isEditModalOpen: boolean = false;

  newDepartment: Department = new Department();
  selectedDepartment: Department = new Department();

  constructor(private http: HttpService, private toast: ToastService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.isLoading = true;

    this.http.get<Department[]>('Departments/GetAll').subscribe({
      next: (response) => {
        if (response.data) {
          this.departments = response.data;
          this.filteredDepartments = [...this.departments];
          this.totalItems = this.filteredDepartments.length;
          this.isLoading = false;
        } else if (response.errorMessages) {
          response.errorMessages.forEach((error) => {
            this.toast.showToast(error, 'error');
          });
          this.isLoading = false;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.toast.showToast(error.error, 'error');
        console.error(error);
      },
    });
  }

  addDepartment(form: NgForm): void {
    if (form.valid) {
      this.isLoading = true;

      this.http
        .post<Department>('Departments/Create', null, this.newDepartment)
        .subscribe({
          next: (response) => {
            if (response.successMessage) {
              this.isLoading = false;
              this.toast.showToast(
                'Success',
                response.successMessage,
                'success'
              );
              this.loadDepartments();
              this.setModalState('add', false);
              form.resetForm();
              this.newDepartment = new Department();
            } else if (response.errorMessages) {
              response.errorMessages.forEach((error) => {
                this.toast.showToast('Error', error, 'error');
              });
              this.isLoading = false;
            }
          },
          error: (error: HttpErrorResponse) => {
            this.isLoading = false;
            this.toast.showToast(error.error, 'error');
            console.error(error);
          },
        });
    }
  }

  getDepartment(department: Department): void {
    if (department) {
      this.selectedDepartment = { ...department };
      this.setModalState('edit', true);
    }
  }

  editDepartment(form: NgForm): void {
    if (form.valid) {
      this.isLoading = true;
      this.http
        .post<Department>('Departments/Update', null, this.selectedDepartment)
        .subscribe({
          next: (response) => {
            if (response.successMessage) {
              this.isLoading = false;
              this.toast.showToast(
                'Success',
                response.successMessage,
                'success'
              );
              this.loadDepartments();
              this.setModalState('edit', false);
              form.resetForm();
              this.selectedDepartment = new Department();
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
            console.error(error);
          },
        });
    }
  }

  setModalState(modal: string, state: boolean): void {
    if (modal === 'add') {
      this.isAddModalOpen = state;
    } else if (modal === 'edit') {
      this.isEditModalOpen = state;
    }
  }

  deleteDepartment(department: Department): void {
    if (department) {
      this.toast.showSwal(
        'Delete',
        `Are you sure you want to delete ${department.name} department?`,
        'Delete',
        'Cancel',
        () => {
          this.isLoading = true;

          this.http
            .post<Department>('Departments/Delete', `id=${department.id}`)
            .subscribe({
              next: (response) => {
                if (response.successMessage) {
                  this.isLoading = false;
                  this.toast.showToast(
                    'Success',
                    response.successMessage,
                    'success'
                  );
                  this.loadDepartments();
                } else if (response.errorMessages) {
                  response.errorMessages.forEach((error) => {
                    this.toast.showToast('Error', error, 'error');
                  });
                  this.isLoading = false;
                }
              },
              error: (error) => {
                this.isLoading = false;
                this.toast.showToast('Error', error.error, 'error');
                console.error(error);
              },
            });
        }
      );
    }
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredDepartments = [...this.departments];
    } else {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      this.filteredDepartments = this.departments.filter((department) =>
        department.name.toLowerCase().includes(searchTermLower)
      );
    }
    this.totalItems = this.filteredDepartments.length;
    this.currentPage = 1; // Reset to first page when searching
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  getCurrentPageItems(): Department[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredDepartments.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  getDisplayedRange(): string {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(start + this.itemsPerPage - 1, this.totalItems);
    return `${start}-${end}`;
  }
}
