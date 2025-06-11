
import type { PortfolioConfig } from '@/config/portfolio.config';
import { ExperienceCard } from '@/components/ExperienceCard';
import { Briefcase } from 'lucide-react'; // Using Briefcase icon for experience

interface ExperienceSectionProps {
  experience: PortfolioConfig['experience'];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-primary flex items-center justify-center">
          <Briefcase className="mr-3 h-8 sm:h-10 w-8 sm:w-10" /> My Career Saga
        </h2>
        {experience.length > 0 ? (
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {experience.map((exp, index) => (
              <div key={exp.id} style={{ animationDelay: `${index * 150}ms` }} className="opacity-0 animate-fade-in">
                <ExperienceCard experience={exp} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg">My career log is currently empty. Stay tuned for updates!</p>
        )}
      </div>
    </section>
  );
}
