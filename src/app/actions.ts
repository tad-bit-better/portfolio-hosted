
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

  // In a real app, you would integrate with an email service or database here.
  console.log("Contact Form Submission Attempt (Retro Edition):");
  console.log("Player Name:", validatedFields.data.name);
  console.log("Comms Link:", validatedFields.data.email);
  console.log("Quest Log:", validatedFields.data.message);

  // Simulate an API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate success
  const submissionSuccessful = true; 

  if (submissionSuccessful) {
    return {
      message: "MESSAGE SENT! Your transmission was successful. I'll warp a reply soon!",
      success: true,
      errors: null,
      fieldValues: { name: "", email: "", message: "" }, // Clear fields on success
    };
  } else {
    return {
      message: "TRANSMISSION FAILED! Comms are down. Please try again later, brave one.",
      success: false,
      errors: null,
      fieldValues: { name, email, message },
    };
  }
}
