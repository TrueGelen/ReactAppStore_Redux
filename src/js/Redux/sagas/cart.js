/* libs */
import { takeEvery, put, call, all } from 'redux-saga/effects'
/* actionTypes */
import {
  GET_DETAILED_PRODUCTS_REQUEST
} from '../actionTypes'
/* api */
import { getProductById } from '../../serverApiModel/cart'
/* actionCreators */
import {
  getDetailedProductsSuccess,
  errorShow
} from '../actionCreators'
/* store */
import store from '../store'

export function* cartSagaWatcher() {
  yield takeEvery(GET_DETAILED_PRODUCTS_REQUEST, getDetailedProductsSagaWorker)
}

function* getDetailedProductsSagaWorker() {
  const cartProducts = store.getState().cart.products
  const products = {}
  // console.log("Object.keys(cartProducts)", Object.keys(cartProducts))
  try {
    for (let i = 0; i < Object.keys(cartProducts).length; i++) {
      // console.log("=============", i)
      let id = Object.keys(cartProducts)[i]
      // console.log("id", id)
      let product = yield call(getProductById, id)
      // yield console.log("product", product)
      products[id] = { ...product, ...cartProducts[id] }
      // yield console.log("products[id]", products[id])
    }
    yield put(getDetailedProductsSuccess(products))
  } catch (error) {
    yield put(errorShow("Не удалось получить данные с сервера ;("))
  }

}
