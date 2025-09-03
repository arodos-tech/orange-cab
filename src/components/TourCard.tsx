import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Check, Heart, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getImageUrl } from '@/utils/imageImports';
import { useNavigate } from 'react-router-dom';

interface TourCardProps {
  id: string;
  name: string;
  duration: string;
  description: string;
  image: string;
  highlights: string[];
  price: string;
  popular?: boolean;
  className?: string;
}

export const TourCard = ({
  id,
  name,
  duration,
  description,
  image,
  highlights,
  price,
  popular = false,
  className
}: TourCardProps) => {
  const navigate = useNavigate();
  
  const handleInquiry = () => {
    navigate(`/tour/${id}`);
  };

  return (
    <Card className={cn('group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white border border-gray-200 hover:border-orange-200 flex flex-col', className)}>
      
      {/* Popular Badge */}
      {popular && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 px-3 py-1 text-xs font-bold rounded-full shadow-lg">
            ⭐ Most Popular
          </Badge>
        </div>
      )}
      
      {/* Heart Icon */}
      <div className="absolute top-3 right-3 z-10">
        <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-300 shadow-md">
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
        </div>
      </div>
      
      {/* Tour Image */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img 
          src={getImageUrl(image)}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Duration Badge (outside image) */}
      <div className="flex items-center justify-start mt-2 px-4">
        <div className="flex items-center gap-1 px-3 py-1 bg-orange-100 rounded-full text-orange-700 text-xs font-medium border border-orange-200">
          ⏱ <span>{duration}</span>
        </div>
      </div>

      <CardContent className="p-6 flex flex-col flex-1">
        {/* Tour Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 font-medium">
            44 Reviews
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Highlights */}
<div className="mb-6 space-y-2">
  <h4 className="font-semibold text-gray-900 mb-3">Highlights:</h4>
  {highlights.slice(0, 3).map((highlight, index) => (
    <div 
      key={index} 
      className="flex items-center gap-2 text-sm bg-orange-50 px-3 py-2 rounded-full text-orange-700 border border-orange-200"
    >
      <Check className="w-4 h-4 text-orange-600 flex-shrink-0" />
      <span className="font-medium">{highlight}</span>
    </div>
  ))}
  {highlights.length > 3 && (
    <div className="flex items-center gap-1 text-sm text-gray-500 font-medium">
      +{highlights.length - 3} more exclusive highlight
    </div>
  )}
</div>


        {/* Get Quote Button (aligned) */}
        <div className="mt-auto">
          <Button 
            onClick={handleInquiry}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 transition-all duration-300 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105"
            size="lg"
          >
            Get Quote
            <Edit className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
