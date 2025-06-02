
// src/components/SubmitButton.tsx
"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { OneUpMushroomLoader } from "@/components/ui/OneUpMushroomLoader";

interface SubmitButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  children: React.ReactNode;
}

export function SubmitButton({ children, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? (
        <>
          <OneUpMushroomLoader className="mr-2 h-4 w-4" />
          Sending...
        </>
      ) : (
        children
      )}
    </Button>
  );
}
