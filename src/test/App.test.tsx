import React from 'react';
import { render, queryByText, cleanup } from '@testing-library/react';
import App from '../App';

test('Check if AppBar exists', () => {
  
  const {getByText} = render(<App />)
  
  expect(getByText('Dashboard')).toBeInTheDocument();
  cleanup()
});

test('Check if AppBar renders', () => {
  const {getByTestId} = render(<App/>)

  expect(getByTestId('navbar')).toBeInTheDocument();
  cleanup();
})