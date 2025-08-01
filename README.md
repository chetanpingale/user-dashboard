# Live Demo

Access the deployed app here: [https://chetanpingale.github.io/user-dashboard](https://chetanpingale.github.io/user-dashboard)


# User Dashboard

A modern, accessible, and scalable user dashboard built with React, TypeScript, Vite, and Tailwind CSS.

## Features
- Virtualized user table for performance with large datasets
- Add, view, search, and sort users
- Accessible modals and navigation (ARIA, keyboard navigation)
- Context API for global state management
- TypeScript for type safety
- Unit tests with Vitest and Testing Library

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Run tests:**
   ```bash
   npm run test
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Architectural Decisions

- **React + Vite:** Fast development and build times, ESM-native.
- **Context API + useReducer:** Simple, scalable state management for user data and UI state.
- **Component Structure:**
  - `src/components/`: Reusable UI components (UserTable, UserModal, Header, etc.)
  - `src/pages/`: Page-level components (UserList, AddUser)
  - `src/context/`: Context and reducer for user state
  - `src/types/`: TypeScript types
- **Virtualization:** Uses `react-window` for efficient rendering of large user lists.
- **Accessibility:**
  - ARIA roles and attributes on all interactive components
  - Keyboard navigation and focus management in modals and tables
  - Visible focus indicators
- **Testing:**
  - Vitest and @testing-library/react for fast, ESM-compatible unit tests
  - Tests cover all major components and accessibility features
- **Styling:** Tailwind CSS for utility-first, responsive design

## Assumptions
- User data is fetched from a public API (`jsonplaceholder.typicode.com/users`)
- All users have unique IDs
- Only basic user fields are required for add/search/sort
- The app is intended as a dashboard demo, not a full-featured admin panel
- Accessibility is a priority (screen reader and keyboard support)

## How to Extend
- Add more user fields or validation in `AddUser`
- Add pagination or infinite scroll to the user table
- Integrate with a real backend or authentication
- Add more tests for edge cases or accessibility

---
MIT License
