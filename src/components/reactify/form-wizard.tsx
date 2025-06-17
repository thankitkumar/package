
'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { useForm, type SubmitHandler, type FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';
import { ReactifyButton } from './button';
import { ReactifyInput } from './input';
import { ReactifyTextarea } from './textarea';
import { ReactifyCard, ReactifyCardHeader, ReactifyCardTitle, ReactifyCardDescription, ReactifyCardContent, ReactifyCardFooter } from './card';
import { Label } from '@/components/ui/label'; // Using ShadCN label

export interface WizardField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea';
  placeholder?: string;
  defaultValue?: any;
}

export interface WizardStepConfig {
  id: string;
  title: string;
  description?: string;
  fields: WizardField[];
  schema: z.ZodObject<any, any, any>;
}

interface ReactifyFormWizardProps extends ReactifyComponentProps {
  steps: WizardStepConfig[];
  onFinalSubmit: (data: Record<string, any>) => void;
  initialData?: Record<string, any>;
  nextButtonText?: string;
  prevButtonText?: string;
  submitButtonText?: string;
  loading?: boolean;
}

export function ReactifyFormWizard({
  steps,
  onFinalSubmit,
  initialData = {},
  className,
  nextButtonText = 'Next',
  prevButtonText = 'Previous',
  submitButtonText = 'Submit',
  loading = false,
  as: Component = 'div',
  ...props
}: ReactifyFormWizardProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [allStepsData, setAllStepsData] = useState<Record<string, any>>(initialData);

  const currentStepConfig = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;
  const isFirstStep = currentStepIndex === 0;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(currentStepConfig.schema),
    // defaultValues are set in useEffect
  });
  
  useEffect(() => {
    const newStepConfig = steps[currentStepIndex];
    const stepDataFromState = allStepsData[newStepConfig.id] || {};
    const defaultValuesForStep = newStepConfig.fields.reduce((acc, field) => {
      acc[field.name] = stepDataFromState[field.name] ?? field.defaultValue ?? '';
      return acc;
    }, {} as Record<string, any>);

    reset(defaultValuesForStep, {
      keepDirty: false,
      keepErrors: false,
      keepTouched: false,
    });
  }, [currentStepIndex, steps, allStepsData, reset]);


  const processStepSubmit: SubmitHandler<FieldValues> = (currentStepRawData) => {
    const currentStepFields = currentStepConfig.fields.map(f => f.name);
    const currentStepValidatedData = Object.keys(currentStepRawData)
      .filter(key => currentStepFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = currentStepRawData[key];
        return obj;
      }, {} as FieldValues);

    const updatedData = {
      ...allStepsData,
      [currentStepConfig.id]: currentStepValidatedData,
    };
    setAllStepsData(updatedData);

    if (isLastStep) {
      onFinalSubmit(updatedData);
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const renderFields = (stepConf: WizardStepConfig) => {
    return stepConf.fields.map((field) => (
      <div key={field.name} className="space-y-1.5">
        <Label htmlFor={`${stepConf.id}-${field.name}`}>{field.label}</Label>
        {field.type === 'textarea' ? (
          <ReactifyTextarea
            id={`${stepConf.id}-${field.name}`}
            placeholder={field.placeholder}
            {...register(field.name)}
            error={!!errors[field.name]}
            rows={4}
          />
        ) : (
          <ReactifyInput
            id={`${stepConf.id}-${field.name}`}
            type={field.type}
            placeholder={field.placeholder}
            {...register(field.name)}
            error={!!errors[field.name]}
          />
        )}
        {errors[field.name] && (
          <p className="text-sm text-destructive mt-1">
            {(errors[field.name] as any)?.message}
          </p>
        )}
      </div>
    ));
  };

  return (
    <Component className={cn('w-full', className)} {...props}>
      <ReactifyCard>
        <ReactifyCardHeader>
          <div className="flex justify-between items-center">
            <ReactifyCardTitle>{currentStepConfig.title}</ReactifyCardTitle>
            <span className="text-sm text-muted-foreground">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
          </div>
          {currentStepConfig.description && (
            <ReactifyCardDescription>{currentStepConfig.description}</ReactifyCardDescription>
          )}
        </ReactifyCardHeader>

        <form onSubmit={handleSubmit(processStepSubmit)} key={currentStepConfig.id}>
          <ReactifyCardContent className="space-y-6">
            {renderFields(currentStepConfig)}

            {currentStepConfig.id === 'confirmation' && currentStepConfig.fields.length === 0 && (
              <div className="mt-6 space-y-3 p-4 border rounded-md bg-muted/50">
                  <h4 className="font-semibold text-lg">Review Your Information:</h4>
                  {steps.filter(s => s.id !== 'confirmation').map(step => (
                      allStepsData[step.id] && (
                          <div key={step.id} className="mb-2">
                              <h5 className="font-medium text-md">{step.title}</h5>
                              <dl className="text-sm space-y-0.5">
                                  {step.fields.map(field => {
                                      const value = allStepsData[step.id][field.name];
                                      if (value !== undefined && value !== '') {
                                          return (
                                              <div key={field.name} className="flex">
                                                  <dt className="font-semibold w-1/3">{field.label}:</dt>
                                                  <dd className="w-2/3">{String(value)}</dd>
                                              </div>
                                          );
                                      }
                                      return null;
                                  })}
                              </dl>
                          </div>
                      )
                  ))}
              </div>
            )}
          </ReactifyCardContent>

          <ReactifyCardFooter className="flex justify-between border-t pt-6 mt-4">
            <ReactifyButton
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstStep || loading}
            >
              {prevButtonText}
            </ReactifyButton>
            <ReactifyButton
              type="submit"
              isLoading={loading}
            >
              {isLastStep ? submitButtonText : nextButtonText}
            </ReactifyButton>
          </ReactifyCardFooter>
        </form>
      </ReactifyCard>
    </Component>
  );
}
