
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../src/components/Home';

describe('Home', () => {
    test('renders without crashing', () => {
        render(<Home />);
    });

    test('matches snapshot', () => {
        const { container } = render(<Home />);
        expect(container).toMatchSnapshot();
    });
});
