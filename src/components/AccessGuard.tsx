
// src/components/AccessGuard.tsx
'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OneUpMushroomLoader } from '@/components/ui/OneUpMushroomLoader';

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
    if (pathname === '/request-access') {
      setIsLoading(false);
      setHasAccess(false); 
      return;
    }
    
    if (pathname.startsWith('/api/')) {
       setIsLoading(false);
       setHasAccess(true); 
       return;
    }

    const guestId = localStorage.getItem('guestId');

    if (!guestId) {
      setMessage("No Guest ID found. You need a pass to enter this zone!");
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
          setMessage(data.message || 'ACCESS DENIED. Your Guest ID might be invalid or expired.');
          localStorage.removeItem('guestId'); 
          router.replace('/request-access');
        }
      } catch (error) {
        console.error('Error checking access:', error);
        setMessage('NETWORK ERROR! Could not verify your Guest ID. Try refreshing.');
        router.replace('/request-access'); 
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
        <OneUpMushroomLoader className="h-12 w-12 mb-4" />
        <p className="text-lg">Verifying Your VIP Pass...</p>
      </div>
    );
  }

  if (!hasAccess && pathname !== '/request-access' && !pathname.startsWith('/api/')) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-destructive p-4">
        <Ban className="h-16 w-16 mb-4" /> {/* Changed icon */}
        <p className="text-2xl font-bold mb-2">ACCESS DENIED!</p>
        <p className="text-lg text-muted-foreground text-center max-w-md mb-6">
          {message || 'Your Guest ID is not valid for this area.'}
        </p>
        <Button onClick={() => router.push('/request-access')} variant="outline" className="mt-4">
          Get a Guest ID
        </Button>
      </div>
    );
  }
  
  if (pathname === '/request-access' || pathname.startsWith('/api/') || hasAccess) {
    return <>{children}</>;
  }

  return null; 
}
