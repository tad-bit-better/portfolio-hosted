
'use client';

import { useFormState } from 'react-dom';
import { useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SubmitButton } from '@/components/SubmitButton';
import { submitContactForm, type ContactFormState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { contactFormFields } from '@/config/portfolio.config';
import { CheckCircle, XCircle, Send } from 'lucide-react'; // Added Send

const initialState: ContactFormState = {
  message: '',
  success: false,
  errors: null,
  fieldValues: { name: '', email: '', message: '' },
};

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'SUCCESS!' : 'ERROR!',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
        icon: state.success ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />,
      });
      if (state.success && formRef.current) {
        formRef.current.reset();
      }
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      {state.message && !state.success && !state.errors && (
         <Alert variant="destructive">
           <XCircle className="h-4 w-4" />
           <AlertTitle>ERROR!</AlertTitle>
           <AlertDescription>{state.message}</AlertDescription>
         </Alert>
      )}
      <div>
        <Label htmlFor="name" className="sr-only">Name</Label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <contactFormFields.name.Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          </div>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder={contactFormFields.name.placeholder}
            aria-describedby="name-error"
            defaultValue={state.fieldValues?.name}
            className="pl-10 py-3"
          />
        </div>
        {state.errors?.name && (
          <p id="name-error" className="mt-2 text-base text-destructive">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="email" className="sr-only">Email</Label>
         <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <contactFormFields.email.Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          </div>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder={contactFormFields.email.placeholder}
            aria-describedby="email-error"
            defaultValue={state.fieldValues?.email}
            className="pl-10 py-3"
          />
        </div>
        {state.errors?.email && (
          <p id="email-error" className="mt-2 text-base text-destructive">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="message" className="sr-only">Message</Label>
        <div className="relative">
           <div className="pointer-events-none absolute top-3.5 left-0 flex items-center pl-3">
            <contactFormFields.message.Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          </div>
          <Textarea
            id="message"
            name="message"
            rows={5}
            placeholder={contactFormFields.message.placeholder}
            aria-describedby="message-error"
            defaultValue={state.fieldValues?.message}
            className="pl-10 py-3"
          />
        </div>
        {state.errors?.message && (
          <p id="message-error" className="mt-2 text-base text-destructive">
            {state.errors.message[0]}
          </p>
        )}
      </div>

      <SubmitButton className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 text-base font-semibold shadow-md transition-transform hover:scale-105">
        <Send className="mr-2 h-4 w-4" /> Transmit Message
      </SubmitButton>
    </form>
  );
}
