
import type { Skill } from '@/config/portfolio.config';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillItemProps {
  skill: Skill;
}

export function SkillItem({ skill }: SkillItemProps) {
  const { name, Icon } = skill;

  // Define stars with animation delays and varied durations
  const stars = [
    { className: "top-2 left-3 h-5 w-5 -rotate-12", fill: true, animationDelay: '0s', animationDuration: '2500ms' },
    { className: "top-5 right-5 h-8 w-8 rotate-6", fill: true, animationDelay: '0.3s', animationDuration: '1800ms' },
    { className: "bottom-3 left-6 h-6 w-6 rotate-12", fill: true, animationDelay: '0.6s', animationDuration: '2900ms' },
    { className: "bottom-5 right-2 h-4 w-4 rotate-[25deg]", fill: true, animationDelay: '0.9s', animationDuration: '2200ms' },
    { className: "top-1/2 left-1/4 h-5 w-5 -rotate-[30deg]", fill: true, animationDelay: '1.2s', animationDuration: '1600ms' },
    { className: "bottom-1/4 right-1/3 h-7 w-7 rotate-[5deg]", fill: true, animationDelay: '1.5s', animationDuration: '2700ms' },
  ];

  return (
    <Card className={cn(
      "group",
      "shadow-md hover:shadow-lg transition-all duration-300 ease-in-out",
      // "animate-fade-in" removed as parent in SkillsSection handles initial fade-in
      "opacity-85 group-hover:opacity-100", // Added for hover-based fade in/out
      "relative overflow-hidden",
      "bg-card/80 backdrop-blur-sm border-primary/20",
      "aspect-[3/2] flex flex-col justify-center items-center p-4",
      "text-foreground",
      "hover:bg-accent hover:text-accent-foreground",
      "transition-colors duration-300 ease-in-out" // transition-all includes opacity
    )}>
      {Icon && (
        <Icon className={cn(
          "absolute inset-0 m-auto h-3/4 w-3/4 text-primary pointer-events-none z-0",
          "opacity-[0.07]",
          "transition-all duration-300 ease-in-out",
          "group-hover:opacity-[0.15] group-hover:scale-105" // Icon pops on hover
        )} />
      )}

      <span
        className={cn(
          "absolute top-1/2 left-1/2",
          "w-16 h-[250%]",
          "bg-white/25",
          "pointer-events-none z-[5]",
          "opacity-0",
          "group-hover:animate-glint-sweep"
        )}
        style={{ animationDuration: '0.75s' }}
      />

      {stars.map((star, idx) => (
        <Star
          key={idx}
          className={cn(
            "absolute pointer-events-none z-10",
            "text-accent animate-star-glitter", // Base color and glitter animation
            "transition-all duration-300 ease-in-out",
            "group-hover:text-accent-foreground group-hover:opacity-75 group-hover:scale-125", // Star changes on hover
            star.className
          )}
          fill={star.fill ? "currentColor" : "none"}
          style={{ animationDelay: star.animationDelay, animationDuration: star.animationDuration }}
        />
      ))}

      <div className="relative z-20 text-center">
        <p className={cn(
          "text-base sm:text-lg font-headline",
          "transition-colors duration-300 ease-in-out",
          "group-hover:text-primary",
          "group-hover:bg-foreground group-hover:px-2 group-hover:py-1 group-hover:rounded-sm",
          "[text-shadow:0px_1px_2px_hsl(var(--foreground)/0.3)]"
        )}>{name}</p>
      </div>
    </Card>
  );
}
