/* libs */
import { all, fork } from 'redux-saga/effects'
/* sagas */
import { televisionsSagaWatcher } from './televisions'
import { cartSagaWatcher } from './cart'
import { tabletsSagaWatcher } from './tablets'

export function* rootSaga() {
  // yield console.log("rootSaga")
  yield all([
    televisionsSagaWatcher(),
    cartSagaWatcher(),
    tabletsSagaWatcher()
  ])
}