
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AtSign, Send, ArrowLeft } from 'lucide-react';

import { ReactifyCard, ReactifyCardHeader, ReactifyCardTitle, ReactifyCardDescription, ReactifyCardContent, ReactifyCardFooter } from './card';
import { ReactifyInput } from './input';
import { ReactifyButton } from './button';
import type { ReactifyComponentProps } from './common-props';
import { cn } from './utils';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

interface ReactifyForgotPasswordFormProps extends ReactifyComponentProps {
  onSubmit?: (data: ForgotPasswordFormValues) => void | Promise<void>;
  onLogin?: () => void;
  logo?: ReactNode;
  title?: string;
  description?: string;
  isLoading?: boolean;
  successMessage?: string | null;
  errorMessage?: string | null;
}

export function ReactifyForgotPasswordForm({
  className,
  onSubmit = (data) => console.log('Forgot password form submitted:', data),
  onLogin,
  logo,
  title = "Forgot Your Password?",
  description = "No worries! Enter your email and we'll send you a reset link.",
  isLoading = false,
  successMessage,
  errorMessage,
  as: Component = 'div',
  ...props
}: ReactifyForgotPasswordFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
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
            {successMessage && (
              <div className="p-3 bg-green-100 border border-green-300 text-green-700 rounded-md text-sm">
                {successMessage}
              </div>
            )}
            {errorMessage && !successMessage && (
              <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
                {errorMessage}
              </div>
            )}
            {!successMessage && (
              <>
                <div className="space-y-1.5">
                  <label htmlFor="email-forgot" className="block text-sm font-medium text-foreground">Email Address</label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <ReactifyInput
                      id="email-forgot"
                      type="email"
                      placeholder="you@example.com"
                      {...register('email')}
                      error={!!errors.email}
                      className="pl-10"
                    />
                  </div>
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                </div>
                <ReactifyButton type="submit" className="w-full" isLoading={isLoading} leftIcon={<Send size={18}/>}>
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </ReactifyButton>
              </>
            )}
            {successMessage && (
                 <ReactifyButton
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={onLogin || (() => window.location.href = '/auth-demo/login')}
                    leftIcon={<ArrowLeft size={18}/>}
                >
                    Back to Login
                </ReactifyButton>
            )}
          </form>
        </ReactifyCardContent>
        {!successMessage && (
            <ReactifyCardFooter className="flex-col items-center space-y-2 pt-6">
            {onLogin ? (
                <p className="text-sm text-muted-foreground">
                Remember your password?{' '}
                <button type="button" onClick={onLogin} className="font-medium text-primary hover:underline">
                    Sign In
                </button>
                </p>
            ) : (
                <p className="text-sm text-muted-foreground">
                Remember your password?{' '}
                <Link href="/auth-demo/login" passHref>
                    <span className="font-medium text-primary hover:underline cursor-pointer">Sign In</span>
                </Link>
                </p>
            )}
            </ReactifyCardFooter>
        )}
      </ReactifyCard>
    </Component>
  );
}
