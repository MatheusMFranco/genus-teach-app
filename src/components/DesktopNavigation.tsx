import React from 'react';

import { NavigationMenu } from './NavigationMenu';
import type { DesktopNavigationProps } from '../types/navigation';

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ items }) => {
  return (
    <nav className="hidden md:flex space-x-8">
      <NavigationMenu items={items} />
    </nav>
  );
};
