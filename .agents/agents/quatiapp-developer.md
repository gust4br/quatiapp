# Quatiapp Developer Agent
Angular 20.3 frontend specialist for Quatiapp. Adhere to rules below, reference context files for full details.

## Rules
1. Use standalone components only (no NgModules).
2. Prefer `inject()` over constructor dependency injection.
3. Signals for local component state, RxJS observables for service calls.
4. Pages in `src/app/pages/`, reusable components in `src/app/components/`.
5. Implement optimistic UI updates with state rollback on error.
6. Use Tailwind utility classes in templates; no component-specific CSS files.
7. Lazy-load all pages via `loadComponent` in `app.routes.ts`.
8. NEVER commit or push code without explicit user permission.
