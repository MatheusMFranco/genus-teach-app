import { act, render, screen } from '@testing-library/react';
import React from 'react';
import TheNextMarvelMovie from './TheNextMarvelMovie';

describe('The Next Marvel Movie Component Test', () => {

    const mock = {
        days_until: 21,
        following_production: {
            days_until: 534,
            id: 1003596,
            overview: "The Avengers, Wakandans, Fantastic Four, Thunderbolts, and X-Men all fight against Doctor Doom. Plot TBA.",
            poster_url: "https://image.tmdb.org/t/p/w500/6eB2oh1SplddsZYCdayrIdrIGLd.jpg",
            release_date: "2026-12-18",
            title: "Avengers: Doomsday",
            type: "Movie"
        },
        id: 617126,
        overview: "Against the vibrant backdrop of a 1960s-inspired, retro-futuristic world, Marvel's First Family is forced to balance their roles as heroes with the strength of their family bond, while defending Earth from a ravenous space god called Galactus and his enigmatic Herald, Silver Surfer.",
        poster_url: "https://image.tmdb.org/t/p/w500/x26MtUlwtWD26d0G0FXcppxCJio.jpg",
        release_date: "2025-07-23",
        title: "The Fantastic Four: First Steps",
        type: "Movie"
    };

    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should The Next Marvel Movie component exist', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ json: async () => mock });
        await act(async () =>render(<TheNextMarvelMovie />));
        expect(screen.getByText(/The Next Marvel Movie:/i)).toBeInTheDocument();
    });

    test('should load the api content', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ json: async () => mock });
        await act(async () =>render(<TheNextMarvelMovie />));
        expect(await screen.findByText(/The Fantastic Four: First Steps/i)).toBeInTheDocument();
    });

    test('should render movie cover', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ json: async () => mock });
        await act(async () => render(<TheNextMarvelMovie />));
        const cover = await screen.findByTestId('cover');
        expect(cover).toBeInTheDocument();
        expect(cover.getAttribute('src')).toBe('https://image.tmdb.org/t/p/w500/x26MtUlwtWD26d0G0FXcppxCJio.jpg');
        expect(cover.getAttribute('alt')).toBe('The Fantastic Four: First Steps cover');
    });

});