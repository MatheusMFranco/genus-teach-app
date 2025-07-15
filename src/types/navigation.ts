export interface NavigationItem {
  to: string;
  label: string;
}

export interface NavigationMenuProps {
  items: NavigationItem[];
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export interface DesktopNavigationProps {
  items: NavigationItem[];
}

export interface MobileNavigationProps {
  items: NavigationItem[];
  isOpen: boolean;
  onLinkClick: () => void;
}

export interface MobileMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}
