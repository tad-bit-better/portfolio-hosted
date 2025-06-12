
// src/app/actions.ts
'use server';

import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters, brave adventurer!"),
  email: z.string().email("Invalid email format. Is your comms link correct?"),
  message: z.string().min(10, "Message too short. What's your quest? (min 10 chars)"),
});

export interface ContactFormState {
  message: string;
  success: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  } | null;
  fieldValues?: {
    name: string;
    email: string;
    message: string;
  };
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  const validatedFields = contactFormSchema.safeParse({
    name,
    email,
    message,
  });

  if (!validatedFields.success) {
    return {
      message: "VALIDATION FAILED! Check your inputs, hero.",
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      fieldValues: { name, email, message },
    };
  }

  // Placeholder for successful submission before email logic was added
  console.log("Contact form data is valid (email sending deferred):", validatedFields.data);
  return {
    message: "MESSAGE LOGGED! Your transmission was recorded. We'll set up the comms relay (email) later!",
    success: true,
    errors: null,
    fieldValues: { name: "", email: "", message: "" }, // Clear fields on success
  };
}

