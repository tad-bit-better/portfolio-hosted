
import { portfolioConfig } from '@/config/portfolio.config';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { AppFooter } from '@/components/layout/AppFooter';
import { SocialLinks } from '@/components/SocialLinks'; // For floating social links
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home as HomeIconOriginal, Briefcase, Zap, MessageCircle } from 'lucide-react'; // Renamed Home to HomeIconOriginal
import { AccessGuard } from '@/components/AccessGuard';


// Simple Navbar Component (can be moved to its own file if it grows)
function Navbar() {
  const navItems = [
    { href: "#hero", label: "Home", Icon: HomeIconOriginal }, // Use the renamed HomeIconOriginal
    { href: "#projects", label: "Projects", Icon: Briefcase },
    { href: "#skills", label: "Skills", Icon: Zap },
    { href: "#contact", label: "Contact", Icon: MessageCircle },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md shadow-sm p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold font-headline text-primary hover:text-accent transition-colors">
          {portfolioConfig.personalInfo.name.split(' ')[0]} // Devfolio
        </Link>
        <div className="hidden md:flex space-x-2">
          {navItems.map(item => (
            <Button key={item.label} variant="ghost" asChild className="text-foreground hover:text-primary hover:bg-primary/10">
              <Link href={item.href} className="flex items-center">
                <item.Icon className="mr-2 h-4 w-4" /> {item.label}
              </Link>
            </Button>
          ))}
        </div>
        {/* Mobile menu could be added here if needed */}
      </div>
    </nav>
  );
}


export default function Home() {
  return (
    <AccessGuard>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <HeroSection personalInfo={portfolioConfig.personalInfo} />
          <ProjectsSection projects={portfolioConfig.projects} />
          <SkillsSection skills={portfolioConfig.skills} />
          <ContactSection contactConfig={portfolioConfig.contact} />
        </main>
        <AppFooter />
        {/* Optional: Floating Social Links Bar */}
        <div className="fixed bottom-4 right-4 z-50 hidden md:block opacity-0 animate-fade-in" style={{animationDelay: '1s'}}>
          <div className="bg-card p-2 rounded-lg shadow-lg border">
            <SocialLinks links={portfolioConfig.socialLinks} className="flex-col space-y-3 !space-x-0" />
          </div>
        </div>
      </div>
    </AccessGuard>
  );
}
