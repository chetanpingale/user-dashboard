
// UserContext provides global user state and actions
import React, { createContext, useReducer, type Dispatch } from 'react';
import type { UserState, UserAction } from './UserContext.types';


// Initial state for user context
const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  modalUser: null,
};


// Reducer to handle user state actions
function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'SET_USERS': // Set the user list
      return { ...state, users: action.payload, loading: false, error: null };
    case 'SET_LOADING': // Set loading state
      return { ...state, loading: action.payload };
    case 'SET_ERROR': // Set error message
      return { ...state, error: action.payload, loading: false };
    case 'OPEN_MODAL': // Open user details modal
      return { ...state, modalUser: action.payload };
    // Close the user details modal by clearing modalUser
    case 'CLOSE_MODAL':
      return { ...state, modalUser: null };
    case 'ADD_USER': // Add a new user to the list
      return { ...state, users: [action.payload, ...state.users] };
    default:
      return state;
  }
}


// Create the UserContext with default state and dispatch
export const UserContext = createContext<{
  state: UserState;
  dispatch: Dispatch<UserAction>;
}>({
  state: initialState,
  dispatch: () => null,
});


// UserProvider wraps the app and provides user state
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
