import React from 'react';
import { render, screen } from '@testing-library/react';
import Light from './Light';
import { LightType } from './Light.type';
import userEvent from '@testing-library/user-event';
import Colors from '../Colors';

describe('Light Component Test', () => {
 
    const colors = Colors;
    const LIGHT_ID = 'light';
    const DISABLED_CLASS = 'off';

    test.each(colors)('should display the light color', (color: LightType) => {
        render(<Light isManual color={color} isOn={true} />);
        expect(screen.getByTestId(LIGHT_ID)).toBeInTheDocument();
    });

    test.each(colors)('should display the light color as gray', (color: LightType) => {
        render(<Light isManual color={color} />);
        const light = screen.getByTestId(LIGHT_ID);
        expect(light.classList?.contains(DISABLED_CLASS)).toBeTruthy();
        expect(light.classList?.contains(color)).toBeFalsy();
    });

    test.each(colors)('should display the light color by the color given', (color: LightType) => {
        render(<Light isManual color={color} isOn />);
        const light = screen.getByTestId(LIGHT_ID);
        expect(light.classList?.contains(color)).toBeTruthy();
        expect(light.classList?.contains(DISABLED_CLASS)).toBeFalsy();
    });

    test.each(colors)('should click on the light and this be on', color => {
        render(<Light isManual color={color} />);
        const light = screen.getByTestId(LIGHT_ID);
        userEvent.click(light);
        expect(light.classList?.contains(color)).toBeTruthy();
        expect(light.classList?.contains(DISABLED_CLASS)).toBeFalsy();
    });

    test.each(colors)('should click on the light when is on to be off', color => {
        render(<Light isManual color={color} isOn />);
        const light = screen.getByTestId(LIGHT_ID);
        userEvent.click(light);
        expect(light.classList?.contains(color)).toBeFalsy();
        expect(light.classList?.contains(DISABLED_CLASS)).toBeTruthy();
    });
});
