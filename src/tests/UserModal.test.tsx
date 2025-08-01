import { render, screen } from '@testing-library/react';
import { UserModal } from '../components/UserModal';
import type { User } from '../types/User';

describe('UserModal', () => {
  const user: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    address: {
      street: '123 Main St',
      suite: 'Apt 1',
      city: 'Metropolis',
      zipcode: '12345',
      geo: { lat: '24.8918', lng: '21.8984' },
    },
    company: { name: 'Acme Inc', catchPhrase: '', bs: '' },
  };

  it('renders user details and map link', () => {
    render(<UserModal user={user} isOpen={true} onClose={() => {}} />);
    // Debug the DOM output to help diagnose why the link is not found
    screen.debug();
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/)).toBeInTheDocument();
    expect(screen.getByText(/123-456-7890/)).toBeInTheDocument();
    expect(screen.getByText(/123 Main St/)).toBeInTheDocument();
    expect(screen.getByText(/Acme Inc/)).toBeInTheDocument();
    expect(screen.getByText(/View on Map/)).toBeInTheDocument();
    // The accessible name for the link is the aria-label, not the visible text
    const mapLink = screen.getByRole('link', { name: /View John Doe's address on Google Maps/i });
    expect(mapLink).toHaveAttribute('href', expect.stringContaining('24.8918,21.8984'));
  });
});
