import React from 'react';
import { render } from '@testing-library/react';
import register from "./Register";
import App from './App';
import Register from "./Register";

describe('App', () => {
    test('renders App component', () => {
        render(<App />);
    });
});