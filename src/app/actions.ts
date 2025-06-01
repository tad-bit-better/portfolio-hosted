// src/app/actions.ts
'use server';

import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
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
      message: "Validation failed. Please check your input.",
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      fieldValues: { name, email, message },
    };
  }

  // In a real app, you would integrate with an email service or database here.
  // For example, using Nodemailer or AWS SES.
  console.log("Contact Form Submission Attempt:");
  console.log("Name:", validatedFields.data.name);
  console.log("Email:", validatedFields.data.email);
  console.log("Message:", validatedFields.data.message);

  // Simulate an API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate success
  const submissionSuccessful = true; 

  if (submissionSuccessful) {
    return {
      message: "Thank you! Your message has been sent successfully. I'll get back to you soon.",
      success: true,
      errors: null,
      fieldValues: { name: "", email: "", message: "" }, // Clear fields on success
    };
  } else {
    return {
      message: "Sorry, there was an error sending your message. Please try again later.",
      success: false,
      errors: null,
      fieldValues: { name, email, message },
    };
  }
}
