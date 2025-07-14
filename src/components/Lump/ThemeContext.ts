import { createContext } from 'react';
import { Theme } from './Theme.type';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
