import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { SearchAndSortBar } from '../components/SearchAndSortBar';

describe('SearchAndSortBar', () => {
  it('renders search input and sort buttons', () => {
    render(
      <SearchAndSortBar
        search=""
        onSearchChange={() => {}}
        sortBy="name"
        sortOrder="asc"
        onSortChange={() => {}}
      />
    );
    expect(screen.getByPlaceholderText(/Search by Name or Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort by name/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort by email/i)).toBeInTheDocument();
  });

  it('calls onSearchChange when typing', () => {
    const onSearchChange = vi.fn();
    render(
      <SearchAndSortBar
        search=""
        onSearchChange={onSearchChange}
        sortBy="name"
        sortOrder="asc"
        onSortChange={() => {}}
      />
    );
    fireEvent.change(screen.getByPlaceholderText(/Search by Name or Email/i), { target: { value: 'abc' } });
    expect(onSearchChange).toHaveBeenCalledWith('abc');
  });
});
