import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
    // tests if the app can be rendered without crashing
    test('renders App component', () => {
        render(<App />);
    });
});
