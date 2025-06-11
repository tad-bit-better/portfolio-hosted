
// src/app/actions.ts
'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';

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

  // Email sending logic
  const senderEmail = process.env.CONTACT_FORM_SENDER_EMAIL;
  const senderAppPassword = process.env.CONTACT_FORM_SENDER_APP_PASSWORD;
  const recipientEmail = process.env.CONTACT_FORM_RECIPIENT_EMAIL;

  if (!senderEmail || !senderAppPassword || !recipientEmail) {
    console.error("Email sending configuration is missing. Please set CONTACT_FORM_SENDER_EMAIL, CONTACT_FORM_SENDER_APP_PASSWORD, and CONTACT_FORM_RECIPIENT_EMAIL environment variables.");
    return {
      message: "SERVER ERROR: Comms relay is misconfigured. Message logged, but email not sent. Please try again later.",
      success: false,
      errors: null,
      fieldValues: { name, email, message },
    };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderEmail,
      pass: senderAppPassword,
    },
  });

  const mailOptions = {
    from: `"${validatedFields.data.name} (Portfolio Contact)" <${senderEmail}>`,
    to: recipientEmail,
    replyTo: validatedFields.data.email,
    subject: `New Portfolio Contact from ${validatedFields.data.name}`,
    html: `
      <p>You have a new contact form submission:</p>
      <ul>
        <li><strong>Name:</strong> ${validatedFields.data.name}</li>
        <li><strong>Email:</strong> ${validatedFields.data.email}</li>
      </ul>
      <p><strong>Message:</strong></p>
      <pre style="white-space: pre-wrap; word-wrap: break-word;">${validatedFields.data.message}</pre>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Contact form email sent successfully to:", recipientEmail);
    return {
      message: "MESSAGE SENT! Your transmission was successful. I'll warp a reply soon!",
      success: true,
      errors: null,
      fieldValues: { name: "", email: "", message: "" }, // Clear fields on success
    };
  } catch (error) {
    console.error("Error sending contact form email:", error);
    return {
      message: "TRANSMISSION FAILED! Comms are down, email could not be sent. Please try again later, brave one.",
      success: false,
      errors: null,
      fieldValues: { name, email, message },
    };
  }
}
