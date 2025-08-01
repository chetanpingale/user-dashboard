
// Types for user state and actions in context
import type { User } from '../types/User';

// User state shape for context
export interface UserState {
  // List of users
  users: User[];
  // Loading state for async actions
  loading: boolean;
  // Error message if any
  error: string | null;
  // User selected for modal display
  modalUser: User | null;
}


// All possible actions for user context
export type UserAction =
  // Set the user list
  | { type: 'SET_USERS'; payload: User[] }
  // Set loading state
  | { type: 'SET_LOADING'; payload: boolean }
  // Set error message
  | { type: 'SET_ERROR'; payload: string }
  // Open user details modal
  | { type: 'OPEN_MODAL'; payload: User }
  // Close user details modal
  | { type: 'CLOSE_MODAL' }
  // Add a new user
  | { type: 'ADD_USER'; payload: User };
