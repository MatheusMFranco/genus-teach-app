import React from 'react';
import { Menu, X } from 'lucide-react';
import type { MobileMenuToggleProps } from '../types/navigation';

export const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({ 
  isOpen, 
  onToggle 
}) => {
  return (
    <button
      className="md:hidden"
      onClick={onToggle}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      {isOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <Menu className="h-6 w-6" />
      )}
    </button>
  );
};
