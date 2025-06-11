import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { Department } from '../../models/department.model';
import { HttpService } from '../../services/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  allEmployees: Employee[] = []; // Tüm çalışanları saklayacak orijinal liste
  departments: Department[] = [];

  selectedDepartment: string = 'All';
  searchTerm: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  isLoading: boolean = false;
  isAddModalOpen: boolean = false;
  isEditModalOpen: boolean = false;

  newEmployee: Employee = new Employee();
  selectedEmployee: Employee = new Employee();

  constructor(
    private http: HttpService,
    private toast: ToastService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.isLoading = true;

    this.http.get<Employee[]>('Employees/GetAll').subscribe({
      next: (response) => {
        if (response.data) {
          this.employees = response.data;
          this.allEmployees = [...response.data]; // Orijinal listeyi saklıyoruz
          this.getDepartments();
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

  getDepartments(): void {
    this.isLoading = true;
    this.http.get<Department[]>('Departments/GetAll').subscribe({
      next: (response) => {
        if (response.data) {
          this.departments = response.data;
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
        console.error(error);
      },
    });
  }

  addEmployee(form: NgForm): void {
    if (form.valid) {
      this.isLoading = true;

      this.newEmployee.createdFromId = this.auth.user.id;

      this.http
        .post<Employee>('Employees/Create', null, this.newEmployee)
        .subscribe({
          next: (response) => {
            if (response.successMessage) {
              this.isLoading = false;
              this.toast.showToast(
                'Success',
                response.successMessage,
                'success'
              );
              this.loadEmployees();
              this.setModalState('add', false);
              form.resetForm();
              this.newEmployee = new Employee();
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

  getEmployee(employee: Employee): void {
    if (employee) {
      this.selectedEmployee = { ...employee };
      console.log(this.selectedEmployee);
      this.setModalState('edit', true);
    }
  }

  // Tarih alanlarını HTML date input için uygun formata dönüştürür
  formatDate(date: Date | string | null): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  // Date input değişikliklerini işler ve doğru formatta kaydeder
  handleDateChange(event: string, fieldName: 'birthDate' | 'hireDate'): void {
    if (event) {
      this.selectedEmployee[fieldName] = new Date(event);
    }
  }

  editEmployee(form: NgForm): void {
    if (form.valid) {
      this.isLoading = true;
      this.http
        .post<Employee>('Employees/Update', null, this.selectedEmployee)
        .subscribe({
          next: (response) => {
            if (response.successMessage) {
              this.isLoading = false;
              this.toast.showToast(
                'Success',
                response.successMessage,
                'success'
              );
              this.loadEmployees();
              this.setModalState('edit', false);
              form.resetForm();
              this.selectedEmployee = new Employee();
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

  deleteEmployee(employee: Employee): void {
    if (employee) {
      this.toast.showSwal(
        'Delete',
        `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`,
        'Delete',
        'Cancel',
        () => {
          this.isLoading = true;

          this.http
            .post<Employee>('Employees/Delete', `id=${employee.id}`)
            .subscribe({
              next: (response) => {
                if (response.successMessage) {
                  this.isLoading = false;
                  this.toast.showToast(
                    'Success',
                    response.successMessage,
                    'success'
                  );
                  this.loadEmployees();
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

  setModalState(modal: string, state: boolean): void {
    if (modal === 'add') {
      this.isAddModalOpen = state;
    } else if (modal === 'edit') {
      this.isEditModalOpen = state;
    }
  }

  onSearch(): void {
    let filteredList =
      this.selectedDepartment === 'All'
        ? [...this.allEmployees]
        : this.allEmployees.filter(
            (employee) => employee.department?.name === this.selectedDepartment
          );

    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      filteredList = filteredList.filter(
        (employee) =>
          employee.firstName?.toLowerCase().includes(searchTermLower) ||
          employee.lastName?.toLowerCase().includes(searchTermLower) ||
          employee.email?.toLowerCase().includes(searchTermLower)
      );
    }

    this.employees = filteredList;
    this.totalItems = this.employees.length;
    this.currentPage = 1;
  }

  onDepartmentChange(): void {
    if (this.selectedDepartment === 'All') {
      this.employees = [...this.allEmployees];
    } else {
      this.employees = this.allEmployees.filter(
        (employee) => employee.department?.name === this.selectedDepartment
      );
    }

    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.employees = this.employees.filter(
        (employee) =>
          employee.firstName?.toLowerCase().includes(searchTermLower) ||
          employee.lastName?.toLowerCase().includes(searchTermLower) ||
          employee.email?.toLowerCase().includes(searchTermLower)
      );
    }

    this.totalItems = this.employees.length;
    this.currentPage = 1;
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

  getCurrentPageItems(): Employee[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.employees.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getDisplayedRange(): string {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(start + this.itemsPerPage - 1, this.employees.length);
    return `${start}-${end}`;
  }
}
