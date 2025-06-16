
'use client';

import { useState } from 'react';
import { ReactifySignupForm } from '@/components/reactify/signup-form';
import { useRouter } from 'next/navigation';
import { UserPlus } from 'lucide-react'; // Or Package if you prefer generic logo

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    setErrorMessage(null);
    console.log('Signup attempt:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (data.email === "exists@example.com") {
        setErrorMessage("This email is already registered.");
    } else {
        alert('Signup successful! Please check your email for verification. (Simulated)');
        // router.push('/auth-demo/login');
    }
    setIsLoading(false);
  };

  const handleLogin = () => {
    router.push('/auth-demo/login');
  };

  return (
    <ReactifySignupForm
      logo={<UserPlus className="h-10 w-10 text-primary" />}
      onSubmit={handleSubmit}
      onLogin={handleLogin}
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  );
}
