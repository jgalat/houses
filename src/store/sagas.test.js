import { runSaga } from 'redux-saga';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import * as api from '../api';
import { fetchHousesSaga } from './sagas';
import { initialState } from './reducers';
import { storeHouses, fetchHouses, retry } from './actions';

let error = false;
const server = setupServer(
  rest.get(api.URL, (_, res, ctx) => {
    return error
      ? res(ctx.status(503), ctx.json({ ok: false }))
      : res(ctx.status(200), ctx.json({ ok: true, houses: ['house'] }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const fetchSpy = jest.spyOn(api, 'fetchApi');
beforeEach(() => jest.clearAllMocks());

test('calls the api requesting the second page and stores the result', async () => {
  let dispatched = [];

  await runSaga(
    {
      dispatch: action => (dispatched = [...dispatched, action]),
      getState: () => ({ ...initialState, currPage: 1 }),
    },
    fetchHousesSaga
  ).toPromise();

  expect(fetchSpy).toHaveBeenCalled();
  expect(fetchSpy).toHaveBeenCalledWith(2);
  expect(dispatched).toEqual([storeHouses(['house'])]);
});

test('calls the api, fails and retries', async () => {
  error = true;
  let dispatched = [];
  await runSaga(
    {
      dispatch: action => (dispatched = [...dispatched, action]),
      getState: () => initialState,
    },
    fetchHousesSaga
  ).toPromise();

  expect(fetchSpy).toHaveBeenCalled();
  expect(dispatched).toEqual([retry(), fetchHouses()]);
});
