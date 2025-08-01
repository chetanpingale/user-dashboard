import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { UserTable } from '../components/UserTable';
import type { User } from '../types/User';

describe('UserTable', () => {
  const users: User[] = [
    {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      phone: '111-111-1111',
      address: { street: '1 St', suite: 'A', city: 'City', zipcode: '00001' },
      company: { name: 'CompanyA', catchPhrase: '', bs: '' },
    },
    {
      id: 2,
      name: 'Bob',
      email: 'bob@example.com',
      phone: '222-222-2222',
      address: { street: '2 St', suite: 'B', city: 'Town', zipcode: '00002' },
      company: { name: 'CompanyB', catchPhrase: '', bs: '' },
    },
  ];

  it('renders user rows', () => {
    render(
      <UserTable
        users={users}
        onRowClick={() => {}}
        sortBy="name"
        sortOrder="asc"
        onSort={() => {}}
      />
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('calls onRowClick when row is clicked', () => {
    const onRowClick = vi.fn();
    render(
      <UserTable
        users={users}
        onRowClick={onRowClick}
        sortBy="name"
        sortOrder="asc"
        onSort={() => {}}
      />
    );
    fireEvent.click(screen.getByText('Alice'));
    expect(onRowClick).toHaveBeenCalledWith(users[0]);
  });
});
