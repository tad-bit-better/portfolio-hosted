// src/app/request-access/page.tsx
'use client';

import { useState, useEffect, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, KeyRound, ShieldCheck, ShieldAlert, Info, RefreshCw, LogIn, PlusCircle, User as UserIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

export default function RequestAccessPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoadCheckDone, setInitialLoadCheckDone] = useState(false);
  const [guestId, setGuestId] = useState<string | null>(null); // From localStorage
  const [inputGuestId, setInputGuestId] = useState<string>(''); // For manual input
  const [requesterName, setRequesterName] = useState<string>(''); // For new requests
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const router = useRouter();

  const checkAccessStatus = async (idToVerify: string, isManualCheck: boolean = false) => {
    if (!idToVerify.trim()) {
      if (isManualCheck) setError("Please enter a Guest ID to verify.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
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
          setInputGuestId(''); 
          router.push('/');
        } else {
          setStatusMessage(data.message || 'Access not granted.');
          if (data.reason === 'expired' || data.reason === 'denied' || data.reason === 'invalid_id') {
            if (idToVerify === guestId) {
              localStorage.removeItem('guestId');
              setGuestId(null);
            }
          }
        }
      } else {
        setError(data.error || `Failed to check status for ID: ${idToVerify}.`);
        if (idToVerify === guestId) { 
            localStorage.removeItem('guestId');
            setGuestId(null);
        }
      }
    } catch (err) {
      setError('A network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
      if (!isManualCheck) { 
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
      setInitialLoadCheckDone(true); 
    }
  }, []); 

  const handleRequestAccess = async () => {
    if (!requesterName.trim() || requesterName.trim().length < 2) {
      setError("Please enter your name (at least 2 characters) to request access.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    setStatusMessage(null);
    try {
      const response = await fetch('/api/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'request', name: requesterName.trim() }),
      });
      const data = await response.json();
      if (response.ok && data.guestId) {
        localStorage.setItem('guestId', data.guestId);
        setGuestId(data.guestId);
        setInputGuestId(''); 
        setRequesterName(''); // Clear name field on success
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
          
          {guestId && initialLoadCheckDone && ( 
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
            <Label htmlFor="manualGuestId" className="block text-sm font-medium text-foreground">
              {guestId ? "Have a different Guest ID?" : "Enter your Guest ID:"}
            </Label>
            <div className="relative">
              <LogIn className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                id="manualGuestId"
                placeholder="Enter Guest ID here"
                value={inputGuestId}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInputGuestId(e.target.value)}
                className="pl-10 text-base"
                disabled={isLoading}
              />
            </div>
            <Button onClick={handleVerifyManualId} disabled={isLoading || !inputGuestId.trim()} className="w-full">
              <LogIn className="mr-2 h-4 w-4" />
              Check & Use This ID
            </Button>
          </div>

        </CardContent>
        <CardFooter className="flex-col space-y-4 pt-5">
          <Separator />
           <p className="text-sm text-muted-foreground pt-2">Need a new one?</p>
          
          <div className="w-full space-y-2">
            <Label htmlFor="requesterName" className="block text-sm font-medium text-foreground">
              Your Name
            </Label>
            <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="text"
                    id="requesterName"
                    placeholder="Enter your name"
                    value={requesterName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setRequesterName(e.target.value)}
                    className="pl-10 text-base"
                    disabled={isLoading}
                />
            </div>
          </div>

          <Button 
            onClick={handleRequestAccess} 
            disabled={isLoading || !requesterName.trim() || requesterName.trim().length < 2} 
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {isLoading && !inputGuestId && !guestId ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
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
