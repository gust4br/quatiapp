import { Injectable } from '@angular/core';
import { TodoItem } from '../types/TodoItem.dto';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
	STORAGE_KEY = 'quatiapp_data';

	get(): TodoItem[] | null {
		const data = localStorage.getItem(this.STORAGE_KEY);
		return data ? JSON.parse(data) : null;
	}

	set(value: TodoItem[]) {
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(value));
	}

	remove() {
		localStorage.removeItem(this.STORAGE_KEY);
	}
}
