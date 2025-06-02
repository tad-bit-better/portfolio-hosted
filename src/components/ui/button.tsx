
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors transition-transform transition-shadow duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-accent-foreground shadow-[3px_3px_0px_hsl(var(--foreground))] hover:brightness-110 active:shadow-[1px_1px_0px_hsl(var(--foreground))] active:translate-x-[2px] active:translate-y-[2px] active:brightness-90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[3px_3px_0px_hsl(var(--foreground))] hover:bg-destructive/90 active:shadow-[1px_1px_0px_hsl(var(--foreground))] active:translate-x-[2px] active:translate-y-[2px] active:bg-destructive/80",
        outline:
          "border-2 border-foreground bg-transparent text-foreground hover:bg-card hover:text-card-foreground active:bg-card/90 active:translate-y-px",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[3px_3px_0px_hsl(var(--foreground))] hover:brightness-110 active:shadow-[1px_1px_0px_hsl(var(--foreground))] active:translate-x-[2px] active:translate-y-[2px] active:brightness-90",
        ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/90 active:translate-y-px active:scale-[0.98]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const effectiveVariant = variant || 'default';

    // Determine if the special golden block styling (bolts, shine, group class) should apply.
    // This styling is ONLY for actual <button> elements of the 'default' variant.
    const applyGoldenBlockStyling = !asChild && effectiveVariant === 'default';

    let buttonBaseClasses = buttonVariants({ variant: effectiveVariant, size, className });
    let finalButtonClasses = buttonBaseClasses;

    if (applyGoldenBlockStyling) {
      finalButtonClasses = cn(buttonBaseClasses, "relative overflow-hidden group");
    }

    if (asChild) {
      // When asChild is true, Slot handles rendering the child with merged props.
      // The 'group' class for hover effects on golden blocks is not added to Slot itself,
      // as those effects are tied to the decorative elements within the actual button.
      return (
        <Slot className={finalButtonClasses} ref={ref} {...props}>
          {children}
        </Slot>
      );
    }

    // For a regular <button> element
    return (
      <button className={finalButtonClasses} ref={ref} {...props}>
        {children}
        {applyGoldenBlockStyling && (
          <>
            {/* Bolts */}
            <span className="absolute top-[4px] left-[4px] w-[4px] h-[4px] bg-accent-foreground/60 rounded-full pointer-events-none z-10"></span>
            <span className="absolute top-[4px] right-[4px] w-[4px] h-[4px] bg-accent-foreground/60 rounded-full pointer-events-none z-10"></span>
            <span className="absolute bottom-[4px] left-[4px] w-[4px] h-[4px] bg-accent-foreground/60 rounded-full pointer-events-none z-10"></span>
            <span className="absolute bottom-[4px] right-[4px] w-[4px] h-[4px] bg-accent-foreground/60 rounded-full pointer-events-none z-10"></span>
            {/* Shine Element */}
            <span
              className={cn(
                "absolute top-1/2 left-1/2", // Center the origin for transformation
                "w-8 h-[200%]",             // Shine element dimensions (width 32px, height 200% of button)
                "bg-white/25",              // Shine color and transparency
                "pointer-events-none z-0",  // Ensure it's behind bolts and non-interactive
                "opacity-0 group-hover:opacity-100", // Control visibility on hover (relies on 'group' on parent button)
                "group-hover:animate-glint-sweep"    // Apply animation on hover
              )}
            />
          </>
        )}
      </button>
    );
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
