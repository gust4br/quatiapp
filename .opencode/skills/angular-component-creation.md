# Angular Component Creation

## When to use

Creating new Angular components, pages, or directives.

## Steps

1. Identify the target directory:
   - Pages: `src/app/pages/<name>/`
   - Components: `src/app/components/<name>/`

2. Create the component file with this structure:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // if needed

@Component({
  selector: 'app-name',
  imports: [],
  templateUrl: './name.component.html',
})
export class NameComponent {
  // Use inject() for dependencies
  // Use signals for state
}
```

3. Create corresponding template file `name.component.html`

4. For pages, update `src/app/app.routes.ts` with lazy loading:

```typescript
{
  path: 'route-path',
  loadComponent: () => import('./pages/name/name.page').then((m) => m.NamePage),
}
```

5. For reusable components, export from the appropriate index if needed

## Conventions

- Suffix: `*.component.ts` for components, `*.page.ts` for pages
- Use kebab-case for selectors: `app-component-name`
- Use PascalCase for class names: `ComponentName`
- Keep templates in separate `.html` files
