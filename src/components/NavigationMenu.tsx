import React from 'react';
import { Link } from 'react-router-dom';

import type { NavigationMenuProps } from '../types/navigation';

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ 
  items, 
  isMobile = false, 
  onLinkClick 
}) => {
  const baseClasses = "text-gray-700 hover:text-primary-600 transition-colors";
  const desktopClasses = baseClasses;
  const mobileClasses = `${baseClasses} py-2`;

  return (
    <>
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={isMobile ? mobileClasses : desktopClasses}
          onClick={onLinkClick}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
};
