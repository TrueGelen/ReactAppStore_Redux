/* libs */
import { takeEvery, put, call, delay } from 'redux-saga/effects'
/* actionTypes */
import {
  GET_TABLETS_REQUEST,
  GET_TABLET_REQUEST,
  TABLETS_SET_PRICE_RANGE_SUCCESS
} from '../actionTypes'
/* api */
import { getTablets, getTabletById } from '../../serverApiModel/tablets'
/* actionCreators */
import {
  getTabletsSuccess,
  getTabletsFail,
  getTabletSuccess,
  getTabletFail,
  tabletsSetFiltersSuccess,
  tabletsFilterSuccess,
  errorShow,
  errorHide
} from '../actionCreators'
/* store */
import store from '../store'

export function* tabletsSagaWatcher() {
  yield takeEvery(GET_TABLETS_REQUEST, getTabletsFromServerSagaWorker)
  yield takeEvery(GET_TABLET_REQUEST, getTabletFromServerSagaWorker)
  yield takeEvery(TABLETS_SET_PRICE_RANGE_SUCCESS, tabletsSetPriceRangeSagaWorker)
}

function* getTabletsFromServerSagaWorker() {
  // yield console.log("getTabletsFromServerSagaWorker")
  try {
    const products = yield call(getTablets)
    yield put(getTabletsSuccess(products))
    yield put(tabletsSetFiltersSuccess(store.getState().tablets))
  } catch (error) {
    yield put(getTabletsFail())
    yield put(errorShow("Не удалось получить данные с сервера ;("))
    yield delay(5000)
    if (store.getState().errStore.isError)
      yield put(errorHide())
  }
}

function* getTabletFromServerSagaWorker(action) {
  try {
    const product = yield call(getTabletById, action.payload)
    yield put(getTabletSuccess(product))
  } catch (error) {
    yield put(getTabletFail())
    yield put(errorShow("Не удалось получить данные с сервера ;("))
    yield delay(5000)
    if (store.getState().errStore.isError)
      yield put(errorHide())
  }
}

function* tabletsSetPriceRangeSagaWorker() {
  // console.log("setPriceRangeSagaWorker", store.getState().televisions)
  yield put(tabletsFilterSuccess(store.getState().tablets))
}