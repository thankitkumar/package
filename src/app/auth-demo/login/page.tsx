
'use client';

import { useState } from 'react';
import { ReactifyLoginForm } from '@/components/reactify/login-form';
import { useRouter } from 'next/navigation';
import { Package } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    setErrorMessage(null);
    console.log('Login attempt:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (data.email === "error@example.com") {
      setErrorMessage("Invalid credentials. Please try again.");
    } else {
      alert('Login successful! (Simulated)');
      // router.push('/dashboard'); // Example redirect
    }
    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    router.push('/auth-demo/forgot-password');
  };

  const handleSignup = () => {
    router.push('/auth-demo/signup');
  };

  return (
    <ReactifyLoginForm
      logo={<Package className="h-10 w-10 text-primary" />}
      onSubmit={handleSubmit}
      onForgotPassword={handleForgotPassword}
      onSignup={handleSignup}
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  );
}
