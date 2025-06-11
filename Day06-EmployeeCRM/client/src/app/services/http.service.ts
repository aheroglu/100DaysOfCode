import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../constants';
import { Result } from '../models/result.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  get<T>(endpoint: string, param?: any): Observable<Result<T>> {
    const url = param
      ? `${apiUrl}/${endpoint}?${param}`
      : `${apiUrl}/${endpoint}`;
    return this.http.get<Result<T>>(url, {
      headers: { Authorization: 'Bearer ' + this.auth.token },
    });
  }

  post<T>(endpoint: string, param?: any, body?: any): Observable<Result<T>> {
    const url = param
      ? `${apiUrl}/${endpoint}?${param}`
      : `${apiUrl}/${endpoint}`;
    return this.http.post<Result<T>>(url, body, {
      headers: { Authorization: 'Bearer ' + this.auth.token },
    });
  }
}
