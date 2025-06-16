
// src/components/SideProjectCard.tsx
'use client';

import Image from 'next/image';
import type { SideProject } from '@/config/portfolio.config';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, GitFork, Sparkles, Tags, Info, CheckCircle, Clock } from 'lucide-react'; // Added Info, CheckCircle, Clock
import { cn } from '@/lib/utils';

interface SideProjectCardProps {
  project: SideProject;
}

function getStatusInfo(status?: SideProject['status']): { text: string; Icon: LucideIcon; colorClass: string } {
  switch (status) {
    case 'Completed':
      return { text: 'Completed', Icon: CheckCircle, colorClass: 'bg-green-500/80 hover:bg-green-500 text-white' };
    case 'In Progress':
      return { text: 'In Progress', Icon: Clock, colorClass: 'bg-blue-500/80 hover:bg-blue-500 text-white' };
    case 'Concept':
      return { text: 'Concept', Icon: Lightbulb, colorClass: 'bg-purple-500/80 hover:bg-purple-500 text-white' };
    default:
      return { text: 'N/A', Icon: Info, colorClass: 'bg-gray-400/80 hover:bg-gray-400 text-white' };
  }
}

export function SideProjectCard({ project }: SideProjectCardProps) {
  const { Icon: ProjectIcon = Sparkles } = project; // Default to Sparkles if no Icon provided
  const statusInfo = getStatusInfo(project.status);

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 animate-fade-in bg-card/90 backdrop-blur-sm">
      <CardHeader>
        {project.imageUrl && (
          <div className="aspect-video relative w-full rounded-md overflow-hidden border mb-4">
            <Image
              src={project.imageUrl}
              alt={`${project.name} preview`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint={project.imageHint || 'project image'}
            />
          </div>
        )}
        <div className="flex justify-between items-start">
            <CardTitle className="text-lg sm:text-xl font-headline flex items-center text-primary">
                <ProjectIcon className="mr-2 h-5 w-5" />
                {project.name}
            </CardTitle>
            {project.status && (
                <Badge variant="secondary" className={cn("text-xs transition-transform hover:scale-105", statusInfo.colorClass)}>
                     <statusInfo.Icon className="mr-1.5 h-3.5 w-3.5" />
                    {statusInfo.text}
                </Badge>
            )}
        </div>
        <CardDescription className="text-muted-foreground h-20 overflow-y-auto leading-relaxed text-base pt-1">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-1">
          <h4 className="text-base font-semibold mb-2 text-foreground flex items-center">
            <Tags className="h-4 w-4 mr-2 text-primary" />
            Tech Stack:
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="transition-transform hover:scale-105">{tech}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-start items-center gap-2 pt-4 border-t">
        <Button asChild variant="default" className="w-full sm:w-auto transition-transform hover:scale-105" disabled={project.projectUrl === "#"}>
          <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" /> View Project
          </a>
        </Button>
        {project.repoUrl && (
          <Button asChild variant="outline" className="w-full sm:w-auto transition-transform hover:scale-105">
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              <GitFork className="mr-2 h-4 w-4" /> View Code
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
