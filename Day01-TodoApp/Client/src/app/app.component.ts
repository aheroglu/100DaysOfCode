import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from './models/todo.model';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  todos: Todo[] = [];
  newTodoText: string = '';
  editingTodo: Todo = new Todo();
  isModalOpen: boolean = false;
  isLoading: boolean = false;

  constructor(private todoService: TodoService) {
    this.getTodos();
  }

  getTodos(): void {
    this.isLoading = true;
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
      this.isLoading = false;
    });
  }

  addTodo(text: string): void {
    if (!text.trim()) {
      return;
    }

    this.isLoading = true;
    this.todoService.addTodo(text).subscribe(() => {
      this.getTodos();
      this.newTodoText = '';
      this.isLoading = false;
    });
  }

  getTodo(todo: Todo) {
    this.isLoading = true;
    this.editingTodo = { ...todo };
    this.toggleModal();
    this.isLoading = false;
  }

  editTodo(text: string): void {
    if (!text.trim()) {
      return;
    }

    if (!this.editingTodo.id) {
      return;
    }
    this.isLoading = true;
    const data = {
      id: this.editingTodo.id,
      text: text,
    };

    this.todoService.editTodo(data).subscribe(() => {
      this.getTodos();
      this.toggleModal();
      this.isLoading = false;
    });
  }

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  deleteTodo(todo: Todo): void {
    if (!todo.id) {
      return;
    }

    this.isLoading = true;
    this.todoService.deleteTodo(todo.id).subscribe(() => {
      this.getTodos();
      this.isLoading = false;
    });
  }
}
