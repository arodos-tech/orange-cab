import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight, Heart, Luggage, Users, Shield, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getImageUrl } from '@/utils/imageImports';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  id: string;
  name: string;
  price: string;
  period: string;
  image: string;
  rating: number;
  seats: number | string;
  bags: number;
  features: string[];
  limits?: string;
  popular?: boolean;
  className?: string;
}

export const ServiceCard = ({
  id,
  name,
  price,
  period,
  image,
  rating,
  seats,
  bags,
  features,
  limits,
  popular = false,
  className
}: ServiceCardProps) => {
  const navigate = useNavigate();

  // SEO-friendly URL mapping
  const getSEOUrl = (serviceId: string) => {
    const seoUrls: { [key: string]: string } = {
      'city_cab': '/city-cab-rental-in-guwahati',
      'innova_cab': '/innova-cab-rental-in-guwahati',
      'tempo_traveller': '/tempo-traveller-rental-in-guwahati',
      'force_urbania': '/urbania-rental-in-guwahati',
      'ertiga_cab': '/ertiga-cab-rental-in-guwahati',
      'creta_cab': '/creta-cab-rental-in-guwahati'
    };
    
    return seoUrls[serviceId] || `/service/${serviceId}`;
  };

  const handleBooking = () => {
    navigate(getSEOUrl(id));
  };

  return (
    <Card
      className={cn(
        'group relative flex flex-col overflow-hidden hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border border-gray-200 transition-all duration-500 hover:border-orange-200',
        className
      )}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 px-3 py-1 text-xs font-bold rounded-full shadow-lg">
            Most Popular
          </Badge>
        </div>
      )}

      {/* Heart Icon */}
      <div className="absolute top-3 right-3 z-10">
        <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-300 shadow-md">
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
        </div>
      </div>

      {/* Service Image */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={getImageUrl(image)}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardContent className="flex flex-col flex-grow p-6">
        {/* Name + Rating */}
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-sm text-gray-600 font-medium ml-1">{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Seats & Bags */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4 text-orange-500" /> 
            <span className="font-medium">{seats} Seats</span>
          </span>
          <span className="flex items-center gap-1">
            <Luggage className="w-4 h-4 text-orange-500" /> 
            <span className="font-medium">{bags} Bags</span>
          </span>
        </div>

        {/* Key Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {features.map((feature, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded-full border border-orange-200"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Spacer so price/button aligns at bottom */}
        <div className="flex-grow"></div>

        {/* Price + Button */}
        <div className="mt-auto">
          <div className="mb-4 flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-bold text-orange-600">{price}</span>
              <span className="text-gray-500 text-sm ml-1">/ {period}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Shield className="w-3 h-3" />
              <span>Insured</span>
            </div>
          </div>
          <Button
            onClick={handleBooking}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 transition-all duration-300 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105"
            size="lg"
          >
            Book Now
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
