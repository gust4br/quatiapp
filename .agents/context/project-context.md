# Quatiapp Project Context

## Overview

Quatiapp is an Angular 20.3 frontend application for managing todo items. The application provides a user interface for creating, listing, updating, and deleting todo items with optimistic UI updates.

## Tech Stack

- **Framework**: Angular 20.3.15 with standalone components
- **Language**: TypeScript 5.9.3 (strict mode enabled)
- **Styling**: Tailwind CSS 4.1.11 with PostCSS
- **HTTP Client**: Angular HttpClient with RxJS 7.8
- **Testing**: Karma + Jasmine
- **Build Tool**: Angular CLI 20.3.13

## Project Structure

```
src/
├── app/
│   ├── components/       # Reusable UI components
│   │   ├── button/
│   │   ├── checkbox/
│   │   ├── input/
│   │   ├── todo-form/
│   │   ├── todo-item/
│   │   ├── toast/
│   │   └── resume/
│   ├── pages/           # Route pages
│   │   ├── intro/
│   │   └── main/
│   ├── services/        # Business logic and API services
│   │   └── todo.service.ts
│   ├── types/           # TypeScript interfaces/DTOs
│   │   └── TodoItem.dto.ts
│   ├── app.ts           # Root component
│   ├── app.config.ts    # App configuration
│   ├── app.routes.ts    # Route definitions
│   ├── environment.ts   # Dev environment config
│   └── environment.prod.ts
├── styles.css           # Global styles with Tailwind
├── index.html           # Entry HTML
└── main.ts              # Bootstrap file
```

## Key Features

- Todo item management (CRUD operations)
- Optimistic UI updates with rollback on error
- Toast notifications for user feedback
- Lazy-loaded routes for performance
- Responsive design with Tailwind CSS

## API Integration

- Base URL configured in environment files
- Currently pointing to `http://localhost:3000` for development
- RESTful API endpoints under `/todos`
