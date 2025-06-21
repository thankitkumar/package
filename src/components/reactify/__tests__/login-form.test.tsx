import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifyLoginForm } from '../login-form';
import { Package } from 'lucide-react';

// Mock next/navigation
jest.mock('next/navigation', () => require('../../../../__mocks__/next/navigation'));

describe('ReactifyLoginForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnForgotPassword = jest.fn();
  const mockOnSignup = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with default titles', () => {
    render(<ReactifyLoginForm />);
    expect(screen.getByText('Welcome Back!')).toBeInTheDocument();
    expect(screen.getByText('Sign in to continue to your account.')).toBeInTheDocument();
  });

  it('renders a custom logo and title', () => {
    render(<ReactifyLoginForm logo={<Package data-testid="logo" />} title="Custom Login" />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByText('Custom Login')).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    render(<ReactifyLoginForm onSubmit={mockOnSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with valid data', async () => {
    render(<ReactifyLoginForm onSubmit={mockOnSubmit} />);
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('checkbox', { name: /Remember me/i }));
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        rememberMe: true,
      });
    });
  });

  it('displays an error message from props', () => {
    render(<ReactifyLoginForm errorMessage="Invalid credentials" />);
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  it('calls onForgotPassword when the link is clicked', () => {
    render(<ReactifyLoginForm onForgotPassword={mockOnForgotPassword} />);
    fireEvent.click(screen.getByText('Forgot password?'));
    expect(mockOnForgotPassword).toHaveBeenCalledTimes(1);
  });

  it('calls onSignup when the link is clicked', () => {
    render(<ReactifyLoginForm onSignup={mockOnSignup} />);
    fireEvent.click(screen.getByRole('button', { name: 'Sign up' }));
    expect(mockOnSignup).toHaveBeenCalledTimes(1);
  });
});
