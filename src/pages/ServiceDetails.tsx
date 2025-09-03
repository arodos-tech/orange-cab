import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Luggage, ArrowLeft, ExternalLink, Check, Shield, Fuel, DollarSign, Car } from 'lucide-react';
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
    
    // Update meta description based on service
    if (foundService) {
      const getMetaDescription = (serviceId: string) => {
        switch (serviceId) {
          case 'city_cab':
            return "Rent city cabs in Guwahati for travel to Shillong, Cherrapunji, Dawki, Kaziranga, and across Meghalaya. Affordable prices, professional drivers, fuel included. Book now via WhatsApp or call.";
          case 'innova_cab':
            return "Rent Innova cabs from Guwahati to Shillong, Cherrapunji, Dawki, Kaziranga, and across Meghalaya. Spacious 7-seater with luggage space, fuel included, professional drivers. Book Innova car rental now via WhatsApp or call.";
          case 'tempo_traveller':
            return "Book Tempo Traveller rentals in Guwahati for group trips to Shillong, Cherrapunji, Dawki, Kaziranga, and across Meghalaya. Spacious 11–25 seater, luggage space, fuel included, with professional drivers.";
          case 'ertiga_cab':
            return "Book Ertiga cab rentals in Guwahati for trips to Shillong, Cherrapunji, Dawki, Kaziranga, and across Meghalaya. Comfortable 7-seater with luggage space, fuel included, and professional drivers.";
          case 'creta_cab':
            return "Rent Hyundai Creta cabs in Guwahati for Shillong, Cherrapunji, Dawki, Kaziranga, and across Meghalaya. Premium 5-seater SUV with luggage space, fuel included, and professional drivers.";
          case 'force_urbania':
            return "Book Force Urbania 17-seater rentals in Guwahati for Meghalaya trips. Spacious group vehicle with modern comfort, fuel included, professional drivers, and perfect for Shillong, Cherrapunji, Dawki, and Kaziranga tours.";
          default:
            return "Rent cars in Guwahati for travel to Shillong, Cherrapunji, Dawki, and Kaziranga. Affordable prices with trusted local drivers. Book now.";
        }
      };
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', getMetaDescription(foundService.id));
      }
    }
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

  const getFeatureDescriptions = (serviceId: string) => {
    switch (serviceId) {
      case 'city_cab':
        return {
          spacious: "Compact yet comfortable design perfect for city navigation with reliable performance for daily commutes.",
          drivers: "Local drivers with expert knowledge of Guwahati streets, shortcuts, and traffic patterns."
        };
      case 'innova_cab':
        return {
          spacious: "Premium SUV with spacious interiors and superior reliability for long-distance interstate travel.",
          drivers: "Experienced highway drivers specializing in Guwahati-Meghalaya routes and mountain driving."
        };
      case 'tempo_traveller':
        return {
          spacious: "Well-maintained Tempo Travellers built for hilly roads, long-distance routes, and comfortable journeys.",
          drivers: "Professional drivers with years of experience on Guwahati–Shillong, Cherrapunji, Dawki, Kaziranga, and other Meghalaya routes."
        };
      case 'ertiga_cab':
        return {
          spacious: "Modern MPV design with flexible seating and reliable performance for family trips.",
          drivers: "Skilled drivers experienced in both city and outstation routes with family-friendly service."
        };
      case 'creta_cab':
        return {
          spacious: "Stylish SUV with premium interiors and dependable performance for comfortable journeys.",
          drivers: "Professional drivers with expertise in luxury vehicle handling and customer service."
        };
      default:
        return {
          spacious: "Well-maintained vehicles with ample space and reliable performance for comfortable travel.",
          drivers: "Professional drivers with extensive knowledge of Northeast routes and local attractions."
        };
    }
  };

  const featureDescriptions = getFeatureDescriptions(service.id);

  const getInclusions = (serviceId: string) => {
    if (serviceId === 'tempo_traveller') {
      return [
        "Vehicle charges included",
        "Driver charges included",
        "Fuel costs included",
        "Driver food & lodging included",
        "Pick-up from Guwahati Airport, Railway Station, or hotels",
        "Sanitized and road-ready Tempo Traveller"
      ];
    }
    if (serviceId === 'force_urbania') {
      return [
        "Car rental charges included",
        "Driver charges included",
        "Comfortable seating for 17 passengers",
        "Ample storage space for group luggage",
        "Fuel included",
        "Driver food & lodging covered",
        "Fully air-conditioned interiors",
        "Entertainment system for long road trips"
      ];
    }
    if (serviceId === 'ertiga_cab') {
      return [
        "Car rental charges included",
        "Driver charges included",
        "Fuel included",
        "Driver food & lodging covered",
        "Clean, sanitized vehicle ready for trips",
        "Airport, railway, and hotel pick-up in Guwahati available"
      ];
    }
    if (serviceId === 'creta_cab') {
      return [
        "Car rental charges included",
        "Driver charges included",
        "Fuel included",
        "Driver food & lodging included",
        "Clean, sanitized vehicle",
        "Airport, railway, and hotel pick-up available in Guwahati"
      ];
    }
    return service.features;
  };

  const getFAQs = (serviceId: string) => {
    switch (serviceId) {
      case 'city_cab':
        return [
          {
            question: "Is City Cab suitable for short trips within Guwahati?",
            answer: "Yes, City Cab is perfect for local trips, shopping, office commutes, and short-distance travel within Guwahati city."
          },
          {
            question: "What are the charges for City Cab rental?",
            answer: "City Cab charges are based on distance and time. We offer competitive rates with transparent pricing and no hidden costs."
          },
          {
            question: "Can I book City Cab for hourly rentals?",
            answer: "Yes, we offer flexible hourly rental packages for City Cab, perfect for multiple stops and waiting time."
          },
          {
            question: "Is City Cab available for airport transfers?",
            answer: "Absolutely! City Cab provides reliable airport pickup and drop services from Guwahati Airport to any location in the city."
          }
        ];
      case 'innova_cab':
        return [
          {
            question: "Is Innova suitable for long-distance travel to Meghalaya?",
            answer: "Yes, Innova is ideal for interstate travel with superior comfort, ample space, and reliable performance for Guwahati-Meghalaya routes."
          },
          {
            question: "How many people can comfortably travel in Innova?",
            answer: "Innova comfortably seats 7 passengers with excellent legroom and luggage space, perfect for family trips and group travel."
          },
          {
            question: "Are mountain routes safe with Innova?",
            answer: "Yes, our Innova vehicles are well-maintained with experienced drivers who specialize in mountain driving and Northeast terrain."
          },
          {
            question: "What's included in Innova rental package?",
            answer: "Innova rental includes fuel, driver charges, driver accommodation, toll taxes, and comprehensive insurance coverage."
          }
        ];
      case 'tempo_traveller':
        return [
          {
            question: "How many people can travel in your Tempo Traveller?",
            answer: "Our Tempo Travellers can accommodate 11 to 25 passengers comfortably."
          },
          {
            question: "Can I book a Tempo Traveller for Guwahati to Shillong and Dawki?",
            answer: "Yes, Tempo Travellers are available for all Meghalaya trips including Shillong, Cherrapunji, Dawki, Mawlynnong, and Kaziranga."
          },
          {
            question: "Are fuel and driver charges included in the rental?",
            answer: "Yes, the daily rental includes fuel, driver charges, and driver lodging."
          },
          {
            question: "Do you provide airport or railway pick-up in Guwahati?",
            answer: "Yes, we offer pick-up and drop from Guwahati Airport, Railway Station, or your hotel."
          }
        ];
      case 'force_urbania':
        return [
          {
            question: "How many people can travel in the Force Urbania 17 Seater?",
            answer: "It can comfortably seat up to 17 passengers, making it ideal for group trips."
          },
          {
            question: "Can I book the Urbania for a Guwahati to Shillong and Cherrapunji tour?",
            answer: "Yes, the Urbania is available for all Meghalaya routes including Shillong, Cherrapunji, Dawki, Mawlynnong, and Kaziranga."
          },
          {
            question: "Are fuel and driver expenses included in the rental price?",
            answer: "Yes, fuel, driver charges, and driver lodging are all included in the package."
          },
          {
            question: "Does the vehicle have AC and entertainment features?",
            answer: "Yes, the Urbania comes with full air-conditioning and an entertainment system for a comfortable group travel experience."
          }
        ];
      case 'ertiga_cab':
        return [
          {
            question: "How many passengers can travel in the Ertiga?",
            answer: "Up to 7 passengers can travel comfortably, with enough luggage space for long trips."
          },
          {
            question: "Can I book the Ertiga for a Guwahati to Shillong tour?",
            answer: "Yes, our Ertiga rentals are available for Guwahati to Shillong, Cherrapunji, Dawki, Kaziranga, and other Meghalaya destinations."
          },
          {
            question: "Are fuel and driver charges included in the rental price?",
            answer: "Yes, the price includes fuel, driver charges, and driver lodging."
          },
          {
            question: "Do you offer Guwahati airport and railway station pick-up?",
            answer: "Yes, we provide convenient pick-up and drop-off from Guwahati Airport, Railway Station, and city hotels."
          }
        ];
      case 'force_urbania':
        return [
          {
            question: "How many people can travel in the Force Urbania 17 Seater?",
            answer: "It can comfortably seat up to 17 passengers, making it ideal for group trips."
          },
          {
            question: "Can I book the Urbania for a Guwahati to Shillong and Cherrapunji tour?",
            answer: "Yes, the Urbania is available for all Meghalaya routes including Shillong, Cherrapunji, Dawki, Mawlynnong, and Kaziranga."
          },
          {
            question: "Are fuel and driver expenses included in the rental price?",
            answer: "Yes, fuel, driver charges, and driver lodging are all included in the package."
          },
          {
            question: "Does the vehicle have AC and entertainment features?",
            answer: "Yes, the Urbania comes with full air-conditioning and an entertainment system for a comfortable group travel experience."
          }
        ];
      case 'creta_cab':
        return [
          {
            question: "How many passengers can travel in the Creta?",
            answer: "The Creta can seat up to 5 passengers comfortably."
          },
          {
            question: "Can I book a Creta for a Guwahati to Shillong trip?",
            answer: "Yes, the Creta is available for Guwahati to Shillong, Cherrapunji, Dawki, Kaziranga, and other destinations across Meghalaya."
          },
          {
            question: "Are fuel and driver charges included?",
            answer: "Yes, the daily rental price includes fuel, driver charges, and driver lodging."
          },
          {
            question: "Do you provide airport pick-up in Guwahati?",
            answer: "Yes, pick-up and drop-off services are available from Guwahati Airport, Railway Station, and city hotels."
          }
        ];
      default:
        return [
          {
            question: `Can I book a ${service.name} for a Guwahati to Shillong trip?`,
            answer: `Yes, ${service.name} rentals are available for Guwahati to Shillong and extended Meghalaya trips.`
          },
          {
            question: "Are fuel and driver charges included in the rental price?",
            answer: "Yes, fuel, driver charges, and even driver lodging are all included in the package."
          },
          {
            question: "Can I get pick-up from Guwahati Airport?",
            answer: "Yes, airport and railway station pick-up/drop services are available at no extra charge."
          },
          {
            question: "What places can I cover with this rental?",
            answer: "Popular routes include Guwahati–Shillong, Shillong–Cherrapunji, Dawki, Mawlynnong, Kaziranga, and other destinations across Meghalaya."
          }
        ];
    }
  };

  const features = service.id === 'tempo_traveller' ? [
    {
      icon: Users,
      title: "11–25 Seater Capacity",
      description: "Ideal for large families, office groups, school trips, or friends' tours. Comfortable seating for up to 25 passengers."
    },
    {
      icon: Luggage,
      title: "10 Bags Space",
      description: "Huge luggage capacity for long Meghalaya tours – perfect for carrying group travel bags and equipment."
    },
    {
      icon: Check,
      title: "Safe & Reliable Fleet",
      description: featureDescriptions.spacious
    },
    {
      icon: Star,
      title: "Local Expert Drivers",
      description: featureDescriptions.drivers
    }
  ] : service.id === 'force_urbania' ? [
    {
      icon: Users,
      title: "17 Seater Capacity",
      description: "Spacious seating for up to 17 passengers – ideal for family gatherings, office tours, or travel groups exploring Meghalaya together."
    },
    {
      icon: Shield,
      title: "Safety Features",
      description: "Equipped with ABS, airbags, and strong body construction to ensure a safe journey across hilly roads."
    },
    {
      icon: Fuel,
      title: "Fuel Efficient",
      description: "Powerful and reliable diesel engine designed for long journeys from Guwahati to Shillong, Cherrapunji, and beyond."
    }
  ] : service.id === 'ertiga_cab' ? [
    {
      icon: Users,
      title: "7 Seater Capacity",
      description: "Spacious seating for up to 7 passengers, ideal for family holidays or small group tours across Meghalaya."
    },
    {
      icon: Luggage,
      title: "6 Bags Space",
      description: "Generous luggage space to carry your essentials for road trips to Shillong, Cherrapunji, or Dawki."
    },
    {
      icon: DollarSign,
      title: "Budget-Friendly Comfort",
      description: "Perfect balance of affordability and comfort, making it a popular choice for Guwahati to Meghalaya road trips."
    },
    {
      icon: Star,
      title: "Trusted Local Drivers",
      description: "Experienced drivers familiar with Guwahati, Shillong, Cherrapunji, Dawki, and Kaziranga routes."
    }
  ] : service.id === 'creta_cab' ? [
    {
      icon: Users,
      title: "5 Seater Capacity",
      description: "Spacious seating for up to 5 passengers, ideal for family getaways or business trips."
    },
    {
      icon: Luggage,
      title: "4 Bags Space",
      description: "Ample luggage room for essentials, shopping, or Meghalaya travel gear."
    },
    {
      icon: Car,
      title: "SUV Comfort",
      description: "Smooth ride, premium interiors, air-conditioned comfort for long drives."
    },
    {
      icon: Star,
      title: "Experienced Drivers",
      description: "Professional, local drivers familiar with Guwahati and Meghalaya routes including Shillong, Cherrapunji, Dawki, and Kaziranga."
    }
  ] : service.id === 'innova_cab' ? [
    {
      icon: Users,
      title: "7 Seater Capacity",
      description: "Comfortable seating for up to 7 passengers, making it perfect for large families or group trips from Guwahati to Meghalaya."
    },
    {
      icon: Luggage,
      title: "6 Bags Space",
      description: "Extra luggage space to carry bags for your Shillong holiday, Cherrapunji adventure, or Kaziranga safari."
    },
    {
      icon: Check,
      title: "Spacious & Reliable",
      description: "Toyota Innova – trusted for long routes, hilly terrain, and smooth highway journeys."
    },
    {
      icon: Star,
      title: "Experienced Local Drivers",
      description: "Travel with drivers who know every route across Guwahati, Shillong, Dawki, Cherrapunji, and Kaziranga."
    }
  ] : [
    {
      icon: Users,
      title: `${service.seats} Seater Capacity`,
      description: `Comfortable seating for up to ${service.seats} passengers, making it perfect for large families or group trips from Guwahati to Meghalaya.`
    },
    {
      icon: Luggage,
      title: `${service.bags} Bags Space`,
      description: "Extra luggage space to carry bags for your Shillong holiday, Cherrapunji adventure, or Kaziranga safari."
    },
    {
      icon: Check,
      title: "Spacious & Reliable",
      description: featureDescriptions.spacious
    },
    {
      icon: Star,
      title: "Experienced Local Drivers",
      description: featureDescriptions.drivers
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
              {service.id === 'tempo_traveller' ? (
                "Planning a Meghalaya trip with family, friends, or colleagues? Our spacious Tempo Travellers are the best choice for group tours from Guwahati to Shillong, Cherrapunji, Dawki, Kaziranga, and more. Travel comfortably with experienced drivers, clean interiors, and ample luggage space."
              ) : service.id === 'force_urbania' ? (
                "Travel together in style with the premium Force Urbania 17-seater, designed for larger groups heading from Guwahati to Shillong, Cherrapunji, Dawki, Kaziranga, and other Meghalaya destinations. With modern interiors, powerful performance, and reliable drivers, this is the perfect choice for corporate outings, family holidays, and group tours."
              ) : service.id === 'ertiga_cab' ? (
                "Enjoy a smooth and affordable ride with our 7-seater Ertiga rentals, perfect for families and small groups traveling from Guwahati to Shillong, Cherrapunji, Dawki, Kaziranga, and other Meghalaya destinations. Well-maintained vehicles with professional drivers ensure your journey is safe and comfortable."
              ) : service.id === 'creta_cab' ? (
                "Choose the Hyundai Creta for your next Meghalaya trip. A stylish 5-seater SUV that combines comfort, space, and performance, perfect for road journeys from Guwahati to Shillong, Cherrapunji, Dawki, Kaziranga, and beyond. With expert drivers and well-maintained vehicles, your travel is always safe and enjoyable."
              ) : (
                `Rent ${service.name} from Guwahati to Shillong, Cherrapunji, Dawki, Kaziranga, and across Meghalaya. Spacious ${service.seats}-seater with luggage space, fuel included, professional drivers. Book Innova car rental now via WhatsApp or call.`
              )}

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
              {getInclusions(service.id).map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
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
              Ready to Book Your {service.name}?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-4xl mx-auto leading-relaxed">
              {service.id === 'city_cab' ? (
                "Planning a Guwahati to Meghalaya trip? Whether it's a weekend getaway to Shillong, exploring waterfalls in Cherrapunji, river boating in Dawki, or a Kaziranga safari, we've got the perfect rental car for you."
              ) : service.id === 'innova_cab' ? (
                "Travel in comfort with our premium Innova rentals, ideal for family holidays, group tours, and business travel across Northeast India. Start from Guwahati and explore Shillong, Cherrapunji, Dawki, Mawlynnong, or Kaziranga with professional drivers and well-maintained vehicles."
              ) : service.id === 'tempo_traveller' ? (
                "Planning a Meghalaya trip with family, friends, or colleagues? Our spacious Tempo Travellers are the best choice for group tours from Guwahati to Shillong, Cherrapunji, Dawki, Kaziranga, and more. Travel comfortably with experienced drivers, clean interiors, and ample luggage space."
              ) : service.id === 'ertiga_cab' ? (
                "From a relaxing Shillong holiday to an adventure-filled Cherrapunji trip, a Dawki river journey, or a Kaziranga safari – the Ertiga is the perfect choice for small families and groups looking for an affordable yet comfortable ride."
              ) : service.id === 'creta_cab' ? (
                "Whether you're heading for a Shillong weekend, exploring Cherrapunji's waterfalls, boating in Dawki's crystal waters, or enjoying a safari in Kaziranga, our Creta SUV is the perfect balance of affordability and premium comfort."
              ) : (
                "Contact us now for the best rates and availability"
              )}<br /><br />
              Contact us now for availability and the best rates.
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
            {getFAQs(service.id).map((faq, index) => (
              <CityFAQItem 
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;