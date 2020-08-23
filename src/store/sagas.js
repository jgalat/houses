import { all, call, delay, put, select, takeLatest } from 'redux-saga/effects';

import fetchApi from '../api';
import actions, { storeHouses, fetchHouses, retry } from './actions';

function* fetchHousesSaga() {
  try {
    const currPage = yield select(state => state.currPage);
    const { data } = yield call(fetchApi, currPage + 1);
    if (data.ok) {
      yield put(storeHouses(data.houses));
    }
  } catch (e) {
    yield put(retry());
    const retryNumber = yield select(state => state.retry);
    yield delay(2 ** retryNumber * 1000);
    yield put(fetchHouses());
  }
}

function* watchFetchHousesSaga() {
  yield takeLatest(actions.FETCH_HOUSES, fetchHousesSaga);
}

export default function* rootSaga() {
  yield all([watchFetchHousesSaga()]);
}
