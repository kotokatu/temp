import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('1#Verify that the component renders the specified number of cards;', async () => {
  render(<App />);
  expect(await screen.findByText('0 found')).toBeDefined();
});
