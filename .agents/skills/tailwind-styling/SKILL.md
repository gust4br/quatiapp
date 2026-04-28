---
name: tailwind-styling
description: Style components with Tailwind CSS following Quatiapp project conventions
---

# Tailwind CSS Styling

## When to use

Styling components with Tailwind CSS in the Quatiapp project.

## Setup

- Tailwind CSS 4.1 with PostCSS
- Configuration in `src/styles.css` using `@theme` directive
- Custom theme values defined in `src/styles.css`

## Usage

Apply Tailwind classes directly in component templates:

```html
<div class="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
  <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Action
  </button>
</div>
```

## Project Theme

Custom colors defined in `src/styles.css`:
- `--light-bg: #f9f5f4` (used for body background)

## Conventions

- Use Tailwind utility classes in templates (avoid separate CSS files)
- Use `@apply` sparingly in `src/styles.css` for global styles only
- Follow mobile-first responsive design with Tailwind breakpoints
- Use `sm:`, `md:`, `lg:` prefixes for responsive adjustments
- Font family: Poppins (imported in `src/styles.css`)
