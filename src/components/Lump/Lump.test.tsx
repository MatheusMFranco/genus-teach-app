import { render, screen } from '@testing-library/react';
import React from 'react';
import Lump from './Lump';
import ThemeProvider from './ThemeProvider';
import userEvent from '@testing-library/user-event';

describe('Lump Compontent', () => {
    test('shoud render the component', async() => {
        render(<ThemeProvider><Lump /></ThemeProvider>)
        const button = screen.getByRole('button', { name: /trocar tema/i });
        const heading = screen.getByRole('heading');

        expect(heading).toHaveTextContent(/o tema atual é: light/i);

        await userEvent.click(button);
        expect(heading).toHaveTextContent(/o tema atual é: dark/i);

        await userEvent.click(button);
        expect(heading).toHaveTextContent(/o tema atual é: light/i);
    })
});
