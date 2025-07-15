import React from 'react';
import { NavigationMenu } from './NavigationMenu';
import type { MobileNavigationProps } from '../types/navigation';

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  items, 
  isOpen, 
  onLinkClick 
}) => {
  if (!isOpen) return null;

  return (
    <nav className="md:hidden py-4 border-t border-gray-200">
      <div className="flex flex-col space-y-2">
        <NavigationMenu 
          items={items} 
          isMobile={true} 
          onLinkClick={onLinkClick} 
        />
      </div>
    </nav>
  );
};
