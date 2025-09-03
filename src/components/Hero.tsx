import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Phone, MessageCircle } from 'lucide-react';
import { images } from '@/utils/imageImports';
import React from 'react';

interface CTAButton {
  text: string;
  action: string;
  primary: boolean;
}

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaButtons?: CTAButton[];
}

export const Hero: React.FC<HeroProps> = () => {
  const handleAction = (action: string) => {
    if (action === 'book') {
      window.open('https://wa.link/bg5sy0', '_blank');
    } else if (action === 'call') {
      window.open('tel:+919394939500', '_self');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${images.hero}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Page container with equal side spacing */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <span className="text-lg font-semibold text-white">4.7</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-white/90 font-medium">Trusted by 500+ Happy Riders</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Premium Cab Services 
            <span className="block text-orange-400 mt-2">in Guwahati</span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-light">
            Experience luxury, comfort, and reliability with Orange Cabs. Your trusted partner for city rides and memorable Northeast tours.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => handleAction('book')}
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white border-0 px-8 h-14 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="mr-3 w-5 h-5" />
              Book on WhatsApp
              <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
            <Button
              onClick={() => handleAction('call')}
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 h-14 text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <Phone className="mr-3 w-5 h-5" />
              Call Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
