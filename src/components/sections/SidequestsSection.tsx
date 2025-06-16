
// src/components/sections/SidequestsSection.tsx
import type { PortfolioConfig } from '@/config/portfolio.config';
import { SideProjectCard } from '@/components/SideProjectCard';
import { Wand2 } from 'lucide-react';

interface SidequestsSectionProps {
  sideProjects: PortfolioConfig['sideProjects'];
}

export function SidequestsSection({ sideProjects }: SidequestsSectionProps) {
  return (
    <section id="sidequests" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-primary flex items-center justify-center">
          <Wand2 className="mr-3 h-8 sm:h-10 w-8 sm:w-10" /> Sidequests & Discoveries
        </h2>
        {sideProjects.length > 0 ? (
          <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
            {sideProjects.map((project, index) => (
              <div key={project.id} style={{ animationDelay: `${index * 150}ms` }} className="opacity-0 animate-fade-in">
                <SideProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg">No sidequests logged yet... Adventure awaits!</p>
        )}
      </div>
    </section>
  );
}
