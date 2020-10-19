/* libs */
import { takeEvery, put, call } from 'redux-saga/effects'
/* actionTypes */
import {
	GET_TELEVISIONS_REQUEST,
	GET_TELEVISIONS_SUCCESS,
	GET_TELEVISION_REQUEST,
	GET_TELEVISION_SUCCESS,
	SET_FILTERS
} from '../actionTypes'
/* api */
import { getTelevisions, getTvById } from '../../serverApiModel/televisions'

export function* getTVsFromServerSageWatcher() {
	// yield console.log("getTVsFromServerSageWatcher")
	yield takeEvery(GET_TELEVISIONS_REQUEST, getTVsFromServerSagaWorker)
}

function* getTVsFromServerSagaWorker() {
	// yield console.log("getTVsFromServerSagaWorker")
	const tvs = yield call(getTelevisions)
	yield put({ type: GET_TELEVISIONS_SUCCESS, payload: tvs })
	yield put({ type: SET_FILTERS })
}


