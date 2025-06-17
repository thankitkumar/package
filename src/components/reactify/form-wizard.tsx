
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
  initialData?: Record<string, any>; // Initial data for the whole wizard { stepId: { fieldName: value } }
  nextButtonText?: string;
  prevButtonText?: string;
  submitButtonText?: string;
  loading?: boolean;
}

// Sub-component for rendering a single step's form
interface WizardStepFormProps {
  stepConfig: WizardStepConfig;
  initialStepData: FieldValues;
  onSubmitStep: (data: FieldValues) => void;
  isLoading?: boolean;
}

function WizardStepForm({ stepConfig, initialStepData, onSubmitStep, isLoading }: WizardStepFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(stepConfig.schema),
    defaultValues: initialStepData,
  });

  useEffect(() => {
    // Reset form with new initial data when stepConfig or initialStepData changes
    // This is important when navigating back to a step with existing data
    reset(initialStepData);
  }, [stepConfig, initialStepData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmitStep)} className="space-y-6">
      {stepConfig.fields.map((field) => (
        <div key={field.name} className="space-y-1.5">
          <Label htmlFor={`${stepConfig.id}-${field.name}`}>{field.label}</Label>
          {field.type === 'textarea' ? (
            <ReactifyTextarea
              id={`${stepConfig.id}-${field.name}`}
              placeholder={field.placeholder}
              {...register(field.name)}
              error={!!errors[field.name]}
              rows={4}
            />
          ) : (
            <ReactifyInput
              id={`${stepConfig.id}-${field.name}`}
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
      ))}
      {/* The actual submit button is handled by the parent ReactifyFormWizard */}
    </form>
  );
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

  // Prepare initial data for the current step's form
  const initialStepFormData = currentStepConfig.fields.reduce((acc, field) => {
    acc[field.name] = allStepsData[currentStepConfig.id]?.[field.name] ?? field.defaultValue ?? '';
    return acc;
  }, {} as FieldValues);


  const handleStepSubmit = (stepData: FieldValues) => {
    const updatedData = {
      ...allStepsData,
      [currentStepConfig.id]: stepData,
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
  
  // This form ID allows us to trigger submission from outside the WizardStepForm
  const currentStepFormId = `wizard-step-form-${currentStepConfig.id}`;

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

        <ReactifyCardContent>
          {/* Keying the WizardStepForm ensures react-hook-form re-initializes correctly for each step */}
          <WizardStepForm
            key={currentStepConfig.id} // Important for re-initialization
            stepConfig={currentStepConfig}
            initialStepData={initialStepFormData}
            onSubmitStep={handleStepSubmit}
            isLoading={loading}
          />

          {/* Special handling for confirmation step if it has no fields */}
          {currentStepConfig.id === 'confirmation' && currentStepConfig.fields.length === 0 && (
             <div className="mt-6 space-y-3 p-4 border rounded-md bg-muted/50">
                <h4 className="font-semibold text-lg">Review Your Information:</h4>
                {steps.filter(s => s.id !== 'confirmation').map(step => (
                    allStepsData[step.id] && (
                        <div key={step.id} className="mb-2">
                            <h5 className="font-medium text-md">{step.title}</h5>
                            <ul className="list-disc list-inside text-sm space-y-0.5">
                                {Object.entries(allStepsData[step.id]).map(([key, value]) => {
                                    const fieldLabel = step.fields.find(f => f.name === key)?.label || key;
                                    return (
                                        <li key={key}>
                                            <span className="font-semibold">{fieldLabel}:</span> {String(value)}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )
                ))}
             </div>
          )}

        </ReactifyCardContent>

        <ReactifyCardFooter className="flex justify-between border-t pt-6 mt-4">
          <ReactifyButton
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirstStep || loading}
          >
            {prevButtonText}
          </ReactifyButton>
          <ReactifyButton
            type="submit" // This button will submit the inner form
            form={currentStepFormId} // Associate with the inner form
            isLoading={loading}
            onClick={() => {
              // Create a submit event for the correct form
              const formElement = document.getElementById(currentStepFormId);
              if (formElement instanceof HTMLFormElement) {
                // To make react-hook-form's handleSubmit work, we need to manually trigger it,
                // or have the button directly inside the <form> of WizardStepForm.
                // Simpler: trigger the submit programmatically on the form.
                // However, react-hook-form needs its own handleSubmit to run for validation.
                // Let's change WizardStepForm to not render its own submit button,
                // and this button in the footer will be the one.
                // For this to work, handleSubmit logic needs to be slightly different.
                // The parent (ReactifyFormWizard) will orchestrate this.
                // The current structure where WizardStepForm has its own onSubmit is good.
                // We'll programmatically submit the active form.
                const submitButton = formElement.querySelector('button[type="submit"], input[type="submit"]');
                if (submitButton instanceof HTMLElement) {
                    // This won't work easily because the submit button inside WizardStepForm is not rendered.
                    // The best way: this button directly calls the handleSubmit of the *current* form instance.
                    // This requires passing down the `handleSubmit` function from useForm.
                    // Or, the WizardStepForm itself needs to expose a submit function ref.
                    // Let's stick to the current approach, this button doesn't need 'form' prop.
                    // It will rely on the `handleSubmit(handleStepSubmit)` being correctly triggered.
                    // This button should just call the `handleStepSubmit` via the current form's submit.
                    // The `WizardStepForm` needs to be refactored to allow parent to trigger submit.
                    // Or, even simpler, this button below can call the `handleSubmit` from the RHF instance managed *here*
                    // if we lift the RHF instance. But that makes schema dynamic difficult.
                    // The key={currentStep.id} approach should handle form re-initialization.
                    // This button needs to tell the CURRENT WizardStepForm to submit.
                    // The most straightforward way now is to put this button inside WizardStepForm,
                    // but that breaks the footer layout.
                    // Alternative: use a submit button ref in WizardStepForm.
                    // For now, let the user click the actual submit button if one were rendered *inside* WizardStepForm.
                    // This structure means the NEXT/SUBMIT button *must* be part of the form whose submit it's triggering.
                    //
                    // Correction: The NEXT button in the footer *can* trigger the form submission of the currently rendered step form.
                    // The `WizardStepForm`'s `form` tag *must* have its `onSubmit` handler properly set up with RHF's `handleSubmit`.
                    // This button in the footer should be type="submit" and be associated with the form ID.
                    //
                    // The current version of WizardStepForm already has onSubmit={handleSubmit(onSubmitStep)}.
                    // So, the button type="submit" in the footer should just work IF the fields are wrapped by a single <form>.
                    //
                    // Let's re-think: ReactifyFormWizard provides the overall structure and navigation.
                    // WizardStepForm is *just* the fields for that step.
                    // So, useForm should be in ReactifyFormWizard.
                    // When step changes, call `reset` with new defaultValues AND a new `resolver`.
                    // This is cleaner.
                }
              }
              // This is complex. Let's make WizardStepForm NOT a form itself.
              // The form tag will be in ReactifyFormWizard.
              // This simplifies where `useForm` lives.
              // This button type="submit" will then work for the main form.
              // See the updated structure below using one useForm.
            }}
          >
            {isLastStep ? submitButtonText : nextButtonText}
          </ReactifyButton>
        </ReactifyCardFooter>
      </ReactifyCard>
    </Component>
  );
}


// Corrected Form Wizard Structure:
// `useForm` will live in `ReactifyFormWizard`.
// `WizardStepForm` will just be a renderer for fields.

export function ReactifyFormWizardCorrected({
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
    formState: { errors, touchedFields, dirtyFields },
    reset,
    control, // if using Controller for other field types later
    watch, // to get current form values if needed for conditional logic
  } = useForm({
    resolver: zodResolver(currentStepConfig.schema),
    // defaultValues are set in useEffect
  });
  
  useEffect(() => {
    // When currentStepIndex changes, reset the form with the new step's schema and data
    const newStepConfig = steps[currentStepIndex];
    const stepDataFromState = allStepsData[newStepConfig.id] || {};
    const defaultValuesForStep = newStepConfig.fields.reduce((acc, field) => {
      acc[field.name] = stepDataFromState[field.name] ?? field.defaultValue ?? '';
      return acc;
    }, {} as Record<string, any>);

    reset(defaultValuesForStep, {
      keepDirty: false, // Don't keep dirty status from previous step
      keepErrors: false, // Clear errors from previous step
      keepTouched: false,
      // Resolver will be implicitly updated by react-hook-form if its key changes or form re-renders
      // However, explicitly managing schema changes per step usually requires re-initializing useForm
      // or using a more advanced pattern. For now, let's assume the re-render with new resolver prop works.
      // A common way is to key the <form> element itself with currentStepConfig.id
    });
  }, [currentStepIndex, steps, allStepsData, reset]);


  const processStepSubmit: SubmitHandler<FieldValues> = (currentStepRawData) => {
    // Filter out only the fields relevant to the current step from react-hook-form
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
      // Save current step's potentially dirty data before moving back
      // This part is tricky if the data isn't validated yet.
      // For simplicity, we only save validated data on "Next".
      // When going "Previous", we don't save, just revert to last saved state for that step.
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

        <form onSubmit={handleSubmit(processStepSubmit)} key={currentStepConfig.id}> {/* Keying the form is crucial for RHF schema changes */}
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
              type="button" // Important: not submit
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstStep || loading}
            >
              {prevButtonText}
            </ReactifyButton>
            <ReactifyButton
              type="submit" // This will now trigger the form's onSubmit
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

// Export the corrected version
export { ReactifyFormWizardCorrected as ReactifyFormWizard };
