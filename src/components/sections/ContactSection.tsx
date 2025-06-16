
import type { PortfolioConfig } from '@/config/portfolio.config';
// import { ContactForm } from '@/components/ContactForm'; // Form is now disabled
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MessageCircle, Mail } from 'lucide-react';

interface ContactSectionProps {
  contactConfig: PortfolioConfig['contact'];
}

export function ContactSection({ contactConfig }: ContactSectionProps) {
  return (
    <section id="contact" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-primary/20 animate-fade-in">
            <CardHeader className="text-center">
              <MessageCircle className="mx-auto h-12 w-12 text-accent mb-4" />
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">Open Comms Channel</CardTitle>
              <CardDescription className="text-lg text-muted-foreground mt-2">
                {contactConfig.introText}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <ContactForm /> */}
              <Alert className="mt-0 sm:mt-2 border-primary/50 text-foreground bg-background/70 p-4 rounded-md">
                <Mail className="h-6 w-6 text-primary" />
                <AlertTitle className="font-headline text-xl text-primary mb-2">Direct Transmission Line!</AlertTitle>
                <AlertDescription className="text-base text-muted-foreground leading-relaxed">
                  The main comms console is temporarily offline for a pixel-perfect tune-up!
                  Fear not, brave adventurer, you can still send a high-priority databurst directly to Player 1 (Pushpendra)
                  using this secure frequency: <strong className="text-primary font-semibold whitespace-nowrap">pushpendra.y2011@gmail.com</strong>.
                  <br />
                  Our tech gnomes are working to get the main channel back online with even more awesome features!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
