import React, { ReactNode, useState } from 'react';
import { Theme } from './Theme.type';
import { ThemeContext } from './ThemeContext';

const ThemeProvider = ({ children }: {children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('light');

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    }

    return (
        <ThemeContext.Provider value={ {theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
