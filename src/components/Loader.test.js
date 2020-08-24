import React from 'react';
import renderWithRedux from '../test-utils/renderWithRedux';
import Loader from './Loader';
jest.mock('../hooks/useIsIntersecting');
import useIsIntersecting from '../hooks/useIsIntersecting';
import { fetchHouses } from '../store/actions';

beforeEach(() => jest.clearAllMocks());

test('it does not dispatch an action when is not intersecting whether is loading or not', () => {
  useIsIntersecting.mockReturnValue(false);
  const { getDispatchedActions } = renderWithRedux(<Loader />, {
    initialState: { loading: false },
  });
  expect(getDispatchedActions()).toEqual([]);
});

test('it does NOT dispatch an action when is intersecting and is loading', () => {
  useIsIntersecting.mockReturnValue(true);
  const { getDispatchedActions } = renderWithRedux(<Loader />, {
    initialState: { loading: true },
  });
  expect(getDispatchedActions()).toEqual([]);
});

test('it does dispatch an action when is intersecting and is NOT loading', () => {
  useIsIntersecting.mockReturnValue(true);
  const { getDispatchedActions } = renderWithRedux(<Loader />, {
    initialState: { loading: false },
  });
  expect(getDispatchedActions()).toEqual([fetchHouses()]);
});

test('it displays the retry number', () => {
  useIsIntersecting.mockReturnValue(true);
  const { getByTestId } = renderWithRedux(<Loader />, {
    initialState: { retry: 2 },
  });
  expect(getByTestId('retry')).toHaveTextContent('Retry #2 in 4 seconds');
});

