import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Luggage, ArrowLeft, ExternalLink, Check } from 'lucide-react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { getImageUrl } from '@/utils/imageImports';
import { useEffect, useState } from 'react';
import servicesData from '@/data/services.json';

const CityFAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left hover:text-orange-500 transition-colors"
      >
        <span className="font-medium text-foreground hover:text-orange-500 transition-colors">{question}</span>
        <span className="text-primary text-xl font-bold">
          {isOpen ? "-" : "+"}
        </span>
      </button>
      {isOpen && (
        <p className="pb-4 text-muted-foreground">{answer}</p>
      )}
    </div>
  );
};

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const location = useLocation();
  const [service, setService] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    let foundService;
    
    // Handle SEO-friendly URLs
    const pathToServiceMap: { [key: string]: string } = {
      '/city-cab-rental-in-guwahati': 'city_cab',
      '/innova-cab-rental-in-guwahati': 'innova_cab',
      '/tempo-traveller-rental-in-guwahati': 'tempo_traveller',
      '/ertiga-cab-rental-in-guwahati': 'ertiga_cab',
      '/creta-cab-rental-in-guwahati': 'creta_cab'
    };
    
    const mappedServiceId = pathToServiceMap[location.pathname];
    
    if (mappedServiceId) {
      foundService = servicesData.cityServices.services.find(s => s.id === mappedServiceId);
    } else if (location.pathname === '/tempo-traveller-rental-in-guwahati') {
      foundService = servicesData.cityServices.services.find(s => s.id === 'tempo_traveller');
    } else {
      foundService = servicesData.cityServices.services.find(s => s.id === serviceId);
    }
    
    setService(foundService);
  }, [serviceId, location.pathname]);

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Service Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    const message = `Hi Team, I am interested for ${service.name} booking`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919394939500?text=${encodedMessage}`, '_blank');
  };

  const features = [
    {
      icon: Users,
      title: `${service.seats} Seater Capacity`,
      description: `Comfortable seating for up to ${service.seats} passengers, making it perfect for large families or group trips from Guwahati to Meghalaya.
`
    },
    {
      icon: Luggage,
      title: `${service.bags} Bags Space`,
      description: "Extra luggage space to carry bags for your Shillong holiday, Cherrapunji adventure, or Kaziranga safari."
   }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src={getImageUrl(service.image)}
              alt={service.name}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
            {service.popular && (
              <Badge className="absolute top-4 left-4 gradient-primary text-white">
                ⭐ Most Popular
              </Badge>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {service.name}
              </h1>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-current" />
                ))}
                <span className="text-muted-foreground ml-2">5.0/5</span>
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">{service.price}</span>
              <span className="text-muted-foreground">{service.period}</span>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Rent {service.name} from Guwahati to Shillong, Cherrapunji, Dawki, Kaziranga, and across Meghalaya. Spacious {service.seats}-seater with luggage space, fuel included, professional drivers. Book Innova car rental now via WhatsApp or call.

              {/* Experience comfortable and reliable transportation with our {service.name}. 
              Perfect for city travels with professional drivers and well-maintained vehicles. */}
            </p>

            {service.limits && (
              <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
                <strong>Note:</strong> {service.limits}
              </div>
            )}

            <Button
              onClick={handleBooking}
              className="w-full lg:w-auto gradient-primary hover:shadow-hover transition-elegant"
              size="lg"
            >
              Book Now on WhatsApp
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Inclusions Section */}
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-foreground">What's Included</h2>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {service.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              FAQ
            </h2>
            <p className="text-muted-foreground">
              Find quick answers to common questions
            </p>
          </div>
          
          <div className="lg:col-span-2 space-y-4">
            <CityFAQItem 
              question={` "Can I book a ${service.name} for a Guwahati to Shillong trip?" `}
              answer={`"Yes, ${service.name} rentals are available for Guwahati to Shillong and extended Meghalaya trips." `}
            />
            <CityFAQItem 
              question="Are fuel and driver charges included in the rental price?"
              answer="Yes, fuel, driver charges, and even driver lodging are all included in the package."
            />
            <CityFAQItem 
              question="Can I get pick-up from Guwahati Airport?"
              answer="Yes, airport and railway station pick-up/drop services are available at no extra charge."
            />
            <CityFAQItem 
              question="What places can I cover with this rental?"
              answer="Popular routes include Guwahati–Shillong, Shillong–Cherrapunji, Dawki, Mawlynnong, Kaziranga, and other destinations across Meghalaya."
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-12">
        <Card className="gradient-card text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to Book Your {service.name}?
            </h2>
            <p className="text-muted-foreground mb-6">
              Contact us now for the best rates and availability
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleBooking}
                className="gradient-primary hover:shadow-hover transition-elegant"
                size="lg"
              >
                Book on WhatsApp
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() => window.open('tel:+919394939500', '_self')}
                variant="outline"
                size="lg"
              >
                Call +91-9394939500
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceDetails;