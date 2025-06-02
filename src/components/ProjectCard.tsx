'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Project } from '@/config/portfolio.config';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Tags, Loader2, Wand2 } from 'lucide-react';
import { suggestProjectTags } from '@/ai/flows/suggest-project-tags';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSuggestTags = async () => {
    setIsLoadingTags(true);
    setError(null);
    setSuggestedTags([]);
    try {
      const result = await suggestProjectTags({ projectDescription: project.description });
      setSuggestedTags(result.tags);
    } catch (err) {
      console.error("Error suggesting tags:", err);
      setError("Failed to suggest tags. Please try again.");
    } finally {
      setIsLoadingTags(false);
    }
  };

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 animate-fade-in">
      <CardHeader>
        <div className="aspect-[3/2] relative w-full rounded-t-lg overflow-hidden mb-4">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 hover:scale-110"
            data-ai-hint={project.imageHint}
          />
        </div>
        <CardTitle className="text-2xl font-headline">{project.title}</CardTitle>
        <CardDescription className="text-muted-foreground h-20 overflow-y-auto leading-relaxed">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-4">
          <h4 className="text-base font-semibold mb-2 text-foreground flex items-center">
            <Tags className="h-4 w-4 mr-2 text-primary" />
            Technologies Used:
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="transition-transform hover:scale-105">{tag}</Badge>
            ))}
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {suggestedTags.length > 0 && (
          <div className="mb-4 p-3 bg-primary/10 rounded-md">
            <h4 className="text-sm font-semibold mb-2 text-primary flex items-center">
              <Wand2 className="h-4 w-4 mr-2" />
              AI Suggested Tags:
            </h4>
            <div className="flex flex-wrap gap-2">
              {suggestedTags.map((tag) => (
                <Badge key={tag} variant="outline" className="border-primary text-primary transition-transform hover:scale-105">{tag}</Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-4 border-t">
        <Button asChild variant="outline" className="w-full sm:w-auto transition-transform hover:scale-105">
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" /> View Project
          </a>
        </Button>
        <Button onClick={handleSuggestTags} disabled={isLoadingTags} className="w-full sm:w-auto bg-primary hover:bg-primary/90 transition-transform hover:scale-105">
          {isLoadingTags ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Suggest Tags
        </Button>
      </CardFooter>
    </Card>
  );
}
