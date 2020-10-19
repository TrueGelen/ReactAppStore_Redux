/* libs */
import { takeEvery, put, call, all } from 'redux-saga/effects'
/* actionTypes */
import {
  SET_PRICE_RANGE_SUCCESS
} from '../actionTypes'
/* api */
import { getTelevisions, getTvById } from '../../serverApiModel/televisions'
/* actionCreators */
import {
  getTelevisionsRequest,
  getTelevisionsSuccess,
  setFiltersRequest,
  setFiltersSuccess,
  filterRequest,
  filterSuccess
} from '../actionCreators'
/* store */
import store from '../store'

export function* getTVsFromServerSageWatcher() {
  yield takeEvery(getTelevisionsRequest().type, getTVsFromServerSagaWorker)
  yield takeEvery(SET_PRICE_RANGE_SUCCESS, setPriceRangeSagaWorker)
}

function* getTVsFromServerSagaWorker() {
  // yield console.log("getTVsFromServerSagaWorker")
  const tvs = yield call(getTelevisions)
  yield put(getTelevisionsSuccess(tvs))
  yield put(setFiltersSuccess(store.getState().televisions))
}

function* setPriceRangeSagaWorker() {
  // console.log("setPriceRangeSagaWorker", store.getState().televisions)
  yield put(filterSuccess(store.getState().televisions))
}
