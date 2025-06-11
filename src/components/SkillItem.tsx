
import type { Skill } from '@/config/portfolio.config';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillItemProps {
  skill: Skill;
}

export function SkillItem({ skill }: SkillItemProps) {
  const { name, Icon } = skill;
  return (
    <Card className={cn(
      "group",
      "shadow-md hover:shadow-lg transition-all duration-300 ease-in-out", // Kept existing transitions
      "animate-fade-in relative overflow-hidden",
      "bg-card/80 backdrop-blur-sm border-primary/20",
      "aspect-[3/2] flex flex-col justify-center items-center p-4",
      "text-foreground", // Default text color
      "hover:bg-accent hover:text-accent-foreground", // Change background and text on hover
      "transition-colors duration-300 ease-in-out" // Added for bg/text color transition
    )}>
      {/* Large Background Icon */}
      {Icon && (
        <Icon className={cn(
          "absolute inset-0 m-auto h-3/4 w-3/4 text-primary pointer-events-none z-0",
          "opacity-[0.10]", // Slightly more visible by default
          "transition-all duration-300 ease-in-out",
          "group-hover:opacity-[0.20] group-hover:scale-105" // Pop effect
        )} />
      )}

      {/* Shine Effect on Hover */}
      <span
        className={cn(
          "absolute top-1/2 left-1/2",
          "w-16 h-[250%]",
          "bg-white/20",
          "pointer-events-none z-[5]",
          "opacity-0",
          "group-hover:animate-glint-sweep" // Uses animation defined in tailwind.config.ts
        )}
        style={{ animationDuration: '0.75s' }} // Custom duration for card shine
      />

      {/* Decorative Stars - z-10 to be above background icon but below text */}
      {[
        { className: "top-2 left-3 h-5 w-5 opacity-30 -rotate-12", fill: true },
        { className: "top-5 right-5 h-8 w-8 opacity-20 rotate-6", fill: true },
        { className: "bottom-3 left-6 h-6 w-6 opacity-25 rotate-12", fill: true },
        { className: "bottom-5 right-2 h-4 w-4 opacity-30 rotate-[25deg]", fill: true },
        { className: "top-1/2 left-1/4 h-5 w-5 opacity-20 -rotate-[30deg]", fill: true },
        { className: "bottom-1/4 right-1/3 h-7 w-7 opacity-15 rotate-[5deg]", fill: true },
      ].map((star, idx) => (
        <Star
          key={idx}
          className={cn(
            "absolute pointer-events-none z-10",
            "text-accent", // Default star color
            "transition-all duration-300 ease-in-out",
            "group-hover:text-accent-foreground group-hover:opacity-75 group-hover:scale-125", // Pop effect and color change
            star.className
          )}
          fill={star.fill ? "currentColor" : "none"}
        />
      ))}

      {/* Skill Name - z-20 to be on top */}
      <div className="relative z-20 text-center">
        <p className="text-base sm:text-lg font-headline">{name}</p> {/* Text color will be inherited from card */}
      </div>
    </Card>
  );
}
