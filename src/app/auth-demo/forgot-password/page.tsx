
'use client';

import { useState } from 'react';
import { ReactifyForgotPasswordForm } from '@/components/reactify/forgot-password-form';
import { useRouter } from 'next/navigation';
import { KeyRound, Code2 } from 'lucide-react'; // Or Package for generic logo
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';

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

  const codeExample = `
'use client';

import { useState } from 'react';
import { ReactifyForgotPasswordForm } from '@/components/reactify/forgot-password-form';
import { useRouter } from 'next/navigation';
import { KeyRound } from 'lucide-react'; // Or your desired logo component

export default function ForgotPasswordPageExample() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    // Simulate API call for password reset
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (data.email === "notfound@example.com") {
      setErrorMessage("No account found with this email.");
    } else {
      setSuccessMessage("Password reset link sent (if account exists).");
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
      title="Reset Your Password"
      description="Enter your email to receive a reset link."
    />
  );
}
  `.trim();

  return (
    <>
      <ReactifyForgotPasswordForm
        logo={<KeyRound className="h-10 w-10 text-primary" />}
        onSubmit={handleSubmit}
        onLogin={handleLogin}
        isLoading={isLoading}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      <Card className="w-full max-w-2xl mt-12 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline">Usage Example</CardTitle>
          </div>
          <CardDescription>How to implement the ReactifyForgotPasswordForm in your page.</CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock code={codeExample} lang="tsx" scrollAreaClassName="max-h-none" />
        </CardContent>
      </Card>
    </>
  );
}
