import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://localhost:7026/api/todos';

  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  getTodo(id: string) {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }

  addTodo(text: string) {
    return this.http.post<Todo>(this.apiUrl, { text });
  }

  editTodo(todo: any) {
    return this.http.put<Todo>(this.apiUrl, todo);
  }

  deleteTodo(id: string) {
    return this.http.delete<Todo>(`${this.apiUrl}/${id}`);
  }
}
