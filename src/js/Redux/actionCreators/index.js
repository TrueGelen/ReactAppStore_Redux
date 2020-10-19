import {
	GET_TELEVISIONS_REQUEST,
	GET_TELEVISIONS_SUCCESS,
	GET_TELEVISION_REQUEST,
	GET_TELEVISION_SUCCESS,
	SET_FILTERS,
	FILTER
} from '../actionTypes'

export function getTelevisionsRequest() {
	return {
		type: GET_TELEVISIONS_REQUEST
	}
}

export function getTelevisionsSuccess(tvs) {
	return {
		type: GET_TELEVISIONS_SUCCESS,
		payload: tvs
	}
}

export function getTelevisionRequest() {
	return {
		type: GET_TELEVISION_REQUEST
	}
}

export function getTelevisionSuccess(tv) {
	return {
		type: GET_TELEVISION_SUCCESS,
		payload: tv
	}
}

// export function setFilters(filters) {
// 	return {
// 		type: SET_FILTERS,
// 		payload: filters
// 	}
// }

export function filter(parameter, value) {
	return {
		type: FILTER,
		payload: { parameter, value }
	}
}