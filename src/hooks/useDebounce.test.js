import { useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useDebounce from './useDebounce';

test('allows you to debounce a value', async () => {
  const { result, waitForValueToChange } = renderHook(() => {
    const [state, setState] = useState(false);
    const debouncedState = useDebounce(state, 100);
    return { state, setState, debouncedState };
  });

  expect(result.current.state).toBe(false);
  expect(result.current.debouncedState).toBe(false);

  act(() => {
    result.current.setState(true);
  });

  expect(result.current.state).toBe(true);
  expect(result.current.debouncedState).toBe(false);

  await waitForValueToChange(() => result.current.debouncedState, {
    interval: 100,
    timeout: 1000,
  });

  expect(result.current.debouncedState).toBe(true);
});
