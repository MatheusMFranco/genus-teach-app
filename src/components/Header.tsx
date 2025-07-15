import React from 'react';
import { Logo } from './Logo';
import { DesktopNavigation } from './DesktopNavigation';
import { MobileMenuToggle } from './MobileMenuToggle';
import { MobileNavigation } from './MobileNavigation';
import { navigationItems } from '../data/navigation';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleMobileLinkClick = () => setIsMenuOpen(false);
  const toggleMobileMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <DesktopNavigation items={navigationItems} />
          <MobileMenuToggle 
            isOpen={isMenuOpen} 
            onToggle={toggleMobileMenu} 
          />
        </div>
        <MobileNavigation 
          items={navigationItems}
          isOpen={isMenuOpen}
          onLinkClick={handleMobileLinkClick}
        />
      </div>
    </header>
  );
};
