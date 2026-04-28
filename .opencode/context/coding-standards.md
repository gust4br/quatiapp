# Quatiapp Coding Standards

## Component Pattern

```typescript
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-name',
  imports: [],
  templateUrl: './name.component.html',
})
export class NameComponent {
  private readonly dependency = inject(DependencyType);
  // Use signals for state
}
```

## File Naming

- Components: `*.component.ts` + `*.component.html`
- Pages: `*.page.ts` + `*.page.html`
- Services: `*.service.ts`
- Types/DTOs: `*.dto.ts`
- Separate template files for all components

## State Management

- Use Angular signals for local component state: `todos = signal<TodoItem[]>([])`
- Use `inject()` function for dependency injection (not constructor)
- Implement optimistic updates with rollback pattern:

```typescript
const previousTodos = this.todos();
this.todos.update(current => /* modification */);

this.service.update(data).subscribe({
  next: () => this.toast.show('Success'),
  error: () => {
    this.todos.set(previousTodos);
    this.toast.show('Error', 'error');
  }
});
```

## Routing

- Use lazy loading with `loadComponent` for all pages
- Define routes in `src/app/app.routes.ts`
- No NgModules - use standalone components with `imports` array

## Imports

- Use explicit imports from `@angular/core`, `@angular/common/http`, etc.
- Group imports: Angular core first, then project modules, then types
- Use `imports` array in `@Component` decorator for standalone components

## TypeScript

- Strict mode enabled
- Define interfaces in `src/app/types/*.dto.ts`
- Use `Omit<T, 'field'>` for create operations
- Use `Partial<T>` for update operations
