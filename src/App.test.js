import React from 'react';
import renderWithRedux from './test-utils/renderWithRedux';
import App from './App';
import testHouse from './test-utils/testHouse';

beforeAll(() => {
  class IntersectionObserver {
    observe = () => null;
    disconnect = () => null;
  }
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserver,
  });
  Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserver,
  });
});

test('renders a header', () => {
  const { getByText } = renderWithRedux(<App />);
  const header = getByText(/Houses/i);
  expect(header).toBeInTheDocument();
});

test('renders a child component for each house', () => {
  const houses = new Array(9)
    .fill(testHouse)
    .map((house, i) => ({ ...house, id: i }));
  const { getByTestId } = renderWithRedux(<App />, {
    initialState: { houses },
  });
  expect(getByTestId('grid').children).toHaveLength(9);
});
