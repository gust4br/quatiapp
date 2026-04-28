# Angular Service Pattern

## When to use

Creating services for API communication or business logic.

## Pattern

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  get(id: string): Observable<Resource> {
    return this.http.get<Resource>(`${this.baseUrl}/resource/${id}`);
  }

  getAll(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.baseUrl}/resource`);
  }

  create(data: Omit<Resource, 'id'>): Observable<{ count: number }> {
    return this.http.post<{ count: number }>(`${this.baseUrl}/resource`, data);
  }

  update(id: string, data: Partial<Resource>): Observable<Resource> {
    return this.http.patch<Resource>(`${this.baseUrl}/resource/${id}`, data);
  }

  remove(id: string): Observable<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`${this.baseUrl}/resource/${id}`);
  }
}
```

## Rules

- Use `inject(HttpClient)` instead of constructor
- Import environment from `../environment`
- Define interfaces in `src/app/types/*.dto.ts`
- Return `Observable<T>` from methods
- Use generic types from DTO interfaces
