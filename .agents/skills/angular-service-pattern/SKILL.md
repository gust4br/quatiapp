---
name: angular-service-pattern
description: Create Angular services using inject() pattern and RxJS observables for Quatiapp
---

# Angular Service Pattern

## When to use

Creating Angular services with modern patterns for the Quatiapp project.

## Pattern

Use `inject()` function instead of constructor dependency injection:

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private http = inject(HttpClient);

  getData(): Observable<Data> {
    return this.http.get<Data>('/api/data');
  }
}
```

## Conventions

- Use `inject()` over constructor DI
- Services return RxJS observables for API calls
- Use signals for local component state
- Services should be `{ providedIn: 'root' }`
- Keep services focused on a single responsibility
