import { render, screen } from '@testing-library/react';
import React from 'react';
import Counter from './Counter';
import userEvent from '@testing-library/user-event';

describe('Counter Component Test', () => {
    test('should Counter componet exists', () => {
        render(<Counter />);
    });

    test('should show initial value as 0 and just the increment button', () => {
        render(<Counter />);
        const incrementButton = screen.getByTestId('increment-button');
        const decrementButton = screen.queryByTestId('decrement-button');
        const numberValue = screen.getByTestId('number-value');
        expect(incrementButton).toBeInTheDocument();
        expect(decrementButton).not.toBeInTheDocument();
        expect(numberValue).toBeInTheDocument();
        expect(numberValue.textContent).toBe('0');
    });

    test('should increment the number value when click in increment button', () => {
        render(<Counter />);
        const incrementButton = screen.getByTestId('increment-button');
        const numberValue = screen.getByTestId('number-value');
        expect(numberValue.textContent).toBe('0');
        userEvent.click(incrementButton);
        expect(numberValue.textContent).toBe('1');
    });

    test('should decrement the number value when click in decrement button', () => {
        render(<Counter />);
        const incrementButton = screen.getByTestId('increment-button');
        const numberValue = screen.getByTestId('number-value');
        userEvent.click(incrementButton);
        userEvent.click(incrementButton);
        userEvent.click(incrementButton);
        expect(numberValue.textContent).toBe('3');
        const decrementButton = screen.getByTestId('decrement-button');
        userEvent.click(decrementButton);
        expect(numberValue.textContent).toBe('2');
    });

})