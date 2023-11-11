import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import ItemDetails from '../../../components/item-details';
import { Context } from '../../../components/contexts';
import { context } from '../../mocks';

const { birth, death, gender, hair, height, name, race, realm, spouse } =
  context.itemData[0];

describe('Tests for the Detailed Card component', () => {
  test('Make sure the detailed card component correctly displays the detailed card data', () => {
    render(
      <Context.Provider value={context}>
        <ItemDetails />
      </Context.Provider>
    );
    expect(screen.getByText(`${name}`)).toBeDefined();
    expect(screen.getByText(`Gender: ${gender}`)).toBeDefined();
    expect(screen.getByText(`Race: ${race}`)).toBeDefined();
    expect(screen.getByText(`Birth: ${birth}`)).toBeDefined();
    expect(screen.getByText(`Death: ${death}`)).toBeDefined();
    expect(screen.getByText(`Hair: ${hair}`)).toBeDefined();
    expect(screen.getByText(`Height: ${height}`)).toBeDefined();
    expect(screen.getByText(`Realm: ${realm}`)).toBeDefined();
    expect(screen.getByText(`Spouse: ${spouse}`)).toBeDefined();
    expect(screen.getByText(`More info`)).toBeDefined();
  });
});
