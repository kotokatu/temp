import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import ItemCard from '../../../components/item-card';
import { Context } from '../../../components/contexts';
import { characterTransform, context } from '../../mocks';

const { name, gender, race, birth } = characterTransform;

describe('Tests for the Card component', () => {
  test('Ensure that the card component renders the relevant card data', async () => {
    render(
      <Context.Provider value={context}>
        <ItemCard character={characterTransform} />
      </Context.Provider>
    );
    expect(screen.getByText(`${name}`)).toBeDefined();
    expect(screen.getByText(`Gender: ${gender}`)).toBeDefined();
    expect(screen.getByText(`Race: ${race}`)).toBeDefined();
    expect(screen.getByText(`Birth: ${birth}`)).toBeDefined();
  });
});
