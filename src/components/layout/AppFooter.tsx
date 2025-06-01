import { portfolioConfig } from '@/config/portfolio.config';
import { SocialLinks } from '@/components/SocialLinks';
import { Heart } from 'lucide-react';

export function AppFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 bg-background border-t border-border text-center">
      <div className="container mx-auto px-4">
        <SocialLinks links={portfolioConfig.socialLinks} className="mb-4" />
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} {portfolioConfig.personalInfo.name}. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1 flex items-center justify-center">
          Made with <Heart className="w-3 h-3 mx-1 text-accent fill-accent" /> using Next.js & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
