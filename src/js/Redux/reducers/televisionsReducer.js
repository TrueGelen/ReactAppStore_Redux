import {
	GET_TELEVISIONS_REQUEST,
	GET_TELEVISIONS_SUCCESS,
	GET_TELEVISION_REQUEST,
	GET_TELEVISION_SUCCESS,
	SET_FILTERS,
	FILTER
} from '../actionTypes'

import { baseUrlImgs, productLabelsForStores } from '../constants'

const initialState = {
	televisionsFromServer: [],
	filteredTelevisions: [],
	product: null,
	filters: {
		price: {
			min: 0,
			max: 0,
			range: {
				min: 0,
				max: 0
			}
		}
	},
	_baseUrlImgs: baseUrlImgs.televisions,
	_labels: productLabelsForStores.television
}

export const televisionsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_TELEVISIONS_SUCCESS:
			return {
				...state,
				televisionsFromServer: action.payload,
				filteredTelevisions: [...action.payload]
			}
			break
		case GET_TELEVISION_SUCCESS:
			return { ...state, product: action.payload }
			break
		case SET_FILTERS:
			return setFilters(state)
			break
		case FILTER:
			return filter(state, action.payload)
			break
		default:
			return state
			break
	}
}

function setFilters(state) {
	const televisionsFromServer = state.televisionsFromServer
	const labels = state._labels
	const filters = {
		...state.filters,
		price:
		{
			...state.filters.price,
			range:
				{ ...state.filters.price.range }
		}
	}

	for (let key in labels) {
		if (key !== "about") {
			//.map() - get all values by key and in Set we make it unique. Also find a max price
			[...new Set(televisionsFromServer.map(prod => {
				filters.price.max = Math.max(filters.price.max, Number(prod.price))
				filters.price.range.max = filters.price.max
				return prod.description[key]
			}))]
				//by key we write new obj where key is unique value and value is boolean
				.forEach(val => {
					filters[key] = { ...filters[key], [val]: true }
				})
		}
	}
	return { ...state, filters }
}

function filter(state, { parameter = null, value = null }) {
	let filteredTelevisions = [...state.televisionsFromServer]
	let filters = {}

	const spreadArray = (obj) => {
		let newObj = { ...obj }

		for (let key in obj) {
			if (typeof newObj[key] === "object") {
				newObj[key] = spreadArray(obj[key])
			}
		}
		return newObj
	}

	for (let key in state.filters) {
		if (typeof state.filters[key] === "object") {
			filters[key] = spreadArray(state.filters[key])
		} else if (Array.isArray(state.filters[key])) {
			filters[key] = [...state.filters[key]]
		} else {
			filters[key] = state.filters[key]
		}
	}

	if (parameter !== null && value !== null) {
		filters[parameter][value] = !filters[parameter][value]
	}

	for (let param in filters) {
		filteredTelevisions = filteredTelevisions.filter(
			tv => Object.keys(filters[param])
				.some(val => {
					if (param === "price") {
						return filters.price.range.min <= tv.price && filters.price.range.max >= tv.price
					} else {
						return filters[param][val] && (val === tv.description[param].toString())
					}
				})
		)
	}
	return { ...state, filteredTelevisions, filters }
}