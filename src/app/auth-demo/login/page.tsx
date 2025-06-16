
'use client';

import { useState } from 'react';
import { ReactifyLoginForm } from '@/components/reactify/login-form';
import { useRouter } from 'next/navigation';
import { Package, Code2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';

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

  const codeExample = `
'use client';

import { useState } from 'react';
import { ReactifyLoginForm } from '@/components/reactify/login-form';
import { useRouter } from 'next/navigation';
import { Package } from 'lucide-react'; // Or your desired logo component

export default function LoginPageExample() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    setErrorMessage(null);
    // Simulate API call for login
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (data.email === "error@example.com") {
      setErrorMessage("Invalid credentials.");
    } else {
      alert('Login successful! (Simulated)');
      // router.push('/dashboard'); // Redirect on success
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
      title="Login to Your Account"
      description="Access your dashboard and features."
    />
  );
}
  `.trim();

  return (
    <>
      <ReactifyLoginForm
        logo={<Package className="h-10 w-10 text-primary" />}
        onSubmit={handleSubmit}
        onForgotPassword={handleForgotPassword}
        onSignup={handleSignup}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
      <Card className="w-full max-w-2xl mt-12 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline">Usage Example</CardTitle>
          </div>
          <CardDescription>How to implement the ReactifyLoginForm in your page.</CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock code={codeExample} lang="tsx" scrollAreaClassName="max-h-none" />
        </CardContent>
      </Card>
    </>
  );
}
