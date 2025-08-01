import { render, screen } from '@testing-library/react';
import { Header } from '../components/Header';
import { BrowserRouter } from 'react-router-dom';

describe('Header', () => {
  it('renders app title and navigation links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading', { name: /User Dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /User List/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Add User/i })).toBeInTheDocument();
  });
});