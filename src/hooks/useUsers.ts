import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
// TODO: use useUsers hook to fetch and manage user data
export const useUsers = () => {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    async function fetchUsers() {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        dispatch({ type: 'SET_USERS', payload: data });
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load users' });
      }
    }
    fetchUsers();
  }, [dispatch]);

  return { ...state, dispatch };
};
