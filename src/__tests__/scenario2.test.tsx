import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('2#Check that an appropriate message is displayed if no cards are present.', async () => {
  render(<App />);
  expect(await screen.findByText('0 found')).toBeDefined();
});
