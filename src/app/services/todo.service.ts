import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoItem } from '../types/TodoItem.dto';
import { CreateTodoDto, UpdateTodoDto } from '../types/todo.dto';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  get(id: string): Observable<TodoItem> {
    return this.http.get<TodoItem>(`${this.baseUrl}/todos/${id}`);
  }

  getAll(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(`${this.baseUrl}/todos`);
  }

  create(todo: CreateTodoDto): Observable<{ count: number }> {
    return this.http.post<{ count: number }>(`${this.baseUrl}/todos`, todo);
  }

  createMany(todos: CreateTodoDto[]): Observable<{ count: number }> {
    return this.http.post<{ count: number }>(`${this.baseUrl}/todos`, todos);
  }

  update(id: string, data: UpdateTodoDto): Observable<TodoItem> {
    return this.http.patch<TodoItem>(`${this.baseUrl}/todos/${id}`, data);
  }

  complete(id: string): Observable<TodoItem> {
    return this.http.patch<TodoItem>(`${this.baseUrl}/todos/${id}/complete`, {});
  }

  remove(id: string): Observable<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`${this.baseUrl}/todos/${id}`);
  }
}