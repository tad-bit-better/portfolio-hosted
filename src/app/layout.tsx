import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
// It's generally better to wrap specific page content with AccessGuard, 
// but if the whole app including layout needs guarding, this is one place.
// However, for finer control, wrap children in page.tsx or specific layouts.
// For this case, we will wrap the content in page.tsx.

export const metadata: Metadata = {
  title: 'Devfolio - Pushpendra Singh',
  description: 'Personal portfolio of Pushpendra Singh, driven by Next.js and GenAI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {/* The AccessGuard will be applied in src/app/page.tsx to protect its content */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
