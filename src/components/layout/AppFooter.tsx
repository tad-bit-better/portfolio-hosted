
import { portfolioConfig } from '@/config/portfolio.config';
import { SocialLinks } from '@/components/SocialLinks';
import { Heart, Gamepad2 } from 'lucide-react'; // Added Gamepad2

export function AppFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 bg-background border-t border-border text-center">
      <div className="container mx-auto px-4">
        <SocialLinks links={portfolioConfig.socialLinks} className="mb-4" />
        <p className="text-base text-muted-foreground">
          &copy; {currentYear} {portfolioConfig.personalInfo.name}. Game Over? Never!
        </p>
        <p className="text-sm text-muted-foreground/70 mt-1 flex items-center justify-center">
          Crafted with <Gamepad2 className="w-4 h-4 mx-1 text-primary" /> and <Heart className="w-3 h-3 mx-1 text-accent fill-accent" /> using Next.js & Tailwind.
        </p>
      </div>
    </footer>
  );
}
