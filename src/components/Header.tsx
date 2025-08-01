/**
 * Header.tsx
 *
 * Header component that includes the application title and navigation links.
 * Uses React Router's NavLink to provide active link styling.
 * Visible on all pages to allow navigation between main views like User List and Add User.
 */
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center" role="banner" aria-label="App Header">
      {/* App title */}
      <h1 className="text-xl font-bold" tabIndex={0} aria-label="User Dashboard">
        <span aria-hidden="true">User Dashboard</span>
        <span className="sr-only">Main application header: User Dashboard</span>
      </h1>
      {/* Navigation links */}
      <nav className="space-x-4" role="navigation" aria-label="Main Navigation">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? 'underline font-semibold'
              : 'hover:underline'
          }
          aria-label="Go to User List page"
        >
          <span aria-hidden="true">User List</span>
          <span className="sr-only">Navigate to the User List page</span>
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive
              ? 'underline font-semibold'
              : 'hover:underline'
          }
          aria-label="Go to Add User page"
        >
          <span aria-hidden="true">Add User</span>
          <span className="sr-only">Navigate to the Add User page</span>
        </NavLink>
      </nav>
    </header>
  );
};
