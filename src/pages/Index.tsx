import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ServiceCard } from '@/components/ServiceCard';
import { TourCard } from '@/components/TourCard';
import { ContactSection } from '@/components/ContactSection';
import FloatingActions from '@/components/FloatingActions';
import FAQSection from '@/components/FAQSection';
import servicesData from '@/data/services.json';
import featuresJson from '@/data/features.json';

const Index = () => {
  const [data, setData] = useState(servicesData);
  const [showAllTours, setShowAllTours] = useState(false);

  useEffect(() => {
    setData(servicesData);
  }, []);

  // ✅ Move FAQ data here (passed as props)
  const faqData = [
    {
      category: "1. Booking a Cab",
      questions: [
        {
          question: "How do I book a city cab?",
          answer:
            "",
        },
        {
          question: "How do I book an outstation cab?",
          answer:
            "",
        },
        {
          question: "How do I book a tour package?",
          answer:
            "",
        },
        {
          question: "Can I schedule a ride in advance?",
          answer:
            " Yes, you can schedule a ride in advance through our app or website. Just select your preferred date and time during the booking process.",
        },
      ],
    },
    {
      category: "2. Payments and Pricing",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer:
            "",
        },
        {
          question: "Are prices fixed or metered?",
          answer:
            "",
        },
        {
          question: "Do you charge extra for waiting time?",
          answer:
            "",
        },
        {
          question: "Is there a peak hour surcharge?",
          answer:
            "Yes. A small surcharge may apply during high-demand periods such as rush hours or special events. The exact fare will be shown before you confirm your booking.",
        },
      ],
    },
    {
      category: "3. Safety and Service",
      questions: [
        {
          question: "Are your drivers verified?",
          answer:
            "",
        },
        {
          question: "Do your cabs have GPS tracking?",
          answer:
            "",
        },
        {
          question: "What should I do if I leave something in the cab?",
          answer:
            "",
        },
        {
          question: "Do you offer 24/7 service?",
          answer:
            "",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero 
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        description={data.hero.description}
        ctaButtons={data.hero.ctaButtons}
      />

      {/* City Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {data.cityServices.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {data.cityServices.subtitle}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.cityServices.services.map((service) => (
              <ServiceCard
                key={service.id}
                {...service}
                className="animate-fade-in hover:shadow-2xl"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Outstation Cab Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Outstation Cab
            </h2>
            <p className="text-xl text-white/90 max-w-4xl mx-auto mb-10 leading-relaxed">
              Planning for Meghalaya Arunachal Nagaland Assam Outstation holidays?<br />
              Contact us for rates and a complimentary itinerary assistance.
            </p>
            <a
              href={`https://wa.me/919394939500?text=${encodeURIComponent("Hi Team, I am interested for Outstation Cab")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 border-2 border-white text-lg font-bold rounded-lg text-white bg-transparent hover:bg-white hover:text-orange-600 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Book Now
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" id='features'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Orange Cabs?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our premium service
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuresJson.map((feature, idx) => (
              <div key={idx} className="text-center animate-fade-in group">
                <div className="mx-auto mb-6 w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 max-w-xs mx-auto leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section id="tours" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Popular Outstation Tours
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore the beautiful Northeast India
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(showAllTours 
              ? data.outstationServices.tours 
              : data.outstationServices.tours.slice(0, 3)
            ).map((tour) => (
              <TourCard key={tour.id} {...tour} className="animate-fade-in" />
            ))}
          </div>
          
          {data.outstationServices.tours.length > 3 && (
            <div className="text-center mt-12">
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500 hover:border-orange-600 px-8 py-3 font-semibold transition-all duration-300 hover:scale-105"
                onClick={() => setShowAllTours(!showAllTours)}
              >
                {showAllTours ? "Show Less ↑" : "View All →"}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection {...data.contact} />

      {/* FAQ Section (now reusable) */}
      <FAQSection faqData={faqData} />

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:justify-between gap-10">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-orange-500">Orange</span>
              <span className="text-white">Cab</span>
            </h3>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              Delivering safe, reliable, and premium cab services across Guwahati and the Northeast. 
              From city rides to curated outstation tours, we make every journey comfortable and hassle-free.
            </p>
            <h4 className="text-sm font-semibold mb-3">Follow Us</h4>
            <div className="flex space-x-4 text-lg">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-12 md:gap-16">
            <div>
              <h4 className="text-lg font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#about" className="hover:text-orange-500">Our Story</a></li>
                <li><a href="#services" className="hover:text-orange-500">Services</a></li>
                <li><a href="#fleet" className="hover:text-orange-500">Fleet</a></li>
                <li><a href="#tours" className="hover:text-orange-500">Tours</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Bookings</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#cab" className="hover:text-orange-500">City Cab Booking</a></li>
                <li><a href="#outstation" className="hover:text-orange-500">Outstation Cab Booking</a></li>
                <li><a href="#tours" className="hover:text-orange-500">Tour Packages</a></li>
                <li><a href="#faq" className="hover:text-orange-500">Finance FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/contact" className="hover:text-orange-500">Contact Us</a></li>
                <li><Link to="/terms-and-conditions" className="hover:text-orange-500">Terms & Conditions</Link></li>
                <li><a href="/privacy-policy" className="hover:text-orange-500">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          © 2025 Orange Cab. All rights reserved.
        </div>
      </footer>

      <FloatingActions />
    </div>
  );
};

export default Index;
