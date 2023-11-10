import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorButton from '../../components/error-button';

describe('ErrorButton test', () => {
  test('Should show ErrorButton', () => {
    render(<ErrorButton />);

    expect(screen.getByText(/Throw Error/i)).toBeDefined();
  });
});
