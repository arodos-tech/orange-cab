import { Shield, Clock, MapPin, Star, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Clock,
  MapPin,
  Star,
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  image?: string;
  className?: string;
}

export const FeatureCard = ({ icon, title, description, image, className }: FeatureCardProps) => {
  const IconComponent = iconMap[icon] || Shield;

  return (
    <div className={cn('text-center group', className)}>
      {/* Image */}
      <div className="mx-auto w-24 h-24 mb-6 rounded-full overflow-hidden bg-muted shadow-elegant group-hover:shadow-hover transition-elegant">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full gradient-primary flex items-center justify-center">
            <IconComponent className="w-8 h-8 text-white" />
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-foreground mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed text-sm max-w-xs mx-auto">
        {description}
      </p>
    </div>
  );
};