/* libs */
import { all, fork } from 'redux-saga/effects'
/* sagas */
import { getTVsFromServerSageWatcher } from './televisions'

export function* rootSaga() {
	// yield console.log("rootSaga")
	yield all([
		getTVsFromServerSageWatcher()
	])
}