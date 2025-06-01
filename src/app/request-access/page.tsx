// src/app/request-access/page.tsx
'use client';

import { useState, useEffect, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, KeyRound, ShieldCheck, ShieldAlert, Info, RefreshCw, LogIn, PlusCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from '@/components/ui/separator';

export default function RequestAccessPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoadCheckDone, setInitialLoadCheckDone] = useState(false);
  const [guestId, setGuestId] = useState<string | null>(null); // From localStorage
  const [inputGuestId, setInputGuestId] = useState<string>(''); // For manual input
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const router = useRouter();

  const checkAccessStatus = async (idToVerify: string, isManualCheck: boolean = false) => {
    if (!idToVerify.trim()) {
      if (isManualCheck) setError("Please enter a Guest ID to verify.");
      setIsLoading(false); // Ensure loading is stopped if ID is empty for manual check
      return;
    }
    setIsLoading(true);
    setError(null);
    // Keep previous status message if it's for a different ID, or clear if checking the same
    // If checking a new manual ID, def clear previous status
    if (isManualCheck || idToVerify !== guestId) {
        setStatusMessage(null);
    }


    try {
      const response = await fetch(`/api/access?action=check&guestId=${idToVerify}`);
      const data = await response.json();

      if (response.ok) {
        if (data.access) {
          localStorage.setItem('guestId', idToVerify);
          setGuestId(idToVerify);
          setInputGuestId(''); // Clear manual input on success
          router.push('/');
        } else {
          setStatusMessage(data.message || 'Access not granted.');
          if (data.reason === 'expired' || data.reason === 'denied' || data.reason === 'invalid_id') {
            // If the currently stored guestId is now invalid, clear it
            if (idToVerify === guestId) {
              localStorage.removeItem('guestId');
              setGuestId(null);
            }
          }
        }
      } else {
        setError(data.error || `Failed to check status for ID: ${idToVerify}.`);
        if (idToVerify === guestId) { // If the stored ID results in an error from API
            localStorage.removeItem('guestId');
            setGuestId(null);
        }
      }
    } catch (err) {
      setError('An network error occurred. Please try again.');
      // Don't clear guestId on network error, could be temporary
    } finally {
      setIsLoading(false);
      if (!isManualCheck) { // only set this if it was an auto check
        setInitialLoadCheckDone(true);
      }
    }
  };

  useEffect(() => {
    const storedGuestId = localStorage.getItem('guestId');
    if (storedGuestId) {
      setGuestId(storedGuestId);
      checkAccessStatus(storedGuestId);
    } else {
      setInitialLoadCheckDone(true); // No stored ID, so initial check is "done"
    }
  }, []); // Removed router from dependencies as it's stable

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
        setInputGuestId(''); // Clear manual input if a new one is requested
        setStatusMessage(data.message || 'Access requested successfully. Please wait for approval.');
      } else {
        setError(data.error || 'Failed to request access.');
      }
    } catch (err) {
      setError('An error occurred while requesting access. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyManualId = async () => {
    await checkAccessStatus(inputGuestId.trim(), true);
  };

  let alertVariant: "default" | "destructive" = "default";
  let alertTitle = "Status";
  let AlertIconComponent: React.ElementType = Info;

  if (statusMessage) {
    const lowerStatus = statusMessage.toLowerCase();
    if (lowerStatus.includes("expired") || lowerStatus.includes("denied") || lowerStatus.includes("invalid_id") || lowerStatus.includes("not found")) {
      alertVariant = "destructive";
      alertTitle = "Access Issue";
      AlertIconComponent = ShieldAlert;
    } else if (lowerStatus.includes("pending")) {
      alertVariant = "default";
      alertTitle = "Pending Approval";
      AlertIconComponent = Info;
    } else if (lowerStatus.includes("approved") || lowerStatus.includes("granted")) {
        // This case should ideally not happen as it would redirect, but as a fallback
        alertVariant = "default";
        alertTitle = "Access Approved";
        AlertIconComponent = ShieldCheck;
    }
  }


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-card p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <KeyRound className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold">Portfolio Access</CardTitle>
          <CardDescription className="text-muted-foreground">
            This portfolio is private. Request access or enter an existing Guest ID.
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
             <Alert variant={alertVariant}>
              <AlertIconComponent className="h-4 w-4" />
              <AlertTitle>{alertTitle}</AlertTitle>
              <AlertDescription>{statusMessage}</AlertDescription>
            </Alert>
          )}

          {!initialLoadCheckDone && guestId && (
            <div className="flex items-center justify-center p-3 text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking status for remembered ID...
            </div>
          )}
          
          {guestId && initialLoadCheckDone && ( // Display remembered ID and its status/refresh button
            <div className="p-3 bg-muted/50 rounded-md space-y-2">
              <p className="text-sm text-foreground">Your remembered Guest ID:</p>
              <p className="text-lg font-mono font-semibold text-primary break-all">{guestId}</p>
              <Button onClick={() => checkAccessStatus(guestId)} disabled={isLoading} className="w-full" variant="outline">
                {isLoading && !inputGuestId ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                Refresh My Access Status
              </Button>
            </div>
          )}

          <Separator className="my-6" />
          
          <div className="space-y-2">
            <label htmlFor="manualGuestId" className="block text-sm font-medium text-foreground">
              {guestId ? "Have a different Guest ID?" : "Enter your Guest ID:"}
            </label>
            <Input
              type="text"
              id="manualGuestId"
              placeholder="Enter Guest ID here"
              value={inputGuestId}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setInputGuestId(e.target.value)}
              className="text-base"
              disabled={isLoading}
            />
            <Button onClick={handleVerifyManualId} disabled={isLoading || !inputGuestId.trim()} className="w-full">
              {isLoading && inputGuestId ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}
              Check & Use This ID
            </Button>
          </div>

        </CardContent>
        <CardFooter className="flex-col space-y-3 pt-5">
          <Separator />
           <p className="text-sm text-muted-foreground pt-2">Need a new one?</p>
          <Button onClick={handleRequestAccess} disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            {isLoading && !guestId && !inputGuestId ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
            Request New Access ID
          </Button>
        </CardFooter>
      </Card>
      <p className="mt-8 text-xs text-muted-foreground text-center max-w-md">
        Access is granted for 24 hours upon approval. If your access expires, you can request it again.
        The site owner will be notified of your request (via console log for this demo).
      </p>
    </div>
  );
}
