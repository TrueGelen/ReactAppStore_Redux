/* libs */
import { takeEvery, put, call, all } from 'redux-saga/effects'
/* actionTypes */
import {

} from '../actionTypes'
/* api */
import { getProductById } from '../../serverApiModel/cart'
/* actionCreators */
import {
  addToCartRequest,
  addToCartSuccess
} from '../actionCreators'
/* store */
import store from '../store'

// export function* getTVsFromServerSageWatcher() {
//   yield takeEvery(getTelevisionsRequest().type, getTVsFromServerSagaWorker)
//   yield takeEvery(SET_PRICE_RANGE_SUCCESS, setPriceRangeSagaWorker)
// }

// function* getTVsFromServerSagaWorker() {
//   // yield console.log("getTVsFromServerSagaWorker")
//   const tvs = yield call(getTelevisions)
//   yield put(getTelevisionsSuccess(tvs))
//   yield put(setFiltersSuccess(store.getState().televisions))
// }

// function* setPriceRangeSagaWorker() {
//   // console.log("setPriceRangeSagaWorker", store.getState().televisions)
//   yield put(filterSuccess(store.getState().televisions))
// }
