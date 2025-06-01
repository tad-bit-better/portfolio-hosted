// src/app/request-access/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, KeyRound, ShieldCheck, ShieldAlert, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function RequestAccessPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [guestId, setGuestId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedGuestId = localStorage.getItem('guestId');
    if (storedGuestId) {
      setGuestId(storedGuestId);
      checkAccessStatus(storedGuestId);
    }
  }, []);

  const checkAccessStatus = async (currentGuestId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/access?action=check&guestId=${currentGuestId}`);
      const data = await response.json();
      if (response.ok) {
        if (data.access) {
          router.push('/'); // Redirect to portfolio if already approved
        } else {
          setStatusMessage(data.message || 'Your access request is being processed.');
          if (data.reason === 'expired' || data.reason === 'denied' || data.reason === 'invalid_id') {
            // Allow re-request if expired, denied or ID is somehow invalid from localStorage
            localStorage.removeItem('guestId');
            setGuestId(null); 
          }
        }
      } else {
        setError(data.error || 'Failed to check access status.');
        localStorage.removeItem('guestId');
        setGuestId(null);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      localStorage.removeItem('guestId');
      setGuestId(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestAccess = async () => {
    setIsLoading(true);
    setError(null);
    setStatusMessage(null);
    try {
      const response = await fetch('/api/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'request' }),
      });
      const data = await response.json();
      if (response.ok && data.guestId) {
        localStorage.setItem('guestId', data.guestId);
        setGuestId(data.guestId);
        setStatusMessage(data.message || 'Access requested successfully. Please wait for approval.');
      } else {
        setError(data.error || 'Failed to request access.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-card p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <KeyRound className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold">Portfolio Access</CardTitle>
          <CardDescription className="text-muted-foreground">
            This portfolio is currently private. Please request access to view its contents.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {statusMessage && !error && (
             <Alert variant={guestId && !statusMessage.toLowerCase().includes("expired") && !statusMessage.toLowerCase().includes("denied") ? "default" : "destructive"}>
              {guestId && !statusMessage.toLowerCase().includes("expired") && !statusMessage.toLowerCase().includes("denied") ? <Info className="h-4 w-4" /> : <ShieldAlert className="h-4 w-4" /> }
              <AlertTitle>{guestId && !statusMessage.toLowerCase().includes("expired") && !statusMessage.toLowerCase().includes("denied") ? "Status" : "Action Required"}</AlertTitle>
              <AlertDescription>{statusMessage}</AlertDescription>
            </Alert>
          )}
          {guestId && !error && (
            <div className="text-center p-3 bg-muted/50 rounded-md">
              <p className="text-sm text-foreground">Your Guest ID:</p>
              <p className="text-lg font-mono font-semibold text-primary break-all">{guestId}</p>
              <p className="text-xs text-muted-foreground mt-1">Keep this ID safe. You will be notified once access is approved.</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!guestId || error || (statusMessage && (statusMessage.toLowerCase().includes("expired") || statusMessage.toLowerCase().includes("denied") || statusMessage.toLowerCase().includes("invalid"))) ? (
            <Button onClick={handleRequestAccess} disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ShieldCheck className="mr-2 h-4 w-4" />
              )}
              Request Access
            </Button>
          ) : (
             <Button onClick={() => checkAccessStatus(guestId)} disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ShieldCheck className="mr-2 h-4 w-4" />
              )}
              Check Access Status
            </Button>
          )}
        </CardFooter>
      </Card>
      <p className="mt-8 text-xs text-muted-foreground text-center max-w-md">
        Access is granted for 24 hours upon approval. If your access expires, you can request it again.
        The site owner will be notified of your request.
      </p>
    </div>
  );
}
