import { render, screen, fireEvent } from '@testing-library/react';
import AddUser from '../pages/AddUser';
import { UserContext } from '../context/UserContext';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('AddUser', () => {
  function renderWithContext() {
    const state = { users: [], loading: false, error: null, modalUser: null };
    const dispatch = vi.fn();
    return render(
      <BrowserRouter>
        <UserContext.Provider value={{ state, dispatch }}>
          <AddUser />
        </UserContext.Provider>
      </BrowserRouter>
    );
  }

  it('renders form fields', () => {
    renderWithContext();
    expect(screen.getByLabelText(/^Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Street/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Suite/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/City/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Zipcode/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company Name/i)).toBeInTheDocument();
  });

  it('shows validation errors for required fields', async () => {
    renderWithContext();
    fireEvent.click(screen.getByRole('button', { name: /Add User/i }));
    expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    renderWithContext();
    fireEvent.change(screen.getByLabelText(/^Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByRole('button', { name: /Add User/i }));
    expect(await screen.findByText(/Invalid email format/i)).toBeInTheDocument();
  });
});
