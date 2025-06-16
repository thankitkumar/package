
'use client';

import { useState } from 'react';
import { ReactifySignupForm } from '@/components/reactify/signup-form';
import { useRouter } from 'next/navigation';
import { UserPlus, Code2 } from 'lucide-react'; // Or Package if you prefer generic logo
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';

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

  const codeExample = `
'use client';

import { useState } from 'react';
import { ReactifySignupForm } from '@/components/reactify/signup-form';
import { useRouter } from 'next/navigation';
import { UserPlus } from 'lucide-react'; // Or your desired logo component

export default function SignupPageExample() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    setErrorMessage(null);
    // Simulate API call for signup
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (data.email === "exists@example.com") {
      setErrorMessage("This email is already registered.");
    } else {
      alert('Signup successful! (Simulated)');
      // router.push('/auth-demo/login'); // Redirect on success
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
      title="Create Your Account"
      description="Join our platform today!"
    />
  );
}
  `.trim();

  return (
    <>
      <ReactifySignupForm
        logo={<UserPlus className="h-10 w-10 text-primary" />}
        onSubmit={handleSubmit}
        onLogin={handleLogin}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
      <Card className="w-full max-w-2xl mt-12 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline">Usage Example</CardTitle>
          </div>
          <CardDescription>How to implement the ReactifySignupForm in your page.</CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock code={codeExample} lang="tsx" scrollAreaClassName="max-h-none" />
        </CardContent>
      </Card>
    </>
  );
}
