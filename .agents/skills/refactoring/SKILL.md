---
name: refactoring
description: Refactor Angular code to follow Quatiapp conventions and best practices
---

# Refactoring

## When to use

Refactoring existing Angular code to align with Quatiapp project standards.

## Checklist

1. **Dependency Injection**
   - Replace constructor DI with `inject()` function
   - Example: `private service = inject(MyService)` instead of constructor injection

2. **State Management**
   - Convert class properties to signals: `data = signal<Type>(initialValue)`
   - Use `computed()` for derived state
   - Use `effect()` for side effects

3. **Components**
   - Ensure standalone components (no NgModules)
   - Move to proper directory: `pages/` or `components/`
   - Add lazy loading in `app.routes.ts` for pages

4. **Styling**
   - Remove component-specific CSS files
   - Move styles to Tailwind utility classes in templates
   - Use `src/styles.css` for global styles only

5. **File Naming**
   - Components: `*.component.ts`
   - Pages: `*.page.ts`
   - Services: `*.service.ts`

## Optimistic UI Pattern

When updating data:
1. Update local state immediately (optimistic)
2. Call API
3. On error: rollback state and show error message
4. On success: optionally refresh or confirm state
