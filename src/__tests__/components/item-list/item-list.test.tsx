import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import ItemList from '../../../components/item-list';
import { Context } from '../../../components/contexts';
import { context, contextEmptyData } from '../../mocks';

describe('Tests for the Card List component', () => {
  test('Check that an appropriate message is displayed if no cards are present.', () => {
    render(
      <Context.Provider value={contextEmptyData}>
        <ItemList />
      </Context.Provider>
    );

    expect(
      screen.queryByText(/Oops. There is no such character in our database./i)
    ).toBeDefined();
  });
  test('Verify that the component renders the specified number of cards', async () => {
    render(
      <Context.Provider value={context}>
        <ItemList />
      </Context.Provider>
    );
    const items = await screen.findAllByTestId('item-card');
    expect(items.length).toBe(3);
  });
});
