import { inject, Injectable } from '@angular/core';
import { TodoItem } from '../types/TodoItem.dto';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly storageService = inject(StorageService);

  constructor() { }

  get(id: string) {
    const storage = this.storageService.get();
    return storage?.find(todo => todo.id === id) || null;
  }

  getAll() {
    return this.storageService.get() ?? [];
  }

  push(value: string) {
    const todo: TodoItem = {
      id: crypto.randomUUID(),
      label: value,
      completed: false
    };

    const storage = this.storageService.get() || [];
    storage.push(todo);
    this.storageService.set(storage);
  }

  pushMany(todos: TodoItem[]) {
    const storage = this.storageService.get() || [];
    todos.forEach(todo => {
      if (!todo.id) {
        todo.id = crypto.randomUUID();
      }
      storage.push(todo);
    });
    this.storageService.set(storage);
  }

  remove(id: string) {
    const storage = this.storageService.get() || [];
    const filteredStorage = storage.filter(todo => todo.id !== id);
    this.storageService.set(filteredStorage);
  }

  complete(id: string) {
    const storage = this.storageService.get() || [];
    const todoIndex = storage.findIndex(todo => todo.id === id);
    if (todoIndex > -1) {
      storage[todoIndex].completed = !storage[todoIndex].completed;
      this.storageService.set(storage);
    }
  }
}
