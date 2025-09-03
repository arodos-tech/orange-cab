import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  label: string;
  href: string;
  id: string;
}

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems: NavItem[] = [
    { label: "Home", href: "/", id: "home" },
    { label: "Cab Booking", href: "/", id: "services" },
    { label: "Services", href: "/", id: "services" },
    { label: "Our Fleet", href: "/", id: "features" },
    { label: "Tours", href: "/", id: "tours" },
    { label: "About Us", href: "/", id: "about" },
    { label: "Terms & Conditions", href: "/terms-and-conditions", id: "terms" },
  ];

  const handleCTA = () => {
    if (location.pathname !== "/") {
      // If on another page, go to home first then scroll to contact
      window.location.href = "/#contact";
    } else {
      // Scroll to contact section
      scrollToSection("contact");
    }
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (item: NavItem) => {
    if (item.id === "home" || item.id === "terms") {
      // Normal navigation
      window.location.href = item.href;
    } else {
      if (location.pathname !== "/") {
        // If on another page, go to home first then scroll
        window.location.href = `/#${item.id}`;
      } else {
        // Scroll directly
        scrollToSection(item.id);
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center text-2xl font-bold hover:scale-105 transition-transform duration-300">
            <span className="text-orange-500">Orange</span>
            <span className="text-white">Cab</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="text-sm font-medium text-white hover:text-orange-400 transition-all duration-300 relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <Button
              onClick={handleCTA}
              variant="default"
              className="flex items-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white gap-2 font-semibold px-6 transition-all duration-300 hover:scale-105 shadow-md"
            >
              <Phone className="w-4 h-4" />
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-1 bg-black/95 backdrop-blur-md p-6 rounded-lg border border-white/10 shadow-xl">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="block text-white hover:text-orange-400 transition-colors py-3 w-full text-left font-medium border-b border-white/10 last:border-b-0"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={handleCTA}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white mt-4 font-semibold"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
