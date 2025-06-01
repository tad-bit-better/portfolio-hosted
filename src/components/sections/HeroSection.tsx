import Image from 'next/image';
import type { PortfolioConfig } from '@/config/portfolio.config';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  personalInfo: PortfolioConfig['personalInfo'];
}

export function HeroSection({ personalInfo }: HeroSectionProps) {
  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center p-4 md:p-8 bg-gradient-to-br from-background to-card animate-fade-in">
      <div className="max-w-3xl">
        <div className="mb-8 transform transition-all duration-500 hover:scale-105">
          <Image
            src={personalInfo.profileImage}
            alt={personalInfo.name}
            width={180}
            height={180}
            className="rounded-full mx-auto border-4 border-primary shadow-xl"
            priority
            data-ai-hint={personalInfo.profileImageHint}
          />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-primary">
          {personalInfo.name}
        </h1>
        <h2 className="text-2xl md:text-3xl font-headline text-foreground mb-6">
          {personalInfo.title}
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
          {personalInfo.bio}
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform transition-transform duration-300 hover:scale-105">
            <Link href="#projects">View My Work <ArrowDown className="ml-2 h-5 w-5" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="shadow-lg transform transition-transform duration-300 hover:scale-105">
            <Link href="#contact">Get In Touch</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
