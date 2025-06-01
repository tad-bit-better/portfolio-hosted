import type { PortfolioConfig } from '@/config/portfolio.config';
import { Button } from '@/components/ui/button';

interface SocialLinksProps {
  links: PortfolioConfig['socialLinks'];
  className?: string;
}

export function SocialLinks({ links, className }: SocialLinksProps) {
  return (
    <div className={`flex justify-center space-x-4 ${className}`}>
      {links.map(({ platform, url, Icon }) => (
        <Button key={platform} asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary transition-colors duration-300 transform hover:scale-110">
          <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Link to my ${platform} profile`}>
            <Icon className="h-6 w-6" />
          </a>
        </Button>
      ))}
    </div>
  );
}
