
import type { PortfolioConfig } from '@/config/portfolio.config';
import { ProjectCard } from '@/components/ProjectCard';
import { Trophy } from 'lucide-react';

interface ProjectsSectionProps {
  projects: PortfolioConfig['projects'];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-primary flex items-center justify-center">
          <Trophy className="mr-3 h-10 w-10" /> Completed Levels
        </h2>
        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {projects.map((project, index) => (
              <div key={project.id} style={{ animationDelay: `${index * 150}ms` }} className="opacity-0 animate-fade-in">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg">No levels unlocked yet. Insert coin to continue!</p>
        )}
      </div>
    </section>
  );
}
