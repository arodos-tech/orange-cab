import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Fuel, Shield, ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '@/utils/imageImports';
import { useEffect } from 'react';

const UrbaniaBooking = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBooking = () => {
    const message = "Hi Team, I am interested for Urbania 17-seater booking";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.link/bg5sy0?text=${encodedMessage}`, '_blank');
  };

  const features = [
    {
      icon: Users,
      title: "17 Seater Capacity",
      description: "Accommodates up to 17 passengers comfortably"
    },
    {
      icon: Shield,
      title: "Safety Features",
      description: "Equipped with airbags, ABS, and strong body construction"
    },
    {
      icon: Fuel,
      title: "Fuel Efficient",
      description: "Reliable diesel engine for long journeys"
    }
  ];

  const inclusions = [
    "Car charges included",
    "Fuel included", 
    "Driver charges included",
    "Driver food & lodging included",
    "Comfortable seating for 17 passengers",
    "Air conditioning system",
    "Ample storage space",
    "Entertainment system"
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
              src="/force-urbania1.jpg"
              alt="Force Urbania 17 Seater"
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
            <Badge className="absolute top-4 left-4 gradient-primary text-white">
              Premium Vehicle
            </Badge>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Force Urbania 17 Seater
              </h1>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-current" />
                ))}
                <span className="text-muted-foreground ml-2">5.0/5</span>
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">₹10,000 - ₹12,000</span>
              <span className="text-muted-foreground">per day</span>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              The Force Urbania 17-seater is designed for larger groups, making it perfect for family trips, 
              corporate outings, or group tours. Spacious and thoughtfully designed interior focused on 
              passenger comfort with powerful performance.
            </p>

            <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
              <strong>Note:</strong> 80km and 8 hours limit applicable
            </div>

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
        <div className="grid md:grid-cols-3 gap-6">
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
              {inclusions.map((inclusion, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  <span className="text-muted-foreground">{inclusion}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-12">
        <Card className="gradient-card text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to Book Your Urbania?
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

export default UrbaniaBooking;