
// src/app/request-access/page.tsx
'use client';

import { useState, useEffect, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { KeyRound, ShieldCheck, ShieldAlert, Info, RefreshCw, LogIn, PlusCircle, User as UserIcon } from 'lucide-react';
import { OneUpMushroomLoader } from '@/components/ui/OneUpMushroomLoader';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

export default function RequestAccessPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true); // For initial full page load check
  const [initialLoadCheckDone, setInitialLoadCheckDone] = useState(false);
  const [guestId, setGuestId] = useState<string | null>(null); // From localStorage
  const [inputGuestId, setInputGuestId] = useState<string>(''); // For manual input
  const [requesterName, setRequesterName] = useState<string>(''); // For new requests
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const router = useRouter();

  const checkAccessStatus = async (idToVerify: string, isManualCheck: boolean = false) => {
    if (!idToVerify.trim()) {
      if (isManualCheck) setError("Hold up! You need a Guest ID to check.");
      if (!isManualCheck) setIsPageLoading(false);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    if (!isManualCheck) setIsPageLoading(true);
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
          setStatusMessage("ACCESS GRANTED! Welcome to the game world!");
          router.push('/');
        } else {
          setStatusMessage(data.message || 'ACCESS DENIED. Better luck next time?');
          if (data.reason === 'expired' || data.reason === 'denied' || data.reason === 'invalid_id') {
            if (idToVerify === guestId) {
              localStorage.removeItem('guestId');
              setGuestId(null);
            }
          }
        }
      } else {
        setError(data.error || `SYSTEM ERROR checking ID: ${idToVerify}. Try again?`);
        if (idToVerify === guestId) { 
            localStorage.removeItem('guestId');
            setGuestId(null);
        }
      }
    } catch (err) {
      setError('NETWORK ERROR! The server hamster fell off its wheel. Please try again.');
    } finally {
      setIsLoading(false);
      setIsPageLoading(false);
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
      setIsPageLoading(false);
      setInitialLoadCheckDone(true); 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handleRequestAccess = async () => {
    if (!requesterName.trim() || requesterName.trim().length < 2) {
      setError("Whoa there! Need your player name (min 2 chars) to request a key.");
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
        setRequesterName(''); 
        setStatusMessage(data.message || 'Request sent! Our admin will review your application for the VIP Pass.');
      } else {
        setError(data.error || 'Oops! Request failed. Server gremlins strike again.');
      }
    } catch (err) {
      setError('Network hiccup! Could not send your request. Try blowing on the cartridge?');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyManualId = async () => {
    await checkAccessStatus(inputGuestId.trim(), true);
  };

  let alertVariant: "default" | "destructive" = "default";
  let alertTitle = "System Message";
  let AlertIconComponent: React.ElementType = Info;

  if (statusMessage) {
    const lowerStatus = statusMessage.toLowerCase();
    if (lowerStatus.includes("expired") || lowerStatus.includes("denied") || lowerStatus.includes("invalid_id") || lowerStatus.includes("not found")) {
      alertVariant = "destructive";
      alertTitle = "Access Problem!";
      AlertIconComponent = ShieldAlert;
    } else if (lowerStatus.includes("pending")) {
      alertVariant = "default";
      alertTitle = "Awaiting Admin Approval...";
      AlertIconComponent = Info;
    } else if (lowerStatus.includes("approved") || lowerStatus.includes("granted")) {
        alertVariant = "default";
        alertTitle = "Access Approved!";
        AlertIconComponent = ShieldCheck;
    }
  }

  if (isPageLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-card p-4">
        <OneUpMushroomLoader className="h-16 w-16 mb-4" />
        <p className="text-lg text-foreground">Checking your saved Guest ID...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-card p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <KeyRound className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold">Secret Dev Zone</CardTitle>
          <CardDescription className="text-muted-foreground">
            This area is for VIPs only! Got a Guest ID or need to request one?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>ERROR!</AlertTitle>
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
          
          {guestId && initialLoadCheckDone && ( 
            <div className="p-3 bg-muted/50 rounded-md space-y-2">
              <p className="text-base text-foreground">Your current Guest ID:</p>
              <p className="text-lg font-mono font-semibold text-primary break-all">{guestId}</p>
              <Button onClick={() => checkAccessStatus(guestId)} disabled={isLoading && !inputGuestId} className="w-full" variant="outline">
                {isLoading && !inputGuestId ? <OneUpMushroomLoader className="mr-2 h-4 w-4" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                Refresh My Access
              </Button>
            </div>
          )}

          <Separator className="my-6" />

          <p className="text-sm text-muted-foreground text-center -mb-2">Need a new one? Request below!</p>
          
          <div className="space-y-2 pt-2">
            <Label htmlFor="requesterName" className="block text-sm font-medium text-foreground">
              Who is requesting the access?
            </Label>
            <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="text"
                    id="requesterName"
                    placeholder="E.g., HRNinja"
                    value={requesterName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setRequesterName(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                />
            </div>
            <Button 
              onClick={handleRequestAccess} 
              disabled={isLoading || !requesterName.trim() || requesterName.trim().length < 2} 
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isLoading && !inputGuestId && !guestId ? <OneUpMushroomLoader className="mr-2 h-4 w-4" /> : <PlusCircle className="mr-2 h-4 w-4" />}
              Request
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-4 pt-5">
          <Separator />
          
          <div className="w-full space-y-2 pt-2">
            <Label htmlFor="manualGuestId" className="block text-sm font-medium text-foreground">
              {guestId ? "Got a different Guest ID?" : "Already have a Guest ID?"}
            </Label>
            <div className="relative">
              <LogIn className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                id="manualGuestId"
                placeholder="Enter Guest ID here"
                value={inputGuestId}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInputGuestId(e.target.value)}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
            <Button onClick={handleVerifyManualId} disabled={isLoading || !inputGuestId.trim()} className="w-full">
              {isLoading && !!inputGuestId ? <OneUpMushroomLoader className="mr-2 h-4 w-4" /> : <LogIn className="mr-2 h-4 w-4" />}
              Check This ID
            </Button>
          </div>
        </CardFooter>
      </Card>
      <p className="mt-8 text-sm text-muted-foreground text-center max-w-md">
        Guest IDs grant access for 24 hours once approved by the Game Master. Expired? Request a new one!
        The Game Master gets a ping for new requests (via console logs for this demo).
      </p>
    </div>
  );
}
