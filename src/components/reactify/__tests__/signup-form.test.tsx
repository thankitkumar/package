import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifySignupForm } from '../signup-form';

// Mock next/navigation
jest.mock('next/navigation', () => require('../../../../__mocks__/next/navigation'));

describe('ReactifySignupForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with default titles', () => {
    render(<ReactifySignupForm />);
    expect(screen.getByText('Create an Account')).toBeInTheDocument();
    expect(screen.getByText(/Join us today!/)).toBeInTheDocument();
  });

  it('shows validation errors for invalid data', async () => {
    render(<ReactifySignupForm onSubmit={mockOnSubmit} />);
    fireEvent.change(screen.getByPlaceholderText('John Doe'), { target: { value: 'a' } });
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByPlaceholderText('Create a strong password'), { target: { value: 'short' } });
    fireEvent.change(screen.getByPlaceholderText('Re-enter your password'), { target: { value: 'different' } });
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
      expect(screen.getByText("Passwords don't match")).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with valid data', async () => {
    render(<ReactifySignupForm onSubmit={mockOnSubmit} />);
    fireEvent.change(screen.getByPlaceholderText('John Doe'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Create a strong password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Re-enter your password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      });
    });
  });

  it('displays an error message from props', () => {
    render(<ReactifySignupForm errorMessage="Email already exists" />);
    expect(screen.getByText('Email already exists')).toBeInTheDocument();
  });

  it('calls onLogin when the link is clicked', () => {
    render(<ReactifySignupForm onLogin={mockOnLogin} />);
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(mockOnLogin).toHaveBeenCalledTimes(1);
  });
});
