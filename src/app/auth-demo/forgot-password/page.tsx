
'use client';

import { useState } from 'react';
import { ReactifyForgotPasswordForm } from '@/components/reactify/forgot-password-form';
import { useRouter } from 'next/navigation';
import { KeyRound } from 'lucide-react'; // Or Package for generic logo

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    console.log('Forgot password attempt:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (data.email === "notfound@example.com") {
      setErrorMessage("No account found with that email address.");
    } else {
      setSuccessMessage("If an account exists for this email, a password reset link has been sent.");
    }
    setIsLoading(false);
  };

  const handleLogin = () => {
    router.push('/auth-demo/login');
  };

  return (
    <ReactifyForgotPasswordForm
      logo={<KeyRound className="h-10 w-10 text-primary" />}
      onSubmit={handleSubmit}
      onLogin={handleLogin}
      isLoading={isLoading}
      successMessage={successMessage}
      errorMessage={errorMessage}
    />
  );
}
