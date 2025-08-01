// UserList page: displays, filters, sorts, and manages users
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { UserContext } from '../context/UserContext';
import type { User } from '../types/User';
import { UserTable } from '../components/UserTable';
import { SearchAndSortBar } from '../components/SearchAndSortBar';
import { UserModal } from '../components/UserModal';
import { Loader } from '../components/Loader';
import { ErrorAlert } from '../components/ErrorAlert';
import { useDebounce } from '../hooks/useDebounce';


const UserList: React.FC = () => {
  // Access user state and dispatch from context
  const { state, dispatch } = useContext(UserContext);
  const { users, loading, error, modalUser } = state;

  // Search and sort state
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [sortBy, setSortBy] = useState<keyof User>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Fetch users on mount if not already loaded
  useEffect(() => {
    if (users.length === 0) {
      dispatch({ type: 'SET_LOADING', payload: true });
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => {
          if (!res.ok) throw new Error('Network response not OK');
          return res.json();
        })
        .then((data: User[]) => {
          dispatch({ type: 'SET_USERS', payload: data });
        })
        .catch(() => {
          dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch users' });
        });
    }
  }, [dispatch, users.length]);

  // Filter and sort users based on search and sort state
  const filteredSortedUsers = useMemo(() => {
    let filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aField = a[sortBy];
      const bField = b[sortBy];
      let result = 0;
      if (typeof aField === 'string' && typeof bField === 'string') {
        result = aField.localeCompare(bField);
      } else if (typeof aField === 'number' && typeof bField === 'number') {
        result = aField - bField;
      }
      return sortOrder === 'asc' ? result : -result;
    });

    return filtered;
  }, [users, debouncedSearch, sortBy, sortOrder]);

  // Handle sort changes from the UI
  const handleSortChange = (field: keyof User) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Opens the user details modal
  const openModal = (user: User) => {
    dispatch({ type: 'OPEN_MODAL', payload: user });
  };

  // Closes the modal by clearing selected user
  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  // Render the user list page
  return (
    <div className="p-4 max-w-5xl mx-auto" role="main" aria-label="User List Page">
      <h1 className="text-3xl font-bold mb-6" tabIndex={0} aria-label="User List Heading">User List</h1>
      {/* Show error alert if error exists */}
      {error && <ErrorAlert message={error} />}
      {/* Search and sort bar */}
      <SearchAndSortBar
        search={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />
      {/* Loader or user table */}
      {loading ? (
        <Loader />
      ) : (
        // Display the user table
        <UserTable
          users={filteredSortedUsers}
          onRowClick={openModal}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSortChange}
        />
      )}
      {/* Conditionally render user details modal */}
      {modalUser && (
        <UserModal user={modalUser} isOpen={Boolean(modalUser)} onClose={closeModal} />
      )}
    </div>
  );
};

export default UserList;