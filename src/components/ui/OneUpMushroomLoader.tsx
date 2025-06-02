// src/components/ui/OneUpMushroomLoader.tsx
import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function OneUpMushroomLoader({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32" // Consistent viewBox for scaling
      // width and height will be controlled by className (e.g., "h-12 w-12")
      className={cn('animate-bobbing', className)} // Apply bobbing animation and any passed classes
      {...props}
    >
      {/* Stem - Beige color */}
      <path d="M12 20 H20 V28 H12 Z" fill="#F5F5DC" />
      {/* Cap - Red color (Mario Power-Up Mushroom) */}
      <path d="M8 20 Q16 10 24 20 Z" fill="#FF1A1A" /> {/* Vibrant Red, like HSL(0, 90%, 60%) */}
      {/* Spots - White */}
      <circle cx="16" cy="15" r="2.5" fill="#FFFFFF" />
      <circle cx="11.5" cy="18" r="1.8" fill="#FFFFFF" />
      <circle cx="20.5" cy="18" r="1.8" fill="#FFFFFF" />
    </svg>
  );
}
