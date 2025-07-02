import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from './TodoList';
import userEvent from '@testing-library/user-event';

describe('TodoList Test', () => {
    test('should create a TodoList component', () => {
        render(<TodoList />);
        expect(screen.getByText(/To Do List!/i)).toBeInTheDocument();
    });

    test('should show a empty message when list is empty', () => {
        render(<TodoList />);
        expect(screen.getByText(/The list is empty!/i)).toBeInTheDocument();
    });

    test('should show a form with name of item and the button to add the item in the list', () => {
        render(<TodoList />);
        expect(screen.getByTestId('add-button')).toBeInTheDocument();
        expect(screen.getByTestId('name-input')).toBeInTheDocument();
    });
    
    test('should add item to the list when write a name and click in the add button', () => {
        render(<TodoList />);
        const input = screen.getByTestId('name-input');
        const addButton = screen.getByTestId('add-button');
        userEvent.type(input, 'James Bond');
        expect(input).toHaveValue('James Bond');
        userEvent.click(addButton);
        const removebutton = screen.getByTestId('remove-button-0');
        expect(screen.getByText(/James Bond/i)).toBeInTheDocument();
        expect(removebutton).toBeInTheDocument();
        expect(input).toHaveValue('');
        expect(screen.queryByText(/The list is empty!/i)).not.toBeInTheDocument();
    });

    test('should remove item to the list when click in the remove button', () => {
        render(<TodoList />);
        const input = screen.getByTestId('name-input');
        const addButton = screen.getByTestId('add-button');
        userEvent.type(input, 'James Bond');
        userEvent.click(addButton);
        const removebutton = screen.getByTestId('remove-button-0');
        userEvent.click(removebutton);
        expect(screen.getByText(/The list is empty!/i)).toBeInTheDocument();
    });
});