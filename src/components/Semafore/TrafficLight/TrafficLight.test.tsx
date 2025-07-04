import { act, render, screen } from '@testing-library/react';
import React from 'react';
import TrafficLight from './TrafficLight';

describe('Traffic Light Component Test', () => {

    const TRAFFIC_LIGHT_ID = 'traffic-light';
    test('should the traffic light exists', () => {
        render(<TrafficLight />);
        expect(screen.getByTestId(TRAFFIC_LIGHT_ID)).toBeInTheDocument(); 
    });

    test('should the traffic light displays three lights', () => {
        render(<TrafficLight />);
        const semafore = screen.getByTestId(TRAFFIC_LIGHT_ID);
        const lights = screen.getAllByTestId('light');
        expect(semafore.children).toHaveLength(3);
        expect(lights).toHaveLength(3);
    });

    test('should animate the lights one by one starting by red', () => {
        jest.useFakeTimers();
        render(<TrafficLight />);
        let lights = screen.getAllByTestId('light');
        expect(lights[0]).not.toHaveClass('off');
        expect(lights[1]).toHaveClass('off');
        expect(lights[2]).toHaveClass('off');
        act(() => jest.advanceTimersByTime(6000));
        lights = screen.getAllByTestId('light');
        expect(lights[0]).toHaveClass('off');
        expect(lights[1]).toHaveClass('off');
        expect(lights[2]).not.toHaveClass('off');
        act(() => jest.advanceTimersByTime(4000));
        expect(lights[0]).toHaveClass('off');
        expect(lights[1]).not.toHaveClass('off');
        expect(lights[2]).toHaveClass('off');
        act(() => jest.advanceTimersByTime(3000));
        expect(lights[0]).not.toHaveClass('off');
        expect(lights[1]).toHaveClass('off');
        expect(lights[2]).toHaveClass('off');
    });
});
