/* libs */
import { takeEvery, put, call, delay } from 'redux-saga/effects'
/* actionTypes */
import {
  GET_PHONES_REQUEST,
  GET_PHONE_REQUEST,
  PHONES_SET_PRICE_RANGE_SUCCESS
} from '../actionTypes'
/* api */
import { getPhones, getPhoneById } from '../../serverApiModel/phones'
/* actionCreators */
import {
  getPhonesSuccess,
  getPhonesFail,
  getPhoneSuccess,
  getPhoneFail,
  phonesSetFiltersSuccess,
  phonesFilterSuccess,
  errorShow,
  errorHide
} from '../actionCreators'
/* store */
import store from '../store'

export function* phonesSagaWatcher() {
  yield takeEvery(GET_PHONES_REQUEST, getPhonesFromServerSagaWorker)
  yield takeEvery(GET_PHONE_REQUEST, getPhoneFromServerSagaWorker)
  yield takeEvery(PHONES_SET_PRICE_RANGE_SUCCESS, phonesSetPriceRangeSagaWorker)
}

function* getPhonesFromServerSagaWorker() {
  // yield console.log("getPhonesFromServerSagaWorker")
  try {
    const products = yield call(getPhones)
    yield put(getPhonesSuccess(products))
    yield put(phonesSetFiltersSuccess(store.getState().phones))
  } catch (error) {
    yield put(getPhonesFail())
    yield put(errorShow("Не удалось получить данные с сервера ;("))
    yield delay(5000)
    if (store.getState().errStore.isError)
      yield put(errorHide())
  }
}

function* getPhoneFromServerSagaWorker(action) {
  try {
    const product = yield call(getPhoneById, action.payload)
    yield put(getPhoneSuccess(product))
  } catch (error) {
    yield put(getPhoneFail())
    yield put(errorShow("Не удалось получить данные с сервера ;("))
    yield delay(5000)
    if (store.getState().errStore.isError)
      yield put(errorHide())
  }
}

function* phonesSetPriceRangeSagaWorker() {
  // console.log("setPriceRangeSagaWorker", store.getState().televisions)
  yield put(phonesFilterSuccess(store.getState().phones))
}