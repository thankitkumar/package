import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifyForgotPasswordForm } from '../forgot-password-form';
import { KeyRound } from 'lucide-react';

// Mock next/navigation
jest.mock('next/navigation', () => require('../../../../__mocks__/next/navigation'));

describe('ReactifyForgotPasswordForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnLogin.mockClear();
  });

  it('renders the form with default title and description', () => {
    render(<ReactifyForgotPasswordForm />);
    expect(screen.getByText('Forgot Your Password?')).toBeInTheDocument();
    expect(screen.getByText(/No worries! Enter your email/)).toBeInTheDocument();
  });

  it('renders a custom logo and title', () => {
    render(<ReactifyForgotPasswordForm logo={<KeyRound data-testid="logo" />} title="Custom Title" />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    render(<ReactifyForgotPasswordForm onSubmit={mockOnSubmit} />);
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByRole('button', { name: /Send Reset Link/i }));
    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with valid data', async () => {
    render(<ReactifyForgotPasswordForm onSubmit={mockOnSubmit} />);
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Send Reset Link/i }));
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({ email: 'test@example.com' });
    });
  });

  it('displays a success message', () => {
    render(<ReactifyForgotPasswordForm successMessage="Check your email!" />);
    expect(screen.getByText('Check your email!')).toBeInTheDocument();
    // The form itself should be hidden
    expect(screen.queryByPlaceholderText('you@example.com')).not.toBeInTheDocument();
  });

  it('displays an error message', () => {
    render(<ReactifyForgotPasswordForm errorMessage="Email not found." />);
    expect(screen.getByText('Email not found.')).toBeInTheDocument();
  });

  it('calls onLogin when the "Sign In" button is clicked', () => {
    render(<ReactifyForgotPasswordForm onLogin={mockOnLogin} />);
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(mockOnLogin).toHaveBeenCalledTimes(1);
  });
});
