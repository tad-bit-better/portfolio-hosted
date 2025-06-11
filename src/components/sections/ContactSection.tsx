
import type { PortfolioConfig } from '@/config/portfolio.config';
import { ContactForm } from '@/components/ContactForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';

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
              <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">Open Comms Channel</CardTitle>
              <CardDescription className="text-lg text-muted-foreground mt-2">
                {contactConfig.introText}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
