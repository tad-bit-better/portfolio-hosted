
import type { PortfolioConfig } from '@/config/portfolio.config';
import { SkillItem } from '@/components/SkillItem';
import { Zap } from 'lucide-react';

interface SkillsSectionProps {
  skills: PortfolioConfig['skills'];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-primary flex items-center justify-center">
          <Zap className="mr-3 h-10 w-10" /> My Power-Ups
        </h2>
        {skills.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {skills.map((skill, index) => (
               <div key={skill.name} style={{ animationDelay: `${index * 100}ms` }} className="opacity-0 animate-fade-in">
                <SkillItem skill={skill} />
              </div>
            ))}
          </div>
        ) : (
           <p className="text-center text-muted-foreground text-lg">Skill tree loading... Please wait!</p>
        )}
      </div>
    </section>
  );
}
