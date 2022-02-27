import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders list component', () => {
  render(<App />);
  const linkElement = screen.getByText(/Todo/i);
  expect(linkElement).toBeInTheDocument();
});
