const actions = {
  FETCH_HOUSES: 'FETCH_HOUSES',
  RETRY: 'RETRY',
  STORE_HOUSES: 'STORE_HOUSES',
};

export const fetchHouses = () => ({
  type: actions.FETCH_HOUSES,
});

export const retry = () => ({
  type: actions.RETRY,
});

export const storeHouses = houses => ({
  type: actions.STORE_HOUSES,
  payload: {
    houses,
  },
});

export { actions as default };
