import { BaseModel } from './base.model';
import { Department } from './department.model';
import { User } from './user.model';

export class Employee extends BaseModel {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  city: string = '';
  birthDate: Date = new Date();
  hireDate: Date = new Date();
  departmentId: string = '';
  department: Department = new Department();
  createdFromId: string = '';
  createdFrom: User = new User();
}
