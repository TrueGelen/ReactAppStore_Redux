/* libs */
import { takeEvery, put, call, all } from 'redux-saga/effects'
/* actionTypes */
import {

} from '../actionTypes'
/* api */
import { getProductById } from '../../serverApiModel/cart'
/* actionCreators */
import {
  getDetailedProductsRequest,
  getDetailedProductsSuccess
} from '../actionCreators'
/* store */
import store from '../store'

export function* cartSagaWatcher() {
  yield takeEvery(getDetailedProductsRequest().type, getDetailedProductsSagaWorker)
}

function* getDetailedProductsSagaWorker() {
  const cartProducts = store.getState().cart.products
  const products = {}
  for (let i = 0; i < Object.keys(cartProducts).length; i++) {
    let id = Object.keys(cartProducts)[i]
    let product = yield call(getProductById, id)
    products[id] = { ...product, ...cartProducts[id] }
  }
  yield put(getDetailedProductsSuccess(products))
}
