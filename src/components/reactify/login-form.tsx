
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AtSign, Lock, LogIn } from 'lucide-react';

import { ReactifyCard, ReactifyCardHeader, ReactifyCardTitle, ReactifyCardDescription, ReactifyCardContent, ReactifyCardFooter } from './card';
import { ReactifyInput } from './input';
import { ReactifyButton } from './button';
import { ReactifyCheckbox } from './checkbox';
import type { ReactifyComponentProps } from './common-props';
import { cn } from './utils';

const loginSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface ReactifyLoginFormProps extends ReactifyComponentProps {
  onSubmit?: (data: LoginFormValues) => void | Promise<void>;
  onForgotPassword?: () => void;
  onSignup?: () => void;
  logo?: ReactNode;
  title?: string;
  description?: string;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export function ReactifyLoginForm({
  className,
  onSubmit = (data) => console.log('Login form submitted:', data),
  onForgotPassword,
  onSignup,
  logo,
  title = "Welcome Back!",
  description = "Sign in to continue to your account.",
  isLoading = false,
  errorMessage,
  as: Component = 'div',
  ...props
}: ReactifyLoginFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
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
              <label htmlFor="email-login" className="block text-sm font-medium text-foreground">Email or Username</label>
              <div className="relative">
                 <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <ReactifyInput
                  id="email-login"
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
              <label htmlFor="password-login" className="block text-sm font-medium text-foreground">Password</label>
               <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <ReactifyInput
                  id="password-login"
                  type="password"
                  placeholder="••••••••"
                  {...register('password')}
                  error={!!errors.password}
                  className="pl-10"
                />
              </div>
              {errors.password && <p className="text-sm text-destructive mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <ReactifyCheckbox
                id="rememberMe-login"
                label="Remember me"
                {...register('rememberMe')}
              />
              {onForgotPassword ? (
                 <button type="button" onClick={onForgotPassword} className="text-sm text-primary hover:underline">
                  Forgot password?
                </button>
              ) : (
                <Link href="/auth-demo/forgot-password" passHref>
                  <span className="text-sm text-primary hover:underline cursor-pointer">Forgot password?</span>
                </Link>
              )}
            </div>

            <ReactifyButton type="submit" className="w-full" isLoading={isLoading} leftIcon={<LogIn size={18}/>}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </ReactifyButton>
          </form>
        </ReactifyCardContent>
        <ReactifyCardFooter className="flex-col items-center space-y-2 pt-6">
           {onSignup ? (
             <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <button type="button" onClick={onSignup} className="font-medium text-primary hover:underline">
                  Sign up
                </button>
              </p>
           ) : (
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/auth-demo/signup" passHref>
                <span className="font-medium text-primary hover:underline cursor-pointer">Sign up</span>
              </Link>
            </p>
           )}
        </ReactifyCardFooter>
      </ReactifyCard>
    </Component>
  );
}
