import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, MapPin, ArrowLeft, ExternalLink, Check } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getImageUrl } from '@/utils/imageImports';
import { useEffect, useState } from 'react';
import servicesData from '@/data/services.json';

const TourDetails = () => {
  const { tourId } = useParams();
  const [tour, setTour] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundTour = servicesData.outstationServices.tours.find(t => t.id === tourId);
    setTour(foundTour);
  }, [tourId]);

  if (!tour) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Tour Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleInquiry = () => {
    const message = `Hi Team, I am interested for ${tour.name}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919394939500?text=${encodedMessage}`, '_blank');
  };

  const features = [
    {
      icon: Calendar,
      title: tour.duration,
      description: "Complete tour package with comfortable accommodation"
    },
    {
      icon: MapPin,
      title: "Expert Guides",
      description: "Local guides with deep knowledge of the destinations"
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
              src={getImageUrl(tour.image)}
              alt={tour.name}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
            {tour.popular && (
              <Badge className="absolute top-4 left-4 gradient-primary text-white">
                ⭐ Most Popular
              </Badge>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {tour.name}
              </h1>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-current" />
                ))}
                <span className="text-muted-foreground ml-2">4.8/5 (44 Reviews)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-lg font-medium text-foreground">{tour.duration}</span>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {tour.description}
            </p>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">{tour.price}</span>
            </div>

            <Button
              onClick={handleInquiry}
              className="w-full lg:w-auto gradient-primary hover:shadow-hover transition-elegant"
              size="lg"
            >
              Get Quote on WhatsApp
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
          Tour Features
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

      {/* Highlights Section */}
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-foreground">Tour Highlights</h2>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {tour.highlights.map((highlight: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{highlight}</span>
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
              Ready to Explore {tour.name}?
            </h2>
            <p className="text-muted-foreground mb-6">
              Contact us now for detailed itinerary and the best rates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleInquiry}
                className="gradient-primary hover:shadow-hover transition-elegant"
                size="lg"
              >
                Get Quote on WhatsApp
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

export default TourDetails;