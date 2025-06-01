// src/components/AccessGuard.tsx
'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2, ShieldX } from 'lucide-react';

interface AccessGuardProps {
  children: ReactNode;
}

export function AccessGuard({ children }: AccessGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Allow access to the request-access page itself without checks
    if (pathname === '/request-access') {
      setIsLoading(false);
      setHasAccess(false); // Let the request-access page handle its logic
      return;
    }
    
    // Allow access to API routes (though this guard is for pages)
    if (pathname.startsWith('/api/')) {
       setIsLoading(false);
       setHasAccess(true); // API routes have their own auth
       return;
    }


    const guestId = localStorage.getItem('guestId');

    if (!guestId) {
      router.replace('/request-access');
      return;
    }

    const checkAccess = async () => {
      try {
        const response = await fetch(`/api/access?action=check&guestId=${guestId}`);
        const data = await response.json();

        if (response.ok && data.access) {
          setHasAccess(true);
        } else {
          setMessage(data.message || 'Access denied or expired.');
          localStorage.removeItem('guestId'); // Clear invalid/expired ID
          router.replace('/request-access');
        }
      } catch (error) {
        console.error('Error checking access:', error);
        setMessage('Error checking access. Please try refreshing.');
        // Don't remove guestId here, maybe a temp network issue
        router.replace('/request-access'); // Fallback to request access
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg">Verifying access...</p>
      </div>
    );
  }

  if (!hasAccess && pathname !== '/request-access' && !pathname.startsWith('/api/')) {
     // This state should ideally be handled by the redirect, but as a fallback:
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-destructive p-4">
        <ShieldX className="h-12 w-12 mb-4" />
        <p className="text-lg font-semibold">Access Denied</p>
        <p className="text-muted-foreground">{message || 'You do not have permission to view this page.'}</p>
        <Button onClick={() => router.push('/request-access')} variant="outline" className="mt-4">
          Request Access
        </Button>
      </div>
    );
  }
  
  // If on /request-access, or /api/*, or hasAccess is true, render children
  if (pathname === '/request-access' || pathname.startsWith('/api/') || hasAccess) {
    return <>{children}</>;
  }

  // Fallback for any unhandled case during loading or if logic is bypassed.
  // This should ideally not be reached if redirects work correctly.
  return null; 
}
