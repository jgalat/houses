import React from 'react';
import { render } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer, {
  initialState as originalInitialState,
} from '../store/reducers';

export default function(ui, { initialState = originalInitialState } = {}) {
  let actions = [];
  const observerMiddleware = () => next => action => {
    actions = [...actions, action];
    return next(action);
  };
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(observerMiddleware)
  );
  const utils = {
    dispatch(action) {
      return store.dispatch(action);
    },
    getDispatchedActions() {
      return actions;
    },
    getState() {
      return store.getState();
    },
  };
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    ...utils,
  };
}
