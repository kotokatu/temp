import { SpyInstance, afterEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ItemCard from '../../../components/item-card';
import { Context } from '../../../components/contexts';
import { characterTransform, context } from '../../mocks';

const { name, gender, race, birth } = characterTransform;

describe('Tests for the Card component', () => {
  test('Ensure that the card component renders the relevant card data', () => {
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

  test('Check that clicking triggers setId with current id card', async () => {
    afterEach((): void => {
      vi.restoreAllMocks();
    });
    const spy: SpyInstance<[value: React.SetStateAction<string>], void> =
      vi.spyOn(context, 'setId');
    render(
      <Context.Provider value={context}>
        <ItemCard character={characterTransform} />
      </Context.Provider>
    );

    await userEvent.click(screen.getByTestId('item-card'));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(characterTransform._id);
  });
});
