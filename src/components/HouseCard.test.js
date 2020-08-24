import React from 'react';
import { render } from '@testing-library/react';
import testHouse from '../test-utils/testHouse';
import HouseCard from './HouseCard';

/* toLocaleString doesn't behave the same in Jest as in the Browser,
 * that's why we cannot test the price formatting
 */

test('it render its props correctly', () => {
  const { getByTestId } = render(<HouseCard {...testHouse} />);

  const houseImg = getByTestId('house-img');

  expect(houseImg.src).toBe('http://an-invalid-url/');
  expect(houseImg.alt).toBe(
    'A house located at Some address valued at 1999999'
  );

  const address = getByTestId('address');
  expect(address).toHaveTextContent('Some address');
  expect(address.title).toBe('Some address');

  const price = getByTestId('price');
  expect(price).toHaveTextContent('1999999');

  const homeOwner = getByTestId('home-owner');
  expect(homeOwner).toHaveTextContent('Owner: An owner');
});
