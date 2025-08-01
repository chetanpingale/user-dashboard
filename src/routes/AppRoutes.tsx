import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load the main pages for code splitting
const UserList = React.lazy(() => import('../pages/UserList'));
const AddUser = React.lazy(() => import('../pages/AddUser'));

// AppRoutes defines the main application routes
export const AppRoutes: React.FC = () => (
  // Suspense provides a fallback while lazy components load
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {/* Home route: user list */}
      <Route path="/" element={<UserList />} />
      {/* Add user route */}
      <Route path="/add" element={<AddUser />} />
      {/* Catch-all: redirect unknown routes to UserList */}
      <Route path="*" element={<UserList />} />
    </Routes>
  </Suspense>
);
