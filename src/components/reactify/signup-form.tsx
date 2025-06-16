
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, AtSign, Lock, LogIn } from 'lucide-react';

import { ReactifyCard, ReactifyCardHeader, ReactifyCardTitle, ReactifyCardDescription, ReactifyCardContent, ReactifyCardFooter } from './card';
import { ReactifyInput } from './input';
import { ReactifyButton } from './button';
import type { ReactifyComponentProps } from './common-props';
import { cn } from './utils';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'], // path of error
});

type SignupFormValues = z.infer<typeof signupSchema>;

interface ReactifySignupFormProps extends ReactifyComponentProps {
  onSubmit?: (data: SignupFormValues) => void | Promise<void>;
  onLogin?: () => void;
  logo?: ReactNode;
  title?: string;
  description?: string;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export function ReactifySignupForm({
  className,
  onSubmit = (data) => console.log('Signup form submitted:', data),
  onLogin,
  logo,
  title = "Create an Account",
  description = "Join us today! It's quick and easy.",
  isLoading = false,
  errorMessage,
  as: Component = 'div',
  ...props
}: ReactifySignupFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <Component className={cn("w-full max-w-md", className)} {...props}>
      <ReactifyCard>
        <ReactifyCardHeader className="text-center">
          {logo && <div className="mb-4 flex justify-center">{logo}</div>}
          <ReactifyCardTitle>{title}</ReactifyCardTitle>
          {description && <ReactifyCardDescription>{description}</ReactifyCardDescription>}
        </ReactifyCardHeader>
        <ReactifyCardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
             {errorMessage && (
              <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
                {errorMessage}
              </div>
            )}
            <div className="space-y-1.5">
              <label htmlFor="name-signup" className="block text-sm font-medium text-foreground">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <ReactifyInput
                  id="name-signup"
                  type="text"
                  placeholder="John Doe"
                  {...register('name')}
                  error={!!errors.name}
                  className="pl-10"
                />
              </div>
              {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email-signup" className="block text-sm font-medium text-foreground">Email Address</label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <ReactifyInput
                  id="email-signup"
                  type="email"
                  placeholder="you@example.com"
                  {...register('email')}
                  error={!!errors.email}
                  className="pl-10"
                />
              </div>
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password-signup" className="block text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <ReactifyInput
                  id="password-signup"
                  type="password"
                  placeholder="Create a strong password"
                  {...register('password')}
                  error={!!errors.password}
                  className="pl-10"
                />
              </div>
              {errors.password && <p className="text-sm text-destructive mt-1">{errors.password.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="confirmPassword-signup" className="block text-sm font-medium text-foreground">Confirm Password</label>
               <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <ReactifyInput
                  id="confirmPassword-signup"
                  type="password"
                  placeholder="Re-enter your password"
                  {...register('confirmPassword')}
                  error={!!errors.confirmPassword}
                  className="pl-10"
                />
              </div>
              {errors.confirmPassword && <p className="text-sm text-destructive mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <ReactifyButton type="submit" className="w-full" isLoading={isLoading} leftIcon={<LogIn size={18}/>}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </ReactifyButton>
          </form>
        </ReactifyCardContent>
        <ReactifyCardFooter className="flex-col items-center space-y-2 pt-6">
           {onLogin ? (
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <button type="button" onClick={onLogin} className="font-medium text-primary hover:underline">
                Sign In
              </button>
            </p>
           ) : (
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/auth-demo/login" passHref>
                <span className="font-medium text-primary hover:underline cursor-pointer">Sign In</span>
              </Link>
            </p>
           )}
        </ReactifyCardFooter>
      </ReactifyCard>
    </Component>
  );
}
