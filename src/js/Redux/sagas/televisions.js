/* libs */
import { takeEvery, put, call, delay } from 'redux-saga/effects'
/* actionTypes */
import {
  GET_TELEVISIONS_REQUEST,
  GET_TELEVISION_REQUEST,
  SET_PRICE_RANGE_SUCCESS
} from '../actionTypes'
/* api */
import { getTelevisions, getTvById } from '../../serverApiModel/televisions'
/* actionCreators */
import {
  getTelevisionsSuccess,
  getTelevisionsFail,
  getTelevisionSuccess,
  getTelevisionFail,
  setFiltersSuccess,
  filterSuccess,
  errorShow,
  errorHide
} from '../actionCreators'
/* store */
import store from '../store'

export function* televisionsSagaWatcher() {
  yield takeEvery(GET_TELEVISIONS_REQUEST, getTVsFromServerSagaWorker)
  yield takeEvery(GET_TELEVISION_REQUEST, getTVFromServerSagaWorker)
  yield takeEvery(SET_PRICE_RANGE_SUCCESS, setPriceRangeSagaWorker)
}

function* getTVsFromServerSagaWorker() {
  // yield console.log("getTVsFromServerSagaWorker")
  try {
    const tvs = yield call(getTelevisions)
    yield put(getTelevisionsSuccess(tvs))
    yield put(setFiltersSuccess(store.getState().televisions))
  } catch (error) {
    yield put(getTelevisionsFail())
    yield put(errorShow("Не удалось получить данные с сервера ;("))
    yield delay(5000)
    if (store.getState().errStore.isError)
      yield put(errorHide())
  }
}

function* getTVFromServerSagaWorker(action) {
  try {
    const tv = yield call(getTvById, action.payload)
    yield put(getTelevisionSuccess(tv))
  } catch (error) {
    yield put(getTelevisionFail())
    yield put(errorShow("Не удалось получить данные с сервера ;("))
    yield delay(5000)
    if (store.getState().errStore.isError)
      yield put(errorHide())
  }
}

function* setPriceRangeSagaWorker() {
  // console.log("setPriceRangeSagaWorker", store.getState().televisions)
  yield put(filterSuccess(store.getState().televisions))
}