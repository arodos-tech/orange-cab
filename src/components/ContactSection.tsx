import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';

interface ContactProps {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
}

export const ContactSection = ({ phone, whatsapp, email, address }: ContactProps) => {
  const handleContact = (type: string, value: string) => {
    switch (type) {
      case 'phone':
        window.open(`tel:${phone}`, '_self');
        break;
      case 'whatsapp':
        window.open(whatsapp, '_blank');
        break;
      case 'email':
        window.open(`mailto:${email}`, '_self');
        break;
    }
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Book Your Ride?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Contact us now for instant booking and personalized service
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Phone */}
          <Card className="group cursor-pointer transition-elegant hover:shadow-hover hover:-translate-y-1 gradient-card border-border/50"
                onClick={() => handleContact('phone', phone)}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center shadow-elegant group-hover:shadow-hover transition-elegant">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Call Us</h3>
              <p className="text-primary font-medium">{phone}</p>
            </CardContent>
          </Card>

          {/* WhatsApp */}
          <Card className="group cursor-pointer transition-elegant hover:shadow-hover hover:-translate-y-1 gradient-card border-border/50"
                onClick={() => handleContact('whatsapp', whatsapp)}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center shadow-elegant group-hover:shadow-hover transition-elegant">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">WhatsApp</h3>
              <p className="text-primary font-medium">Chat with us</p>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="group cursor-pointer transition-elegant hover:shadow-hover hover:-translate-y-1 gradient-card border-border/50"
                onClick={() => handleContact('email', email)}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center shadow-elegant group-hover:shadow-hover transition-elegant">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Email</h3>
              <p className="text-primary font-medium">{email}</p>
            </CardContent>
          </Card>

          {/* Address */}
          <Card className="group transition-elegant hover:shadow-hover hover:-translate-y-1 gradient-card border-border/50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center shadow-elegant group-hover:shadow-hover transition-elegant">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Location</h3>
              <p className="text-muted-foreground text-sm">{address}</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => handleContact('whatsapp', whatsapp)}
              size="lg"
              className="gradient-primary hover:shadow-hover transition-elegant px-8 py-6 text-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Book via WhatsApp
            </Button>
            <Button
              onClick={() => handleContact('phone', phone)}
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-elegant px-8 py-6 text-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};