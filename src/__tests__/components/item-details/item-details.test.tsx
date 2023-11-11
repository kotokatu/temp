import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import ItemDetails from '../../../components/item-details';

describe('Tests for the Detailed Card component', () => {
  test('The detailed card component should return null when the ID is empty.', () => {
    render(<ItemDetails />);

    expect(screen.queryByTestId('section-right')).toBeNull();
  });
});
