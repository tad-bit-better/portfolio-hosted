
import type { Skill } from '@/config/portfolio.config';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react'; // Import Star icon
import { cn } from '@/lib/utils';

interface SkillItemProps {
  skill: Skill;
}

export function SkillItem({ skill }: SkillItemProps) {
  const { name, Icon } = skill;
  return (
    <Card className={cn(
      "group", // Added for group-hover effects
      "shadow-md hover:shadow-lg transition-all duration-300 ease-in-out",
      "animate-fade-in relative overflow-hidden",
      "bg-card/80 backdrop-blur-sm border-primary/20",
      "aspect-[3/2] flex flex-col justify-center items-center p-4",
      "hover:brightness-90" // Darken background on hover
    )}>
      {/* Large Background Icon */}
      {Icon && (
        <Icon className="absolute inset-0 m-auto h-3/4 w-3/4 text-primary opacity-[0.07] pointer-events-none z-0" />
      )}

      {/* Shine Effect on Hover */}
      <span
        className={cn(
          "absolute top-1/2 left-1/2",
          "w-16 h-[250%]", // Adjusted for card aspect ratio
          "bg-white/20",
          "pointer-events-none z-[5]", // Above background icon (z-0), below stars (z-10)
          "opacity-0", // Base opacity, animation will control visibility
          "group-hover:animate-glint-sweep"
        )}
        style={{ animationDuration: '0.75s' }}
      />

      {/* Decorative Stars - z-10 to be above background icon but below text */}
      <Star className="absolute top-2 left-3 h-5 w-5 text-accent opacity-30 -rotate-12 pointer-events-none z-10" fill="currentColor" />
      <Star className="absolute top-5 right-5 h-8 w-8 text-accent opacity-20 rotate-6 pointer-events-none z-10" fill="currentColor" />
      <Star className="absolute bottom-3 left-6 h-6 w-6 text-accent opacity-25 rotate-12 pointer-events-none z-10" fill="currentColor" />
      <Star className="absolute bottom-5 right-2 h-4 w-4 text-accent opacity-30 rotate-[25deg] pointer-events-none z-10" fill="currentColor" />
      <Star className="absolute top-1/2 left-1/4 h-5 w-5 text-accent opacity-20 -rotate-[30deg] pointer-events-none z-10" fill="currentColor" />
      <Star className="absolute bottom-1/4 right-1/3 h-7 w-7 text-accent opacity-15 rotate-[5deg] pointer-events-none z-10" fill="currentColor"/>

      {/* Skill Name - z-20 to be on top */}
      <div className="relative z-20 text-center">
        <p className="text-base sm:text-lg font-headline text-foreground">{name}</p>
      </div>
    </Card>
  );
}
