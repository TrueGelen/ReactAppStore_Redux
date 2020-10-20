/* libs */
import { all, fork } from 'redux-saga/effects'
/* sagas */
import { televisionsSagaWatcher } from './televisions'
import { cartSagaWatcher } from './cart'

export function* rootSaga() {
  // yield console.log("rootSaga")
  yield all([
    televisionsSagaWatcher(),
    cartSagaWatcher()
  ])
}