
'use client';

import Image from 'next/image';
import type { Experience } from '@/config/portfolio.config';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Tags, Briefcase, CalendarDays } from 'lucide-react';

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 animate-fade-in">
      <CardHeader>
        <div className="flex items-start space-x-4 mb-3">
          <div className="aspect-square relative w-16 h-16 rounded-md overflow-hidden border">
            <Image
              src={experience.logoUrl}
              alt={`${experience.companyName} logo`}
              fill
              sizes="64px"
              className="object-contain"
              data-ai-hint={experience.logoHint || 'company logo'}
            />
          </div>
          <div>
            <CardTitle className="text-xl font-headline flex items-center">
              <Briefcase className="mr-2 h-5 w-5 text-primary" />{experience.role}
            </CardTitle>
            <p className="text-base text-muted-foreground font-semibold">{experience.companyName}</p>
            <p className="text-sm text-muted-foreground/80 flex items-center mt-1">
              <CalendarDays className="mr-1.5 h-4 w-4" /> {experience.dates}
            </p>
          </div>
        </div>
        <CardDescription className="text-muted-foreground h-24 overflow-y-auto leading-relaxed text-base">{experience.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-4">
          <h4 className="text-base font-semibold mb-2 text-foreground flex items-center">
            <Tags className="h-4 w-4 mr-2 text-primary" />
            Key Technologies:
          </h4>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="transition-transform hover:scale-105">{tech}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-start items-center gap-2 pt-4 border-t">
        <Button asChild variant="outline" className="w-full sm:w-auto transition-transform hover:scale-105" disabled={experience.companyUrl === "#"}>
          <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" /> Visit Company
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
