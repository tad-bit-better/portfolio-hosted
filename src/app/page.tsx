
import { portfolioConfig } from '@/config/portfolio.config';
import { HeroSection } from '@/components/sections/HeroSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection'; // Updated import
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { AppFooter } from '@/components/layout/AppFooter';
import { SocialLinks } from '@/components/SocialLinks';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home as HomeIcon, Briefcase, Zap, MessageCircle, Gamepad2 } from 'lucide-react'; // Updated Icon
import { AccessGuard } from '@/components/AccessGuard';

function Navbar() {
  const navItems = [
    { href: "#hero", label: "Start", Icon: HomeIcon },
    { href: "#experience", label: "Career Log", Icon: Briefcase }, // Updated label, href, and Icon
    { href: "#skills", label: "Power-Ups", Icon: Zap },
    { href: "#contact", label: "Comms", Icon: MessageCircle },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md shadow-sm p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold font-headline text-primary hover:text-accent transition-colors flex items-center">
          <Gamepad2 className="mr-2 h-6 w-6" /> {portfolioConfig.personalInfo.name.split(' ')[0]}'s // Devcade
        </Link>
        <div className="hidden md:flex space-x-2">
          {navItems.map(item => (
            <Button key={item.label} variant="ghost" asChild className="text-foreground hover:text-primary hover:bg-primary/10 text-base">
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
          <ExperienceSection experience={portfolioConfig.experience} /> {/* Updated component and prop */}
          <SkillsSection skills={portfolioConfig.skills} />
          <ContactSection contactConfig={portfolioConfig.contact} />
        </main>
        <AppFooter />
        <div className="fixed bottom-4 right-4 z-50 hidden md:block opacity-0 animate-fade-in" style={{animationDelay: '1s'}}>
          <div className="bg-card p-2 rounded-lg shadow-lg border">
            <SocialLinks links={portfolioConfig.socialLinks} className="flex-col space-y-3 !space-x-0" />
          </div>
        </div>
      </div>
    </AccessGuard>
  );
}
